import { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import Card from '../components/Card';
import { interviewCols } from '../components/dataColumns';
import { addInterview, deleteInterview, downloadTable, updateInterview } from '../components/supabaseOperations';
import parseFormValues from '../utils/parseFormValues';
import SideBar from '../components/SideBar';
import FilterInput from '../components/FilterInput';
import { CogIcon } from '@heroicons/react/solid';
import InterviewModal from '../components/InterviewModal';
import FormModal from '../components/FormModal';

export default function Interviews({ user }) {
  const initialState = {
    company: '',
    jobTitle: '',
    fromDate: '',
    thruDate: '',
  }
  const userId = user.id;
  const [interviews, setInterviews] = useState([]);
  const [interviewsLoading, setInterviewsLoading] = useState(false);
  const [formJobId, setFormJobId] = useState('');
  const [company, setCompany] = useState(initialState.company);
  const [jobTitle, setJobTitle] = useState(initialState.jobTitle);
  const [fromDate, setFromDate] = useState(initialState.fromDate);
  const [thruDate, setThruDate] = useState(initialState.thruDate);
  const [bothDates, setBothDates] = useState(false);

  const filters = [
    { value: company, name: "company", label: "Company", type: "text", setter: setCompany },
    { value: jobTitle, name: "jobTitle", label: "Job Title", type: "text", setter: setJobTitle },
    { value: fromDate, name: "fromDate", label: "Applied From", type: "date", setter: setFromDate },
    { value: thruDate, name: "thruDate", label: "Applied Through", type: "date", setter: setThruDate },
  ];

  const interviewsSubscription = supabase
    .from('interviews')
    .on('*', payload => {
      retrieveInterviews();
    })
    .subscribe();

  useEffect(() => {
    retrieveInterviews();
  }, [company, jobTitle, fromDate, thruDate]);

  useEffect(() => {
    if (fromDate !== '' && thruDate !== '') {
      const first = new Date(fromDate);
      const second = new Date(thruDate);
      if (first <= second) {
        setBothDates(true);
      } else {
        setBothDates(false);
      }
    } else {
      setBothDates(false);
    }
  }, [fromDate, thruDate]);

  const retrieveInterviews = async () => {
    setInterviewsLoading(true);

    let query = supabase.rpc("user_interviews");
    if (company !== '') { query = query.ilike("company", `%${company}%`); }
    if (jobTitle !== '') { query = query.ilike("job_title", `%${jobTitle}%`); }
    if (bothDates) { query = query.gte("applied_at", fromDate).lte("applied_at", thruDate); }
    query = query.order('applied_at', { ascending: false }).order('company', { ascending: true });
    const { error, data } = await query;
    if (error) {
      alert(`Error: ${error["message"]}`);
    } else {
      setInterviews(data);
      setInterviewsLoading(false);
    }
  };

  const handleSubmit = async (e, isNewForm, interviewId) => {
    e.preventDefault();
    const values = parseFormValues(e.target);
    if (isNewForm) {
      values['user_id'] = userId;
      values['job_id'] = formJobId;
      await addInterview(supabase, values);
    } else {
      await updateInterview(supabase, values, interviewId);
    }
  };

  async function handleDelete(e, element) {
    e.preventDefault();

    const result = confirm(`Warning: Delete Interview?`);
    if (result === true) {
      await deleteInterview(supabase, element["id"]);
      retrieveInterviews();
    }
  };

  async function handleDownload(e) {
    e.preventDefault();
    downloadTable(supabase, 'interviews');
  }

  function handleResetFilters(e) {
    e.preventDefault();
    filters.map((filter) => {
      filter.setter(initialState[filter.name]);
    });
  }

  return (
    <div className="my-4 w-full grid grid-cols-4">
      <div className="col-span-1 flex flex-col items-center">
        <SideBar
          ModalComponent={
            <InterviewModal
              buttonStyle="rounded-md bg-sky-600 mx-2 px-2 text-white hover:bg-sky-400"
              dataColumns={interviewCols}
              purpose="Add New Interviews"
              handleSubmit={(e) => handleSubmit(e, true, '')}
              setter={setFormJobId}
            />
          }
          handleDownload={handleDownload}
          dataColumns={interviewCols}
          purpose="Interview"
        >
          {filters.map((filter) => (
            <FilterInput
              key={filter.name}
              name={filter.name}
              type={filter.type}
              value={filter.value}
              label={filter.label}
              setter={filter.setter}
            />
          ))}
          <div className="my-2">
            <button
              className="inline-flex mx-2 justify-center rounded-md bg-red-300 px-4 py-2 text-red-900 hover:bg-red-200"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </SideBar>
      </div>
      <div className="col-span-3 w-full flex flex-col items-center">
        <h1 className="text-4xl mb-4 text-amber-600">
          Add/Edit Interviews/Responses
        </h1>
        <div className="w-full">
          {interviewsLoading ? (
            <div className="flex justify-center items-center">
              <CogIcon className="animate-spin h-16 w-16" />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="h-16 w-16" />
            </div>
          )}
          {interviews.map((element) => (
            <Card
              key={element['id']}
              element={element}
              dataColumns={interviewCols}
            >
              <FormModal
                buttonStyle="rounded-md bg-sky-900 px-2 mx-2 text-white hover:bg-opacity-50"
                element={element}
                dataColumns={interviewCols}
                purpose="Edit Interview"
                handleSubmit={(e) => handleSubmit(e, false, element['id'])}
              >
                <button
                  onClick={(e) => handleDelete(e, element)}
                  className="mx-2 rounded-md bg-purple-200 px-4 py-2 text-purple-900 hover:bg-purple-100"
                >
                  Delete
                </button>
              </FormModal>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

Interviews.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/signin' } };
  }

  return { props: { user } };
};
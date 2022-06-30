import { useState, useEffect, useContext } from "react";
import { supabase } from "./api/supabaseClient";
import Layout from "../components/layout";
import Card from "../components/Card";
import { jobCols } from "../components/dataColumns";
import FormModal from "../components/FormModal";
import { addJob, updateJob, deleteJob, downloadTable } from "../components/supabaseOperations";
import parseFormValues from "../utils/parseFormValues";
import { CogIcon } from "@heroicons/react/solid";
import SideBar from "../components/SideBar";
import FilterInput from "../components/FilterInput";
import ResponseModal from "../components/ResponseModal";
import { ResponseContext } from "../context/contexts";
import nowToYYYYMMDD from "../utils/nowToYYYYMMDD";

export default function Jobs({ user }) {
  const initialState = {
    company: '',
    jobTitle: '',
    sitePosted: '',
    fromDate: '',
    thruDate: '',
  }
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [company, setCompany] = useState(initialState.company);
  const [jobTitle, setJobTitle] = useState(initialState.jobTitle);
  const [fromDate, setFromDate] = useState(initialState.fromDate);
  const [thruDate, setThruDate] = useState(initialState.thruDate);
  const [sitePosted, setSitePosted] = useState(initialState.sitePosted);
  const [bothDates, setBothDates] = useState(false);
  
  const userId = user.id;
  const filters = [
    { value: company, name: "company", label: "Company", type: "text", setter: setCompany },
    { value: jobTitle, name: "jobTitle", label: "Job Title", type: "text", setter: setJobTitle },
    { value: sitePosted, name: "sitePosted", label: "Site Posted", type: "text", setter: setSitePosted },
    { value: fromDate, name: "fromDate", label: "Applied From", type: "date", setter: setFromDate },
    { value: thruDate, name: "thruDate", label: "Applied Through", type: "date", setter: setThruDate },
  ];

  const [responseContext, setResponseContext] = useContext(ResponseContext);

  useEffect(() => {
    retrieveJobs();
  }, [company, jobTitle, sitePosted, bothDates]);

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

  const jobsSubscription = supabase
    .from('jobs')
    .on('*', payload => {
      retrieveJobs();
    })
    .subscribe();

  async function retrieveJobs() {
    setJobsLoading(true);

    let query = supabase.from('jobs').select('*');
    if (company !== '') { query = query.ilike("company", `%${company}%`); }
    if (jobTitle !== '') { query = query.ilike("job_title", `%${jobTitle}%`); }
    if (sitePosted !== '') { query = query.ilike("site_posted", `%${sitePosted}%`); }
    if (bothDates) { query = query.gte("applied_at", fromDate).lte("applied_at", thruDate); }
    query = query.order('applied_at', { ascending: false }).order('company', { ascending: true });

    const { data, error } = await query;
    if (error) {
      alert("Error: " + error['message']);
    } else {
      setJobs(data);
      setJobsLoading(false);
    }
  }

  async function handleSubmit(e, isNewForm, jobId) {
    e.preventDefault();
    const values = parseFormValues(e.target);
    if (isNewForm) {
      values["user_id"] = userId;
      await addJob(supabase, values);
    } else {
      await updateJob(supabase, values, jobId);
    }
  }

  async function handleDelete(e, element) {
    e.preventDefault();
    const result = confirm(`Warning: Delete ${element["job_title"]} at ${element["company"]}?`);
    if (result === true) {
      await deleteJob(supabase, element["id"]);
    }
  }

  async function handleDownload(e) {
    e.preventDefault();
    downloadTable(supabase, 'jobs');
  }

  function handleResetFilters(e) {
    e.preventDefault();
    filters.map((filter) => {
      filter.setter(initialState[filter.name]);
    });
  }

  async function handleAuto(jobId) {
    const values = { response: "Interview", responded_at: nowToYYYYMMDD() };
    await updateJob(supabase, values, jobId);
    
  }

  return (
    <div className="my-4 w-full grid grid-cols-4">
      <div className="col-span-1 flex flex-col items-center">
        <SideBar
          ModalComponent={
            <FormModal
              buttonStyle="rounded-md bg-sky-600 mx-2 px-2 text-white hover:bg-sky-400"
              dataColumns={jobCols}
              purpose="Add New Jobs"
              handleSubmit={(e) => handleSubmit(e, true, '')}
            />
          }
          handleDownload={handleDownload}
          dataColumns={jobCols}
          purpose="Job"
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
          Add/Edit Jobs
        </h1>
        <div className="w-full">
          {jobsLoading ? (
            <div className="flex justify-center items-center">
              <CogIcon className="animate-spin h-16 w-16" />
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="h-16 w-16" />
            </div>
          )}
          {jobs.map((element) => (
            <Card
              key={element['id']}
              element={element}
              dataColumns={jobCols}
            >
              <FormModal
                buttonStyle="rounded-md bg-sky-900 px-2 mx-2 text-white hover:bg-opacity-50"
                element={element}
                dataColumns={jobCols}
                purpose="Edit Job"
                handleSubmit={(e) => handleSubmit(e, false, element['id'])}
              >
                <button
                  onClick={(e) => handleDelete(e, element)}
                  className="mx-2 rounded-md bg-purple-200 px-4 py-2 text-purple-900 hover:bg-purple-100"
                >
                  Delete
                </button>
              </FormModal>
              <ResponseModal
                buttonStyle="rounded-md bg-sky-900 px-2 mx-2 text-white hover:bg-opacity-50"
                purpose="Add Interview"
                pText={"Automatically create an interview for the job (date set to today)?"}
                element={element}
                handleAuto={handleAuto}
                setContext={setResponseContext}
                routing="/interviews"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

Jobs.getLayout = function getLayout(page) {
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
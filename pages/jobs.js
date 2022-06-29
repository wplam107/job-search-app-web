import { useState, useEffect } from "react";
import { supabase } from "./api/supabaseClient";
import Layout from "../components/layout";
import Card from "../components/Card";
import { jobCols } from "../components/dataColumns";
import FormModal from "../components/FormModal";
import { addJob, updateJob, deleteJob } from "../components/supabaseOperations";
import { saveAs } from 'file-saver';
import parseFormValues from "../utils/parseFormValues";
import { CogIcon } from "@heroicons/react/solid";
import SideBar from "../components/SideBar";
import FilterInput from "../components/FilterInput";
import nowToYYYYMMDD from "../utils/nowToYYYYMMDD";

export default function Jobs({ user }) {
  // const now = nowToYYYYMMDD();
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

  useEffect(() => {
    retrieveJobs();
  }, [company, jobTitle, sitePosted, bothDates]);

  useEffect(() => {
    if (fromDate !== '' && thruDate !== '') {
      setBothDates(true);
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
    if (company !== '') { query = query.like("company", `%${company}%`); }
    if (jobTitle !== '') { query = query.like("job_title", `%${jobTitle}%`); }
    if (sitePosted !== '') { query = query.like("site_posted", `%${sitePosted}%`); }
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
    const { data, error } = await supabase.from("jobs").select("*").csv();
    if (error) {
      alert("Error: " + error["message"]);
    } else {
      const fileName = "jobs.csv";
      const fileToSave = new Blob([data], {type: "text/plain;charset=utf-8"});
      saveAs(fileToSave, fileName);
    }
  }

  function handleResetFilters(e) {
    e.preventDefault();
    filters.map((filter) => {
      filter.setter(initialState[filter.name]);
    });
  }

  return (
    <div className="my-4 w-full grid grid-cols-5">
      <div className="col-span-1 flex flex-col items-center">
        <SideBar
          handleDownload={handleDownload}
          handleSubmit={(e) => handleSubmit(e, true, '')}
          dataColumns={jobCols}
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
      <div className="col-span-4 flex flex-col items-center">
        <h1 className="text-4xl mb-4 text-amber-600">
          Add/Edit Jobs
        </h1>
        <div>
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
                buttonStyle="rounded-md bg-sky-900 px-2 text-white hover:bg-opacity-50"
                element={element}
                dataColumns={jobCols}
                purpose="Edit Job"
                handleSubmit={(e) => handleSubmit(e, false, element['id'])}
              >
                <button
                  onClick={(e) => handleDelete(e, element)}
                  className="inline-flex mx-2 justify-center rounded-md bg-purple-200 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-100"
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
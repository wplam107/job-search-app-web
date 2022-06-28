import { useState, useEffect } from "react";
import { supabase } from "./api/supabaseClient";
import Layout from "../components/layout";
import Card from "../components/Card";
import { jobCols } from "../components/dataColumns";
import FormModal from "../components/FormModal";
import { addJob, updateJob, deleteJob } from "../components/supabaseOperations";
import { saveAs } from 'file-saver';
import parseFormValues from "../utils/parseFormValues";

export default function Jobs({ user }) {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const userId = user.id;

  useEffect(() => {
    retrieveJobs();
  }, []);

  const jobsSubscription = supabase
    .from('jobs')
    .on('*', payload => {
      retrieveJobs();
    })
    .subscribe();

  async function retrieveJobs() {
    setJobsLoading(true);

    let query = supabase.from('jobs').select('*');
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

  if (jobsLoading) {
    return (
      <div>
        <h1>Jobs Loading...</h1>
      </div>
    );
  }

  return (
    <div className="my-4 w-full grid grid-cols-4">
      <div className="col-span-1 flex flex-col items-center">
        <div className="sticky top-[120px] flex flex-col items-center">
          <h1 className="text-2xl mb-4 text-amber-600">
            Operations
          </h1>
          <button
            onClick={handleDownload}
            className="rounded-md bg-purple-600 mx-2 px-2 text-white hover:bg-purple-400"
          >
            Download Jobs
          </button>
          <div className="mt-4">
            <FormModal
              buttonStyle="rounded-md bg-sky-600 mx-2 px-2 text-white hover:bg-sky-400"
              dataColumns={jobCols}
              purpose="Add New Job"
              handleSubmit={(e) => handleSubmit(e, true, '')}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center">
        <h1 className="text-4xl mb-4 text-amber-600">
          Add/Edit Jobs
        </h1>
        <div>
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
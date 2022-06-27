import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import SideBar from '../components/sideBar';
import Card from '../components/card';
import { plusCirclePath } from '../components/icons';
import { jobCols as cols } from '../components/dataColumns';
import parseFormValues from '../utils/parseFormValues';
import { ControlButton } from '../components/buttons';
import { deleteJob, addJob, updateJob } from '../components/supabaseOperations';
import CardList from '../components/cardList';

export default function Jobs({ user }) {
  const userId = user.id;
  const [jobs, setJobs] = useState([]);
  const [newForm, setNewForm] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [edittingJob, setEdittingJob] = useState("");

  useEffect(() => {
    retrieveJobs();
  }, []);

  const retrieveJobs = async () => {
    setJobsLoading(true);

    let query = supabase.from("jobs").select("*");
    query = query.order("applied_at", { ascending: false }).order("company", { ascending: true });

    const { data, error } = await query;
    if (error) {
      alert("Error: " + error["message"]);
    } else {
      setJobs(data);
      setJobsLoading(false);
    }
  };

  const handleToggleForm = (e) => {
    e.preventDefault();
    setNewForm(!newForm);
    setEdittingJob("new-form");
  };

  const handleToggleEdit = (e, key) => {
    e.preventDefault();
    if (edittingJob !== key) {
      setEdittingJob(key);
      setNewForm(false);
    } else {
      setEdittingJob("");
    }
  };

  const handleSubmit = async (e, isNewForm, jobId) => {
    e.preventDefault();
    const values = parseFormValues(e.target);
    if (isNewForm) {
      values["user_id"] = userId;
      await addJob(supabase, values);
      setNewForm(false);
      setEdittingJob("");
    } else {
      await updateJob(supabase, values, jobId);
      setEdittingJob("");
    }
    retrieveJobs();
  };

  const handleDelete = async (e, ele) => {
    e.preventDefault();

    const result = confirm(`Warning: Delete ${ele["job_title"]} at ${ele["company"]}?`);
    if (result === true) {
      await deleteJob(supabase, ele["id"]);
      setEdittingJob("");
      retrieveJobs();
    }
  };

  return (
    <div className="grid grid-cols-4 my-4 w-full">
      <div className="col-span-1 flex flex-col items-center">
        Side Bar
      </div>
      <div className="col-span-3 flex flex-col items-center">
        <h1 className="text-4xl mb-4 text-amber-600">
          Add/Edit Jobs
        </h1>
        <button
          onClick={handleToggleForm}
          className={newForm ? "transition rotate-45" : "transition rotate-0"}
          aria-label={newForm ? "Close New Job Form" : "Open New Job Form"}
        >
          <svg viewBox="0 0 16 16" className="fill-zinc-400 w-6 h-6 hover:fill-orange-400 cursor-pointer">
            <path d={plusCirclePath} />
          </svg>
        </button>
        <CardList>
          <Card
            key="new-form"
            title="New Job Form"
            handleSubmit={(e) => handleSubmit(e, true, "")}
            hidden={!newForm}
            inputType="input"
            cols={cols}
          >
            <ControlButton type="submit">
              Submit
            </ControlButton>
          </Card>
          {jobs.map((ele) => {
            const key = ele["id"].toString();
            return (
              <Card 
                key={key}
                cardKey={key}
                handleSubmit={(e) => handleSubmit(e, false, key)}
                itemType={edittingJob !== key ? "value" : "input"}
                cols={cols}
                element={ele}
              >
                <ControlButton onClick={(e) => handleToggleEdit(e, key)}>
                  {edittingJob !== key ? "Edit" : "Close"}
                </ControlButton>
                {edittingJob === key
                  ? <ControlButton type="submit">
                      Update
                    </ControlButton>
                  : null
                }
                {edittingJob === key
                  ? <ControlButton onClick={(e) => handleDelete(e, ele)}>
                      Delete
                    </ControlButton>
                  : null
                }
              </Card>
            );
          })}
        </CardList>
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
    return { props: {}, redirect: { destination: "/signin" } };
  }
  return { props: { user } };
};
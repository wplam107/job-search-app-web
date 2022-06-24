import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import JobItem from "./jobItem";
import { FiltersContext } from "../context/filtersContext";

export default function JobsList({ newForm }) {
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [deleteJob, setDeleteJob] = useState(0);

  const [[
    companyFilter,
    jobTitleFilter,
    appliedDateBeginFilter,
    appliedDateEndFilter,
    responseFilter
  ], ] = useContext(FiltersContext);

  useEffect(() => {
    getJobs();
  }, [
    deleteJob,
    setDeleteJob,
    newForm,
    companyFilter,
    jobTitleFilter,
    appliedDateBeginFilter,
    appliedDateEndFilter,
    responseFilter
  ]);

  const getJobs = async () => {
    setJobsLoading(true);
    let query = supabase.from("jobs").select("*");

    if (companyFilter !== "") { query = query.eq("company", companyFilter) };
    if (jobTitleFilter !== "") { query = query.eq("job_title", jobTitleFilter) };
    if (appliedDateBeginFilter !== "" && appliedDateEndFilter !== "") { 
      query = query.gte("applied_at", appliedDateBeginFilter).lte("applied_at", appliedDateEndFilter);
    };
    if (responseFilter !== "") { query = query.eq("response", responseFilter)};

    query = query.order("applied_at", { ascending: false }).order("company", { ascending: true });
    const { error, data } = await query;

    if (error) {
      alert("Error: " + error["message"]);
    } else {
      setJobs(data);
      setJobsLoading(false);
    }
  };

  if (jobs.length === 0 && jobsLoading === false) {
    return (
      <div>
        <div className="my-4 flex flex-col items-center justify-center animate-bounce">
          <svg 
          viewBox="0 0 24 24"
          className="fill-zinc-400 w-12 h-12"
          >
            <path d="M18.655 10.405a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06l4.97-4.97v14.44a.75.75 0 001.5 0V5.435l4.97 4.97a.75.75 0 001.06 0z" />
          </svg>
        </div>
        <h2 className="text-lg">Add Job Applications</h2>
      </div>
    );
  }

  return (
    <ul className="my-2 w-full">
      {jobs.map((job, idx) => <JobItem key={job["id"]} job={job} idx={idx} deleteJob={deleteJob} setDeleteJob={setDeleteJob} getJobs={getJobs} />)}
    </ul>
  );
};

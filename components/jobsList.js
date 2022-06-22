import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { trashPath, pencilPath } from "./icons";

export default function JobsList({ newForm }) {
  const [jobs, setJobs] = useState([]);
  const [deleteJob, setDeleteJob] = useState(0);

  useEffect(() => {
    getJobs();
  }, [deleteJob, setDeleteJob, newForm]);

  const getJobs = async () => {
    const { error, data } = await supabase
      .from("jobs")
      .select("*")
      .order("applied_at", { ascending: false });

    if (error) {
      alert("Error: " + error["message"]);
    } else {
      setJobs(data);
    }
  };

  return (
    <ul className="my-2">
      {jobs.map((job, idx) => <JobItem key={job["id"]} job={job} idx={idx} deleteJob={deleteJob} setDeleteJob={setDeleteJob} />)}
    </ul>
  );
};

const JobItem = ({ job, idx, deleteJob, setDeleteJob }) => {
  const {
    id,
    company, 
    job_title, 
    years_experience, 
    posted_at, 
    site_posted, 
    applied_at, 
    responded_at, 
    response 
  } = job;

  const handleClickTrash = async () => {
    const result = confirm(`Warning: Delete ${job_title} at ${company}?`);
    if (result === true) {
      const { error, data } = await supabase
        .from("jobs")
        .delete()
        .match({ id: id });

      if (error) {
        alert("Error: " + error["message"]);
      }
      if (data) {
        setDeleteJob(deleteJob + 1);
      }
    }
  };

  return (
    <li key={`${id}-${company}`} className={idx === 0 ? "hover:bg-zinc-800 py-2" : "hover:bg-zinc-800 py-2 border-t border-zinc-700"}>
      <ul className="grid grid-cols-3 gap-x-4 gap-y-1">
        <li key={`company-${id}`}>
          <span className="text-sky-600 font-bold">Company:</span>{` ${company}`}
        </li>
        <li key={`job_title-${id}`}>
          <span className="text-sky-600 font-bold">Job Title:</span>{` ${job_title}`}
        </li>
        <li key={`years_experience-${id}`}>
          <span className="text-sky-600 font-bold">Years Experience:</span>{` ${years_experience !== null ? years_experience : ""}`}
        </li>
        <li key={`posted_at-${id}`}>
          <span className="text-sky-600 font-bold">Date Posted:</span>{` ${posted_at !== null ? posted_at : ""}`}
        </li>
        <li key={`site_posted-${id}`}>
          <span className="text-sky-600 font-bold">Site/Job Board:</span>{` ${site_posted !== null ? site_posted : ""}`}
        </li>
        <li key={`applied_at-${id}`}>
          <span className="text-sky-600 font-bold">Date Applied:</span>{` ${applied_at}`}
        </li>
        <li key={`responded_at-${id}`}>
          <span className="text-sky-600 font-bold">Date Responded:</span>{` ${responded_at !== null ? responded_at : ""}`}
        </li>
        <li key={`response-${id}`}>
          <span className="text-sky-600 font-bold">Company Response:</span>{` ${response !== null ? response : ""}`}
        </li>
        <li key={`edit-${id}`} className="flex flex-row justify-left">
          <span className="text-red-400 font-bold">Edit Job Posting:</span>
          <div className="pl-4 pr-2" onClick={handleClickTrash}>
            <svg 
              viewBox="0 0 16 16"
              className="fill-zinc-400 w-6 h-6 hover:fill-red-400 cursor-pointer"
            >
              <path d={trashPath} />
            </svg>
          </div>
          <div className="px-2">
            <svg 
              viewBox="0 0 16 16"
              className="fill-zinc-400 w-6 h-6 hover:fill-red-400 cursor-pointer"
            >
              <path d={pencilPath} />
            </svg>
          </div>
        </li>
      </ul>
    </li>
  );
};

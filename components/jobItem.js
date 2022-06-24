import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { trashPath, pencilPath, yesPath, noPath } from "./icons";

export default function JobItem({ job, idx, deleteJob, setDeleteJob, getJobs }) {
  const [isEdit, setIsEdit] = useState(false);
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
  const initialState = {
    newCompany: company,
    jobTitle: job_title,
    yearsExp: years_experience === null ? "" : years_experience,
    postedAt: posted_at === null ? "" : posted_at,
    sitePosted: site_posted === null ? "" : site_posted,
    appliedAt: applied_at,
    respondedAt: responded_at === null ? "" : responded_at,
    newResponse: response == null ? "" : response
  };
  const [
    {
      newCompany, 
      jobTitle, 
      yearsExp, 
      postedAt, 
      sitePosted,
      appliedAt,
      respondedAt,
      newResponse
    },
    setState
  ] = useState({ ...initialState });

  useEffect(() => {
    getJobs();
  }, [isEdit, setIsEdit, setState]);

  const handleClickTrash = async (e) => {
    e.preventDefault();

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

  const handleClickEdit = (e) => {
    e.preventDefault();

    setIsEdit(true);
  };

  const closeEdit = (e) => {
    e.preventDefault();

    setIsEdit(false);
  };

  const submitEdit = async (e) => {
    e.preventDefault();

    const { error, data } = await supabase
      .from("jobs")
      .update({
        company: newCompany,
        job_title: jobTitle,
        years_experience: yearsExp === "" ? null : Number(yearsExp),
        posted_at: postedAt === "" ? null : postedAt,
        site_posted: sitePosted === "" ? null : sitePosted,
        applied_at: appliedAt,
        responded_at: respondedAt === "" ? null : respondedAt,
        response: newResponse === "" ? null : newResponse
      })
      .match({ id: id });

    if (error) {
      console.log(error);
      alert("Error: " + error["message"]);
    } else {
      setIsEdit(false);
      setState({ ...initialState });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <li key={`${id}-${company}`} className={idx === 0 ? "hover:bg-zinc-800 py-2" : "hover:bg-zinc-800 py-2 border-t border-zinc-700"}>
      <form>
        <ul className="grid grid-cols-3 gap-x-4 gap-y-1">
          <li key={`company-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Company:
            </label>
            {isEdit 
              ? <input 
                  name="newCompany"
                  className="text-black h-6 bg-amber-200"
                  value={newCompany} 
                  onChange={handleChange} 
                  size={40}
                  required
                /> 
              : ` ${company}`
            }
          </li>
          <li key={`job_title-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Job Title:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="jobTitle"
                  value={jobTitle}
                  onChange={handleChange}
                  size={40}
                  required
                />
              : ` ${job_title}`
            }
          </li>
          <li key={`years_experience-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Years Experience:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="yearsExp"
                  value={yearsExp}
                  type="number"
                  onChange={handleChange}
                  size={40}
                />
              : ` ${years_experience !== null ? years_experience : ""}`
            }
          </li>
          <li key={`posted_at-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Date Posted:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="postedAt"
                  value={postedAt}
                  type="date"
                  onChange={handleChange}
                  size={40}
               />
              : ` ${posted_at !== null ? posted_at : ""}`
            }
          </li>
          <li key={`site_posted-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Site/Job Board:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="sitePosted"
                  value={sitePosted}
                  onChange={handleChange}
                  size={40}
                />
              : ` ${site_posted !== null ? site_posted : ""}`
            }
          </li>
          <li key={`applied_at-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Date Applied:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="appliedAt"
                  value={appliedAt}
                  type="date"
                  onChange={handleChange}
                  size={40}
                  required
                />
              : ` ${applied_at}`
            }
          </li>
          <li key={`responded_at-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Date Responded:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="respondedAt"
                  value={respondedAt}
                  type="date"
                  onChange={handleChange}
                  size={40}
                />
              : ` ${responded_at !== null ? responded_at : ""}`
            }
          </li>
          <li key={`response-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-sky-600 font-bold">
              Company Response:
            </label>
            {isEdit
              ? <input
                  className="text-black h-6 bg-amber-200"
                  name="newResponse"
                  value={newResponse}
                  onChange={handleChange}
                  size={40}
                />
              : ` ${response !== null ? response : ""}`
            }
          </li>
          <li key={`edit-${id}`} className="flex flex-col justify-start pl-4">
            <label className="text-red-400 font-bold">Edit Job Posting:
              <div className="flex flex-row justify-start">
                <button className="pl-6 pr-2" onClick={isEdit ? closeEdit : handleClickTrash} aria-label={isEdit ? "Cancel Job Edit" : "Delete Job"}>
                  <svg 
                    viewBox="0 0 16 16"
                    className="fill-zinc-400 w-6 h-6 hover:fill-red-400 cursor-pointer"
                  >
                    <path d={isEdit ? noPath : trashPath} />
                  </svg>
                </button>
                <button className="px-2" onClick={isEdit ? submitEdit : handleClickEdit} aria-label={isEdit ? "Submit Job Edit" : "Edit Job"}>
                  <svg 
                    viewBox="0 0 16 16"
                    className="fill-zinc-400 w-6 h-6 hover:fill-red-400 cursor-pointer"
                  >
                    <path d={isEdit ? yesPath : pencilPath} />
                  </svg>
                </button>
              </div>
            </label>
          </li>
        </ul>
      </form>
    </li>
  );
};
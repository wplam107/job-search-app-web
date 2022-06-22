import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function JobForm({ setNewForm }) {
  const [userId, setUserId] = useState("");
  
  const initialState = {
    company: "",
    jobTitle: "",
    yearsExp: "",
    postedAt: "",
    sitePosted: "",
    appliedAt: "",
    respondedAt: "",
    response: ""
  }
  const [
    {
      company, 
      jobTitle, 
      yearsExp, 
      postedAt, 
      sitePosted,
      appliedAt,
      respondedAt,
      response
    },
    setState
  ] = useState({ ...initialState });

  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.session();
    setUserId(session.user.id);
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, data } = await supabase
      .from("jobs")
      .insert({
        user_id: userId,
        company: company,
        job_title: jobTitle,
        years_experience: yearsExp === "" ? null : Number(yearsExp),
        posted_at: postedAt === "" ? null : postedAt,
        site_posted: sitePosted === "" ? null : sitePosted,
        applied_at: appliedAt,
        responded_at: respondedAt === "" ? null : respondedAt,
        response: response === "" ? null : response
      });
    if (error) {
      console.log(error);
      alert("Error: " + error["message"]);
    } else {
      setState({ ...initialState });
      setNewForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2">
      <label className="flex flex-col">
        <div>
          Company<span className="text-amber-500">{" (required)"}</span>:
        </div>
        <input
          className="text-black h-6 bg-amber-200"
          name="company"
          value={company}
          placeholder="Company name"
          onChange={handleChange}
          size={40}
          required
        >
        </input>
      </label>
      <label className="flex flex-col">
        <div>
          Job Title<span className="text-amber-500">{" (required)"}</span>:
        </div>
        <input
          className="text-black h-6 bg-amber-200"
          name="jobTitle"
          value={jobTitle}
          placeholder="Job title"
          onChange={handleChange}
          size={40}
          required
        >
        </input>
      </label>
      <label className="flex flex-col">
        Years Experience:
        <input
          className="text-black h-6 bg-amber-200"
          name="yearsExp"
          value={yearsExp}
          placeholder="Years required/preferred"
          type="number"
          onChange={handleChange}
          size={40}
        >
        </input>
      </label>
      <label className="flex flex-col">
        Date Job Posted:
        <input
          className="text-black h-6 bg-amber-200"
          name="postedAt"
          value={postedAt}
          type="date"
          onChange={handleChange}
          size={40}
        >
        </input>
      </label>
      <label className="flex flex-col">
        Site/Job Board:
        <input
          className="text-black h-6 bg-amber-200"
          name="sitePosted"
          value={sitePosted}
          placeholder="Site of job posting"
          onChange={handleChange}
          size={40}
        >
        </input>
      </label>
      <label className="flex flex-col">
        <div>
          Date Applied<span className="text-amber-500">{" (required)"}</span>:
        </div>
        <input
          className="text-black h-6 bg-amber-200"
          name="appliedAt"
          value={appliedAt}
          type="date"
          onChange={handleChange}
          size={40}
          required
        >
        </input>
      </label>
      <label className="flex flex-col">
        Date Responded:
        <input
          className="text-black h-6 bg-amber-200"
          name="respondedAt"
          value={respondedAt}
          type="date"
          onChange={handleChange}
          size={40}
        >
        </input>
      </label>
      <label className="flex flex-col">
        Company Response:
        <input
          className="text-black h-6 bg-amber-200"
          name="response"
          value={response}
          placeholder="Company response"
          onChange={handleChange}
          size={40}
        >
        </input>
      </label>
      <div className="col-span-2 flex justify-center">
        <button type="submit" className="rounded-md bg-amber-500 text-zinc-900 hover:bg-amber-200 px-2">Submit Job</button>
      </div>
    </form>
  );
}
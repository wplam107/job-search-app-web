import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function JobForm() {
  const [userId, setUserId] = useState("");
  // const [company, setCompany] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  // const [yearsExp, setYearsExp] = useState("");
  // const [postedAt, setPostedAt] = useState("");
  // const [sitePosted, setSitePosted] = useState("");
  // const [appliedAt, setAppliedAt] = useState("");
  // const [respondedAt, setRespondedAt] = useState("");
  // const [response, setResponse] = useState("");
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
    console.log(typeof(value));
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
        years_experience: typeof(yearsExp) === "number" ? yearsExp : null,
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
      setState({ ...initialState })
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="flex flex-col">
        <div>
          Company<span className="text-orange-400">{" (required)"}</span>:
        </div>
        <input
          className="text-black"
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
          Job Title<span className="text-orange-400">{" (required)"}</span>:
        </div>
        <input
          className="text-black"
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
          className="text-black"
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
          className="text-black"
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
          className="text-black"
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
          Date Applied<span className="text-orange-400">{" (required)"}</span>:
        </div>
        <input
          className="text-black"
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
          className="text-black"
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
          className="text-black"
          name="response"
          value={response}
          placeholder="Company response"
          onChange={handleChange}
          size={40}
        >
        </input>
      </label>
      <button type="submit">Submit Job</button>
    </form>
  );
}
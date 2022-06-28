import { useContext, useEffect, useState } from "react";

export default function SideBar() {
  const initialState = {
    company: "",
    jobTitle: "",
    appliedDateBegin: "",
    appliedDateEnd: "",
    response: ""
  };
  const [
    {
      company,
      jobTitle,
      appliedDateBegin,
      appliedDateEnd,
      response
    },
    setState
  ] = useState({ ...initialState });

  const [, 
    [
      setCompanyFilter,
      setJobTitleFilter,
      setAppliedDateBeginFilter,
      setAppliedDateEndFilter,
      setResponseFilter
    ]
  ] = useContext(FiltersContext);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setCompanyFilter(company);
    setJobTitleFilter(jobTitle);
    setAppliedDateBeginFilter(appliedDateBegin);
    setAppliedDateEndFilter(appliedDateEnd);
    setResponseFilter(response);
  };

  const handleClickReset = (e) => {
    e.preventDefault();
    setState({ ...initialState });
    setCompanyFilter(initialState.company);
    setJobTitleFilter(initialState.jobTitle);
    setAppliedDateBeginFilter(initialState.appliedDateBegin);
    setAppliedDateEndFilter(initialState.appliedDateEnd);
    setResponseFilter(initialState.response);
  };

  return (
    <div className="col-span-1">
      <div className="sticky top-[10rem]">
        <h2 className="text-xl text-orange-400 flex flex-col items-center pb-4">
          Filters
        </h2>
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col items-center px-4 border-x border-zinc-700"
        >
          <ul className="w-full">
            <li key="company" className="flex flex-col items-center">
              <label>
                Company:
              </label>
              <input 
                name="company"
                value={company}
                className="text-black h-6 bg-amber-200 w-52"
                onChange={handleChange}
              />
            </li>
            <li key="jobTitle" className="flex flex-col items-center">
              <label>
                Job Title:
              </label>
              <input 
                name="jobTitle"
                value={jobTitle}
                className="text-black h-6 bg-amber-200 w-52"
                onChange={handleChange}
              />
            </li>
            <li key="appliedDate" className="flex flex-col items-center">
              <label>
                Applied Date:
              </label>
              <div className="flex flex-col items-center w-52">
                <div className="flex justify-between w-full">
                  <label className="text-sm">
                    From:
                  </label>
                  <input 
                    name="appliedDateBegin"
                    value={appliedDateBegin}
                    type="date"
                    className="text-black h-6 bg-amber-200 w-40"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-between w-full">
                  <label className="text-sm">
                    To:
                  </label>
                  <input
                    name="appliedDateEnd"
                    value={appliedDateEnd}
                    type="date"
                    className="text-black h-6 bg-amber-200 w-40"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </li>
            <li key="response" className="flex flex-col items-center">
              <label>
                Response:
              </label>
              <input 
                name="response"
                value={response}
                className="text-black h-6 bg-amber-200 w-52"
                onChange={handleChange}
              />
            </li>
          </ul>
          <div className="mt-4 mb-2">
            <button type="submit" className="px-2 rounded-md bg-amber-500 text-zinc-900 hover:bg-amber-200">
              Run Filters
            </button>
          </div>
          <div>
            <button
              onClick={handleClickReset}
              className="px-2 rounded-md bg-red-400 text-zinc-900 hover:bg-red-200"
            >
              Reset Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
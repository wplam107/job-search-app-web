import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SideBar() {
  const initialState = {
    companyFilter: "",
    jobTitleFilter: "",
    appliedDateRange: "",
    responseFilter: ""
  };
  const [companyFilter, setCompanyFilter] = useState("");

  const handleChange = (e) => {
    e.preventDefault();


  }

  return (
    <div className="col-span-1">
      <div className="sticky top-[10rem]">
        <h2 className="text-xl text-orange-400 flex flex-col items-center pb-4">
          Filters
        </h2>
        <div className="px-4 border-x border-zinc-700">
          <ul>
            <li key="company-filter">
              <label>
                Company:
              </label>
              <input 
                name="company-filter"
                onChange={handleChange}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
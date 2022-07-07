import { Switch } from "@headlessui/react";
import { useState, useContext, useEffect } from "react";
import { DashboardContext } from "../context/contexts";

export default function DashSidebar() {
  const [enabled, setEnabled] = useState(true);
  const [dashboardContext, setDashboardContext] = useContext(DashboardContext);

  useEffect(() => {
    if (enabled) setDashboardContext(true);
    else setDashboardContext(false);
  }, [enabled]);

  return (
    <div>
      <div className="flex flex-row items-center">
        <span className="mr-2 text-sm">Interviews</span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-zinc-600' : 'bg-zinc-300'
          } relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">
            Switch between jobs and interviews
          </span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
              pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <span className="ml-2 text-sm">Jobs</span>
      </div>
    </div>
  );
}
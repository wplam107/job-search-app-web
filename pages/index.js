import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';

export default function Index() {
  const [totalAppJobs, setTotalAppJobs] = useState(0);
  const [totalAppUsers, setTotalAppUsers] = useState(0);

  useEffect(() => {
    getTotalAppJobs();
    getTotalAppUsers();
  }, []);

  const getTotalAppJobs = async () => {
    const { data, error } = await supabase.rpc("total_app_jobs");
    if (error) {
      alert(`Error: ${error["message"]}`);
    }
    setTotalAppJobs(data);
  };

  const getTotalAppUsers = async () => {
    const { data, error } = await supabase.rpc("total_app_users");
    if (error) {
      alert(`Error: ${error["message"]}`)
    }
    setTotalAppUsers(data);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl mb-4 text-amber-600">
        Home Page
      </h1>
      <ul className="w-1/2 flex flex-row justify-center">
        <li key="app-jobs" className="mx-4">
          Total Jobs on App:<span className="text-amber-400">{` ${totalAppJobs}`}</span>
        </li>
        <li key="app-users" className="mx-4">
          Total Users on App:<span className="text-amber-400">{` ${totalAppUsers}`}</span>
        </li>
      </ul>
    </div>
  );
};

Index.getLayout = function getLayout(page) {
  return (
    <Layout name="Home Page">
      {page}
    </Layout>
  );
};
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import Calender from '../components/Calender';
import parseSankeyData from '../utils/parseSankeyData';
import SankeyComponent from '../components/SankeyComponent';

export default function Index() {
  const today = new Date();
  const yearAgo = new Date().setFullYear(today.getFullYear() - 1);

  const [totalAppJobs, setTotalAppJobs] = useState(0);
  const [totalAppUsers, setTotalAppUsers] = useState(0);
  const [dailyJobCounts, setDailyJobCounts] = useState([]);
  const [sankeyData, setSankeyData] = useState([]);

  useEffect(() => {
    getTotalAppJobs();
    getTotalAppUsers();
    getDailyJobCounts();
    retrieveSankeyData();
  }, []);

  async function retrieveSankeyData() {
    const { data, error } = await supabase.rpc('all_sankey_data');
    if (error) {
      alert(`Error: ${error["message"]}`);
    }
    const processedData = parseSankeyData(data);
    setSankeyData(processedData);
  }

  async function getDailyJobCounts() {
    const { data, error } = await supabase.rpc('total_daily_job_counts');
    if (error) {
      alert(`Error: ${error["message"]}`);
    }
    const processedData = data.map((row) => {
      return (
        { date: `${row.applied_at}T00:00:00`, count: row.job_count } 
      )
    })
    setDailyJobCounts(processedData);
  }

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
      <div className="my-4 flex flex-col w-full items-center">
        <h1 className="text-amber-300 font-bold">
        Dates of Jobs Applied to from All Users:
        </h1>
        <Calender
          data={dailyJobCounts}
          startDate={yearAgo}
          endDate={today}
          purpose="job"
        />
      </div>
      <div className="my-4 flex flex-col w-full items-center">
        <h1 className="text-amber-300 font-bold">
          Job Application Responses from All Users:
        </h1>
        <SankeyComponent data={sankeyData} />
      </div>
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
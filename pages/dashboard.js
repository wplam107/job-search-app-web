import { useEffect, useState } from 'react';
import Calender from '../components/Calender';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import getLatestDate from '../utils/getLatestDate';
import DashSidebar from '../components/DashSidebar';
import { DashboardContext } from '../context/contexts';
import parseSankeyData from '../utils/parseSankeyData';
import SankeyComponent from '../components/SankeyComponent';

export default function Dashboard({ user }) {
  const today = new Date();
  const yearAgo = new Date().setFullYear(today.getFullYear() - 1);

  const [dailyJobCounts, setDailyJobCounts] = useState([]);
  const [dailyInterviewCounts, setDailyInterviewCounts] = useState([]);
  const [isJobDashboard, setIsJobDashboard] = useState(true);
  const [interviewStartDate, setInterviewStartDate] = useState(yearAgo);
  const [interviewEndDate, setInterviewEndDate] = useState(today);
  const [sankeyData, setSankeyData] = useState([]);
  
  useEffect(() => {
    retrieveDailyJobCounts();
    retrieveDailyInterviewCounts();
    retrieveSankeyData();
  }, []);

  async function retrieveDailyJobCounts() {
    const { data, error } = await supabase.rpc('user_daily_job_counts');
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

  async function retrieveDailyInterviewCounts() {
    const { data, error } = await supabase.rpc('user_daily_interview_counts');
    if (error) {
      alert(`Error: ${error["message"]}`);
    }
    const processedData = data.map((row) => {
      return (
        { date: row.interview_at, count: row.interview_count } 
      )
    })
    if (data.length !== 0) {
      const latestDate = getLatestDate(processedData);
      let lastDate = new Date(latestDate)
      lastDate.setFullYear(latestDate.getFullYear() - 1)
      if (interviewEndDate < latestDate) {
        setInterviewEndDate(latestDate);
        setInterviewStartDate(lastDate);
      }
      setDailyInterviewCounts(processedData);
    }
  }

  async function retrieveSankeyData() {
    const { data, error } = await supabase.rpc('sankey_data');
    if (error) {
      alert(`Error: ${error["message"]}`);
    }
    const processedData = parseSankeyData(data);
    setSankeyData(processedData);
  }

  return (
    <DashboardContext.Provider value={[isJobDashboard, setIsJobDashboard]}>
      <div className="w-full flex flex-col items-center">
        <div className="my-4 w-full grid grid-cols-4">
          <div className="col-span-1 flex flex-col items-center">
            <div className="sticky top-[150px] flex justify-center">
              <DashSidebar />
            </div>
          </div>
          <div className="col-span-3 flex flex-col items-center">
            <h1 className="text-orange-400 text-4xl">
              User Dashboard
            </h1>
            {isJobDashboard ? (
              <div className="my-4 flex flex-col w-full items-center">
                <h1 className="text-amber-300 font-bold">
                Dates of Jobs Applied:
                </h1>
                <Calender
                  data={dailyJobCounts}
                  startDate={yearAgo}
                  endDate={today}
                  purpose="job"
                />
              </div>
            ) : (
              <div className="my-4 flex flex-col w-full items-center">
                <h1 className="text-amber-300 font-bold">
                Dates of Interviews:
                </h1>
                <Calender
                  data={dailyInterviewCounts}
                  startDate={interviewStartDate}
                  endDate={interviewEndDate}
                  purpose="interview"
                />
              </div>
            )}
            <div className="my-4 flex flex-col w-full items-center">
              <h1 className="text-amber-300 font-bold">
                Job Application Responses:
              </h1>
              <SankeyComponent data={sankeyData} />
            </div>
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout name="Dashboard Page">
      {page}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  }

  return { props: { user } };
};
import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import getMaxCount from '../utils/getMaxCount';
import ReactTooltip from 'react-tooltip';

export default function Dashboard({ user }) {
  const [dailyJobCounts, setDailyJobCounts] = useState([]);
  const [maxCount, setMaxCount] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    retrieveDailyJobCounts();
    document.querySelectorAll('rect').forEach((ele) => ele.setAttribute('rx', 15));
  }, []);

  async function retrieveDailyJobCounts() {
    const { data, error } = await supabase.rpc('user_daily_job_counts');
    if (error) {
      alert(`Error: ${error["message"]}`);
    }
    const processedData = data.map((row) => {
      return (
        { date: row.applied_at, count: row.job_count } 
      )
    })
    setDailyJobCounts(processedData);

    const retrievedMax = getMaxCount(data, 'job_count');
    setMaxCount(retrievedMax > 0 ? retrievedMax : 1);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="my-4">
        <h1>Title</h1>
      </div>
      <div className="my-4 flex flex-col w-full items-center">
        <h1>Jobs Applied:</h1>
        <div className="my-2 w-2/3 h-1/2">
          <ReactCalendarHeatmap
            startDate={new Date().setFullYear(new Date().getFullYear() - 1)}
            endDate={new Date()}
            showMonthLabels={true}
            values={dailyJobCounts}
            gutterSize={5}
            classForValue={(value) => {
              if (value) {
                const depth = Math.ceil(4 * value.count/maxCount);
                switch (depth) {
                  case 4:
                    return 'fill-green-500 rounded-full';
                  case 3:
                    return 'fill-green-700 rounded-full';
                  case 2:
                    return 'fill-green-800 rounded-full';
                  case 1:
                    return 'fill-green-900 rounded-full';
                  default:
                    return 'fill-zinc-800 rounded-full';
                }
              }
              return 'fill-zinc-800 rounded-full';
            }}
            onMouseEnter={(e, v) => setIsMounted(true)}
            onMouseLeave={(e, v) => {
              setTimeout(() => setIsMounted(false), 4);
              setTimeout(() => setIsMounted(true), 5);
            }}
            tooltipDataAttrs={(value) => {
              if (value.date !== null) {
                const date = new Date(value.date);
                const count = value.count;
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return (
                  { 'data-tip': count > 1 ? (
                    `${count} jobs on ${date.toLocaleDateString(undefined, options)}` 
                  ) : (
                    `${count} job on ${date.toLocaleDateString(undefined, options)}`
                  )}
                );
              }
              return (
                { 'data-tip': "No jobs" }
              );
            }}
          />
          {isMounted && (
            <ReactTooltip
              backgroundColor="grey"
              globalEventOff='click'
            />
          )}
        </div>
      </div>
      <div className="my-4">
        Line Plot
      </div>
    </div>
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
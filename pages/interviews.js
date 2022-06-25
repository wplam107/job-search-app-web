import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from '../supabaseClient';
import Card from '../components/card';
import InputItem from '../components/cardItem';
import CardControls from '../components/cardControls';

export default function Interviews({ user }) {
  const userId = user.id;
  const [interviews, setInterviews] = useState([]);
  const [edittingInterview, setEdittingInterview] = useState("");

  useEffect(() => {
    retrieveInterviews();
  }, []);

  const retrieveInterviews = async () => {
    const { data, error } = await supabase.from("interviews").select("*");
    if (error) {
      alert(`Error: ${error["message"]}`);
    } else {
      setInterviews(data);
    }
  };

  const handleToggleEdit = (key, e) => {
    e.preventDefault();
    if (edittingInterview !== key) {
      setEdittingInterview(key);
    } else {
      setEdittingInterview("");
    }
  };

  const cols = [
    { name: "job_id", label: "Job ID", type: "text", required: true },
    { name: "interview_type", label: "Interview Type", type: "text", required: false },
    { name: "interview_at", label: "Interview Date", type: "date", required: true },
    { name: "response", label: "Company Response", type: "text", required: false },
    { name: "responded_at", label: "Response Date", type: "date", required: false }
  ];

  return (
    <div>
      <h1 className="text-4xl mb-4 text-amber-600">
        Add/Edit Interviews
      </h1>
      Interviews List
      <ul className="divide-y divide-zinc-700">
        {interviews.map((ele) => {
          const key = ele["id"].toString();
          return (
            <Card key={key}>
              <div className="grid grid-cols-3">
                {cols.map((col) => {
                  return (
                    <InputItem
                      key={`${key}-${col.name}`}
                      itemType={edittingInterview !== key ? "value" : "input"}
                      type={col.type}
                      name={col.name}
                      label={col.label}
                      value={ele[col.name]}
                      size={60}
                      isRequired={col.required}
                    />
                  );
                })}
                <CardControls key={`${key}-controls`} label="Edit Interview:">
                  <button onClick={(e) => handleToggleEdit(key, e)}>
                    {edittingInterview !== key ? "Edit" : "Close"}
                  </button>
                </CardControls>
              </div>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

Interviews.getLayout = function getLayout(page) {
  return (
    <Layout>
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
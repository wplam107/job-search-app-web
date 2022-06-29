import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import Card from '../components/Card';
import { interviewCols } from '../components/dataColumns';
import { deleteInterview, updateInterview } from '../components/supabaseOperations';
import parseFormValues from '../utils/parseFormValues';

export default function Interviews({ user }) {
  const userId = user.id;
  const [interviews, setInterviews] = useState([]);
  const [edittingInterview, setEdittingInterview] = useState("");

  useEffect(() => {
    retrieveInterviews();
  }, []);

  const retrieveInterviews = async () => {
    const { error, data } = await supabase.rpc("user_interviews");
    if (error) {
      alert(`Error: ${error["message"]}`);
    } else {
      setInterviews(data);
    }
  };

  const handleToggleEdit = (e, key) => {
    e.preventDefault();
    if (edittingInterview !== key) {
      setEdittingInterview(key);
    } else {
      setEdittingInterview("");
    }
  };

  const handleSubmit = async (e, interviewId) => {
    e.preventDefault();
    const values = parseFormValues(e.target);

    await updateInterview(supabase, values, interviewId);
    setEdittingInterview("");
    retrieveInterviews();
  };

  const handleDelete = async (e, ele) => {
    e.preventDefault();

    const result = confirm(`Warning: Delete Interview?`);
    if (result === true) {
      await deleteInterview(supabase, ele["id"]);
      setEdittingInterview("");
      retrieveInterviews();
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("interviews").select("*");
    if (error) {
      alert("Error: " + error["message"]);
    } else {
      const fileName = 'interviews.json';
      const fileToSave = new Blob([JSON.stringify(data, undefined, 2)], {
        type: 'application/json'
      });
      saveAs(fileToSave, fileName);
    }
  };

  return (
    <div className="grid grid-cols-4 my-4 w-full">
      
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
    return { props: {}, redirect: { destination: '/signin' } };
  }

  return { props: { user } };
};
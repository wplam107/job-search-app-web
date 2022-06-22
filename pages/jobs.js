import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from '../supabaseClient';
import JobForm from '../components/jobForm';
import JobsList from '../components/jobsList';
import { plusCirclePath, xCirclePath } from '../components/icons';

export default function Jobs({ user }) {
  const [newForm, setNewForm] = useState(false);

  useEffect(() => {
  }, [newForm]);

  const NewFormButton = () => {
    return (
      <svg 
        viewBox="0 0 16 16"
        className="fill-zinc-400 w-6 h-6 hover:fill-orange-400 cursor-pointer"
        onClick={handleClickNewForm}
      >
        <path d={newForm ? xCirclePath : plusCirclePath} />
      </svg>
    );
  };

  const handleClickNewForm = () => {
    setNewForm(newForm ? false : true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-xl my-2 text-amber-600">Jobs Page</h1>
      <NewFormButton />
      {newForm && <JobForm setNewForm={setNewForm} />}
      <JobsList newForm={newForm} />
    </div>
  );
};

Jobs.getLayout = function getLayout(page) {
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
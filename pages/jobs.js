import Layout from '../components/layout';
import { supabase } from '../supabaseClient';
import JobForm from '../components/jobForm';

export default function Jobs({ user }) {

  return (
    <div>
      <JobForm />
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
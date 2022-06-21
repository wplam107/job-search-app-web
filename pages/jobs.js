import Layout from '../components/layout';
import { supabase } from '../supabaseClient';

export default function Jobs({ user }) {

  return (
    <div>
      Jobs
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
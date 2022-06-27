import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';

export default function Dashboard({ user }) {
  return (
    <div>
      Dashboard Object
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
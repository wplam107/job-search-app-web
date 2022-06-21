import Layout from '../components/layout';
import { supabase } from '../supabaseClient';

export default function Dashboard({ user }) {
  return (
    <div>
      Dashboard
    </div>
  );
};

Dashboard.getLayout = function getLayout(page) {
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
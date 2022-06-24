import Layout from '../components/layout';
import { supabase } from '../supabaseClient';

export default function Interviews({ user }) {
  return (
    <div>
      Interviews List
    </div>
  );
};

Interviews.getLayout = function getLayout(page) {
  return (
    <Layout name="Interviews Page">
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
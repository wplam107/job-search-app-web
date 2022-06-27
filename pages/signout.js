import { useRouter } from 'next/router';
import { supabase } from './api/supabaseClient';
import Layout from '../components/layout';

export default function SignOut({ user }) {
  const router = useRouter();

  const handleClick= async () => {
    const { error, data } = await supabase.auth.signOut();
    if (error) {
      console.log({ error });
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col w-64 items-center">
      <button onClick={handleClick} className="rounded bg-indigo-500 my-2 text-zinc-200 hover:text-orange-400">
        Sign Out
      </button>
    </div>
  );
};

SignOut.getLayout = function getLayout(page) {
  return (
    <Layout name="Sign Out Page">
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
import { useState } from 'react';
import { supabase } from './api/supabaseClient';
import Layout from '../components/layout';

export default function SignIn({ user }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const signIn = async () => {
    const { error, data } = await supabase.auth.signIn({
      email
    });

    if (error) {
      alert(error["message"]);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div>
        Please Check Your Email to Sign In
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-around items-center h-32 text-zinc-200">
      <div className="flex flex-col text-zinc-200">
        <input
          placeholder="Enter Email..."
          type="email"
          onChange={(e) => { setEmail(e.target.value) }}
          className="bg-zinc-200 text-black w-64"
        />
        <button onClick={() => { signIn() }} className="rounded bg-indigo-500 my-2 hover:text-orange-400">
          Sign In/Up with Magic Link
        </button>
      </div>
    </div>
  );
};

SignIn.getLayout = function getLayout(page) {
  return (
    <Layout name="Sign In Page">
      {page}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: { user }, redirect: { destination: "/signout" } };
  }

  return { props: {} };
};
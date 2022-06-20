import { useState } from 'react';
import { supabase } from '../supabaseClient';
import Layout from '../components/layout';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const signIn = async () => {
    const { error, data } = await supabase.auth.signIn({
      email
    });

    if (error) {
      console.log({ error });
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
    <div>
      <div className="text-lg">
        Sign In/Up
      </div>
      <input
        placeholder="Enter Email..."
        onChange={(e) => { setEmail(e.target.value) }}
      />
      <button onClick={() => { signIn() }}>
        Sign In/Up
      </button>
    </div>
  );
};

SignIn.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
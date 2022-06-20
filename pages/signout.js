import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../supabaseClient';
import Layout from '../components/layout';

export default function SignOut() {
  const [signedOut, setSignedOut] = useState(false);

  const handleClick= async () => {
    const { error, data } = await supabase.auth.signOut();
    if (error) {
      console.log({ error });
    } else {
      setSignedOut(true);
    }
  };
  if (signedOut) {
    const router = useRouter();
    router.push("/");
  };

  return (
    <div>
      <div className="text-lg">
        Sign Out
      </div>
      <button onClick={handleClick}>Sign Out</button>
    </div>
  );
};

SignOut.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};
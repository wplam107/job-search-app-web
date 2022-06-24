import { useState, useEffect } from 'react';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/header';
import { supabase } from '../supabaseClient';

export default function MyApp({ Component, pageProps }) {
  const [authState, setAuthState] = useState("not-auth");
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session);
      if (event === "SIGNED_IN") {
        setAuthState("auth");
      }
      if (event === "SIGNED_OUT") {
        setAuthState("not-auth");
      }
    });
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const user = supabase.auth.user();
    if (user) {
      setAuthState("auth");
    }
  }

  async function handleAuthChange(event, session) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session })
    });
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <div>
      <Head>
        <title>Job Search Web App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header authState={authState} />
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
};
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ActiveLink({ children, href, name }) {
  const [className, setClassName] = useState('hover:text-orange-400');
  const router = useRouter();

  useEffect(() => {
    let token = '';
    if (localStorage.getItem("supabase.auth.token") !== null || localStorage.getItem("supabase.auth.token") !== undefined) {
      const cookie = JSON.parse(localStorage.getItem("supabase.auth.token"));
      const currentSession = cookie["currentSession"];
      try {
        token = currentSession["access_token"];
      } catch {
        token = '';
      }
    }

    if (router.asPath === href) {
      setClassName('text-orange-400');
    } else if (name === 'home' && router.asPath === `/#${token}`) {
      setClassName('text-orange-400');
    } else {
      setClassName('hover:text-orange-400');
    }
  }, [router.asPath]);

  function handleClick(e) {
    e.preventDefault();
    router.push(href);
  };

  return (
    <button onClick={handleClick}>
      <a href={href} className={className}>
        {children}
      </a>
    </button>
  );
};

export default ActiveLink;
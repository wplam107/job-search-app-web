import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ActiveLink({ children, href, name }) {
  const [className, setClassName] = useState('hover:text-orange-400');
  const router = useRouter();

  useEffect(() => {
    console.log(router.asPath);
    console.log(href);
    if (router.asPath === href) {
      setClassName('text-orange-400');
    } else if (name === 'home' && router.asPath === '/#') {
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
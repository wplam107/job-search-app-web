import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function ActiveLink({ children, href, name }) {
  const [className, setClassName] = useState("hover:text-orange-400");
  const router = useRouter();

  useEffect(() => {
    if (router.asPath === href || (name === "home" && router.asPath === "/#")) {
      setClassName("text-orange-400");
    } else {
      setClassName("hover:text-orange-400");
    }
  }, [router.asPath]);

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default ActiveLink;
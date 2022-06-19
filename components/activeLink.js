import { useRouter } from 'next/router';

function ActiveLink({ children, href }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  };

  const defaultStyle = "hover:text-orange-400";
  const activeStyle = "text-orange-400";

  return (
    <a href={href} onClick={handleClick} className={router.asPath === href ? activeStyle : defaultStyle}>
      {children}
    </a>
  );
};

export default ActiveLink;
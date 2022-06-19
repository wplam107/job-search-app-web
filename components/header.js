import ActiveLink from './activeLink';
import NavBar from './navBar';
import { logoPath } from './constants';

export default function Header() {
  return (
    <div className="sticky top-0">
      <div className="flex flex-row justify-between px-4 py-4 border-b border-zinc-700">
        <div className="text-indigo-400">
          <span>Job Search App and Dashboard</span>
        </div>
        <HeaderRight />
      </div>
    </div>
  );
};

const HeaderRight = () => {
  return (
    <div className="flex flex-row">
      <div className="pr-2 border-r border-zinc-700">
        <NavBar />
      </div>
      <div className="px-2 border-r border-zinc-700">
        <ActiveLink href="/signin">
          <span>Sign In</span>
        </ActiveLink>
      </div>
      <div className="pl-2">
        <a href="https://github.com/wplam107/job-search-app-web" target="_blank" referrerPolicy="noreferrer">
          <svg viewBox="0 0 16 16" className="fill-zinc-300 w-6 h-6 hover:fill-orange-400">
            <path d={logoPath} />
          </svg>
        </a>
      </div>
    </div>
  );
};
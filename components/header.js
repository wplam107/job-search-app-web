import ActiveLink from './activeLink';
import NavBar from './navBar';
import { logoPath } from './icons';

export default function Header({ authState }) {
  return (
    <div className="sticky top-0 bg-zinc-900/75 backdrop-blur-sm z-40">
      <div className="flex flex-row justify-between px-8 py-4 border-b border-zinc-700 font-bold">
        <div className="text-sky-400">
          <span>Job Search App and Dashboard</span>
        </div>
        <HeaderRight authState={authState}/>
      </div>
    </div>
  );
};

const HeaderRight = ({ authState }) => {
  return (
    <div className="flex flex-row">
      <div className="pr-2 border-r border-zinc-700">
        <NavBar authState={authState} />
      </div>
      <div className="px-2 border-r border-zinc-700">
        {authState === "auth" ? <SignOut /> : <SignIn />}
      </div>
      <a className="pl-2" aria-label="Project on GitHub" href="https://github.com/wplam107/job-search-app-web" target="_blank" referrerPolicy="noreferrer">
        <svg viewBox="0 0 16 16" className="fill-zinc-400 w-6 h-6 hover:fill-amber-400">
          <path d={logoPath} />
        </svg>
      </a>
    </div>
  );
};

const SignIn = () => {
  return (
    <ActiveLink href="/signin">
      <span>Sign In/Up</span>
    </ActiveLink>
  );
};

const SignOut = () => {
  return (
    <ActiveLink href="/signout">
      <span>Sign Out</span>
    </ActiveLink>
  );
};
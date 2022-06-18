import NavBar from './navBar';

export default function Header() {
  return (
    <div className="sticky top-0">
      <div className="flex flex-row justify-between px-4 py-4 border-b border-gray-400">
        <div>
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
      <div className="pr-2 border-r border-gray-400">
        <NavBar />
      </div>
      <div className="px-2 border-r border-gray-400">
        Sign In
      </div>
      <div className="pl-2">
        GitHub
      </div>
    </div>
  );
};
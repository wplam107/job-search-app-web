import ActiveLink from './activeLink';

export default function NavBar({ authState }) {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li key="home">
          <ActiveLink href="/" name="home">
            <span>
              Home
            </span>
          </ActiveLink>
        </li>
        <li key="jobs">
          {authState === "auth" ? (
            <ActiveLink href="/jobs">
              <span>
                Jobs
              </span>
            </ActiveLink>) : (
            <span className="text-zinc-600">
              Jobs
            </span>
          )}
        </li>
        <li key="dashboard">
          {authState === "auth" ? (
            <ActiveLink href="/dashboard">
              <span>
                Dashboard
              </span>
            </ActiveLink>) : (
            <span className="text-zinc-600">
              Dashboard
            </span>
          )}
        </li>
        <li key="about">
          <ActiveLink href="/about">
            <span>
              About
            </span>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};
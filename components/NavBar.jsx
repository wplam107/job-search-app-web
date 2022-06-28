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
            <ActiveLink href="/jobs" name="jobs">
              <span>
                Jobs
              </span>
            </ActiveLink>) : (
            <span className="text-zinc-600">
              Jobs
            </span>
          )}
        </li>
        <li key="interviews">
          {authState === "auth" ? (
            <ActiveLink href="/interviews" name="interviews">
              <span>
                Interviews
              </span>
            </ActiveLink>) : (
            <span className="text-zinc-600">
              Interviews
            </span>
          )}
        </li>
        <li key="dashboard">
          {authState === "auth" ? (
            <ActiveLink href="/dashboard" name="dashboard">
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
          <ActiveLink href="/about" name="about">
            <span>
              About
            </span>
          </ActiveLink>
        </li>
      </ul>
    </nav>
  );
};
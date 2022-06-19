import ActiveLink from './activeLink';

export default function NavBar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li key="home">
          <ActiveLink href="/">
            <span>
              Home
            </span>
          </ActiveLink>
        </li>
        <li key="jobs">
          <ActiveLink href="/jobs">
            <span>
              Jobs
            </span>
          </ActiveLink>
        </li>
        <li key="dashboard">
          <ActiveLink href="/dashboard">
            <span>
              Dashboard
            </span>
          </ActiveLink>
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
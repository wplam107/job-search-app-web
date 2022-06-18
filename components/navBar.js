import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li key="home">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li key="jobs">
          <Link href="/jobs">
            <a>Jobs</a>
          </Link>
        </li>
        <li key="dashboard">
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li key="about">
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
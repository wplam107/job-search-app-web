export default function Card({ children }) {
  return (
    <li className="p-4">
      <form>
        <ul>
          {children}
        </ul>
      </form>
    </li>
  );
};


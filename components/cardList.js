export default function CardList({ title, children }) {
  return (
    <ul className="divide-y divide-zinc-700 my-4 w-full">
      {children}
    </ul>
  );
};
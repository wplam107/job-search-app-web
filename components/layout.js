export default function Layout(props) {
  return (
    <div className="px-8">
      <main className="min-h-screen py-8 flex flex-col items-center">
        {props.children}
      </main>
    </div>
  );
};
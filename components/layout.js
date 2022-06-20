export default function Layout(props) {
  return (
    <div className="px-8">
      <main className="min-h-screen py-8 flex flex-col justify-center items-center">
        {props.children}
      </main>
    </div>
  );
};
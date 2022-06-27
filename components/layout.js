export default function Layout(props) {
  return (
    <div className="px-8">
      <main className="min-h-screen px-8 py-4 w-full flex flex-col items-center">
        {props.children}
      </main>
      <footer className="flex flex-1 py-4 border-t border-zinc-700 justify-center items-center">
        <div>
          Footer
        </div>
      </footer>
    </div>
  );
};
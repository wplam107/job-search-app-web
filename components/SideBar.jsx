import FormModal from "./FormModal";

export default function SideBar({ children, handleDownload, handleSubmit, dataColumns }) {
  return (
    <div className="sticky top-[120px] flex flex-col items-center">
      <h1 className="text-2xl mb-4 text-amber-600">
        Operations
      </h1>
      <button
        onClick={handleDownload}
        className="rounded-md bg-purple-600 mx-2 px-2 text-white hover:bg-purple-400"
      >
        Download Jobs
      </button>
      <div className="mt-4">
        <FormModal
          buttonStyle="rounded-md bg-sky-600 mx-2 px-2 text-white hover:bg-sky-400"
          dataColumns={dataColumns}
          purpose="Add New Job"
          handleSubmit={handleSubmit}
        />
      </div>
      <h1 className="text-2xl my-4 text-amber-600">
        Filters
      </h1>
      {children}
    </div>
  );
}
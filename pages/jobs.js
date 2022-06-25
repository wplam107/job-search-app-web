import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from '../supabaseClient';
import JobForm from '../components/jobForm';
import JobsList from '../components/jobsList';
import SideBar from '../components/sideBar';
import { plusCirclePath, xCirclePath } from '../components/icons';

// export default function Jobs({ user }) {
//   const [newForm, setNewForm] = useState(false);

//   useEffect(() => {
//   }, [newForm]);

//   const NewFormButton = () => {
//     return (
//       <button onClick={handleClickNewForm} aria-label={newForm ? "Close New Job Form" : "Open New Job Form"}>
//         <svg 
//           viewBox="0 0 16 16"
//           className="fill-zinc-400 w-6 h-6 hover:fill-orange-400 cursor-pointer"
//         >
//           <path d={newForm ? xCirclePath : plusCirclePath} />
//         </svg>
//       </button>
//     );
//   };

//   const handleClickNewForm = () => {
//     setNewForm(newForm ? false : true);
//   };

//   return (
//     <div className="grid grid-cols-4">
//       <SideBar />
//       <div className="col-span-3 flex flex-col items-center ml-8">
//         <h1 className="text-4xl mb-4 text-amber-600">
//           Add/Edit Job Applications
//         </h1>
//         <NewFormButton />
//         {newForm && <JobForm setNewForm={setNewForm} />}
//         <JobsList newForm={newForm} />
//       </div>
//     </div>
//   );
// };

export default function Jobs({ user }) {
  const userId = user.id;
  return (
    <div>

    </div>
  );
}

Jobs.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return { props: {}, redirect: { destination: "/signin" } };
  }
  console.log(user);
  return { props: { user } };
};
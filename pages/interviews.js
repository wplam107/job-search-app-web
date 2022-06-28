import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { supabase } from './api/supabaseClient';
import Card from '../components/card';
import { interviewCols as cols } from '../components/dataColumns';
import { deleteInterview, updateInterview } from '../components/supabaseOperations';
import { ControlButton, ToggleNewFormButton } from '../components/buttons';
import parseFormValues from '../utils/parseFormValues';
import CardList from '../components/cardList';

export default function Interviews({ user }) {
  const userId = user.id;
  const [interviews, setInterviews] = useState([]);
  const [edittingInterview, setEdittingInterview] = useState("");

  useEffect(() => {
    retrieveInterviews();
  }, []);

  const retrieveInterviews = async () => {
    const { error, data } = await supabase.rpc("user_interviews");
    if (error) {
      alert(`Error: ${error["message"]}`);
    } else {
      setInterviews(data);
    }
  };

  const handleToggleEdit = (e, key) => {
    e.preventDefault();
    if (edittingInterview !== key) {
      setEdittingInterview(key);
    } else {
      setEdittingInterview("");
    }
  };

  const handleSubmit = async (e, interviewId) => {
    e.preventDefault();
    const values = parseFormValues(e.target);

    await updateInterview(supabase, values, interviewId);
    setEdittingInterview("");
    retrieveInterviews();
  };

  const handleDelete = async (e, ele) => {
    e.preventDefault();

    const result = confirm(`Warning: Delete Interview?`);
    if (result === true) {
      await deleteInterview(supabase, ele["id"]);
      setEdittingInterview("");
      retrieveInterviews();
    }
  };

  const handleDownload = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("interviews").select("*");
    if (error) {
      alert("Error: " + error["message"]);
    } else {
      const fileName = "interviews.json";
      const fileToSave = new Blob([JSON.stringify(data, undefined, 2)], {
        type: "application/json"
      });
      saveAs(fileToSave, fileName);
    }
  };

  return (
    <div className="grid grid-cols-4 my-4 w-full">
      <div className="col-span-1 flex flex-col items-center">
        Side Bar
      </div>
      <div className="col-span-3 flex flex-col items-center">
        <h1 className="text-4xl mb-4 text-amber-600">
          Edit Interviews
        </h1>
        <button onClick={handleDownload} className="rounded-full bg-orange-400 hover:bg-orange-200 px-2 m-2 text-black">
          Download Interviews
        </button>
        <CardList>
          {interviews.map((ele) => {
            const key = ele["id"].toString();
            return (
              <Card
                key={key}
                cardKey={key}
                element={ele}
                cols={cols}
                itemType={edittingInterview !== key ? "value" : "input"}
                handleSubmit={(e) => handleSubmit(e, key)}
              >
                <ControlButton onClick={(e) => handleToggleEdit(e, key)}>
                  {edittingInterview !== key ? "Edit" : "Close"}
                </ControlButton>
                {edittingInterview === key
                  ? <ControlButton type="submit">
                      Update
                    </ControlButton>
                  : null
                }
                {edittingInterview === key
                  ? <ControlButton onClick={(e) => handleDelete(e, ele)}>
                      Delete
                    </ControlButton>
                  : null
                }
              </Card>
            );
          })}
        </CardList>
      </div>
    </div>
  );
};

Interviews.getLayout = function getLayout(page) {
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

  return { props: { user } };
};
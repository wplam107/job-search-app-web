export const addJob = async (supabase, values) => {
  const { data, error } = await supabase
    .from("jobs")
    .insert(values);
  if (error) {
    alert("Error: " + error["message"]);
  }
};

export const updateJob = async (supabase, values, jobId) => {
  const { data, error } = await supabase
    .from("jobs")
    .update(values)
    .match({ id: jobId });
  if (error) {
    alert("Error: " + error["message"]);
  }
};

export const deleteJob = async (supabase, jobId) => {
  const { error, data } = await supabase
    .from("jobs")
    .delete()
    .match({ id: jobId });
  if (error) {
    alert("Error: " + error["message"]);
  }
};

export const updateInterview = async (supabase, values, interviewId) => {
  const newValues = {
    interview_type: values["interview_type"],
    interview_at: values["interview_at"],
    responded_at: values["responded_at"],
    response: values["response"]
  }
  const { error, data } = await supabase
    .from("interviews")
    .update(newValues)
    .match({ id: interviewId });
  if (error) {
    alert("Error: " + error["message"]);
  }
};

export const deleteInterview = async (supabase, interviewId) => {
  const { error, data } = await supabase
    .from("interviews")
    .delete()
    .match({ id: interviewId});
  if (error) {
    alert("Error: " + error["message"]);
  }
};
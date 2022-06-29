export const interviewCols = [
  { name: "company", label: "Company", type: "text", isTitle: true, noEdit: true, required: true },
  { name: "job_title", label: "Job Title", type: "text", isTitle: true, noEdit: true, required: true },
  { name: "applied_at", label: "Date Applied", type: "date", isTitle: true, noEdit: true, required: true },
  { name: "interview_type", label: "Interview Type", type: "text", required: false },
  { name: "interview_at", label: "Interview Date", type: "date", required: true },
  { name: "response", label: "Company Response", type: "text", required: false },
  { name: "responded_at", label: "Response Date", type: "date", required: false },
];

export const jobCols = [
  { name: "company", label: "Company", type: "text", required: true, isTitle: true },
  { name: "job_title", label: "Job Title", type: "text", required: true, isTitle: true },
  { name: "applied_at", label: "Date Applied", type: "date", required: true, isTitle: true },
  { name: "years_experience", label: "Years Exp.", type: "number", required: false },
  { name: "posted_at", label: "Date of Job Post", type: "date", required: false },
  { name: "site_posted", label: "Job Board/Site", type: "text", required: false },
  { name: "response", label: "Company Response", type: "text", required: false },
  { name: "responded_at", label: "Response Date", type: "date", required: false },
];
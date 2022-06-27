export default function parseFormValues(formData) {
  const formValues = new FormData(formData);
  const values = Object.fromEntries(formValues);

  for (const key in values) {
    if (key === "years_experience") {
      values[key] = values[key] === "" ? null : Number(values[key]);
    }
    values[key] = values[key] === "" ? null : values[key];
  }

  return values;
}
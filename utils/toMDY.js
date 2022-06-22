export default function toMDY(dateString) {
  if (dateString === null) {
    return "";
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  console.log(dateString);
  return `${month}/${day}/${year}`;
};
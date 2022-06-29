export default function nowToYYYYMMDD() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  const day = now.getDate();

  if (month - 10 < 0) {
    month = `0${month}`;
  }

  return `${year}-${month}-${day}`;
}
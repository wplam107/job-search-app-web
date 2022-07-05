export default function getLatestDate(data) {
  const length = data.length;
  let max = new Date(data[0].date);
  for (let i = 1; i < length; i++) {
    const curdate = new Date(data[i].date)
    if (curdate > max) max = curdate;
  }
  return max;
}
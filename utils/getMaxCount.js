export default function getMaxCount(data, countColumn) {
  const length = data.length;
  let max = 1;
  for (let i = 0; i < length; i++) {
    if (data[i][countColumn] > max) max = data[i][countColumn];
  }
  return max;
}
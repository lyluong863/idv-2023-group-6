export function calculateTrendLine(known_y, known_x) {
  const data = known_y.map((y, i) => [known_x[i], y]);
  let n = 0;
  const results = [];
  const sum = [0, 0, 0, 0, 0];

  for (; n < data.length; n++) {
    if (data[n][1] != null) {
      sum[0] += data[n][0];
      sum[1] += data[n][1];
      sum[2] += data[n][0] * data[n][0];
      sum[3] += data[n][0] * data[n][1];
      sum[4] += data[n][1] * data[n][1];
    }
  }

  const gradient =
    (n * sum[3] - sum[0] * sum[1]) / (n * sum[2] - sum[0] * sum[0]);
  const intercept = sum[1] / n - (gradient * sum[0]) / n;
  for (let i = 0, len = data.length; i < len; i++) {
    const trendY = data[i][0] * gradient + intercept;
    results.push(trendY);
  }

  return results;
}

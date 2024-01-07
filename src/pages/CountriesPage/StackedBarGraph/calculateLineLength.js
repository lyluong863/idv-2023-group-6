export function calculateLineLength(
  position,
  enoughDistance,
  startPos,
  distanceLevel
) {
  const n = position.length;
  const distance = [
    0,
    ...position.slice(1).map((value, index) => value - position[index]),
  ];
  const spaceLevel = Array(n).fill(0);

  // Calculate distance between each line based on position, then find if the distance is too close and make adjustment
  for (let k = 0; k < n; k++) {
    if (spaceLevel[k] === 0) {
      const distanceCumsum = distance.slice(k + 1, Math.min(n, k + 6)).reduce(
        (acc, val) => {
          acc.push(acc[acc.length - 1] + val);
          return acc;
        },
        [0]
      );

      const needAdjust = distanceCumsum.reduce(
        (result, val, i) => (val < enoughDistance ? [...result, i] : result),
        []
      );

      if (needAdjust.filter((item) => item > 0).length) {
        for (const i of needAdjust) {
          spaceLevel[k + i] = i;
        }
      }
    }
  }
  const mapLevelToY = {
    0: startPos + distanceLevel / 4,
    1: startPos + distanceLevel * 1.3,
    2: startPos + distanceLevel * 2.7,
    3: startPos + distanceLevel * 3.7,
    4: startPos + distanceLevel * 4.7,
    5: startPos + distanceLevel * 5.7,
  }
  return spaceLevel.map((value) => mapLevelToY[value]);
}

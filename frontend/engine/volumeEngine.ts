export function calculateVolumeRatio(
  volumes: number[],
  period = 20
): number {

  if (volumes.length <= period) {
    return 1;
  }

  const current = volumes[volumes.length - 1];

  const average =
    volumes
      .slice(-period - 1, -1)
      .reduce((a, b) => a + b, 0) / period;

  return Number((current / average).toFixed(2));
}
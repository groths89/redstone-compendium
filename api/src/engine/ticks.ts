interface TimingInfo {
  redstoneTicks: number;
  gameTicks: number;
  latencyMs: number;
}

function calculateTiming(redstoneTicks: number): TimingInfo {
  const gameTicks = redstoneTicks * 2;
  const latencyMs = gameTicks * 100;

  return {
    redstoneTicks,
    gameTicks,
    latencyMs,
  };
}

export { calculateTiming, TimingInfo };
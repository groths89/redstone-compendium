export type Signal = 0 | 1;

export interface GateResult {
  output: Signal;
  outputs: Record <string, Signal>;
  state: 'SET' | 'RESET' | 'HOLD' | 'INVALID';
}

function evaluateAnd(a: number, b: number): Signal {
  if (a === 1 && b === 1) {
    return 1;
  } else {
    return 0;
  }
}

function evaluateOr(a: number, b: number): Signal {
  if (a === 1 || b === 1) {
    return 1;
  } else {
    return 0;
  }
}

function evaluateXor(a: number, b: number): Signal {
  if (a !== b) {
    return 1;
  } else {
    return 0;
  }
}

function evaluateRsNorLatch(s: number, r: number, prevQ: Signal = 0): GateResult {
  // s = set, r = reset, prevQ = previous output
  // 1. Invalid State: Both inputs ON -> Both outputs OFF (0, 0)
  if (s === 1 && r === 1) {
    return {
      output: 0,
      outputs: { q: 0, qBar: 0 },
      state: 'INVALID',
    };
  }

  // 2. Set State: S=1, R=0 -> Q=1, qBar=0
  if (s === 1 && r === 0) {
    return {
      output: 1,
      outputs: { q: 1, qBar: 0 },
      state: 'SET',
    };
  }

  // 3. Reset State: S=0, R=1 -> Q=0, qBar=1
  if (s === 0 && r === 1) {
    return {
      output: 0,
      outputs: { q: 0, qBar: 1 },
      state: 'RESET',
    };
  }

  // 4. Hold State: S=0, R=0 -> Retain prevQ
  const qBar = prevQ === 1 ? 0 : 1;
  return {
    output: prevQ,
    outputs: { q: prevQ, qBar },
    state: 'HOLD',
  };
}

export { evaluateAnd, evaluateOr, evaluateXor, evaluateRsNorLatch };
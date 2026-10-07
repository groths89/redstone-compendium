export type Signal = 0 | 1;

export interface GateResult {
  output: Signal;
  outputs?: Record<string, Signal>;
  state?: 'SET' | 'RESET' | 'HOLD' | 'INVALID';
}

export interface TimingInfo {
  redstoneTicks: number;
  gameTicks: number;
  latencyMs: number;
}

export type SimulateRequest =
  | {
      componentId: 'and-gate' | 'xor-gate';
      inputs: { a: Signal; b: Signal };
      prevInputs?: never;
    }
  | {
      componentId: 'rs-nor-latch';
      inputs: { s: Signal; r: Signal };
      prevInputs?: { q: Signal };
    };

export interface SimulateResponse {
  status: 'success' | 'fail' | 'error';
  data?: {
    componentId: string;
    evaluation: Signal | GateResult;
    timing: TimingInfo;
  };
  message?: string;
}

const API_BASE_URL = import.meta.env.PUBLIC_REDSTONE_API_URL || 'http://localhost:4000';

export async function simulateComponent(payload: SimulateRequest): Promise<SimulateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/components/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to call simulate endpoint: ', error);
    return {
      status: 'error',
      message: (error as Error).message,
    };
  }
}
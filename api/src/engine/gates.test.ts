import { describe, it, expect } from 'vitest';
import { evaluateAnd, evaluateOr, evaluateXor, evaluateRsNorLatch, Signal } from './gates';

describe('Logic Gates', () => {
  it('should evaluate AND gate correctly', () => {
    expect(evaluateAnd(1 as Signal, 1 as Signal)).toBe(1);
    expect(evaluateAnd(1 as Signal, 0 as Signal)).toBe(0);
    expect(evaluateAnd(0 as Signal, 0 as Signal)).toBe(0);
  });

  it('should evaluate XOR gate correctly', () => {
    expect(evaluateXor(1 as Signal, 1 as Signal)).toBe(0);
    expect(evaluateXor(1 as Signal, 0 as Signal)).toBe(1);
    expect(evaluateXor(0 as Signal, 0 as Signal)).toBe(0);
  });
});

describe('RS-NOR Latch', () => {
  it('should evaluate RS NOR latch HOLD state (0, 0) defaulting prevQ to 0', () => {
    expect(evaluateRsNorLatch(0, 0)).toEqual({
      output: 0,
      outputs: { q: 0, qBar: 1 },
      state: 'HOLD',
    });
  });

  it('should evaluate RS NOR latch RESET state (0, 1)', () => {
    expect(evaluateRsNorLatch(0, 1)).toEqual({
      output: 0,
      outputs: { q: 0, qBar: 1 },
      state: 'RESET',
    });
  });

  it('should evaluate RS NOR latch SET state (1, 0)', () => {
    expect(evaluateRsNorLatch(1, 0)).toEqual({
      output: 1,
      outputs: { q: 1, qBar: 0 },
      state: 'SET',
    });
  });

  it('should evaluate RS NOR latch INVALID state (1, 1)', () => {
    expect(evaluateRsNorLatch(1, 1)).toEqual({
      output: 0,
      outputs: { q: 0, qBar: 0 },
      state: 'INVALID',
    });
  });
});
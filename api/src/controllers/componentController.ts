import { Request, Response, NextFunction } from 'express';
import { evaluateAnd, evaluateOr, evaluateXor, evaluateRsNorLatch, Signal } from '../engine/gates';
import { calculateTiming } from '../engine/ticks';

async function simulateComponent(req: Request, res: Response, next: NextFunction) {
  try {
    const { componentId, inputs, prevInputs } = req.body;

    if (!componentId) {
      res.status(400).json({ status: 'fail', message: 'componentId is required' });
      return;
    }

    let evaluationResult;
    let baseTicks = 1;

    switch (componentId) {
      case 'rs-nor-latch': {
        const s = (inputs?.s ?? 0) as Signal;
        const r = (inputs?.r ?? 0) as Signal;
        const prevQ = (prevInputs?.q ?? 0) as Signal;
        evaluationResult = evaluateRsNorLatch(s, r, prevQ);
        baseTicks = 1;
        break;
      }
      case 'and-gate': {
        const a = (inputs?.a ?? 0) as Signal;
        const b = (inputs?.b ?? 0) as Signal;
        evaluationResult = evaluateAnd(a, b);
        baseTicks = 2; // Torch inversion delay
        break;
      }
      case 'xor-gate': {
        const a = (inputs?.a ?? 0) as Signal;
        const b = (inputs?.b ?? 0) as Signal;
        evaluationResult = evaluateXor(a, b);
        baseTicks = 2;
        break;
      }
      default: {
        res.status(422).json({ status: 'fail', message: `Unknown componentId: ${componentId}` });
        return;
      }
    }

    const timing = calculateTiming(baseTicks);

    res.status(200).json({
      status: 'success',
      data: {
        componentId,
        evaluation: evaluationResult,
        timing,
      },
    });
  }
  catch (error) {
    next(error);
  }
}

export { simulateComponent };
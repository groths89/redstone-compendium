import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('Component Routes', () => {
  // Test 1 (Success Flow): Send a POST request with a valid body
  it('should send a POST request successfully for a valid component', async () => {
    const response = await request(app)
      .post('/api/v1/components/simulate')
      .send({
        componentId: 'rs-nor-latch',
        inputs: { s: 1, r: 0 },
      });

    // Assert HTTP Status is 200
    expect(response.status).toBe(200);

    // Assert res.body.status is 'success'
    expect(response.body.status).toBe('success');

    // Assert res.body.data.evaluation.state is 'SET'
    expect(response.body.data.evaluation.state).toBe('SET');

    // Assert res.body.data.timing.latencyMs is 200
    expect(response.body.data.timing.latencyMs).toBe(200);
  });

  // Test 2 (Bad Request): Send a POST request with an empty body {}.
  it('should not send a POST request with an empty body', async () => {
    const response = await request(app)
      .post('/api/v1/components/simulate')
      .send({});

    // Assert HTTP Status is 400
    expect(response.status).toBe(400);

    // Assert res.body.message includes 'componentId is required'
    expect(response.body.message).toContain('componentId is required');
  });

  // Test 3 (Unknown Component): Send { componentId: 'invalid-gate' }.
  it('should return 422 for an unknown component', async () => {
    const response = await request(app)
      .post('/api/v1/components/simulate')
      .send({ componentId: 'invalid-gate' });

    // Assert HTTP Status is 422
    expect(response.status).toBe(422);
  });
});
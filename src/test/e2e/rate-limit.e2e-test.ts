import request from 'supertest';
import { startServer, app } from '../../index';

describe('Rate Limit E2E Tests', () => {
  beforeAll(async () => {
    await startServer({
      port: 3001,
      maxRequestPerLimit: 5,
      rateLimitTimeWindow: '10 seconds',
    });

    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle API rate limit', async () => {
    const city = 'New York';
    const date = '2023-08-01';

    const requestPromises = [];

    for (let i = 0; i < 10; i++) {
      requestPromises.push(async () => {
        return request(app.server).get(`/weather?city=${city}&date=${date}`);
      });
    }

    const responses = [];
    for (const requestPromise of requestPromises) {
      const response = await requestPromise();
      responses.push(response);
    }

    expect(responses[5].status).toBe(429);
    expect(responses[5].body).toHaveProperty('error', 'Too Many Requests');
  });
});

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
    const date = '2023-09-01T12:00:00Z';

    const requests = [];

    for (let i = 0; i < 20; i++) {
      requests.push(request(app.server).get(`/weather?city=${city}&date=${date}`));
    }

    const responses = await Promise.all(requests);

    for (let i = 0; i < 5; i++) {
      expect(responses[i].status).toBe(200);
    }

    expect(responses[5].status).toBe(429);
    expect(responses[5].body).toHaveProperty('error', 'Too Many Requests');
  });
});

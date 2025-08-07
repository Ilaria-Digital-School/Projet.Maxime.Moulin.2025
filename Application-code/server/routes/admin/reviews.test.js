const request = require('supertest');
const app = require('../../server'); 

describe('POST /api/content/reviews', () => {
  fit('devrait rejeter une requête vide (401 ou 400)', async () => {
    const res = await request(app)
      .post('/api/content/reviews')
      .send({});
    
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});
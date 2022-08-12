import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create category controller', () => {
  it('should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category name supertest',
      description: 'Category description supertest',
    });

    expect(response.statusCode).toBe(201);
  });
});

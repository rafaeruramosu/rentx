import { hash } from 'bcryptjs';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { createConnection } from '@shared/infra/typeorm';

let connection: DataSource;

describe('Create category controller', () => {
  beforeAll(async () => {
    connection = await createConnection('localhost');
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at) 
     VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com', 'XXXXXX', true, 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com',
      password: 'admin',
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post('/categories')
      .send({
        name: 'Category name supertest',
        description: 'Category description supertest',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(201);
  });
});

import { createConnection } from '..';

import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidv4();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, password, email, driver_license, "isAdmin", created_at) 
     VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com', 'XXXXXX', true, 'now()')`,
  );

  await connection.destroy();
}

create().then(() => console.log('[SEED] user admin created'));

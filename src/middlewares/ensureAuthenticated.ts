import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing.');
  }

  // Bearer token123
  // [0] = Bearer
  // [1] = token123
  const [, token] = authHeader.split(' '); // antes da virgula seria a posicao 0 do array, porem nao precisamos dela entao se faz dessa forma

  try {
    const { sub: user_id } = verify(
      token,
      '830c993a7107e4ef4617d958dd666b49',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists.');
    }

    next();
  } catch {
    throw new Error('Invalid token.');
  }
}

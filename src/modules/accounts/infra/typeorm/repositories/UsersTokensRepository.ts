import { Repository } from 'typeorm';

import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { dataSource } from '@shared/infra/typeorm';

import { UsersTokens } from '../entities/UsersTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = dataSource.getRepository(UsersTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const userToken = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };

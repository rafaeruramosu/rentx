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

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens> {
    const userToken = await this.repository.findOneBy({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  async findByRefreshToken(refresh_token: string): Promise<UsersTokens> {
    const userToken = await this.repository.findOneBy({ refresh_token });

    return userToken;
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

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };

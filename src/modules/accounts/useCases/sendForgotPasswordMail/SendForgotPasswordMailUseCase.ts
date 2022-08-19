import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dayjsDateProvider: IDateProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = uuidv4();

    const token_expires_date = this.dayjsDateProvider.addHours(3);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date: token_expires_date,
    });
  }
}

export { SendForgotPasswordMailUseCase };
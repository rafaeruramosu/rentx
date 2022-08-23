import { instanceToInstance } from 'class-transformer';

import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';

class UserMap {
  // 'static' serve para conseguirmos usar o método sem precisar instanciar a classe antes (ex -> [X] const userMap = new UserMap() -> userMap.toDTO() | [C] UserMap.toDTO())
  static toDTO({
    email,
    name,
    id,
    avatar,
    avatar_url,
    driver_license,
  }): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      avatar_url,
      driver_license,
    });

    return user;
  }
}

export { UserMap };

import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { AbstractRepository } from '@core/common/repository/AbstractRepository';
import { Optional } from '@core/common/type/CommonTypes';
import { User, UserDocument } from '@core/domain/user/entity/User';
import { ObjectId } from 'mongoose';

export interface UserRepositoryPort{
  findUser(by: { phone?: number }, options?: RepositoryFindOptions): Promise<Optional<User>>;

  countUsers(by: { phone: number }, options?: RepositoryFindOptions): Promise<number>;

  addUser(user: User): Promise<{ id: string }>;

  updateUser(user: User): Promise<void>;
}

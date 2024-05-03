import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Optional } from '@core/common/type/CommonTypes';
import { User } from '@core/domain/user/entity/User';
import { ObjectId } from 'mongoose';

export interface UserRepositoryPort {
  findUser(by: { id?: string }, options?: RepositoryFindOptions): Promise<Optional<User>>;

  countUsers(by: { id?: string }, options?: RepositoryFindOptions): Promise<number>;

  addUser(user: User): Promise<{ id: string }>;

  updateUser(user: User): Promise<void>;
}

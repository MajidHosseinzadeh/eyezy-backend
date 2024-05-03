import { User } from '@core/domain/user/entity/User';
import UserModel from '../UserModel';

export class MongooseUserMapper {
  public static toMongooseEntity(domainUser: User): UserModel {
    return new UserModel({
      phone: domainUser.getPhone(),
      firstName: domainUser.getFirstName(),
      lastName: domainUser.getLastName(),
      role: domainUser.getRole(),
      password: domainUser.getPassword(),
      createdAt: domainUser.getCreatedAt(),
      editedAt: domainUser.getEditedAt(),
      removedAt: domainUser.getRemovedAt(),
    });
  }

  public static toMongooseEntities(domainUsers: User[]): UserModel[] {
    return domainUsers.map((domainUser) => this.toMongooseEntity(domainUser));
  }

  public static toDomainEntity(mongooseUser: UserModel): User {
    return new User({
      phone: mongooseUser.phone,
      firstName: mongooseUser.firstName,
      lastName: mongooseUser.lastName,
      role: mongooseUser.role,
      password: mongooseUser.password,
      id: mongooseUser._id,
      createdAt: mongooseUser.createdAt,
      editedAt: mongooseUser.editedAt,
      removedAt: mongooseUser.removedAt,
    });
  }

  public static toDomainEntities(mongooseUsers: UserModel[]): User[] {
    return mongooseUsers.map((mongooseUser) => this.toDomainEntity(mongooseUser));
  }
}

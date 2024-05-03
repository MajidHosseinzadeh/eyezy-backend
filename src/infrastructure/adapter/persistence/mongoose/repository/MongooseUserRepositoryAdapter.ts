import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { User, UserDocument } from '@core/domain/user/entity/User';
import UserModel from '../entity/user/UserModel';
import { MongooseUserMapper } from '../entity/user/mapper/UserModelMapper';
import { AbstractRepository } from '@core/common/repository/AbstractRepository';

@Injectable()
export class MongooseUserRepositoryAdapter extends AbstractRepository<UserDocument> implements UserRepositoryPort {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super(userModel);
  }

  public async findUser(by: { phone?: number }, options: RepositoryFindOptions = {}): Promise<Optional<User>> {
    const query = this.userModel.findOne();

    if (by.phone) {
      query.where('phone', by.phone);
    }
    if (!options.includeRemoved) {
      query.where('removed_at', null);
    }

    const document = await query.exec();
    return document ? document.toObject() : undefined;
  }

  public async countUsers(by: { phone?: number; email?: string }, options: RepositoryFindOptions = {}): Promise<number> {
    const conditions: any = {};
    if (by.phone) {
      conditions.phone = by.phone;
    }
    if (by.email) {
      conditions.email = by.email;
    }

    if (!options.includeRemoved) {
      conditions.removed_at = null;
    }
    return this.userModel.countDocuments(conditions).exec();
  }

  public async addUser(user: User): Promise<{ id: Types.ObjectId }> {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    return { id: savedUser._id };
  }

  public async updateUser(user: User): Promise<void> {
    const mongooseUser: UserModel = MongooseUserMapper.toMongooseEntity(user);
    await this.userModel.updateOne({ _id: mongooseUser.id }, { $set: mongooseUser }).exec();
  }
}

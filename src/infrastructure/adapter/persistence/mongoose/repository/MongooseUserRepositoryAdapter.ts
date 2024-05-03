import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/UserRepositoryPort';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { User, UserDocument } from '@core/domain/user/entity/User';
import UserModel from '../entity/user/UserModel';
import { MongooseUserMapper } from '../entity/user/mapper/UserModelMapper';

@Injectable()
export class MongooseUserRepositoryAdapter implements UserRepositoryPort {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async findUser(by: { id?: string; email?: string }, options: RepositoryFindOptions = {}): Promise<Optional<User>> {
    const query = this.userModel.findOne();

    if (by.id) {
      query.where('_id', by.id);
    }
    if (!options.includeRemoved) {
      query.where('removedAt', null);
    }

    const document = await query.exec();
    return document ? document.toObject() : undefined;
  }

  public async countUsers(by: { id?: string; email?: string }, options: RepositoryFindOptions = {}): Promise<number> {
    const conditions: any = {};

    if (by.id) {
      conditions._id = by.id;
    }
    if (by.email) {
      conditions.email = by.email;
    }

    if (!options.includeRemoved) {
      conditions.removedAt = null;
    }

    return this.userModel.countDocuments(conditions).exec();
  }

  public async addUser(user: User): Promise<{ id: string }> {
    const newUser = new this.userModel(user);
    const savedUser = await newUser.save();
    return { id: savedUser._id.toString() };
  }

  public async updateUser(user: User): Promise<void> {
    const mongooseUser: UserModel = MongooseUserMapper.toMongooseEntity(user);
    await this.userModel.updateOne({ _id: mongooseUser.id }, { $set: mongooseUser }).exec();
  }
}

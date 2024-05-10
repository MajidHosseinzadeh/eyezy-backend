import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types, model } from 'mongoose';
import { OtpRepositoryPort } from '@core/domain/otp/port/persistence/OtpRepositoryPort';
import { Nullable, Optional } from '@core/common/type/CommonTypes';
import { RepositoryFindOptions } from '@core/common/persistence/RepositoryOptions';
import { Otp, OtpDocument, OtpModel } from '@core/domain/otp/entity/Otp';
import { AbstractRepository } from '@core/common/repository/AbstractRepository';
import { OtpStatus } from '@core/common/enums/OtpEnums';

@Injectable()
export class MongooseOtpRepositoryAdapter extends AbstractRepository<OtpDocument> implements OtpRepositoryPort {
  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {
    super(otpModel);
  }

  public async findOtp(by: { user_id?: Types.ObjectId }, options: RepositoryFindOptions = {}): Promise<Optional<Otp>> {
    const query = this.otpModel.findOne();

    if (by.user_id) {
      query.where('user_id', by.user_id);
    }
    if (!options.includeRemoved) {
      query.where('removed_at', null);
    }

    const document = await query.exec();
    return document ? document.toObject() : undefined;
  }

  public async countOtps(by: { user_id: Types.ObjectId}, options: RepositoryFindOptions = {}): Promise<number> {
    const conditions: any = {};
    if (by.user_id) {
      conditions.user_id = by.user_id;
      conditions.status = OtpStatus.ACTIVE;
      conditions.otp_expires = { $gt: Date.now() }
    }

    if (!options.includeRemoved) {
      conditions.removed_at = null;
    }
    return this.otpModel.countDocuments(conditions).exec();
  }

  public async addOtp(otp: Otp): Promise<OtpDocument> {
    const newOtp = new this.otpModel(otp);
    const savedOtp = await newOtp.save();
    return savedOtp;
  }

  public async updateOtp(otp: Otp): Promise<void> {
    const mongooseOtp = new OtpModel({  });
    await this.otpModel.updateOne({ _id: mongooseOtp.id }, { $set: mongooseOtp }).exec();
  }
}

import { QueryOptions, UpdateWriteOpResult } from 'mongoose';
import { Document, FilterQuery, PopulateOptions, UpdateQuery } from 'mongoose';

export interface IAbstractRepository<T extends Document> {
  countDocuments(query: FilterQuery<T>): Promise<number>;

  create(document: Partial<T>): Promise<T>;

  insertMany(document: Partial<T[]>): Promise<Partial<T[]>>;

  findOne(filterQuery: FilterQuery<T>, projection?: Record<string, unknown>, populate?: PopulateOptions, lean?: boolean): Promise<T | null>;

  findOneAndUpdate(filterQuery: FilterQuery<T>, updateQuery: UpdateQuery<T>, options?: QueryOptions<T>): Promise<T | null>;

  updateMany(filterQuery: FilterQuery<T>, updateQuery: UpdateQuery<T>): Promise<UpdateWriteOpResult | null>;

  find(filterQuery: FilterQuery<T>, projection?: Record<string, unknown>): Promise<T[] | []>;

  findOneAndDelete(filterQuery: FilterQuery<T>): any;

  findByIdAndDelete(id: string): any;

  deleteMany(filterQuery: FilterQuery<T>): Promise<boolean>;

  deleteOne(filterQuery: FilterQuery<T>): any;
}

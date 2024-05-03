import { Document, FilterQuery, Model, Types, UpdateQuery, UpdateWriteOpResult } from 'mongoose';
import { PopulateOptions } from 'mongoose';
import { IAbstractRepository } from './AbstractRepositoryInterface';

export abstract class AbstractRepository<TDocument extends Document> implements IAbstractRepository<TDocument> {
  constructor(protected readonly _model: Model<TDocument>) {}

  get model() {
    return this._model;
  }
  
  async countDocuments(query: FilterQuery<TDocument>): Promise<number> {
    return await this.model.countDocuments(query);
  }

  async create(document: Partial<TDocument>): Promise<TDocument> {
    const createdDocument = new this.model({ ...document, _id: new Types.ObjectId() });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async insertMany(documents: Partial<TDocument[]>): Promise<Partial<TDocument[]>> {
    return await this.model.insertMany(documents);
  }

  async find(filterQuery: FilterQuery<TDocument>, projection?: Record<string, unknown>, lean: boolean = false): Promise<TDocument[]> {
    const documents = await this.model.find(filterQuery, { ...projection }, { lean });
    return documents || [];
  }

  async findOne(filterQuery: FilterQuery<TDocument>, projection?: Record<string, unknown>, populate?: PopulateOptions, lean: boolean = false): Promise<TDocument | null> {
    let document = await this.model.findOne(filterQuery, { ...projection }, { lean });
    if(document && !populate) return document
    if(document && populate) return await document.populate(populate)
    return null
  }

  async findById(id: string, lean: boolean = true): Promise<TDocument | null> {
    const document = await this.model.findById(id, {}, { lean });
    return document;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, updateQuery: UpdateQuery<TDocument>, options?: FilterQuery<TDocument>): Promise<TDocument | null> {
    const document = await this.model.findOneAndUpdate(filterQuery, updateQuery, options);
    return document;
  }

  async findByIdAndUpdate(id: string, updateQuery: UpdateQuery<TDocument>): Promise<TDocument | null> {
    const document = await this.model.findByIdAndUpdate(id, updateQuery, { new: true });
    return document;
  }

  async updateOne(filterQuery: FilterQuery<TDocument>, updateQuery: UpdateQuery<TDocument>): Promise<UpdateWriteOpResult | null> {
    const document = await this.model.updateOne(filterQuery, updateQuery);
    return document;
  }

  async updateMany(filterQuery: FilterQuery<TDocument>, updateQuery: UpdateQuery<TDocument>): Promise<UpdateWriteOpResult | null> {
    const document = await this.model.updateMany(filterQuery, updateQuery);
    return document;
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return await this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async deleteMany(filterQuery: FilterQuery<TDocument>): Promise<boolean> {
    const deletedResult = await this.model.deleteMany(filterQuery);
    return deletedResult.deletedCount >= 1;
  }

  async findByIdAndDelete(id: string) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteOne(filterQuery: FilterQuery<TDocument>) {
    return await this.model.deleteOne(filterQuery);
  }
}

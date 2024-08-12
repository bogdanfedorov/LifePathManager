import {
  Collection,
  CountDocumentsOptions,
  Document,
  Filter,
  FindOptions,
  ObjectId,
  UpdateFilter,
} from "mongodb";
import { ErrorLogger } from "../config";
import { getCollection } from "./connection";
import {
  ConnectionError,
  NotCreated,
  NotFound,
  NotValidId,
  OnCountError,
  OnDeleteError,
  OnFindError,
  OnUpdateError,
} from "./errors";
import { IFindDto, IPagination } from "./types";

export class Repository<Model extends Document> {
  private readonly colectionName: string;

  constructor(colectionName: string) {
    this.colectionName = colectionName;
  }

  public async findOne(
    filter: Filter<Document> = {},
    options?: FindOptions,
  ): Promise<Model> {
    const col = await this.getCollection();

    let entity: Model | null;
    try {
      entity = await col.findOne<Model>(filter, options);
    } catch (e) {
      ErrorLogger(e);
      throw OnFindError;
    }

    if (!entity) {
      throw NotFound;
    }

    return entity;
  }

  public async find(filter: Filter<Document> = {}, options?: FindOptions) {
    const col = await this.getCollection();

    let entitys: Model[] | null;
    try {
      entitys = await col.find<Model>(filter, options).toArray();
    } catch (e) {
      ErrorLogger(e);
      throw OnFindError;
    }

    return entitys;
  }

  public async create(entity: Model): Promise<Model> {
    const col = await this.getCollection();

    Object.assign(entity, {
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    try {
      await col.insertOne(entity);
    } catch (e) {
      ErrorLogger(e);
      throw NotCreated;
    }

    return entity;
  }

  public async update(
    id: ObjectId | string,
    updateDto: UpdateFilter<Document>,
  ) {
    const col = await this.getCollection();
    const filter = { _id: this.castToObjectId(id) };
    try {
      await col.findOneAndUpdate(filter, updateDto);
    } catch (e) {
      ErrorLogger(e);
      throw OnUpdateError;
    }

    return this.findById(id);
  }

  public async delete(id: ObjectId | string) {
    const col = await this.getCollection();

    const filter = { _id: this.castToObjectId(id) };
    try {
      await col.findOneAndDelete(filter);
    } catch (e) {
      ErrorLogger(e);
      throw OnDeleteError;
    }

    return this.findById(id);
  }

  public async count(
    filter: Filter<Document> = {},
    options?: CountDocumentsOptions,
  ): Promise<number> {
    const col = await getCollection(this.colectionName);

    let count: number = 0;
    try {
      count = await col.countDocuments(filter, options);
    } catch (e) {
      ErrorLogger(e);
      throw OnCountError;
    }

    return count;
  }

  public async findById(id: ObjectId | string): Promise<Model> {
    const filter = { _id: this.castToObjectId(id) };

    return this.findOne(filter);
  }

  public async pagination(findDto: IFindDto): Promise<IPagination<Model>> {
    const page = Number(findDto.page || 0);
    const limit = Number(findDto.limit || 10);
    const skip = page * limit;

    const options = {
      limit,
      skip,
    };
    if (findDto.sort) {
      Object.assign(options, { sort: findDto.sort });
    }

    const filter = {};

    const count = await this.count(filter);
    const entitys = await this.find(filter, options);

    const maxPages = Math.ceil(count / limit);
    return {
      data: entitys,
      metadata: {
        page,
        maxPages,
      },
    };
  }

  private async getCollection(): Promise<Collection<Document>> {
    let collection: Collection<Document>;
    try {
      collection = await getCollection(this.colectionName);
    } catch {
      throw ConnectionError;
    }

    return collection;
  }

  private castToObjectId(id: string | ObjectId): ObjectId {
    if (id instanceof ObjectId) {
      return id;
    }

    let newObjectId: ObjectId;
    try {
      newObjectId = new ObjectId(id);
    } catch (e) {
      ErrorLogger(e);
      throw NotValidId;
    }

    return newObjectId;
  }
}

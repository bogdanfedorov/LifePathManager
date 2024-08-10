import { ObjectId } from "mongodb";

export interface BaseModelDto {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export abstract class BaseModel {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id?: string | ObjectId,
    createdAt?: string | Date,
    updatedAt?: string | Date,
  ) {
    this._id = id ? new ObjectId(id) : new ObjectId();
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
    this.updatedAt = updatedAt ? new Date(updatedAt) : new Date();
  }

  public toPlainObject(): BaseModelDto {
    return {
      _id: this._id.toString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

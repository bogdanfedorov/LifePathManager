import { BaseModel, BaseModelDto, Repository } from "./core";

export interface VacancyModelDto extends BaseModelDto {
  companyLink?: string;
  companyName?: string;
  salary?: number;
  status?: string;
  comment?: string;
}

export class VacancyModel extends BaseModel {
  public companyName?: string;
  public companyLink?: string;
  public salary?: number;
  public status?: string;
  public comment?: string;

  constructor(dto: Partial<VacancyModel>) {
    super(dto._id);
    this.companyName = dto.companyName;
    this.companyLink = dto.companyLink;
    this.salary = dto.salary;
    this.status = dto.status;
  }

  public toPlainObject(): VacancyModelDto {
    return {
      companyName: this.companyName,
      companyLink: this.companyLink,
      salary: this.salary,
      status: this.status,
      comment: this.comment,
      ...super.toPlainObject(),
    };
  }
}

export const VacancyRepository = new Repository<VacancyModel>(
  "vacancy",
  VacancyModel,
);

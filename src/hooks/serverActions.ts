import { repositores } from "@/models";
import { IFindDto, IPagination } from "@/models/core";
import { Models } from "@/types";

const toPlainObject = (entity: object): object => {
  return JSON.parse(JSON.stringify(entity));
};

export type ActionCreate = (formData: FormData) => Promise<object>;
export const actionCreate =
  (model: Models): ActionCreate =>
  async (formData) => {
    const entity = await repositores[model].create(
      Object.fromEntries(formData),
    );

    return toPlainObject(entity);
  };

export type ActionGetPaginationList = (
  findDto: IFindDto,
) => Promise<IPagination<object>>;
export const actionGetPaginationList =
  (model: Models): ActionGetPaginationList =>
  async (findDto) => {
    const vacancyArray = await repositores[model].pagination(findDto);

    const data = vacancyArray.data.map(toPlainObject);

    return {
      data,
      metadata: vacancyArray.metadata,
    };
  };

export type ActionDelete = (id: string) => Promise<boolean>;
export const actionDelete =
  (model: Models): ActionDelete =>
  async (id) => {
    await repositores[model].delete(id);

    return true;
  };

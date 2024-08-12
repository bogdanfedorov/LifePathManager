"use server";
import {
  ActionCreate,
  ActionDelete,
  ActionGetPaginationList,
  EntityFactory,
  EntityType,
} from "@/features/entity";

const toPlainObject = (entity: object): object => {
  return JSON.parse(JSON.stringify(entity));
};

export const actionCreate: ActionCreate = async (
  entityName: string,
  formData,
) => {
  const repository = EntityFactory.get(entityName);
  const entity = await repository.create(
    Object.fromEntries(formData) as EntityType,
  );

  return toPlainObject(entity);
};

export const actionGetPaginationList: ActionGetPaginationList = async (
  entityName,
  findDto,
) => {
  const repository = EntityFactory.get(entityName);
  const vacancyArray = await repository.pagination(findDto);

  const data = vacancyArray.data.map(toPlainObject);

  return {
    data,
    metadata: vacancyArray.metadata,
  };
};

export const actionDelete: ActionDelete = async (entityName, id) => {
  const repository = EntityFactory.get(entityName);

  await repository.delete(id);

  return true;
};

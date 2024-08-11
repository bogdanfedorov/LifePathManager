import { Models } from "@/types";
import { Repository } from "./core";

export type IEntity = { [key: string]: object | number | string };

export const repositores = {
  [Models.vacancy]: new Repository<IEntity>(Models.vacancy),
};

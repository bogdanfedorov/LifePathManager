import { EntityType } from "@/features/entity";
import { Repository } from "./core";

export const repositores = {
  vacancy: new Repository<EntityType>("vacancy"),
};

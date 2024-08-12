import { Repository } from "@/models/core";
import { EntityNameType, EntityType } from "./types";

export class EntityFactory {
  static repositoryCollection: Map<EntityNameType, Repository<EntityType>>;

  static get(name: EntityNameType): Repository<EntityType> {
    let repository = EntityFactory.repositoryCollection.get(name);
    if (!repository) {
      repository = new Repository<EntityType>(name);
      EntityFactory.repositoryCollection.set(name, repository);
    }

    return repository;
  }
}

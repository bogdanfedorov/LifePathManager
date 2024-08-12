import { IFindDto, IPagination } from "@/models/core";

export type EntityNameType = string;

export type TextableFieldType = "text" | "url" | "date" | "number" | "money";
export type SelectableType = "select";
export type FieldType = TextableFieldType | SelectableType;

export interface EntityField {
  label: string;
  type: FieldType;
}

export interface TextableField extends EntityField {}
export interface SelectableField extends TextableField {
  variants: Array<string>;
}

export type EntityFieldConfigType = { [key: string]: EntityField };

export type EntityConfigKeys = "form" | "table";

export type EntityConfig = {
  [key in EntityConfigKeys]: EntityFieldConfigType;
};

export type EntityType = { [key: string]: number | string | EntityType };

// Server action
export type ActionCreate = (
  entityName: EntityNameType,
  formData: FormData,
) => Promise<object>;

export type ActionGetPaginationList = (
  entityName: EntityNameType,
  findDto: IFindDto,
) => Promise<IPagination<object>>;

export type ActionDelete = (
  entityName: EntityNameType,
  id: string,
) => Promise<boolean>;

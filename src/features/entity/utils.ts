import {
  EntityConfig,
  EntityConfigKeys,
  EntityFieldConfigType,
  FieldType,
} from "./types";

export const isTextableFieldType = (type: FieldType) =>
  ["text", "url", "date", "number", "money"].includes(type);
export const isSelectableType = (type: FieldType) => type === "select";
export const isMoney = (type: FieldType) => type === "money";
export const isDate = (type: FieldType) => type === "date";
export const isUrl = (type: FieldType) => type === "url";

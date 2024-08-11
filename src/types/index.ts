import { Repository } from "@/models/core";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const TextableTypes = ["text", "url", "Data", "number", "money"];
export interface TextableField {
  label: string;
  type: string;
}

export const SelectableTypes = ["select"];
export interface SelectableField extends TextableField {
  variants: Array<string>;
}

export type FiledType = TextableField | SelectableField;
export type GenericConfigType = { [key: string]: FiledType };

export enum Models {
  vacancy = "vacancy",
}

export type IMetadata = { [key: string]: GenericConfigType };

export type IModel = { [key in Models]: IMetadata };

export const createModel = (
  modelName: Models,
  dto: { [key: string]: (thisObject: IMetadata) => GenericConfigType },
): IModel => {
  const thisObject: IMetadata = {};

  Object.entries(dto).forEach(([key, func]) => {
    Object.assign(thisObject, { [key]: func(thisObject) });
  });

  return { [modelName]: thisObject };
};

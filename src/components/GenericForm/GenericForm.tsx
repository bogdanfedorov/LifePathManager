"use client";
import {
  ActionCreate,
  EntityFieldConfigType,
  EntityNameType,
  isMoney,
  isSelectableType,
  isTextableFieldType,
  SelectableField,
} from "@/features/entity";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { FC } from "react";
import { useFormStatus } from "react-dom";

interface FormProps {
  config: EntityFieldConfigType;
  labelSubmitButton: string;
}

const Form: FC<FormProps> = ({ config, labelSubmitButton }) => {
  const { pending } = useFormStatus();

  return (
    <>
      {Object.entries(config).map(([key, value]) => {
        if (isTextableFieldType(value.type)) {
          return (
            <Input
              type={isMoney(value.type) ? "number" : value.type}
              label={value.label}
              key={key}
              name={key}
              variant="underlined"
              disabled={pending}
              endContent={
                isMoney(value.type) && (
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">$</span>
                  </div>
                )
              }
            />
          );
        }
        if (isSelectableType(value.type)) {
          return (
            <Autocomplete
              label={value.label}
              name={key}
              key={key}
              variant="underlined"
            >
              {(value as SelectableField).variants.map((variant) => (
                <AutocompleteItem key={variant} value={variant}>
                  {variant}
                </AutocompleteItem>
              ))}
            </Autocomplete>
          );
        }
        return key;
      })}

      <Button type="submit" color="primary" variant="shadow" disabled={pending}>
        {pending ? <Spinner color="danger" /> : labelSubmitButton}
      </Button>
    </>
  );
};

export interface GenericFormProps extends FormProps {
  entityName: EntityNameType;
  submiteAction: ActionCreate;
}

export const GenericForm: FC<GenericFormProps> = (props) => {
  const { entityName, submiteAction, ...formProps } = props;
  return (
    <form
      action={(formData) => submiteAction(entityName, formData)}
      className="border-small px-2 py-2 rounded-small border-default-200 dark:border-default-100 flex flex-col gap-2"
    >
      <Form {...formProps} />
    </form>
  );
};

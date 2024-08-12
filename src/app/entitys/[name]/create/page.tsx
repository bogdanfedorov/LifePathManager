"use client";
import { GenericForm } from "@/components/GenericForm";
import { Entitys, userConfig } from "@/config/user";
import { actionCreate } from "../actions";
import { EntityPageProps } from "../page";

export default async function CreateEntity({ params }: EntityPageProps) {
  const config = userConfig.entites[params.name as Entitys]?.form;
  if (!config) {
    return <h1>Form config for entity "{params.name}" is undefined </h1>;
  }

  return (
    <GenericForm
      entityName={params.name}
      submiteAction={actionCreate}
      config={config}
      labelSubmitButton="Create"
    />
  );
}

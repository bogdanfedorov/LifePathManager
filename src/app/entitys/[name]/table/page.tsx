"use client";
import { GenericTable } from "@/components/GenericTable";
import { Entitys, userConfig } from "@/config/user";
import { actionDelete, actionGetPaginationList } from "../actions";
import { EntityPageProps } from "../page";

export default function TableEntity({ params }: EntityPageProps) {
  const config = userConfig.entites[params.name as Entitys]?.table;
  if (!config) {
    return <h1>Form config for entity "{params.name}" is undefined </h1>;
  }

  return (
    <GenericTable
      entityName={params.name}
      config={config}
      getPaginationList={actionGetPaginationList}
      deleteItem={actionDelete}
      ariaLabel="VacancyTable"
    />
  );
}

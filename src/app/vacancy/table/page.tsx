import { GenericTable } from "@/components/GenericTable";
import { deleteVacancy, getVacancy } from "./actions";
import { userConfig } from "@/config/user";

export default function VacancyTable() {
  return (
    <GenericTable
      config={userConfig.entites.vacancy.table}
      getPaginationList={getVacancy}
      deleteItem={deleteVacancy}
      ariaLabel="VacancyTable"
    />
  );
}

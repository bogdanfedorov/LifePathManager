import { GenericForm } from "@/components/GenericForm";
import { userConfig } from "@/config/user";
import { createVacancy } from "./actions";

export default function CreateVacancy() {
  return (
    <GenericForm
      submiteAction={createVacancy}
      config={userConfig.entites.vacancy.form}
      labelSubmitButton="Create"
    />
  );
}

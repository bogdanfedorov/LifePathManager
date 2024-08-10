"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { useFormStatus } from "react-dom";
import { vacancyConfigInput } from "../config";
import { createVacancy } from "./actions";

const CreateForm = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {Object.entries(vacancyConfigInput).map(([key, value]) => (
        <Input
          type={value.type}
          label={value.label}
          key={key}
          name={key}
          variant="underlined"
          disabled={pending}
          {...{ endContent: key === "price" && "USD" }}
        />
      ))}

      <Button type="submit" color="primary" variant="shadow" disabled={pending}>
        {pending ? <Spinner color="danger" /> : "Create"}
      </Button>
    </>
  );
};

export default function CreateVacancy() {
  return (
    <form
      action={createVacancy}
      className="border-small px-2 py-2 rounded-small border-default-200 dark:border-default-100 flex flex-col gap-2"
    >
      <CreateForm />
    </form>
  );
}

"use server";

import { IPagination } from "@/models/core/types";
import { VacancyModelDto, VacancyRepository } from "@/models/VacancyModel";

export const getVacancy = async (): Promise<IPagination<VacancyModelDto>> => {
  const vacancyArray = await VacancyRepository.pagination({});

  const data = vacancyArray.data.map((vacancy) => vacancy.toPlainObject());

  await new Promise((r) => setTimeout(r, 2000));

  return {
    data,
    metadata: vacancyArray.metadata,
  };
};

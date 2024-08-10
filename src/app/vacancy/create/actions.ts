"use server";
import { VacancyModel, VacancyRepository } from "@/models/VacancyModel";

export const createVacancy = async (formData: FormData) => {
  const vacancy = new VacancyModel({
    companyName: String(formData.get("companyName")),
    companyLink: String(formData.get("companyLink")),
    salary: Number(formData.get("salary")),
    status: String(formData.get("status")),
    comment: String(formData.get("comment")),
  });

  const savedVacancy = await VacancyRepository.create(vacancy);

  return savedVacancy.toPlainObject();
};

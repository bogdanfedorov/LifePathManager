"use server";
import { actionDelete, actionGetPaginationList } from "@/hooks/serverActions";

export const getVacancy = actionGetPaginationList(Models.vacancy);
export const deleteVacancy = actionDelete(Models.vacancy);

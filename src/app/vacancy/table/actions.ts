"use server";
import { actionDelete, actionGetPaginationList } from "@/hooks/serverActions";
import { Models } from "@/types";

export const getVacancy = actionGetPaginationList(Models.vacancy);
export const deleteVacancy = actionDelete(Models.vacancy);

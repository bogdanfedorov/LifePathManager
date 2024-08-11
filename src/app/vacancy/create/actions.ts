"use server";
import { actionCreate } from "@/hooks/serverActions";
import { Models } from "@/types";

export const createVacancy = actionCreate(Models.vacancy);

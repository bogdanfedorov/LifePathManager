import { createModel, Models } from "@/types";

export type UserConfig = typeof userConfig;

export const userConfig = {
  entites: {
    ...createModel(Models.vacancy, {
      form: () => ({
        companyName: {
          label: "Company name",
          type: "text",
        },
        companyLink: {
          label: "Company link",
          type: "url",
        },
        salary: {
          label: "Salary",
          type: "money",
        },
        status: {
          label: "Status",
          type: "select",
          variants: [
            "Initiator they",
            "Initiator I",
            "Sent Resume",
            "Received confirmation of review",
            "Received technical assignment",
            "Waiting for response on technical assignment",
            "Received letter about interview",
            "Waiting for interview results",
            "Received letter about technical interview",
            "Waiting for technical interview results",
            "Received offer",
            "Received refusal",
            "Hired",
          ],
        },
        comment: {
          label: "Comment",
          type: "text",
        },
        siteSourse: {
          label: "Site source",
          type: "select",
          variants: ["bulldogjob"],
        },
      }),
      table: (thisObject) => ({
        ...thisObject.form,
        createdAt: {
          label: "Created at",
          type: "Date",
        },
        updatedAt: {
          label: "Updated at",
          type: "Date",
        },
        actions: {
          label: "Actions",
          type: "button",
        },
      }),
    }),
  },
};

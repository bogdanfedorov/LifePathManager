import {
  EntityConfig,
  EntityConfigKeys,
  EntityFieldConfigType,
} from "@/features/entity";

export type UserConfig = typeof userConfig;

export type Entitys = keyof typeof userConfig.entites;

type mutationInstruction = (thisObject: EntityConfig) => EntityFieldConfigType;

const createEntityConfig = (dto: {
  [key in EntityConfigKeys]: mutationInstruction | object;
}): EntityConfig => {
  const thisObject: EntityConfig = {
    table: {},
    form: {},
  };

  Object.entries(dto).forEach(([key, func]) => {
    if (typeof func === "function") {
      Object.assign(thisObject, { [key]: func(thisObject) });
    } else {
      Object.assign(thisObject, { [key]: func });
    }
  });

  return thisObject;
};
export const userConfig = {
  entites: {
    vacancy: createEntityConfig({
      form: {
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
      },
      table: (thisObject) => ({
        ...thisObject.form,
        createdAt: {
          label: "Created at",
          type: "date",
        },
        updatedAt: {
          label: "Updated at",
          type: "date",
        },
        actions: {
          label: "Actions",
          type: "button",
        },
      }),
    }),
  },
};

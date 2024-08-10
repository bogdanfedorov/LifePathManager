export const vacancyConfigInput = {
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
    type: "number",
    aboutContent: "USD",
  },
  status: {
    label: "Status",
    type: "text",
  },
  comment: {
    label: "Comment",
    type: "text",
  },
};

export const vacancyConfig = {
  ...vacancyConfigInput,
  createdAt: {
    label: "Created at",
    type: "Date",
  },
  updatedAt: {
    label: "Updated at",
    type: "Date",
  },
};

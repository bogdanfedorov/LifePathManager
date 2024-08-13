const ProtoMetaLinksRules = [
  { key: "title", type: "string", required: true },
  { key: "url", type: "string" },
  { key: "items", type: "array" },
  { key: "links", type: "array" },
];

const typeCheck = {
  string: (field) => typeof field === "string",
  array: Array.isArray,
};

const checkRule = (obj, path) => (rule) => {
  const field = obj[rule.key];

  if (rule.required && !field) {
    console.error(
      `At: ${path}.\n Incorrect syntax pml value: ${rule.key} is required!`,
    );
  }

  if (field !== undefined && !typeCheck[rule.type](field)) {
    console.error(
      `[Type Error] At: ${path}.\n Value ${rule.key} must be a ${rule.type} but now is ${typeof field}`,
    );
  } else {
    if (rule.type === "string" && field && field.trim() === "") {
      console.error(`At: ${path}.\n Value is empty`);
    }

    if (rule.type === "array" && field) {
      field.forEach((item, index) => {
        validateProtoMetaLinks(item, `${path}.${rule.key}[${index}]`);
      });
    }
  }
};

export const validateProtoMetaLinks = (obj, path = "root") => {
  ProtoMetaLinksRules.map(checkRule(obj, path));
};

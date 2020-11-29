import * as R from "ramda";

const fieldsArr = [
  ["day", "number", 0, 9],
  ["night", "number", 0, 9],
];

const selectFields = [["alt_f", "string"]];

const mapper = (field) => {
  const [name, validationType, min, max] = field;
  const text = validationType === "number" ? "" : "character";

  if (validationType === "uuid")
    return {
      name: `${name}`,
      validationType: "string",
      validations: [
        {
          type: "required",
          params: ["is required"],
        },
        {
          type: "matches",
          // params: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be hh:mm"],
          params: [
            /\b(uuid:){0,1}\s*([a-f0-9\\-]*){1}\s*/,
            { message: " must be UUID", excludeEmptyString: false },
          ],
        },
      ],
    };

  if (!max)
    return {
      name: `${name}`,
      validationType,
      validations: [
        {
          type: "required",
          params: ["is required"],
        },
      ],
    };

  return {
    name: `${name}`,
    validationType,
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [min, `at least ${min} ${text}`],
      },
      {
        type: "max",
        params: [max, `at most ${max} ${text}`],
      },
    ],
  };
};

const fields = R.map(mapper, fieldsArr);

function createKeyVal(acc, field) {
  const { name, validationType } = field;
  const value = validationType === "number" ? 0 : "";
  return { ...acc, [name]: value };
}
const fieldsNames = R.reduce(createKeyVal, {}, fields);

function getKeys(acc, field) {
  return [...acc, field.name];
}

const keys = R.reduce(getKeys, [], fields);

export { fields, fieldsNames, keys };

// R.map(ArrToObjMapper,minMaxFields);

import * as R from "ramda";

const fieldsArr = [
  ["kgs", "number", 0, 999999],
  ["rct_no", "minChar"],
];

const mapper = (field) => {
  const [name, validationType, min, max] = field;
  const text = validationType === "number" ? "" : "character";

  if (validationType === "minChar")
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
            /^.{8,}$/,
            {
              message: " must be 8 characters at least",
              excludeEmptyString: false,
            },
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

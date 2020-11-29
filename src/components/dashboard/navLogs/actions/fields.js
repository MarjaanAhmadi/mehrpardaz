import * as R from "ramda";

const minMaxFields = [
  ["awy", "string", 1, 6],
  ["moca", "number", 0, 999],
  ["wpt", "string", 1, 6],
  ["frq", "string", 1, 7],
  ["name", "string", 1, 6],
  ["fir", "string", 1, 6],
  ["lat", "string", 1, 7],
  ["long", "string", 1, 7],
  ["fl", "number", 0, 999],
  ["tro", "number", 0, 999],
  ["shr", "number", 0, 9],
  ["mt", "number", 0, 359],
  ["tt", "string", 3, 3],
  ["var", "string", 3, 3],
  ["wind", "string", 0, 7],
  ["sat", "string", 0, 3],
  ["tdv", "string", 0, 3],
  ["tas", "number", 1, 6],
  ["mn", "number", 1, 6],
  ["gs", "number", 0, 999],
  ["dist", "number", 0, 9999],
  ["remd", "number", 0, 9999],
  ["accd", "number", 0, 9999],
  ["rev", "string", 1, 9999],
  ["rqrd", "number", 0, 999999],
  ["accf", "number", 0, 999999],
  ["fob", "number", 0, 999999],
];

const dateFields = [
  ["time", "string"],
  ["acct", "string"],
  ["remt", "string"],
  ["eta", "string"],
  ["ata", "string"],
];

const minMaxMapper = (field) => {
  const [name, validationType, min, max] = field;
  const text = validationType === "number" ? "" : "character";

  return {
    name: `${name}_plnd`,
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

const dateMapper = (field) => {
  const [name, validationType] = field;
  return {
    name: `${name}_plnd`,
    validationType,
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "matches",
        // params: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "must be hh:mm"],
        params: [
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          { message: " must be HH:MM", excludeEmptyString: false },
        ],
      },
    ],
  };
};

const fields = R.concat(
  R.map(minMaxMapper, minMaxFields),
  R.map(dateMapper, dateFields)
);

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

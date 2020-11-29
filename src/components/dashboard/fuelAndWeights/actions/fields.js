import * as R from "ramda";

const fieldsArr = [
  ["name", "string"],
  ["trip_f_plnd", "number", 0, 300000],
  ["trip_f_time", "time"],
  ["cont_f_plnd", "number", 0, 300000],
  ["cont_f_time", "time"],
  ["fres_f_plnd", "number", 0, 50000],
  ["fres_f_time", "time"],
  ["min_to_f_plnd", "number", 0, 300000],
  ["min_to_f_time", "time"],
  ["taxi_f_plnd", "number", 0, 50000],
  ["taxi_f_time", "time"],
  ["min_req_f_plnd", "number", 0, 300000],
  ["min_req_f_time", "time"],
  ["extra_f_plnd", "number", 0, 50000],
  ["extra_f_time", "time"],
  ["additional_f_plnd", "number", 0, 50000],
  ["additional_f_time", "time"],
  ["block_f_plnd", "number", 0, 300000],
  ["block_f_time", "time"],
  ["dow_w_plnd", "number", 0, 800000],
  ["dow_w_max", "number", 0, 800000],
  ["playload_w_plnd", "number", 0, 800000],
  ["playload_w_max", "number", 0, 800000],
  ["zfw_w_plnd", "number", 0, 800000],
  ["zfw_w_max", "number", 0, 800000],
  ["block_w_plnd", "number", 0, 300000],
  ["block_w_max", "number", 0, 300000],
  ["rmpw_w_plnd", "number", 0, 800000],
  ["rmpw_w_max", "number", 0, 800000],
  ["taxi_w_plnd", "number", 0, 50000],
  ["taxi_w_max", "number", 0, 50000],
  ["tow_w_plnd", "number", 0, 800000],
  ["tow_w_max", "number", 0, 800000],
  ["trip_w_plnd", "number", 0, 300000],
  ["trip_w_max", "number", 0, 300000],
  ["lw_w_plnd", "number", 0, 300000],
  ["lw_w_max", "number", 0, 300000],
  ["ldg_fuel_w_plnd", "number", 0, 300000],
  ["ldg_fuel_w_max", "number", 0, 300000],
  ["underload_w_plnd", "number", 0, 800000],
  ["underload_w_max", "number", 0, 800000],
];

// const selectFields = [["alt_f", "string"]];

const mapper = (field) => {
  const [name, validationType, min, max] = field;
  const text = validationType === "number" ? "" : "character";

  if (validationType === "time")
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
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            { message: " must be HH:MM", excludeEmptyString: false },
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

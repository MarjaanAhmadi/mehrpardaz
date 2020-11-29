import * as R from "ramda";

const minMaxFields = [
  ["flight_type", "string"],
  ["passengers_no", "number", 0, 999],
  ["cargo_bagg", "number", 0, 999999],
  ["departure_station", "string"],
  ["cfp_trip_fuel", "number", 0, 999999],
  ["ramp_fuel", "number", 0, 999999],
  ["departure_fuel", "number", 0, 999999],
  ["arrival-station", "string"],
  ["diverted_to", "string"],
  ["arrival_fuel", "number", 0, 999999],
  ["captain_reports", "number", 0, 3],
  ["captain_remarks", "string"],
  ["delay-reasons", "string"],
];

const dateFields = [
  ["reporting_time", "string"],
  ["duty_time", "string"],
  ["scheduled_time_departure", "string"],
  ["offblock_time", "string"],
  ["takeoff_time", "string"],
  ["scheduled_time_arrival", "string"],
  ["onblock_time", "string"],
  ["landing_time", "string"],
  ["day_time", "string"],
  ["night_time", "string"],
  ["flight_time", "string"],
  ["block_time", "string"],
];
const selectFields = [
  ["tanked_fuel", "select"],
  ["landings", "select"],
];
const minMaxMapper = (field) => {
  const [name, validationType, min, max] = field;

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

  const text = validationType === "number" ? "" : "character";

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

const dateMapper = (field) => {
  const [name, validationType] = field;
  return {
    name: `${name}`,
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
const selectMapper = (field) => {
  const [name, validationType] = field;
  return {
    name: `${name}`,
    validationType: "string",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
    ],
  };
};

const fields = R.concat(
  R.map(minMaxMapper, minMaxFields),
  // R.map(selectMapper, selectFields),
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

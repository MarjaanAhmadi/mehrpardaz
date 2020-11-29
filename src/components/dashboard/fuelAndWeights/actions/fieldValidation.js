export const fuelAndWeightsValidation = [
  {
    name: "trip_f_plnd",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [3, "at least 3 "],
      },
    ],
  },
  {
    name: "cont_f_plnd",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [3, "at least 3 "],
      },
    ],
  },
  {
    name: "fres_f_plnd",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [3, "at least 3 "],
      },
    ],
  },
  {
    name: "min_to_f_plnd",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [3, "at least 3 "],
      },
    ],
  },
  {
    name: "taxi_f_plnd",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [3, "at least 3 "],
      },
    ],
  },
  {
    name: "min_req_f_plnd",
    validationType: "number",
    validations: [
      {
        type: "required",
        params: ["is required"],
      },
      {
        type: "min",
        params: [3, "at least 3 "],
      },
    ],
  },
];

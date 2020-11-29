import React, { useState, useEffect } from "react";
import { List, Patch } from "DataManager/DataManager";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import CardLayout from "components/CardLayout";

import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  btnRoot: {
    direction: "rtl",
  },
  formControl: {
    minWidth: 200,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  radioTop: {
    marginTop: "2.2rem",
  },
});

const FuelAndWeights = (props) => {
  const [fuelAndWeights, setFuelAndWeights] = useState("");
  const [fuelAndWeight, setFuelAndWeight] = useState("");
  const [fuelData, setFuelData] = useState({});
  const classes = useStyles();
  const getFuelAndWeights = async () => {
    try {
      const response = await List(
        "fuel-and-weights",
        undefined,
        100,
        1,
        undefined,
        undefined
      );
      const li = response.filter((i) => i.is_deleted === false);

      setFuelAndWeights({
        ...fuelAndWeights,
        list: li,
      });
    } catch (error) {}
  };
  const linkFuelAndWeighToFlight = async () => {
    try {
      const data = {
        fuel_and_weights: fuelAndWeight,
      };
      await Patch("flights", data, props.id);
      const selectedFuel = fuelAndWeights.list.filter(
        (i) => i.id === fuelAndWeight
      )[0];
      setFuelData(selectedFuel);
    } catch (error) {}
  };
  useEffect(() => {
    getFuelAndWeights();
  }, []);
  return (
    <React.Fragment>
      <Grid container>
        <Grid md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Fuel and Weight
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name={"fuelandweight"}
              value={fuelAndWeight}
              onChange={(event) => {
                setFuelAndWeight(event.target.value);
              }}
            >
              {fuelAndWeights.list && fuelAndWeights.list.length > 0
                ? fuelAndWeights.list.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.name || ` id: ${item.id}`}
                      </MenuItem>
                    );
                  })
                : false}
            </Select>
          </FormControl>
        </Grid>
        <Grid md={6} className="mt-4">
          <Button
            onClick={linkFuelAndWeighToFlight}
            variant="raised"
            className="jr-btn bg-info text-white"
          >
            Add Fuel and Weight
          </Button>
        </Grid>
        {Object.keys(fuelData).length !== 0 ? (
          <CardLayout>
            <div className="jr-card-header mb-3 d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="card-heading mb-0">
                  <i className="zmdi zmdi-notifications-active mr-2" />
                  Fuel and Weight Details
                </h3>
              </div>
            </div>
            <Grid container className="mt-3">
              {Object.entries(fuelData).map(([key, value]) => {
                return (
                  <Grid md={6}>
                    {key} : {value.toString()}
                  </Grid>
                );
              })}
            </Grid>
          </CardLayout>
        ) : (
          false
        )}
      </Grid>
    </React.Fragment>
  );
};
export default FuelAndWeights;

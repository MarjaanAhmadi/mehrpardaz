import React, { useState, useEffect } from "react";
import moment from "moment";
import DateAndTimePickers from "../../../../app/routes/components/routes/pickers/dateTime/DateAndTimePickers";
import FormControl from "@material-ui/core/FormControl";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Post, Retrieve, Patch, List } from "DataManager/DataManager";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const useStyles = makeStyles({
  btnRoot: {
    direction: "rtl",
  },
  radioTop: {
    marginTop: "2.2rem",
  },
  rootPicker: {
    marginTop: 16,
  },
});

const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    airline: {},
    fleet: {},
    flight_number: "",
    origin: "",
    on_block_time: new Date(),
    off_block_time: new Date(),
    takeoff_time: new Date(),
    landing_time: new Date(),
    adult_pax: 0,
    child_pax: 0,
    infant_pax: 0,
    cargo_baggage: "",
    route: "",
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });
  const [fleets, setFleets] = useState({
    list: [],
  });
  const [aircrafts, setAircrafts] = useState({
    list: [],
  });
  async function craeteFlight() {
    try {
      let data = form;

      data["on_block_time"] = form.on_block_time;
      data["off_block_time"] = form.off_block_time;
      data["takeoff_time"] = form.takeoff_time;
      data["landing_time"] = form.landing_time;

      const response = await Post("flights", data);
      if (response.data.error) {
        setError({
          ...error,
          hasError: true,
          errorMsg: response.data.error,
        });
      } else {
        setSuccess({
          ...success,
          hasSuccess: true,
          successMsg: "Flight Created Successfully",
        });
        props.getFlights();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editFlight() {
    try {
      await Patch("flights", form, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Flight Edited Successfully",
      });
      props.getFlights();
    } catch (error) {
      console.log(error);
    }
  }

  async function getFlight() {
    try {
      const response = await Retrieve("flights", props.id);

      if (response) {
        let fleet = null;
        let aircraft = null;
        if (response.fleet !== null && response.fleet !== undefined) {
          fleet = response.fleet;
        }

        if (response.airline !== null) {
          aircraft = response.airline;
        }
        const on_block_time = moment
          .unix(response.on_block_time)
          .format("YYYY-MM-DD HH:mm:ss");
        const off_block_time = moment
          .unix(response.off_block_time)
          .format("YYYY-MM-DD HH:mm:ss");
        const takeoff_time = moment
          .unix(response.takeoff_time)
          .format("YYYY-MM-DD HH:mm:ss");
        const landing_time = moment
          .unix(response.landing_time)
          .format("YYYY-MM-DD HH:mm:ss");
        // const created_time = moment.unix(response.created_time).format('YYYY-MM-DD HH:mm:ss');
        // const updated_time = moment.unix(response.updated_time).format('YYYY-MM-DD HH:mm:ss');

        setForm({
          ...form,
          flight_number: response.flight_number,
          origin: response.origin,
          destination: response.destination,
          on_block_time: on_block_time,
          off_block_time: off_block_time,
          takeoff_time: takeoff_time,
          landing_time: landing_time,
          fleet: fleet !== null ? fleet : null,
          airline: aircraft !== null ? aircraft : null,
          adult_pax: response.adult_pax,
          child_pax: response.child_pax,
          infant_pax: response.infant_pax,
          cargo_baggage: response.cargo_baggage,
          route: response.route,
        });
      }
    } catch (error) {}
  }
  async function getFleets() {
    try {
      const response = await List(
        "fleets",
        undefined,
        10,
        0,
        undefined,
        undefined
      );
      setFleets({
        ...fleets,
        list: response,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async function getAirlines() {
    try {
      const response = await List(
        "airlines",
        undefined,
        10,
        0,
        undefined,
        undefined
      );
      setAircrafts({
        ...aircrafts,
        list: response,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAirlines();
    getFleets();
    if (props.edit) {
      getFlight();
    }
  }, []);

  function onInputChange(event) {
    const { name, value } = event.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const onDateChange = (name) => (date) => {
    setForm({
      ...form,
      [name]: date,
    });
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6} sm={6}>
          <FormControl className="w-100 mb-2">
            <InputLabel>Fleet</InputLabel>
            <Select
              value={form.fleet}
              name="fleet"
              onChange={onInputChange}
              input={<Input id="ageSimple1" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {fleets.list.length > 0
                ? fleets.list.map((fleet, idx) => {
                    return (
                      <MenuItem key={idx} value={fleet.id}>
                        {fleet.msn}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
          <FormControl className="w-100 mb-2">
            <InputLabel>Related Airline</InputLabel>
            <Select
              value={form.airline}
              name="airline"
              onChange={onInputChange}
              input={<Input id="ageSimple1" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {aircrafts.list.length > 0
                ? aircrafts.list.map((aircraft, idx) => {
                    return (
                      <MenuItem key={idx} value={aircraft.id}>
                        {aircraft.name}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">flight_number</InputLabel>
            <Input
              type="text"
              name="flight_number"
              value={form.flight_number}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Origin</InputLabel>
            <Input
              type="text"
              name="origin"
              value={form.origin}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Destination</InputLabel>
            <Input
              type="text"
              name="destination"
              value={form.destination}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Tination</InputLabel>
              <Input
                type="text"
                value={form.tination}
                onChange={(event) => {
                  setForm({
                    ...form,
                    tination: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid> */}
        <Grid item xs={6} sm={6}>
          <FormControl className={classes.rootPicker}>
            <DateAndTimePickers
              setPublishedTime={onDateChange("on_block_time")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl className={classes.rootPicker}>
            <DateAndTimePickers
              setPublishedTime={onDateChange("off_block_time")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl className={classes.rootPicker}>
            <DateAndTimePickers
              setPublishedTime={onDateChange("takeoff_time")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl className={classes.rootPicker}>
            <DateAndTimePickers
              setPublishedTime={onDateChange("landing_time")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Adult Pax</InputLabel>
            <Input
              type="text"
              name="adult_pax"
              value={form.adult_pax}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Child Pax</InputLabel>
            <Input
              type="text"
              name="child_pax"
              value={form.child_pax}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Infant Pax</InputLabel>
            <Input
              type="text"
              value={form.infant_pax}
              name="infant_pax"
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Cargo Baggage</InputLabel>
            <Input
              type="text"
              value={form.cargo_baggage}
              name="cargo_baggage"
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Route</InputLabel>
            <Input
              type="text"
              name="route"
              value={form.route}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Paths</InputLabel>
              <Input
                type="text"
                value={form.paths}
                onChange={(event) => {
                  setForm({
                    ...form,
                    paths: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid> */}
      </Grid>
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteFlight : editFlight}
          variant="contained"
          color="primary"
          className="jr-btn text-white"
        >
          {!props.edit ? "Create" : "Edit"}
        </Button>
      </div>
      {error.hasError && NotificationManager.error(error.errorMsg)}
      <NotificationContainer />
      {success.hasSuccess && NotificationManager.success(error.successMsg)}
      <NotificationContainer />
    </React.Fragment>
  );
};
export default CreateOrEdit;

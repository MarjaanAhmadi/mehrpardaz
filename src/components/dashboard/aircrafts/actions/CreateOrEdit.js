import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Post, Retrieve, Patch } from "DataManager/DataManager";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const useStyles = makeStyles({
  btnRoot: {
    direction: "rtl",
  },
  radioTop: {
    marginTop: "2.2rem",
  },
});

const fieldsKeys = [
  "model_name",
  "model_no",
  "model_version",
  "engine_count",
  "engine_type",
  "aircraft_desc",
  "description",
  "wtc",
  "tdesig",
  "manufacturer_code",
  "type",
  "apc",
  "recat_eu",
  "wing_span",
  "wing_position",
  "length",
  "height",
  "power_plant",
  "engine_position",
  "tail_configuration",
  "landing_gear",
  "recognition_similarity",
];

const fields = fieldsKeys.reduce((acc, field) => {
  return { ...acc, [field]: "" };
}, {});

// const InputCreator = (props) => {
//   const { name, value, onChange } = props;
//   return (
//     <Grid item xs={6} sm={6}>
//       <FormControl>
//         <InputLabel htmlFor="position-top">Model Name</InputLabel>
//         <Input type="text" name={name} value={value} onChange={onChange} />
//       </FormControl>
//     </Grid>
//   );
// };

const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState(fields);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });

  const craeteAircraft = async () => {
    try {
      let data = form;
      const response = await Post("aircrafts", data);
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
          successMsg: "Aircraft Created Successfully",
        });
        props.getAircrafts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editAircraft = async () => {
    try {
      const data = form;
      await Patch("aircrafts", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Aircraft Created Successfully",
      });
      props.getAircrafts();
    } catch (error) {
      console.log(error);
    }
  };

  const getAircraft = async () => {
    try {
      const response = await Retrieve("aircrafts", props.id);

      console.log(response);
      setForm({
        ...form,
        model_name: response.model_name,
        model_no: response.model_no,
        model_version: response.model_version,
        engine_count: response.engine_count,
        engine_type: response.engine_type,
        aircraft_desc: response.aircraft_desc,
        description: response.description,
        wtc: response.wtc,
        tdesig: response.tdesig,
        manufacturer_code: response.manufacturer_code,
        type: response.type,
        apc: response.apc,
        recat_eu: response.recat_eu,
        wing_span: parseInt(response.wing_span),
        wing_position: response.wing_position,
        length: parseInt(response.length),
        height: response.height,
        power_plant: response.power_plant,
        engine_position: response.engine_position,
        tail_configuration: parseInt(response.tail_configuration),
        landing_gear: response.landing_gear,
        recognition_similarity: response.recognition_similarity,
      });
    } catch (error) {}
  };

  function onInputChange(event) {
    const { name, value } = event.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  }

  useEffect(() => {
    if (props.edit) getAircraft();
  }, []);

  return (
    <React.Fragment>
      {form !== undefined ? (
        <Grid container>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Model Name</InputLabel>
              <Input
                type="text"
                name="model_name"
                value={form.model_name}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Model Number</InputLabel>
              <Input
                type="text"
                name="model_no"
                value={form.model_no}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Model Version</InputLabel>
              <Input
                type="text"
                name="model_version"
                value={form.model_version}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Engine Count</InputLabel>
              <Input
                type="number"
                value={form.engine_count}
                name="engine_count"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Engine Type</InputLabel>
              <Input
                type="text"
                name="engine_type"
                value={form.engine_type}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">
                Aircraft Description
              </InputLabel>
              <Input
                type="text"
                value={form.aircraft_desc}
                name="aircraft_desc"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Description</InputLabel>
              <Input
                type="text"
                value={form.description}
                name="description"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">WTC</InputLabel>
              <Input
                type="text"
                value={form.wtc}
                name="wtc"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Tdesig</InputLabel>
              <Input
                type="text"
                value={form.tdesig}
                name="tdesig"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Manufacturer Code</InputLabel>
              <Input
                type="text"
                name="manufacturer_code"
                value={form.manufacturer_code}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Type</InputLabel>
              <Input
                type="text"
                value={form.type}
                name="type"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">APC</InputLabel>
              <Input
                type="text"
                value={form.apc}
                name="apc"
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Recat EU</InputLabel>
              <Input
                type="text"
                name="recat_eu"
                value={form.recat_eu}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Wing Span</InputLabel>
              <Input
                type="number"
                value={form.wing_span}
                onChange={(event) => {
                  setForm({
                    ...form,
                    wing_span: parseInt(event.target.value),
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Length</InputLabel>
              <Input
                type="number"
                value={form.length}
                onChange={(event) => {
                  setForm({
                    ...form,
                    length: parseInt(event.target.value),
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Height</InputLabel>
              <Input
                type="text"
                name="height"
                value={form.height}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Power Plant</InputLabel>
              <Input
                type="text"
                name="power_plant"
                value={form.power_plant}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Wing Position</InputLabel>
              <Input
                type="text"
                name="wing_position"
                value={form.wing_position}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Engine Position</InputLabel>
              <Input
                type="text"
                name="engine_position"
                value={form.engine_position}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Tail Configuration</InputLabel>
              <Input
                type="number"
                value={form.tail_configuration}
                onChange={(event) => {
                  setForm({
                    ...form,
                    tail_configuration: parseInt(event.target.value),
                  });
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">Landing Gear</InputLabel>
              <Input
                type="text"
                name="landing_gear"
                value={form.landing_gear}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">
                Recognition Similarity
              </InputLabel>
              <Input
                type="text"
                name="recognition_similarity"
                value={form.recognition_similarity}
                onChange={onInputChange}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Path</InputLabel>
            <Input
              type="text"
              value={form.path}
              onChange={(event) => {
                setForm({
                  ...form,
                  path: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid> */}
        </Grid>
      ) : null}
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteAircraft : editAircraft}
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

import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Post, Retrieve, Patch } from "DataManager/DataManager";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import axiosInstance from "config/axios/axiosInstance";
import useValidation from "dHooks/useValidation";
import { fields, fieldsNames } from "./fields";
import * as R from "ramda";

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

const FieldSelect = (props) => {
  const { items, classes, name, value, onChange, showKey, placeHolder } = props;

  function handleChange(e) {
    const { name, value } = e.target;

    onChange((prev) => ({ ...prev, [name]: value }));
    // onChange(e.target.value);
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Grid item xs={6} sm={6} style={{ margin: "1rem 0rem" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{placeHolder}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={value}
          name={name}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => {
            return (
              <div className={classes.chips}>
                {selected.map((id) => {
                  const item = R.find(R.propEq("id", id))(items);
                  return (
                    <Chip
                      className={classes.chip}
                      key={item.id}
                      label={item[showKey]}
                    />
                  );
                })}
              </div>
            );
          }}
          MenuProps={MenuProps}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item[showKey]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

const FieldInput = (props) => {
  const { field, error, value, onChange, onHourChange } = props;
  const { name, validationType } = field;
  return (
    <Grid item xs={3} sm={3} style={{ margin: "1rem 1rem" }}>
      <FormControl>
        <InputLabel style={{ color: error && "red" }} htmlFor="position-top">
          {name}
        </InputLabel>
        <Input
          name={name}
          type={validationType}
          value={value}
          onChange={onChange}
        />
        {error && (
          <div style={{ color: "red" }} htmlFor="position-bottom">
            {error}
          </div>
        )}
      </FormControl>
    </Grid>
  );
};

const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    ...fieldsNames,
    tanked_fuel: [],
    landings: [],
  });
  const { errors, checkFiled, checkValidation } = useValidation({
    data: fields,
    key: "journey-log",
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });
  const [selects, setSelects] = useState({
    tanked_fuel: [],
    landings: [],
  });
  const [loading, setLoading] = useState(true);

  const createJourneyLog = async () => {
    const valid = await checkValidation(form);
    console.log("createNavLog -> valid", valid);
    if (!valid) return "";
    try {
      let data = form;

      const response = await Post("journeylogs", data);
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
          successMsg: "Nav Log Created Successfully",
        });
        props.getJourneyLogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editJourneyLog = async () => {
    const valid = await checkValidation(form);
    console.log("createNavLog -> valid", valid);
    if (!valid) return "";
    try {
      const data = form;
      const response = await Patch("journeylogs", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Nav Log Created Successfully",
      });
      props.getJourneyLogs();
    } catch (error) {
      console.log(error);
    }
  };

  const getJourneyLog = async () => {
    try {
      const response = await Retrieve("journeylogs", props.id);
      const createKeyVal = (obj) => (acc, field) => {
        const { validationType, name } = field;
        let value = obj[name];
        if (validationType === "number") {
          if (!value) value = 0;
          return { ...acc, [name]: Number(value) };
        }

        return { ...acc, [name]: value || "" };
      };
      const vals = R.reduce(createKeyVal(response), {}, fields);

      setForm({
        ...form,
        ...vals,
      });
    } catch (error) {}
  };

  function onInputChange(e) {
    const { name, value } = e.target;
    checkFiled(name, value);
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    async function fetchData() {
      const resTank = await axiosInstance.get("/tanked-fuel");
      if (resTank.status !== 200) return "";
      const resLandings = await axiosInstance.get("/tanked-fuel");
      if (resLandings.status !== 200) return "";

      setSelects({
        tanked_fuel: resTank.data.message,
        landings: resLandings.data.message,
      });

      setLoading(false);
    }
    if (props.edit) getJourneyLog();
    fetchData();
  }, []);
  if (loading) return "wait...";
  return (
    <React.Fragment>
      {form !== undefined ? (
        <Grid container>
          {fields.map((field) => {
            const { name } = field;
            return (
              <FieldInput
                field={field}
                key={field.name}
                error={errors[name]}
                value={form[name]}
                onChange={onInputChange}
              />
            );
          })}
          <FieldSelect
            classes={classes}
            name={"tanked_fuel"}
            items={selects.tanked_fuel}
            value={form.tanked_fuel}
            onChange={setForm}
            showKey={"id"}
            placeHolder={"select Tank"}
          />
          <FieldSelect
            classes={classes}
            name={"landings"}
            items={selects.landings}
            value={form.landings}
            onChange={setForm}
            showKey={"id"}
            placeHolder={"select landings"}
          />
        </Grid>
      ) : null}
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? createJourneyLog : editJourneyLog}
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

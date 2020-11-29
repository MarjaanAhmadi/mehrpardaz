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
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import useValidation from "dHooks/useValidation";
import * as R from "ramda";
import { fields, fieldsNames, keys } from "./fields";

const useStyles = makeStyles({
  btnRoot: {
    direction: "rtl",
  },
  radioTop: {
    marginTop: "2.2rem",
  },
});

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
  const [form, setForm] = useState(fieldsNames);

  const { errors, checkFiled, checkValidation } = useValidation({
    data: fields,
    key: "nav-log",
  });

  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });

  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });

  const createNavLog = async () => {
    const valid = await checkValidation(form);
    console.log("createNavLog -> valid", valid);
    if (!valid) return "";
    try {
      let data = form;
      const response = await Post("navlogs", data);
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
        props.getNavLogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editNavLog = async () => {
    const valid = await checkValidation(form);
    console.log("createNavLog -> valid", valid);
    if (!valid) return "";
    try {
      const data = form;
      const response = await Patch("navlogs", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Nav Log Created Successfully",
      });
      await props.getNavLogs();
    } catch (error) {
      console.log(error);
    }
  };

  const getNavLog = async () => {
    try {
      const response = await Retrieve("navlogs", props.id);

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
      console.log("getNavLog -> vals", vals);

      // const newVals = R.reduce(getFromkeys);

      console.log(response);
      setForm({
        // ...form,
        // ...fields,
        // //
        // awy_plnd: response.awy_plnd,
        // moca_plnd: response.moca_plnd,
        // wpt_plnd: response.wpt_plnd,
        // frq_plnd: response.frq_plnd,
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
    if (props.edit) getNavLog();
  }, []);

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
        </Grid>
      ) : null}
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? createNavLog : editNavLog}
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

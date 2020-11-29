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

const FieldInput = (props) => {
  const { field, error, value, onChange, onHourChange } = props;
  let { name, validationType } = field;
  if (validationType === "uuid") validationType = "string";
  return (
    <Grid item xs={3} sm={3} style={{ margin: "1rem 0rem" }}>
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

const FieldSelect = (props) => {
  const { items, classes, name, value, onChange, showKey, placeHolder } = props;

  function handleChange(e) {
    const { name, value } = e.target;
     ;
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
          value={value}
          name={name}
          onChange={handleChange}
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
// 'TOW', 'LW', 'ZFW'
const CreateOrEdit = (props) => {
  const { errors, checkFiled, checkValidation } = useValidation({
    data: fields,
    key: "landings",
  });
  const classes = useStyles();
  const [form, setForm] = useState({
    ...fieldsNames,
    captain: [],
  });
  const [alters, setAlter] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });

  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });

  const craeteLanding = async () => {
    const valid = await checkValidation(form);
     ;
    if (!valid) return "";
    try {
      let data = form;
       ;
      const response = await Post("landings", data);
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
          successMsg: "Landing Created Successfully",
        });
        props.getLandings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editLanding = async () => {
    const valid = await checkValidation(form);
    if (!valid) return "";
    try {
      const data = form;
      const response = await Patch("landings", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Landing Created Successfully",
      });
      props.getLandings();
    } catch (error) {
      console.log(error);
    }
  };

  const getLanding = async () => {
    try {
      const response = await Retrieve("landings", props.id);

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
      const response = await axiosInstance.get("/users");
      if (response.status !== 200) return "";
       ;
      setAlter(response.data.message);
      console.log(response);
      setLoading(false);
    }
    if (props.edit) getLanding();
    fetchData();
  }, []);

  if (Loading) return "wait ... ";

  return (
    <React.Fragment>
      <button
        onClick={() => {
          console.log(form);
        }}
      >
        showForm
      </button>
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
            name={"captain"}
            items={alters}
            value={form.captain}
            onChange={setForm}
            showKey={"username"}
            placeHolder={"Select captain for landing"}
          />
        </Grid>
      ) : null}
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteLanding : editLanding}
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

const FormInput = (props) => {
  const { name, onFieldChange, value, error } = props;
  return (
    <Grid item xs={6} sm={6} style={{ marginTop: "3rem" }}>
      <FormControl>
        <InputLabel style={{ color: error && "red" }} htmlFor="position-top">
          {name}
        </InputLabel>
        <Input
          type="number"
          name={name}
          value={value}
          onChange={onFieldChange}
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
export default CreateOrEdit;

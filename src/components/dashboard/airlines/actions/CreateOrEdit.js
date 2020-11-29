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

const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    name: "",
    logo: "",
    owner_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });

  const craeteAirline = async () => {
    try {
      let data = form;
      const response = await Post("airlines", data);
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
          successMsg: "Airline Created Successfully",
        });
        props.getAirlines();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editAirline = async () => {
    try {
      const data = form;
      await Patch("airlines", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Airline Created Successfully",
      });
      props.getAirlines();
    } catch (error) {
      console.log(error);
    }
  };

  const getAirline = async () => {
    try {
      const response = await Retrieve("airlines", props.id);

      console.log(response);
      setForm({
        ...form,
        name: response.name,
        logo: response.logo,
        owner_name: response.owner_name ? response.owner_name : "-",
        email: response.email ? response.email : "-",
        address: response.address ? response.address : "-",
        phone: response.phone ? response.phone : "-",
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (props.edit) getAirline();
  }, []);

  function onInputChange(event) {
    const { name, value } = event.target.value;
    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Name</InputLabel>
            <Input
              name="name"
              type="text"
              value={form.name}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Logo</InputLabel>
            <Input
              type="text"
              name="logo"
              value={form.logo}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Owner Name</InputLabel>
            <Input
              type="text"
              name="owner_name"
              value={form.owner_name}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Email</InputLabel>
            <Input
              type="text"
              name="email"
              value={form.email}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">address</InputLabel>
            <Input
              type="text"
              name="address"
              value={form.address}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">phone</InputLabel>
            <Input
              type="text"
              name="phone"
              value={form.phone}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
      </Grid>
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteAirline : editAirline}
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

import React, { useState, useEffect } from "react";
import moment from "moment";
import DateAndTimePickers from "../../../../app/routes/components/routes/pickers/dateTime/DateAndTimePickers";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
    title: "",
    description: "",
    publisher: {},
    published_time: new Date(),
    is_seen: false,
    is_flagged: false,
    text: "",
    status: "",
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });
  const [users, setUsers] = useState({
    list: [],
  });

  async function craeteNotification() {
    try {
      let data = form;

      data["published_time"] = moment(form.published_time.toDate()).format("X");
      const response = await Post("notifications", data);
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
          successMsg: "Notification Created Successfully",
        });
        props.getNotifications();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function editNotification() {
    try {
      const data = form;
      data["published_time"] = moment(form.published_time.toDate()).format("X");

      await Patch("notifications", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Notification Edited Successfully",
      });
      props.getNotifications();
    } catch (error) {
      console.log(error);
    }
  }

  async function getNotification() {
    try {
      const userLi = await getUsers();
      const response = await Retrieve("notifications", props.id);

      if (response) {
        const publisher = userLi.filter(
          (i) => i.id === response.publisher.id
        )[0];
        const time = moment
          .unix(response.published_time)
          .format("YYYY-MM-DD HH:mm:ss");
        setForm({
          ...form,
          title: response.title,
          publisher: publisher.id,
          description: response.description,
          published_time: time,
          is_seen: response.is_seen,
          is_flagged: response.is_flagged,
          text: response.text,
          status: response.status,
        });
      }
    } catch (error) {}
  }
  async function getUsers() {
    try {
      const response = await List(
        "users",
        undefined,
        0,
        10,
        undefined,
        undefined
      );
      setUsers({
        ...users,
        list: response,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  function setPublishedTime(date) {
    setForm({
      ...form,
      published_time: date,
    });
  }

  useEffect(() => {
    if (props.edit) {
      getNotification();
    } else getUsers();
  }, []);

  function onInputChange(event) {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const onCheckBoxChange = (name) => (e, checked) => {
    setForm({ ...form, [name]: checked });
  };

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Title</InputLabel>
            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Text</InputLabel>
            <Input
              type="text"
              name="text"
              value={form.text}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Status</InputLabel>
            <Input
              type="text"
              name="status"
              value={form.status}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Description</InputLabel>
            <Input
              type="text"
              name="description"
              value={form.description}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
          <FormControl className="w-100 mb-2">
            <InputLabel>Publisher(User)</InputLabel>
            <Select
              name="publisher"
              value={form.publisher}
              onChange={onInputChange}
              input={<Input id="ageSimple1" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {users.list.length > 0
                ? users.list.map((user, idx) => {
                    return (
                      <MenuItem key={idx} value={user.id}>
                        {user.username}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={6}>
          <FormControl className={classes.rootPicker}>
            <DateAndTimePickers setPublishedTime={setPublishedTime} />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} className={classes.radioTop}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={form.is_seen}
                onChange={onCheckBoxChange("is_seen")}
                value={form.is_seen}
              />
            }
            label="Is Seen?"
          />
        </Grid>
        <Grid item xs={6} sm={6} className={classes.radioTop}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={form.is_flagged}
                onChange={onCheckBoxChange("is_flagged")}
                value={form.is_flagged}
              />
            }
            label="Is Flagged?"
          />
        </Grid>
      </Grid>
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteNotification : editNotification}
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

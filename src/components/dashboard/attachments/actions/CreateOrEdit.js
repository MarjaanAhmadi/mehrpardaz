import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Post, Retrieve, Patch, List } from "DataManager/DataManager";
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
  const [users, setUsers] = useState({
    list: [],
  });
  const [form, setForm] = useState({
    title: "",
    uuid: "",
    related_user: {},
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });
  const getUsers = async () => {
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
  };

  const craeteAttachment = async () => {
    try {
      let data = form;
      const response = await Post("attachments", data);
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
          successMsg: "Attachment Created Successfully",
        });
        props.getAttachments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editAttachment = async () => {
    try {
      const data = form;
      await Patch("attachments", data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "Attachment Created Successfully",
      });
      props.getAttachments();
    } catch (error) {
      console.log(error);
    }
  };

  const getAttachment = async () => {
    try {
      const userLi = await getUsers();
      const response = await Retrieve("attachments", props.id);
      const cb = userLi.filter((i) => i.id === response.related_user.id)[0];

      console.log(response);
      setForm({
        ...form,
        title: response.title,
        uuid: response.uuid,
        related_user: cb.id,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (props.edit) getAttachment();
    else getUsers();
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
            <InputLabel htmlFor="position-top">UUID</InputLabel>
            <Input
              type="text"
              name="uid"
              value={form.uuid}
              onChange={onInputChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6}>
          <FormControl className="w-100 mb-2">
            <InputLabel>Related User</InputLabel>
            <Select
              value={form.related_user}
              name="related_user"
              onChange={onInputChange}
              input={<Input id="ageSimple1" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {users.list !== undefined && users.list.length > 0
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
      </Grid>
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteAttachment : editAttachment}
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

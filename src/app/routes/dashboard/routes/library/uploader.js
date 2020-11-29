import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Post, Put, Retrieve, Patch, List } from "DataManager/DataManager";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import { setFileToFolder } from "./apis";

const useStyles = makeStyles({
  btnRoot: {
    direction: "rtl",
  },
  radioTop: {
    marginTop: "2.2rem",
  },
  folder: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
});

const CreateOrEdit = (props) => {
  const { curFolder, reset } = props;
  console.log(curFolder);
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });

  const [title, setTitle] = useState("");

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const craeteFile = async () => {
    try {
      const formData = new FormData();
      // Update the formData object
      formData.append("file", selectedFile);
      const response = await setFileToFolder(title, curFolder.id, formData);
      if (response.error) throw new Error("sth wrong");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        <React.Fragment>
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">File</InputLabel>
              <Input type="file" onChange={onFileChange} />
            </FormControl>
          </Grid>
          <div>title: </div>
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />

          <Grid item xs={6} sm={6}>
            <FormControl>
              {/* <InputLabel htmlFor="position-top">your file location</InputLabel> */}
              <div>{curFolder.title} </div>
            </FormControl>
          </Grid>
        </React.Fragment>
      </Grid>
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={craeteFile}
          variant="contained"
          color="primary"
          className="jr-btn text-white"
        >
          Create
        </Button>
      </div>
    </React.Fragment>
  );
};
export default CreateOrEdit;

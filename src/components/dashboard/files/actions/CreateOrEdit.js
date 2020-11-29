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
import { Put, Retrieve, Patch, List } from "DataManager/DataManager";
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
  folder: {
    width: 30,
    height: 30,
    marginTop: 20
  },
});

const CreateOrEdit = (props) => {
  const { initPath } = props;
  const classes = useStyles();
  const [users, setUsers] = useState({
    list: [],
  });
  const [form, setForm] = useState({
    filePath: initPath || "",
    public: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState({
    hasError: false,
    errorMsg: "",
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: "",
  });

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const craeteFile = async () => {
    try {
      const f = await onNewFolder();
       
      const formData = new FormData();

      // Update the formData object
      formData.append("file", selectedFile);
      formData.append("public", "no");
      formData.append("file_path", f);
      const response = await Put("file_managers", formData);
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
          successMsg: "File Created Successfully",
        });
        await props.getFiles(form.filePath);
        props.toggle();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editFile = async () => {
    try {
      const formData = new FormData();

      // Update the formData object
      formData.append("file", selectedFile);
      await Patch("file_managers", formData, props.editedId);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "File Edited Successfully",
      });
      await props.getFiles(form.filePath);
      props.toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await List(
        "users",
        undefined,
        100,
        0,
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

  const getFile = async () => {
    try {
       
      const userLi = await getUsers();
      const response = await Retrieve("file_managers", props.editedId);
      const cb = userLi.filter((i) => i._id === response.created_by._id)[0];
      setForm({
        ...form,
        filePath: response.file_path,
        filename: response.filename,
        public: response.public,
      });
    } catch (error) {}
  };

  const [checkForNewFolder, setCheckForNewFolder] = useState(false);

  function onCheck(e) {
    setCheckForNewFolder(!checkForNewFolder);
  }

  const [newFolder, setNewFolder] = useState("");

  const onNewFolder = async() => {
    setForm((prev) => ({ ...prev, filePath: `${prev.filePath}${newFolder}/` }));
     
    
    const filePath = newFolder !== "" ? `${form.filePath}${newFolder}/` : form.filePath;
     
    setCheckForNewFolder(false);
    return filePath;
  }

  useEffect(() => {
    if (props.edit) getFile();
  }, []);

  return (
    <React.Fragment>
      <Grid container>
        {!props.edit ? (
          <React.Fragment>
            <Grid item xs={6} sm={6}>
              <FormControl>
                <InputLabel htmlFor="position-top">File</InputLabel>
                <Input type="file" onChange={onFileChange} />
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={6}>
              <FormControl>
                <InputLabel htmlFor="position-top">File Path</InputLabel>
                <Input
                  readOnly
                  type="text"
                  value={form.filePath}
                  // onChange={(event) => {
                  //   setForm({
                  //     ...form,
                  //     filePath: event.target.value,
                  //   });
                  // }}
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={6} sm={6}>
              <FormControl>
                <InputLabel htmlFor="position-top">Public</InputLabel>
                <Input
                  type="text"
                  value={form.public}
                  onChange={(event) => {
                    setForm({
                      ...form,
                      public: event.target.value,
                    });
                  }}
                />
              </FormControl>
            </Grid> */}
              <Grid item xs={6} sm={6}>
              <img 
                className={classes.folder}
                src={require("assets/images/folder.png")}/>

                <FormControl>
                  <InputLabel htmlFor="position-top">
                    New Folder
                  </InputLabel>
                  <Input
                    type="text"
                    value={newFolder}
                    onChange={(e) => {
                      setNewFolder(e.target.value);
                    }}
                  />
                </FormControl>
              </Grid>
          </React.Fragment>
        ) : (
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">File</InputLabel>
              <Input type="file" onChange={onFileChange} />
            </FormControl>
          </Grid>
        )}
      </Grid>

      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
        <Button
          onClick={!props.edit ? craeteFile : editFile}
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

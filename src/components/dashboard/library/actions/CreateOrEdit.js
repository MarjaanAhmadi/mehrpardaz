import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import {
  uploadFolderToServer,
  setFileToFolder,
  getChildernsFromApi,
  addNewSrc,
} from "app/routes/dashboard/routes/library/apis";
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
    marginTop: 20,
  },
});

const CreateOrEdit = (props) => {
  const { initPath, edit } = props;
  const classes = useStyles();
  const [users, setUsers] = useState({
    list: [],
  });
  const [form, setForm] = useState({
    filePath: initPath || "",
    public: "",
  });
  const [uploadForm, setUploadForm] = useState({
    title: "",
    is_folder: false,
    parent: "",
    src: "",
  });
  const [folders, setFolderList] = useState({
    list: [],
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

  const uploadFolder = async () => {
    try {
      const response = await uploadFolderToServer(
        uploadForm.title,
        props.curFolder.id
      );

      await props.toggle();
      await props.reset();
    } catch (error) {}
  };
  const uploadFile = async () => {
    const f = await onNewFolder();

    const formData = new FormData();

    // Update the formData object
    formData.append("file", selectedFile);
    const response = await setFileToFolder(
      uploadForm.title,
      props.curFolder.id,
      formData,
      "post",
      null
    );

    await props.toggle();

    await props.reset();
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
  };

  const craeteFile = async () => {
    try {
      if (uploadForm.is_folder === true) await uploadFolder();
      else await uploadFile();
    } catch (error) {
      console.log(error);
    }
  };
  //
  const updateFolder = async () => {
    try {
      const data = {
        parent: uploadForm.parent,
        title: uploadForm.title,
      };

      const response = await Patch("library", data, props.editedId);

      props.toggle();
      props.reset();
    } catch (error) {}
  };

  const updateFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await addNewSrc(formData, props.editedId, ver);
      props.toggle();
      props.reset();
    } catch (error) {}
  };
  const [ver, setVer] = useState("1.0.0");

  const editFile = async () => {
    try {
      if (uploadForm.is_folder) {
        await updateFolder();
      } else {
        await updateFile();
      }
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: "File Edited Successfully",
      });
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

  const getFileOrFolder = async () => {
    try {
      const response = await Retrieve("library", props.editedId);
      props.publishStatus(response.is_published);
      setUploadForm({
        ...uploadForm,
        title: response.title,
        parent: response.parent.id,
        src: response.src,
        is_folder: response.is_folder,
        version: response.version || "1.0.0",
      });
    } catch (error) {}
  };

  const [checkForNewFolder, setCheckForNewFolder] = useState(false);

  function onCheck(e) {
    setCheckForNewFolder(!checkForNewFolder);
  }

  const [newFolder, setNewFolder] = useState("");

  const onNewFolder = async () => {
    setForm((prev) => ({ ...prev, filePath: `${prev.filePath}${newFolder}/` }));

    const filePath =
      newFolder !== "" ? `${form.filePath}${newFolder}/` : form.filePath;

    setCheckForNewFolder(false);
    return filePath;
  };

  const getFolderList = async () => {
    try {
      const response = await getChildernsFromApi(props.curFolder.id, true);
      setFolderList({
        ...folders,
        list: response.message,
      });
      // setFolderList({
      //   list:
      // })
    } catch (error) {}
  };
  useEffect(() => {
    if (props.edit) {
      getFileOrFolder();
      getFolderList();
    }
  }, []);

  return (
    <React.Fragment>
      <Grid className="mt-4" container>
        <Grid item xs={6} sm={6}>
          <FormControl>
            <InputLabel htmlFor="position-top">Title</InputLabel>
            <Input
              type="text"
              value={uploadForm.title}
              onChange={(event) => {
                setUploadForm({
                  ...uploadForm,
                  title: event.target.value,
                });
              }}
            />
          </FormControl>
        </Grid>
        {!props.edit ? (
          <Grid item xs={6} sm={6} className={classes.radioTop}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={uploadForm.is_folder}
                  onChange={(event, checked) => {
                    setUploadForm({ ...uploadForm, is_folder: checked });
                  }}
                  value={uploadForm.is_folder}
                />
              }
              label="Is Folder?"
            />
          </Grid>
        ) : (
          <Grid item xs={6} sm={6}>
            <FormControl className="w-100 mb-2">
              <InputLabel>Change version</InputLabel>
              <Input
                type="text"
                value={ver}
                onChange={(event) => {
                  setVer(event.target.value);
                }}
              />
              {/* <InputLabel>Change Folder</InputLabel> */}
              {/* <Select
                value={uploadForm.parent}
                onChange={(event) => {
                  setUploadForm({
                    ...uploadForm,
                    parent: event.target.value,
                  });
                }}
                input={<Input id="ageSimple1" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {folders.list.length > 0
                  ? folders.list.map((folder, idx) => {
                      return (
                        <MenuItem key={idx} value={folder.id}>
                          {folder.title}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select> */}
            </FormControl>
          </Grid>
        )}
        {!uploadForm.is_folder ? (
          <Grid item xs={6} sm={6}>
            <FormControl>
              <InputLabel htmlFor="position-top">File</InputLabel>
              <Input type="file" onChange={onFileChange} />
            </FormControl>
          </Grid>
        ) : null}
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

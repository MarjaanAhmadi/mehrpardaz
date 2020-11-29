import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFile } from "../../slice/libraryThunks";

export default function Uploader(props) {
  const dispatch = useDispatch();
  const { current } = props;
  console.log("Uploader -> current", current);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  // const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");

  function selectFile(e) {
    const { files } = e.target;
    setSelectedFiles(files);
    setCurrentFile(files[0]);
    setTitle(files[0].name);
  }

  function handleChange(e) {
    const { value } = e.target;
    setTitle(value);
  }

  async function upload() {
    let currentFile = selectedFiles[0];
    console.log("upload -> currentFile", currentFile);
    // setProgress(0);
    setCurrentFile(currentFile);

    dispatch(createFile(currentFile, current, title));

    // const response = await UploadService.upload(currentFile, link, (event) => {
    //   setProgress(Math.round((100 * event.loaded) / event.total))
    // })

    // setProgress(0);
    setSelectedFiles(undefined);
  }

  return (
    <div>
      {/* {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )} */}

      <TextField
        id="name"
        label="title"
        value={title}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />

      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={!currentFile}
        onClick={upload}
      >
        Upload
      </button>
    </div>
  );
}

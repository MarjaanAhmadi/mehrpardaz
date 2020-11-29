import React, { useState, useEffect } from "react";
// import CreateFile from "../actions/CreateFile";
import Tumbs from "./Tumbs";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { useDropzone } from "react-dropzone";
import Progress from "./../UIs/Progress";
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { createFile } from "../../slice/libraryThunks";
import TrashIcon from "@material-ui/icons/DeleteOutline";
// import Uploader from "./Uploader";
import { selContent } from "../../slice/librarySlice";
import { useDUploader } from "../UploaderBox/Uploader";
// import UploaderBox from "../UploaderBox/backup";

const useStyles = makeStyles({
  icon: {
    color: 'red',
    width: 24,
    height: 24,
    cursor: 'pointer',
    marginLeft: -25
  },
});

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

export default function FilesModal(props) {
  const testPortal = useDUploader();
  const { current } = useSelector(selContent);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { modal, closeModal } = props;
  const [titles, setTitles] = useState([]);

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          console.log(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  function onRemove(file) {
    const newFiles = files.filter(i => i !== file);
    setFiles(newFiles);
  }

  function toggle() {
    closeModal("file");
  }
  function closeToggle() {
    setFiles([]);
    toggle();
  }
  function handleUploadFile() {
    toggle();
    dispatch(createFile(files[0], current, titles[0]));
    setFiles([]);
  }

  const changeTitleWithIndex = (idx) => (value) => {
    if (titles.length - 1 < idx) {
      setTitles((prev) => R.append(value, prev));
    } else {
      setTitles((prev) => R.update(idx, value, prev));
    }
  };

  const Thumbs = files.map((file, idx) => (
    <React.Fragment>
    <Tumbs
        file={file}
        title={titles[idx] || ""}
        onTitleChange={changeTitleWithIndex(idx)}
        key={`${file.name}_modalFile`}
      />
      <div 
        onClick={() => {onRemove(file)}}
        className={classes.icon}>
        <TrashIcon />
      </div>
    </React.Fragment>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const [shower, setShower] = useState(false);

  return (
    <React.Fragment>
      <Modal className={classes.modal} size="sm" isOpen={modal} toggle={closeToggle}>
        <ModalHeader toggle={closeToggle}>Upload New File</ModalHeader>
        <ModalBody>
          {/* <Progress /> */}
          <div className="dropzone-card">
            <div className="dropzone">
              <div {...getRootProps({ className: "dropzone-file-btn" })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </div>
            <div className="dropzone-content" style={thumbsContainer}>
              {Thumbs}
            </div>
          </div>
          {/* <Uploader current={current} /> */}
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={closeToggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleUploadFile}>
            Upload
          </Button>
        </ModalFooter>
      </Modal>

      {/* <UploaderBox /> */}
    </React.Fragment>
  );
}

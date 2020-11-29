import React, { useState, useEffect } from "react";
import { Delete, Download } from "DataManager/DataManager";
import "./index.css";
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles({
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 5
  }
})

export default function FileModal(props) {
  
  const classes = useStyle();
  const { file, getFiles, toggle } = props;

  const [loader, setLoader] = useState(false);

  async function onFileDelete() {
    setLoader(true);
    try {
      await Delete("file_managers", file._id);
      await getFiles(file.file_path);
      toggle();
    } catch (error) {
      console.log(error);
    }

    setLoader(false);
  }

  if (loader) return <div class="loader"></div>;

  return (
    <>
      <div>Are you sure you want to delete this file?</div>
      <div className={classes.actions}>
        <Button
        className='mr-2'
        variant="contained" 
        color="primary"
        onClick={onFileDelete}>Yes</Button>
        <Button 
        variant="contained"
        color="secondary"
        onClick={() => {props.closeModal()}}>No</Button>
      </div>
    </>
  );
}

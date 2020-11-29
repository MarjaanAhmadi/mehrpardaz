import { TextField } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import Tumbs from './Tumbs';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};
const root = {
  padding : 8
}
const thumb = {
  display: 'flex',
  justifyContent: 'space-around',
  flexDirection: 'row',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function DropZone(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <Tumbs file={file} />
  ));
 

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="dropzone-card">
      <div className="dropzone">
        <div {...getRootProps({className: 'dropzone-file-btn'})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
      <div className="dropzone-content" style={thumbsContainer}>
        {thumbs}
      </div>
    </div>
  );
}

export default DropZone;
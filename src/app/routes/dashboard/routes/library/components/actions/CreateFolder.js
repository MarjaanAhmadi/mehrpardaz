import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import DropZone from "./DropZone";
const CreateFolder = (props) => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  return (
    <form className="row" noValidate autoComplete="off">
      <div className="col-12">
        <TextField
          id="name"
          label="Name"
          value={title}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
      </div>
    </form>
  );
};
export default CreateFolder;

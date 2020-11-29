import React, { useState } from "react";
// import CreateFolder from '../actions/CreateFolder';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { addNewFolder } from "app/routes/dashboard/routes/library/slice/libraryThunks";
import { selContent } from "app/routes/dashboard/routes/library/slice/librarySlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  modal: {
    width: 350,
  },
});
export default function NewContent(props) {
  const { modal, closeModal } = props;

  const classes = useStyles();
  const content = useSelector(selContent);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  function handleChange(e) {
    const { value } = e.target;
    setTitle(value);
  }

  function toggle() {
    closeModal("folder");
  }

  function closeToggle() {
    setTitle("");
    toggle();
  }

  function addFolder() {
    toggle();
    dispatch(addNewFolder(content.current, title));
    setTitle("");
  }

  return (
    <React.Fragment>
      <Modal className={classes.modal} size="sm" isOpen={modal} toggle={closeToggle}>
        <ModalHeader toggle={closeToggle}>Create New Folder</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button outline color="primary" onClick={closeToggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={addFolder}>
            Create
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

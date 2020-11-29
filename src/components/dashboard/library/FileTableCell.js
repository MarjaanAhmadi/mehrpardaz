import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete, Download } from "DataManager/DataManager";

const FileTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteFile = async () => {
    try {
      await Delete("file_managers", props.data.data._id);
      props.getFiles();
    } catch (error) {}
  };

  const onOptionMenuSelect = (event) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  };
  const handleRequestClose = (idx) => {
    if (idx !== null) {
      switch (idx) {
        case 0:
          props.openModal(props.data._id);
          //update
          break;
        case 2:
          props.deleteFile(props.data._id);
          //update
          break;
        default:
          break;
      }
    }
    setMenuState(false);
  };

  const download = async () => {
    try {
      const response = await Download("file_managers", props.data._id);
    } catch (error) {}
  };

  return (
    <tr tabIndex={-1} key={props.data._id}>
      <td>{props.data._id}</td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.file_path} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.public} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.src} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.filename} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.created_by.username} </h5>
        </div>
      </td>
      <td>
        <spna onClick={download}>Download File</spna>
      </td>
      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          onClick={deleteFile}
          menuState={menuState}
          anchorEl={anchorEl}
          handleRequestClose={(idx) => {
            handleRequestClose(idx);
          }}
        />
      </td>
    </tr>
  );
};

export default FileTableCell;

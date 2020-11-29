import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete } from "DataManager/DataManager";

const AttachmentTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  async function deleteAttachment() {
    try {
      await Delete("attachments", props.data.data.id);
      props.getAttachments();
    } catch (error) {}
  }

  function onOptionMenuSelect(event) {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }
  function handleRequestClose(idx) {
    if (idx !== null) {
      switch (idx) {
        case 0:
          props.openModal(props.data.id);
          //update
          break;
        case 2:
          props.deleteAttachment(props.data.id);
          //update
          break;
        default:
          break;
      }
    }
    setMenuState(false);
  }

  return (
    <tr tabIndex={-1} key={props.data.id}>
      <td>{props.data.id}</td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.title} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.uuid} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">
            {props.data.related_user !== null
              ? props.data.related_user.username
              : "-"}{" "}
          </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.created_time} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.phone} </h5>
        </div>
      </td>
      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          onClick={deleteAttachment}
          menuState={menuState}
          anchorEl={anchorEl}
          handleRequestClose={handleRequestClose}
        />
      </td>
    </tr>
  );
};

export default AttachmentTableCell;

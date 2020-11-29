import React, { useState } from "react";
// import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete } from "DataManager/DataManager";

const UserTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  async function deleteUser() {
    try {
      await Delete("user", props.data.data.id);
      props.getUsers();
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
           ;
          props.deleteUser(props.data.id);
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
      {/* <td>
          <div className="user-profile d-flex flex-row align-items-center">
            <Avatar
              alt={username}
              src={avatar}
              className="user-avatar"
            />
            
          </div>
        </td> */}
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.username} </h5>
        </div>
      </td>
      <td>{props.data.email}</td>
      <td className="status-cell text-right">
        <div
          className={` badge text-uppercase ${
            props.data.email_is_verified
              ? "text-white bg-success"
              : "text-white bg-danger"
          }`}
        >
          {props.data.email_is_verified ? "Yes" : "No"}
        </div>
      </td>
      <td className="status-cell text-right">
        <div
          className={` badge text-uppercase ${
            props.data.is_admin
              ? "text-white bg-success"
              : "text-white bg-danger"
          }`}
        >
          {props.data.is_admin ? "Yes" : "No"}
        </div>
      </td>
      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          onClick={deleteUser}
          menuState={menuState}
          anchorEl={anchorEl}
          handleRequestClose={handleRequestClose}
        />
      </td>
    </tr>
  );
};

export default UserTableCell;

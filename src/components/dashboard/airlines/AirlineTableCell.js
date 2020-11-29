import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete } from "DataManager/DataManager";

const AirlineTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteAirline = async () => {
    try {
      await Delete("airline", props.data.data.id);
      props.getAirlines();
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
          props.openModal(props.data.id);
          //update
          break;
        case 2:
          props.deleteAirline(props.data.id);
          //update
          break;
        default:
          break;
      }
    }
    setMenuState(false);
  };

  return (
    <tr tabIndex={-1} key={props.data.id}>
      <td>{props.data.id}</td>
      <td>
        <div className="user-profile d-flex flex-row align-items-center">
          <Avatar
            alt={props.data.name}
            src={props.data.logo}
            className="user-avatar"
          />
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.name} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.owner_name} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.email} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.address} </h5>
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
          onClick={deleteAirline}
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

export default AirlineTableCell;

import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete } from "DataManager/DataManager";

const FleetTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  async function deleteFleet() {
    try {
      await Delete("fleets", props.data.data.id);
      props.getFleets();
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
          props.deleteFleet(props.data.id);
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
          <h5 className="user-name">{props.data.aircraft.model_no} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.registration} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.msn} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.capacity.bussiness} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.capacity.economy} </h5>
        </div>
      </td>
      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          onClick={deleteFleet}
          menuState={menuState}
          anchorEl={anchorEl}
          handleRequestClose={handleRequestClose}
        />
      </td>
    </tr>
  );
};

export default FleetTableCell;

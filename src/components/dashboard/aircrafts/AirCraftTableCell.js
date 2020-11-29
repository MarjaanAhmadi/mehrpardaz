import React, { useState } from "react";
// import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete } from "DataManager/DataManager";

const AircraftTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  async function deleteAircraft() {
    try {
      await Delete("aircraft", props.data.data.id);
      props.getAircrafts();
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
        case 1:
          props.openDetailedLog(props.data.id);
          break;
        case 2:
          props.deleteAircraft(props.data.id);
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
          <h5 className="user-name">{props.data.model_no} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.model_name} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.engine_count} </h5>
        </div>
      </td>
      <td>
        <div className="user-detail">
          <h5 className="user-name">{props.data.engine_type} </h5>
        </div>
      </td>
      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          onClick={deleteAircraft}
          menuState={menuState}
          anchorEl={anchorEl}
          handleRequestClose={handleRequestClose}
        />
      </td>
    </tr>
  );
};

export default AircraftTableCell;

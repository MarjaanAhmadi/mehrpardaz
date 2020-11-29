import React, { useState } from "react";
// import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete } from "DataManager/DataManager";

const FuelAlternativesTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteFuelAlternative = async () => {
    try {
      await Delete("fuel-alternatives", props.data.data.id);
      props.getFuelAlternatives();
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
          props.deleteFuelAlternative(props.data.id);
          //delete
          break;

        case 1:
          props.openDetailedLog(props.data.id);
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
          <h5 className="user-name">{props.data.alternative_f_icao} </h5>
        </div>
      </td>
      <td>{props.data.alternative_f_rvsd}</td>
      <td>{props.data.alternative_f_plnd}</td>
      <td>{props.data.alternative_f_time}</td>
      <td>{props.data.created_by}</td>
      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          fuelAlternative={true}
          onClick={deleteFuelAlternative}
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

export default FuelAlternativesTableCell;

import React, { useState } from "react";
// import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete, List } from "DataManager/DataManager";

const TankedFuelTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteTankedFuel = async () => {
    try {
      await Delete("tanked-fuel", props.data.data.id);
      props.getTankedFuels();
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
          props.deleteTankedFuel(props.data.id);
          //delete
          break;

        case 1:
          props.openDetailedLog(props.data.id);
          break;
        case 4:
          props.openAddAtachmentModal(props.data.id);
          break;
        case 3:
          props.removeAttachment(props.data.id);
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
      <td>{props.data.kgs}</td>
      <td>{props.data.rct_no}</td>
      <td>{props.data.created_time}</td>

      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          landing={true}
          onClick={deleteTankedFuel}
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

export default TankedFuelTableCell;

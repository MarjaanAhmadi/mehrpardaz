import React, { useState } from "react";
// import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";

import CardMenu from "../Common/CardMenu";
import { Delete, List } from "DataManager/DataManager";

const LandingTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteLanding = async () => {
    try {
      await Delete("landing", props.data.data.id);
      props.getLandings();
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
          props.deleteLanding(props.data.id);
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
      <td>{props.data.captain}</td>
      <td>{props.data.day}</td>
      <td>{props.data.night}</td>
      <td>{props.user !== undefined ? props.user.username : ""}</td>
      <td>{props.data.created_time}</td>

      <td className="text-right">
        <IconButton onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-more-vert" />
        </IconButton>
        <CardMenu
          landing={true}
          onClick={deleteLanding}
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

export default LandingTableCell;

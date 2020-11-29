import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IntlMessages from "util/IntlMessages";

const CardMenu = (props) => {
  const { flightData } = props;
  const options = [
    <IntlMessages id="popup.updateData" />,
    <IntlMessages id="popup.detailedLog" />,
    // <IntlMessages id="popup.statistics" />,
    <IntlMessages id="popup.clearData" />,
  ];
  if (props.flight) {
    options.push(<IntlMessages id="popup.removeFlightAttachment" />);
    options.push(<IntlMessages id="popup." />);
  }
  const { menuState, anchorEl, handleRequestClose } = props;

  const onHandleClose = (id) => () => handleRequestClose(id);
  return (
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      open={menuState}
      onClose={onHandleClose(null)}
      MenuListProps={{
        style: {
          width: 150,
          paddingTop: 0,
          paddingBottom: 0,
        },
      }}
    >
      {options.map((option, idx) => (
        <MenuItem key={option} onClick={onHandleClose(idx)}>
          {option}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CardMenu;

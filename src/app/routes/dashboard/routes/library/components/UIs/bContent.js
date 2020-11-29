import React, { useState } from "react";
import { Card, CardBody, CardImg, CardSubtitle } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import EditInput from "app/routes/dashboard/routes/library/components/UIs/EditInput.";
// import CardMenu from "./CardMenu";
import IconButton from "@material-ui/core/IconButton";
import IntlMessages from "util/IntlMessages";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";

import {
  changeCurFolderByContent,
  deleteContent,
} from "app/routes/dashboard/routes/library/slice/libraryThunks";

import * as R from "ramda";

const useStyles = makeStyles({
  more: {
    position: "absolute",
    right: 16,
  },
  image: {
    display: "flex",
    width: 60,
    alignSelf: "center",
    margin: "8px 8px 0",
  },
  divider: {
    marginBottom: 22,
  },
  title: {
    color: "#364a63",
    textAlign: "center",
  },
  icon: {
    marginLeft: 4,
    color: "#364a63",
  },
});

const FolderManagerCard = (props) => {
  const dispatch = useDispatch();
  const { image, title, subTitle, type, content, current } = props;

  const classes = useStyles();

  const [inputStatus, setInputStatus] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  function HandleInputStatus() {
    setInputStatus(!inputStatus);
  }

  const [name, setName] = useState(title);
  function handleChange(e) {
    const { value } = e.target;
    setName(value);
  }

  function handleRequestClose(idx, folder) {
    if (idx !== null) {
      switch (idx) {
        case 2:
          break;
        default:
          break;
      }
    }
    setMenuState(false);
  }
  function onOptionMenuSelect(event) {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  }

  const handleIconClick = (type) => () => {
    switch (type) {
      case "folder":
        dispatch(changeCurFolderByContent(content, "push"));
        break;

      default:
        break;
    }
  };

  const onAction = (action) => () => {
    switch (action) {
      case "delete":
        // console.log(content);
        setMenuState(false);
        dispatch(deleteContent(content, current));
        break;

      default:
        break;
    }
  };

  let options = [
    [<IntlMessages id="popup.updateData" />, onAction("edit")],
    [<IntlMessages id="popup.detailedLog" />, onAction("detail")],
    [<IntlMessages id="popup.clearData" />, onAction("delete")],
  ];
  if (type === "folder") options = R.tail(options);

  return (
    <Card className="shadow border-0">
      <IconButton className={classes.more} onClick={onOptionMenuSelect}>
        <i className="zmdi zmdi-more-vert" />
      </IconButton>
      <CardImg
        className={classes.image}
        top
        src={image}
        width="50px"
        alt="Card image cap"
        onClick={handleIconClick(type)}
      />
      <CardBody>
        <div className="d-flex justify-content-center">
          {!inputStatus ? (
            <h3 className={`card-title ${classes.title}`}>{name}</h3>
          ) : (
            <EditInput onChange={handleChange} value={name} />
          )}
          <EditIcon
            size="small"
            onClick={HandleInputStatus}
            className={classes.icon}
          />
        </div>

        <Divider className={classes.divider} />
        {subTitle && <CardSubtitle>{subTitle}</CardSubtitle>}
      </CardBody>
      <div className={classes.details}>
        <CardMenu
          menuState={menuState}
          anchorEl={anchorEl}
          options={options}
          handleRequestClose={handleRequestClose}
        />
      </div>
    </Card>
  );
};

const CardMenu = React.memo((props) => {
  const { menuState, anchorEl, handleRequestClose, options } = props;

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
      {options.map((option, idx) => {
        const [Component, callBack] = option;
        return (
          <MenuItem key={`${idx}_menuItemforItemt`} onClick={callBack}>
            {Component}
          </MenuItem>
        );
      })}
    </Menu>
  );
});

export default FolderManagerCard;

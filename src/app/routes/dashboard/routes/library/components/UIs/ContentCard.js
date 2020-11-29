import React, { useState, useEffect } from "react";
import { Card, CardBody, CardImg, CardSubtitle } from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import EditInput from "app/routes/dashboard/routes/library/components/UIs/EditInput.";
// import CardMenu from "./CardMenu";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import moment from "moment";
import Downloader from "../Downloader";
import filteringName from "../../filteringExtension/filteringName";
import filteringTime from "../../filteringExtension/filteringTime";

import {
  changeCurFolderByContent,
  editContentTitle,
} from "app/routes/dashboard/routes/library/slice/libraryThunks";
import iconSelector from "../icons/iconSelctor";
import getDateFns from "util/getDateFn";

const useStyles = makeStyles({
  more: {
    position: "absolute",
    right: 16,
  },
  download: {
    position: "absolute",
    left: 16,
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
  unpublish: {
    backgroundColor: "#d5d5d5"
  },
});

const ContentCard = (props) => {
  const dispatch = useDispatch();

  const {
    id,
    image,
    title,
    subTitle,
    type,
    content,

    current,
    handleDrawer,
    is_published,
  } = props;

  const classes = useStyles();

  console.log("FolderManagerCard -> content", content);

  const [inputStatus, setInputStatus] = useState(false);

  function HandleInputStatus() {
    setInputStatus(!inputStatus);
  }

  const [name, setName] = useState(title);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onAction("EDIT_TITLE")();
    }
  }

  function handleChange(e) {
    const { value } = e.target;
    setName(value);
  }

  useEffect(() => {
    setName(title);
  }, [title]);

  function onOptionMenuSelect(event) {
    handleDrawer(true, content, current);
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
      case "EDIT_TITLE":
        setInputStatus(false);
        dispatch(editContentTitle(content, name, current));
        break;

      default:
        break;
    }
  };

  let icon = image;

  if (type === "file") icon = iconSelector(content.src.mimetype);
  // if (type === "file") console.log(iconSelector(content.src.mimetype));

  return (
    <Card className={`shadow ${is_published ? "border-0" : classes.unpublish}`}>
      <div onClick={onOptionMenuSelect}>
        <IconButton className={classes.more}>
          <i className="zmdi zmdi-eye" />
        </IconButton>
      </div>
      {type === "file" ? (
        <Downloader
          fileId={content.src && content.src.id}
          fileName={content.title}
          fileExtension={content.extension}
        >
          <IconButton className={classes.download}>
            <i className="zmdi zmdi-download" />
          </IconButton>
        </Downloader>
      ) : (
        false
      )}
      <CardImg
        className={classes.image}
        top
        src={icon}
        width="50px"
        alt="Card image cap"
        onClick={handleIconClick(type)}
      />
      <CardBody>
        <div className="d-flex justify-content-center">
          {!inputStatus ? (
            <h3 className={`card-title ${classes.title}`}>
              {filteringName(name, 10)}
            </h3>
          ) : (
            <EditInput
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={name}
            />
          )}

          {inputStatus ? (
            <CheckIcon
              size="small"
              onClick={onAction("EDIT_TITLE")}
              className={classes.icon}
            />
          ) : (
            <EditIcon
              size="small"
              onClick={HandleInputStatus}
              className={classes.icon}
            />
          )}
        </div>

        <Divider className={classes.divider} />
        <CardSubtitle>
          {
            getDateFns("diffFromToday")(content.created_time)
            // filteringTime(
            //   moment(content.created_time).locale("ir").startOf("hour").fromNow()
            // )
          }{" "}
          by {content.created_by.username}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default ContentCard;

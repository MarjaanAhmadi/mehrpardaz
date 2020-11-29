import React from "react";

import Downloader from "../components/Downloader";
import { makeStyles } from "@material-ui/styles";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { changeCurFolderByContent } from "../slice/libraryThunks";
import FileIcon from "assets/images/file.png";
import FolderIcon from "assets/images/folder.png";
import filteringTime from "../filteringExtension/filteringTime";
import moment from "moment";
import filteringName from "../filteringExtension/filteringName";
import iconSelector from "./icons/iconSelctor";
import getDateFns from "util/getDateFn";
const useStyles = makeStyles({
  unpublish: {
    backgroundColor: "#d5d5d5",
    "&:hover": {
      backgroundColor: "#d5d5d5 !important",
    },
  },
  image: {
    width: 30,
    height: 30,
  },
});
const FileTableCell = (props) => {
  const dispatch = useDispatch();
  const { content, handleDrawer, current } = props;

  const is_publish = content.is_published;
  const type = content.is_folder ? "folder" : "file";
  //get from is_publish attribute in parent
  const classes = useStyles();

  function onOptionMenuSelect() {
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

  return (
    <React.Fragment>
      <tr className={is_publish ? "" : classes.unpublish} tabIndex={-1}>
        <td onClick={handleIconClick(type)}>
          <img
                className={classes.image}
                alt="Remy Sharp"
                src={type === "file" ? iconSelector(content.src.mimetype) : FolderIcon}
              />
        </td>
        <td>
          <div className="user-detail" onClick={handleIconClick(type)}>
            <h5 className="user-name">{filteringName(content.title, 10)} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{type} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">
              {!content.is_folder ? filteringName(content.src.mimetype, 16) : "-"}{" "}
            </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{content.created_by.username} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{content.version} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">
              {
                getDateFns("diffFromToday")(content.created_time)
                // filteringTime(moment(content.created_time).locale('ir').startOf('days').fromNow())
              }{" "}
            </h5>
          </div>
        </td>
        <td onClick={onOptionMenuSelect}>
          <i className="zmdi zmdi-eye" style={{ fontSize: 24 }} />
        </td>
        {type === "file" ? (
          <Downloader
            fileId={content.src && content.src.id}
            fileName={content.title}
            fileExtension={content.extension}
          >
            <td>
              <i className="zmdi zmdi-download" style={{ fontSize: 24 }} />
            </td>
          </Downloader>
        ) : (
          false
        )}
      </tr>
    </React.Fragment>
  );
};

export default FileTableCell;

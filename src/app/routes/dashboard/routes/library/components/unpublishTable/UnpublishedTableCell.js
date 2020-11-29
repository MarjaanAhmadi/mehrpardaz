import React, { useState, useEffect } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import { Checkbox } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import EditInput from "app/routes/dashboard/routes/library/components/UIs/EditInput.";
import { useDispatch, useSelector } from "react-redux";
import filteringName from "../../filteringExtension/filteringName";
import { editContentTitleUnpublished } from "app/routes/dashboard/routes/library/slice/libraryThunks";
import filteringTime from "../../filteringExtension/filteringTime";
import getDateFns from "util/getDateFn";
import { selContent } from "../../slice/librarySlice";
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

const UnpublishedTableCell = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { data, handleToggle, checked } = props;
  const [name, setName] = useState(props.data.title);
  const [inputStatus, setInputStatus] = useState(false);

  const { current } = useSelector(selContent);

  function HandleInputStatus() {
    setInputStatus(!inputStatus);
  }

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
    setName(props.data.title);
  }, [props.data.title]);

  const onAction = (action) => () => {
    switch (action) {
      case "EDIT_TITLE":
        setInputStatus(false);
        dispatch(editContentTitleUnpublished(data, name, current));
        break;

      default:
        break;
    }
  };

  const { title, is_folder, created_by, created_time, version, id, src } = data;
  const type = is_folder ? "folder" : "file";
  return (
    <React.Fragment>
      <tr tabIndex={-1} key={props.data.id}>
        <td>
          <div className="d-flex">
            {!inputStatus ? (
              <h3 className={`card-title ${classes.title}`}>
                {filteringName(name ? name : "", 10)}
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
          {/* <div className="user-detail">
            <h5 className="user-name">{title} </h5>
          </div> */}
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{type} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{!is_folder ? filteringName(src.mimetype, 16) : "-"} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{created_by.username} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{version} </h5>
          </div>
        </td>
        <td>
          <div className="user-detail">
            <h5 className="user-name">
              {
                getDateFns("diffFromToday")(created_time)
                // filteringTime(
                //   moment(created_time).locale("ir").startOf("days").fromNow()
                // )
              }
            </h5>
          </div>
        </td>
        <td>
          <Checkbox
            color="primary"
            checked={checked.indexOf(id) !== -1}
            onChange={() => {
              handleToggle(id);
            }}
            value={id}
            className="size-30 mr-2"
          />
        </td>
      </tr>
    </React.Fragment>
  );
};
export default UnpublishedTableCell;

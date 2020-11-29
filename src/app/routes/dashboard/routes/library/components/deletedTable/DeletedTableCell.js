import React from "react";
import moment from "moment";
import filteringTime from "../../filteringExtension/filteringTime";
import getDateFns from "util/getDateFn";
import filteringName from "../../filteringExtension/filteringName";

const DeletedTableCell = (props) => {
  const { data, current, handleDrawer } = props;

  const { title, is_folder, created_by, created_time, version, id, src } = data;
  function onOptionMenuSelect(event) {
    handleDrawer(true, data, current);
  }

  const type = is_folder ? "folder" : "file";
  return (
    <React.Fragment>
      <tr tabIndex={-1} key={props.data.id} onClick={onOptionMenuSelect}>
        <td>
          <div className="user-detail">
            <h5 className="user-name">{title} </h5>
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
              {!is_folder ? filteringName(src.mimetype, 16) : "-"}{" "}
            </h5>
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
                // filteringTime(moment(created_time).locale("ir").startOf("days").fromNow())
              }
            </h5>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};
export default DeletedTableCell;

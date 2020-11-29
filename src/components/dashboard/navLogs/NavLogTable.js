import React from "react";
import NavLogTableCell from "./NavLogTableCell";
import { Delete } from "DataManager/DataManager";

const NavLogTable = (props) => {
  const deleteNavLog = async (id) => {
    try {
      await Delete("navlogs", id);
      props.getNavLogs();
    } catch (error) {}
  };
  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>Id</th>
            <th>awy_plnd</th>
            <th>moca_plnd</th>
            <th>wpt_plnd</th>
            <th>frq_plnd</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                return (
                  <NavLogTableCell
                    openModal={(data) => {
                      props.openModal(data);
                    }}
                    deleteNavLog={(id) => {
                      deleteNavLog(id);
                    }}
                    getNavLogs={props.getNavLogs}
                    key={data.id}
                    data={data}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default NavLogTable;

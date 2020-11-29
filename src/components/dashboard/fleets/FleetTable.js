import React from "react";
import { useSelector } from "react-redux";
import FleetTableCell from "./FleetTableCell";
import { Delete } from "DataManager/DataManager";

const FleetTable = (props) => {
  const deleteFleet = async (id) => {
    try {
      await Delete("fleets", id);
      props.getFleets();
    } catch (error) {}
  };
  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>Fleet Id</th>
            <th>Aircraft</th>
            <th>Registration</th>
            <th>MSN</th>
            <th>Capacity Bussiness</th>
            <th>Capacity Economy</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                return (
                  <FleetTableCell
                    openModal={(data) => {
                      props.openModal(data);
                    }}
                    deleteFleet={(id) => {
                      deleteFleet(id);
                    }}
                    getFleets={props.getFleets}
                    key={data. id}
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

export default FleetTable;

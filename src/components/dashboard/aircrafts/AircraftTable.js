import React from "react";
import AircraftTableCell from "./AirCraftTableCell";
import { Delete } from "DataManager/DataManager";

const AircraftTable = (props) => {
  async function deleteAircraft(id) {
    try {
      await Delete("aircrafts", id);
      props.getAircrafts();
    } catch (error) {}
  }
  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>AircraftId</th>
            <th>Model Number</th>
            <th>Model Name</th>
            <th>Engine Count</th>
            <th>Engine Type</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                return (
                  <AircraftTableCell
                    openDetailedLog={props.openDetailedLog}
                    deleteAircraft={deleteAircraft}
                    getAircrafts={props.getAircrafts}
                    key={data.id}
                    data={data}
                    openModal={props.openModal}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default AircraftTable;

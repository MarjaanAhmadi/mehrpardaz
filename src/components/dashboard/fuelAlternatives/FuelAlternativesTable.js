import React, { useEffect } from "react";
import FuelAlternativesTableCell from "./FuelAlternativesTableCell";
import { Delete } from "DataManager/DataManager";

const FuelAlternativesTable = (props) => {
  const deleteFuelAlternative = async (id) => {
    try {
      await Delete("fuel-alternatives", id);

      props.getFuelAlternatives();
    } catch (error) {}
  };

  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>Fuel Alternative Id</th>
            {/* <th>avatar</th> */}
            <th>alternative_f_icao</th>
            <th>alternative_f_rvsd</th>
            <th>alternative_f_plnd</th>
            <th>alternative_f_time</th>
            <th>created by</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                return (
                  <FuelAlternativesTableCell
                    openDetailedLog={(data) => {
                      props.openDetailedLog(data);
                    }}
                    openModal={(data) => {
                      props.openModal(data);
                    }}
                    deleteFuelAlternative={(id) => {
                      deleteFuelAlternative(id);
                    }}
                    openAddAtachmentModal={(id) => {
                      props.openAddAtachmentModal(id);
                    }}
                    getFuelAlternatives={props.getFuelAlternatives}
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

export default FuelAlternativesTable;

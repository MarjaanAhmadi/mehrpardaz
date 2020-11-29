import React, { useEffect, useState } from "react";
import TankedFuelTableCell from "./TankedFuelTableCell";
import { Delete, List } from "DataManager/DataManager";

const TankedFuelTable = (props) => {
  const [users, setUsers] = useState({
    list: [],
  });
  const deleteTankedFuel = async (id) => {
    try {
      await Delete("tanked-fuel", id);

      props.getTankedFuels();
    } catch (error) {}
  };
  const getUsers = async () => {
    try {
      const repsonse = await List(
        "users",
        undefined,
        100,
        1,
        undefined,
        undefined
      );
      setUsers({
        ...users,
        list: repsonse,
      });
    } catch (error) {}
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>TankedFuel Id</th>
            {/* <th>avatar</th> */}
            <th>Kgs</th>
            <th>Rct_No</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                const user = users.list.filter(
                  (i) => i.id === data.created_by
                )[0];
                return (
                  <TankedFuelTableCell
                    openDetailedLog={(data) => {
                      props.openDetailedLog(data);
                    }}
                    openModal={(data) => {
                      props.openModal(data);
                    }}
                    deleteTankedFuel={(id) => {
                      deleteTankedFuel(id);
                    }}
                    getTankedFuels={props.getTankedFuels}
                    key={data.id}
                    data={data}
                    user={user}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default TankedFuelTable;

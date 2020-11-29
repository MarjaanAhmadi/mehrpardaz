import React, { useEffect, useState } from 'react';
import LandingTableCell from './LandingTableCell';
import { Delete, List } from 'DataManager/DataManager';


const LandingTable = (props) => {
  const [users, setUsers] = useState({
    list: []
  })
  const deleteLanding = async (id) => {
    try {
      await Delete('landings', id);
       
      props.getLandings();
    } catch (error) {
      
    }
  }
  const getUsers = async () => {
    try {
      const repsonse = await List('users', undefined, 100, 1, undefined, undefined);
      setUsers({
        ...users,
        list: repsonse
      })
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getUsers();
  },[])
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>Landing Id</th>
            {/* <th>avatar</th> */}
            <th>Captain</th>
            <th>Day</th>
            <th>Night</th>
            <th>Created By</th>
            <th>Created Time</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              const user = users.list.filter(i => i.id === data.created_by)[0];
              return (
                <LandingTableCell openDetailedLog={(data) => {props.openDetailedLog(data)}} 
                                        openModal={(data) => { props.openModal(data)}} 
                                        deleteLanding={(id) => {deleteLanding(id)}} 
                                        getLandings={props.getLandings} 
                                        key={data.id} 
                                        data={data}
                                        user={user}
                                        />
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default LandingTable;









import React from 'react';
import {useSelector} from 'react-redux';
import JourneyLogTableCell from './JourneyLogTableCell';
import { Delete } from 'DataManager/DataManager';


const JourneyLogTable = (props) => {
  const deleteJourneyLog = async (id) => {
    try {
       
      await Delete('journeylogs', id);
      props.getJourneyLogs();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>Id</th>
            <th>flight_type</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <JourneyLogTableCell openModal={(data) => {props.openModal(data)}} deleteJourneyLog={(id) => {deleteJourneyLog(id)}} getJourneyLogs={props.getJourneyLogs} key={data.id} data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default JourneyLogTable;

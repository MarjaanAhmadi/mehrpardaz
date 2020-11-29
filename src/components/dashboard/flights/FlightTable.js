import React, { useEffect } from 'react';
import FlightTableCell from './FlightTableCell';
import { Delete } from 'DataManager/DataManager';


const FlightTable = (props) => {
  const deleteFlight = async (id) => {
    try {
      await Delete('flights', id);
       
      props.getFlights();
    } catch (error) {
      
    }
  }
  const removeFlightAttachment = async (id)=>{
    try {
      await Delete('flight-attachments', id);
      props.getFlights();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>Flight Id</th>
            {/* <th>avatar</th> */}
            <th>Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>On Block Time</th>
            <th>Off Block Time</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <FlightTableCell openDetailedLog={(data) => {props.openDetailedLog(data)}} 
                                        openModal={(data) => { props.openModal(data)}} 
                                        deleteFlight={(id) => {deleteFlight(id)}} 
                                        openAddAtachmentModal={(id) => { ;props.openAddAtachmentModal(id)}}
                                        removeAttachment={(id) => {removeFlightAttachment(id)} }
                                        getflights={props.getflights} 
                                        key={data.id} 
                                        data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default FlightTable;









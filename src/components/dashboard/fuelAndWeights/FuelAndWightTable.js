import React from 'react';
import {useSelector} from 'react-redux';
import FuelAndWeightTableCell from './FuelAndWeightTableCell';
import { Delete } from 'DataManager/DataManager';


const FuelAndWeightTable = (props) => {
  const deleteFuelAndWeight = async (id) => {
    try {
       
      await Delete('fuel-and-weights', id);
      props.getFuelAndWeights();
    } catch (error) {
      
    }
  }
    return (
      <div className="table-responsive-material">
        <table className="default-table table-unbordered table table-sm table-hover">
          <thead className="th-border-b">
          <tr>
            <th>Id</th>
            <th>Trip fuel planned</th>
            <th>Cont fuel planned</th>
            <th>Fres fuel planned</th>
            <th>Minimum to fuel planned</th>
            <th>Taxi fuel planned</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {
            props.data.length > 0
            ? props.data.map(data => {
              return (
                <FuelAndWeightTableCell openModal={(data) => {props.openModal(data)}} deleteFuelAndWeight={(id) => {deleteFuelAndWeight(id)}} getFuelAndWeights={props.getFuelAndWeights} key={data.id} data={data}/>
              );
            })
            : null
          }
          </tbody>
        </table>
      </div>
    );
}

export default FuelAndWeightTable;

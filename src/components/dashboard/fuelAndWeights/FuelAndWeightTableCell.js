import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CardMenu from '../Common/CardMenu'
import { Delete, List } from 'DataManager/DataManager';

const FuelAndWeightTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteFuelAndWeight = async () => {
    try {
       
      await Delete('fuel-and-weights', props.data.data.id);
      props.getFuelAndWeights();
    } catch (error) {
      
    }
  }

  const onOptionMenuSelect = event => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  };
  const handleRequestClose = (idx) => {
     
    if(idx !== null) {
      switch(idx){
        case 0:
           
          props.openModal(props.data.id);
          //update
          break;
          case 2:
           
          props.deleteFuelAndWeight(props.data.id);
          //update
          break;
          default :
          break; 
      }
    }
    setMenuState( false );
  };


    return (
      <tr
        tabIndex={-1}
        key={props.data.id}
      >
        <td>{props.data.id}</td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.trip_f_plnd} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.cont_f_plnd} </h5>
            </div>
        </td>
        
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.fres_f_plnd} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.min_to_f_plnd} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.taxi_f_plnd} </h5>
            </div>
        </td>
        
        <td className="text-right">
          <IconButton onClick={onOptionMenuSelect}>
            <i className="zmdi zmdi-more-vert"/></IconButton>
          <CardMenu 
                    onClick={deleteFuelAndWeight}
                    menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={(idx) => {handleRequestClose(idx)}}/>
        </td>
      </tr>

    );
}

export default FuelAndWeightTableCell;

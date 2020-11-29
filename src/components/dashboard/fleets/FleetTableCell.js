import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CardMenu from '../Common/CardMenu'
import { Delete, List } from 'DataManager/DataManager';

const FleetTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteFleet = async () => {
    try {
       
      await Delete('fleets', props.data.data._id);
      props.getFleets();
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
           
          props.openModal(props.data._id);
          //update
          break;
          case 2:
           
          props.deleteFleet(props.data._id);
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
        key={props.data._id}
      >
        <td>{props.data._id}</td>
        
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.aircraft.model_no} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.registration} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.msn} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.capacity.bussiness} </h5>
            </div>
        </td>
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.capacity.economy} </h5>
            </div>
        </td>
        <td className="text-right">
          <IconButton onClick={onOptionMenuSelect}>
            <i className="zmdi zmdi-more-vert"/></IconButton>
          <CardMenu 
                    onClick={deleteFleet}
                    menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={(idx) => {handleRequestClose(idx)}}/>
        </td>
      </tr>

    );
}

export default FleetTableCell;

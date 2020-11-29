import React, {useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CardMenu from '../Common/CardMenu'
import { Delete, List } from 'DataManager/DataManager';

const FlightTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteFlight = async () => {
    try {
       
      await Delete('flight', props.data.data.id);
      props.getFlights();
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
           
          props.deleteFlight(props.data.id);
          //delete
          break;

        case 1: 
         
          props.openDetailedLog(props.data.id);
          break;
        case 4: 
         
          props.openAddAtachmentModal(props.data.id);
          break;
        case 3: 
          props.removeAttachment(props.data.id);
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
        {/* <td>
          <div className="user-profile d-flex flex-row align-items-center">
            <Avatar
              alt={username}
              src={avatar}
              className="user-avatar"
            />
            
          </div>
        </td> */}
        <td>
          <div className="user-detail">
              <h5 className="user-name">{props.data.number} </h5>
            </div>
        </td>
        <td>{props.data.origin}</td>
        <td>{props.data.destination}</td>
        <td>{props.data.on_block_time}</td>
        <td>{props.data.off_block_time}</td>
        <td className="text-right">
          <IconButton onClick={onOptionMenuSelect}>
            <i className="zmdi zmdi-more-vert"/></IconButton>
          <CardMenu 
                    flight={true}
                    onClick={deleteFlight}
                    menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={(idx) => {handleRequestClose(idx)}}/>
        </td>
      </tr>

    );
}

export default FlightTableCell;

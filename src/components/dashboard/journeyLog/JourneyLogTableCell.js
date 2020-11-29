import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import CardMenu from '../Common/CardMenu'
import { Delete, List } from 'DataManager/DataManager';

const JourneyLogTableCell = (props) => {
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);

  const deleteJourneyLog = async () => {
    try {
       
      await Delete('journeylogs', props.data.data.id);
      props.getJourneyLogs();
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
           
          props.deleteJourneyLog(props.data.id);
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
              <h5 className="user-name">{props.data.flight_type} </h5>
            </div>
        </td>
        <td className="text-right">
          <IconButton onClick={onOptionMenuSelect}>
            <i className="zmdi zmdi-more-vert"/></IconButton>
          <CardMenu 
                    onClick={deleteJourneyLog}
                    menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={(idx) => {handleRequestClose(idx)}}/>
        </td>
      </tr>

    );
}

export default JourneyLogTableCell;

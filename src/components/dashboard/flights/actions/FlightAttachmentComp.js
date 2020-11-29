import React, {useState, useEffect} from 'react';
import { Retrieve, Delete} from 'DataManager/DataManager';
import {makeStyles} from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        padding: '10 0'
    }
})
const FlightAttachmentComp = (props) => {
    const classes = useStyles();
    const [flightAttachment, setFlightAttachment] = useState({
        list: []
    });
    const getFlighAttachment = async () => {
        try {
            const response = await Retrieve('flight-attachments', props.detailId)
            setFlightAttachment({
                ...flightAttachment,
                list: response
            })
        } catch (error) {
            
        }
    }
    const renderFlightAttachments = () => {
        return(
                flightAttachment.list.map((item, idx) => {
                    return(
                        // button key={user.email} onClick={event => this.handleToggle(event, user.id)}
                        <ListItem>
                            <ListItemText className="br-break" primary={item._id} secondary={item.created_time} />
                            <ListItemText className="br-break" primary={item.related_user !== null ? item.related_user.username : '-'} />
                            <ListItemText className="br-break" primary={item.uuid} />
                            <ListItemText className="br-break" primary={item.title} />                            
                            {/* <Badge className="mr-4 mt-2 text-uppercase" color="success" pill>Agent</Badge> */}
                            {/* <ListItemSecondaryAction>
                                <Checkbox color="primary"
                                        checked={this.state.checked.indexOf(user.id) !== -1}
                                />
                            </ListItemSecondaryAction> */}
                        </ListItem>
                    )
                })
        )
    } 
    useEffect(() => {
        getFlighAttachment();
    },[])
    return(
        <React.Fragment>
             <List>
                 {renderFlightAttachments()}
            </List>
   
        </React.Fragment>
    )
}
export default FlightAttachmentComp;
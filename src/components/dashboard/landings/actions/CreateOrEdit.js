import React, { useState , useEffect} from 'react';
import moment from 'moment';
import DateAndTimePickers from '../../../../app/routes/components/routes/pickers/dateTime/DateAndTimePickers'; 
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Post, Retrieve, Patch, List } from 'DataManager/DataManager';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
const useStyles = makeStyles({
  btnRoot: {
    direction: 'rtl'
  },
  radioTop:{
    marginTop: '2.2rem'
  },
  rootPicker: {
    marginTop: 16
  }
})


const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    day: 0,
    night: 0,
    captain: ''
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: ''
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: ''
  });
  const [organizations, setOrganizations] = useState({
    list: []
  })
  const [aircrafts, setAircrafts] = useState({
    list: []
  })
  const craeteLanding = async() => {
    try {
      let data = form;
      const response = await Post('landings',data);
      if(response.data.error) {
        setError({
          ...error,
          hasError: true,
          errorMsg: response.data.error
        });
      }
      else {
        
        setSuccess({
          ...success,
          hasSuccess: true,
          successMsg: 'Landing Created Successfully'
        });
        props.getLandings();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editLanding = async () => {
    try{
       
      const data = form;
       
      const response = await Patch('landings', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'Landing Edited Successfully'
      });
      props.getLandings();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getLanding = async () => {
    try {
       
        const response =await Retrieve('landings',props.id);

        if(response)
        {
          setForm({
            ...form,
            captain: response.captain,
            day: response.day,
            night: response.night
          });
          debugger
           
        }
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    if(props.edit) {
      getLanding();
    }
  },[])

  return(
    <React.Fragment>
      <Grid container>
        <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Captain</InputLabel>
              <Input
                type="text"
                value={form.captain}
                onChange={(event) => {
                  setForm({
                    ...form,
                    captain: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Day</InputLabel>
              <Input
                type="text"
                value={form.day}
                onChange={(event) => {
                  setForm({
                    ...form,
                    day: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Night</InputLabel>
              <Input
                type="text"
                value={form.night}
                onChange={(event) => {
                  setForm({
                    ...form,
                    night: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteLanding : editLanding} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;
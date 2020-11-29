import React, { useState , useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Post, Retrieve, Patch } from 'DataManager/DataManager';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const useStyles = makeStyles({
  btnRoot: {
    direction: 'rtl'
  },
  radioTop:{
    marginTop: '2.2rem'
  }
})


const CreateOrEdit = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    aircraft: '',
    registration: '',
    msn: ''
  })
  const [capacity, setCapacity] = useState({
    bussiness: 0,
    economy: 0
  });
  const [error, setError] = useState({
    hasError: false,
    errorMsg: ''
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: ''
  });


  const craeteFleet = async() => {
    try {
      let data = form;
      data['capacity'] = capacity;
      const response = await Post('fleets',data);
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
          successMsg: 'Fleet Created Successfully'
        });
        props.getFleets();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editFleet = async () => {
    try{
      const data = form;
      data['capacity'] = capacity;
      const response = await Patch('fleets', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'Fleet Created Successfully'
      });
      props.getFleets();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getFleet = async () => {
    try {
        const response =await Retrieve('fleets',props.id);
          
         console.log(response)
        setForm({
          ...form,
          aircraft: response.aircraft.model_no,
          registration: response.registration,
          msn: response.msn
        });
        setCapacity({
          ...capacity,
          bussiness: response.capacity.bussiness,
          economy: capacity.economy
        })
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    if(props.edit) getFleet(); 
  },[])

  return(
    <React.Fragment>
      <Grid container>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Aircraft</InputLabel>
              <Input
                type="text"
                value={form.aircraft.model_no}
                onChange={(event) => {
                  setForm({
                    ...form,
                    aircraft: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Registration</InputLabel>
              <Input
                type="text"
                value={form.registration}
                onChange={(event) => {
                  setForm({
                    ...form,
                    registration: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">MSN</InputLabel>
              <Input
                type="text"
                value={form.msn}
                onChange={(event) => {
                  setForm({
                    ...form,
                    msn: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Capacity/Bussiness</InputLabel>
              <Input
                type="text"
                value={capacity.bussiness}
                onChange={(event) => {
                  setCapacity({
                    ...capacity,
                    bussiness: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} >
            <FormControl>
              <InputLabel htmlFor="position-top">Capacity/Economy</InputLabel>
              <Input
                type="text"
                value={capacity.economy}
                onChange={(event) => {
                  setCapacity({
                    ...capacity,
                    economy: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteFleet : editFleet} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;

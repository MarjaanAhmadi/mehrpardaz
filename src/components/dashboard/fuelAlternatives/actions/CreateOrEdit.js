import React, { useState , useEffect} from 'react';
import moment from 'moment';
import TimePickers from '../../../../app/routes/components/routes/pickers/time/TimePickers'; 
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
    alternative_f_icao: '',
    alternative_f_rvsd: 0,
    alternative_f_plnd: 0,
    alternative_f_time: '00:00'
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
  const craeteFuelAlternative = async() => {
    try {
      let data = form;
        
      data['alternative_f_icao'] = form.alternative_f_icao;
      data['alternative_f_rvsd'] = form.alternative_f_rvsd;
      data['alternative_f_plnd'] = form.alternative_f_plnd;
      const t = form.alternative_f_time;
      data['alternative_f_time'] = `${form.alternative_f_time._d.getHours()}:${form.alternative_f_time._d.getMinutes()}`;
       
      const response = await Post('fuel-alternatives',data);
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
          successMsg: 'Fuel Alternative Created Successfully'
        });
         
        props.getFuelAlternatives();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editFuelAlternative = async () => {
    try{
       
      const data = form;
      data['alternative_f_time'] = `${form.alternative_f_time._d.getHours() < 10 ? `0${form.alternative_f_time._d.getHours()}` : form.alternative_f_time._d.getHours()}:${form.alternative_f_time._d.getMinutes()< 10 ? `0${form.alternative_f_time._d.getMinutes()}` : form.alternative_f_time._d.getMinutes()}`;
        debugger
      const response = await Patch('fuel-alternatives', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'Fuel Alternative Edited Successfully'
      });
      props.getFuelAlternatives();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getFuelAlternative = async () => {
    try {
       
        const response =await Retrieve('fuel-alternatives',props.id);

        if(response)
        {
        
          setForm({
            ...form,
            alternative_f_icao: response.alternative_f_icao,
            alternative_f_rvsd: response.alternative_f_rvsd,
            alternative_f_plnd: response.alternative_f_plnd,
            alternative_f_time: response.alternative_f_time,
          });
        }
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
   
    if(props.edit) {

      getFuelAlternative();
    }
  },[])

  return(
    <React.Fragment>
      <Grid container>
          {/* <Grid item xs={6} sm={6} >
          <FormControl className="w-100 mb-2">
            <InputLabel>Related Aircraft Assignment</InputLabel>
            <Select
              value={form.related_aircraft_assignment}
              onChange={(event) => {
                  setForm({
                    ...form,
                    related_aircraft_assignment: event.target.value
                  })
              }}
              input={<Input id="ageSimple1"/>}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                organizations.list.length > 0 ?
                organizations.list.map((organization, idx) => {
                    return(
                      <MenuItem key={idx} value={organization._id}>{organization.registration_code}</MenuItem>
                    )
                })
                : null
              }
            </Select>
          </FormControl>
          </Grid> */}
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Alternative Fuel Icao</InputLabel>
              <Input
                type="text"
                value={form.alternative_f_icao}
                onChange={(event) => {
                  setForm({
                    ...form,
                    alternative_f_icao: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Alternative Fuel Revised</InputLabel>
              <Input
                type="number"
                value={form.alternative_f_rvsd}
                onChange={(event) => {
                  setForm({
                    ...form,
                    alternative_f_rvsd: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Alternative Fuel Plnd</InputLabel>
              <Input
                type="number"
                value={form.alternative_f_plnd}
                onChange={(event) => {
                  setForm({
                    ...form,
                    alternative_f_plnd: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={6} sm={6}>
          <FormControl>
              <InputLabel htmlFor="position-top">Tination</InputLabel>
              <Input
                type="text"
                value={form.tination}
                onChange={(event) => {
                  setForm({
                    ...form,
                    tination: event.target.value
                  })
                }}
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={6} sm={6} >
            <FormControl className={classes.rootPicker}>
                <TimePickers setPublishedTime={(date) => {
                   
                  setForm({
                    ...form,
                    alternative_f_time: date
                  })
                }}/>
            </FormControl>
          </Grid>
        </Grid>
        <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteFuelAlternative : editFuelAlternative} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;
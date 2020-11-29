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
  const [form, setForm] = useState({});
  const [error, setError] = useState({
    hasError: false,
    errorMsg: ''
  });
  const [success, setSuccess] = useState({
    hasSuccess: false,
    successMsg: ''
  });


  const craeteAircraft = async() => {
    try {
      let data = form;
      const response = await Post('aircrafts',data);
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
          successMsg: 'Aircraft Created Successfully'
        });
        props.getAircrafts();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const editAircraft = async () => {
    try{
      const data = form;
      const response = await Patch('aircrafts', data, props.id);
      setSuccess({
        ...success,
        hasSuccess: true,
        successMsg: 'Aircraft Created Successfully'
      });
      props.getAircrafts();

    } 
    catch(error){
      console.log(error)
    }
  }


  const getAircraft = async () => {
    try {
        const response =await Retrieve('aircrafts',props.id);
          
         console.log(response)
        setForm({
          ...form,
          model_name: response.model_name,
          model_no: response.model_no,
          model_version: response.model_version,
          engine_count: response.engine_count,
          engine_type: response.engine_type,
          aircraft_desc: response.aircraft_desc,
          description: response.description,
          wtc: response.wtc,
          tdesig: response.tdesig,
          manufacturer_code: response.manufacturer_code,
          type: response.type,
          apc: response.apc,
          recat_eu: response.recat_eu,
          wing_span: parseInt(response.wing_span),
          wing_position: response.wing_position,
          length: parseInt(response.length),
          height: response.height,
          power_plant: response.power_plant,
          engine_position: response.engine_position,
          tail_configuration: parseInt(response.tail_configuration),
          landing_gear: response.landing_gear,
          recognition_similarity: response.recognition_similarity
        })
    } catch (error) {
      
    }
    
  }

  useEffect(() => {
    if(props.edit) getAircraft(); 
  },[])

  return(
    <React.Fragment>
        { form !== undefined ? 
        <Grid container>
        <Grid item xs={6} sm={6}>
        <FormControl>
            <InputLabel htmlFor="position-top">Model Name</InputLabel>
            <Input
              type="text"
              value={form.model_name}
              onChange={(event) => {
                setForm({
                  ...form,
                  model_name: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Model Number</InputLabel>
            <Input
              type="text"
              value={form.model_no}
              onChange={(event) => {
                setForm({
                  ...form,
                  model_no: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Model Version</InputLabel>
            <Input
              type="text"
              value={form.model_version}
              onChange={(event) => {
                setForm({
                  ...form,
                  model_version: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Engine Count</InputLabel>
            <Input
              type="number"
              value={form.engine_count}
              onChange={(event) => {
                setForm({
                  ...form,
                  engine_count: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Engine Type</InputLabel>
            <Input
              type="text"
              value={form.engine_type}
              onChange={(event) => {
                setForm({
                  ...form,
                  engine_type: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Aircraft Description</InputLabel>
            <Input
              type="text"
              value={form.aircraft_desc}
              onChange={(event) => {
                setForm({
                  ...form,
                  aircraft_desc: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Description</InputLabel>
            <Input
              type="text"
              value={form.description}
              onChange={(event) => {
                setForm({
                  ...form,
                  description: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">WTC</InputLabel>
            <Input
              type="text"
              value={form.wtc}
              onChange={(event) => {
                setForm({
                  ...form,
                  wtc: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Tdesig</InputLabel>
            <Input
              type="text"
              value={form.tdesig}
              onChange={(event) => {
                setForm({
                  ...form,
                  tdesig: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Manufacturer Code</InputLabel>
            <Input
              type="text"
              value={form.manufacturer_code}
              onChange={(event) => {
                setForm({
                  ...form,
                  manufacturer_code: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Type</InputLabel>
            <Input
              type="text"
              value={form.type}
              onChange={(event) => {
                setForm({
                  ...form,
                  type: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">APC</InputLabel>
            <Input
              type="text"
              value={form.apc}
              onChange={(event) => {
                setForm({
                  ...form,
                  apc: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Recat EU</InputLabel>
            <Input
              type="text"
              value={form.recat_eu}
              onChange={(event) => {
                setForm({
                  ...form,
                  recat_eu: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Wing Span</InputLabel>
            <Input
              type="number"
              value={form.wing_span}
              onChange={(event) => {
                setForm({
                  ...form,
                  wing_span: parseInt(event.target.value)
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Length</InputLabel>
            <Input
              type="number"
              value={form.length}
              onChange={(event) => {
                setForm({
                  ...form,
                  length: parseInt(event.target.value)
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Height</InputLabel>
            <Input
              type="text"
              value={form.height}
              onChange={(event) => {
                setForm({
                  ...form,
                  height: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Power Plant</InputLabel>
            <Input
              type="text"
              value={form.power_plant}
              onChange={(event) => {
                setForm({
                  ...form,
                  power_plant: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Wing Position</InputLabel>
            <Input
              type="text"
              value={form.wing_position}
              onChange={(event) => {
                setForm({
                  ...form,
                  wing_position: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Engine Position</InputLabel>
            <Input
              type="text"
              value={form.engine_position}
              onChange={(event) => {
                setForm({
                  ...form,
                  engine_position: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Tail Configuration</InputLabel>
            <Input
              type="number"
              value={form.tail_configuration}
              onChange={(event) => {
                setForm({
                  ...form,
                  tail_configuration: parseInt(event.target.value)
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Landing Gear</InputLabel>
            <Input
              type="text"
              value={form.landing_gear}
              onChange={(event) => {
                setForm({
                  ...form,
                  landing_gear: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Recognition Similarity</InputLabel>
            <Input
              type="text"
              value={form.recognition_similarity}
              onChange={(event) => {
                setForm({
                  ...form,
                  recognition_similarity: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={6} sm={6} >
          <FormControl>
            <InputLabel htmlFor="position-top">Path</InputLabel>
            <Input
              type="text"
              value={form.path}
              onChange={(event) => {
                setForm({
                  ...form,
                  path: event.target.value
                })
              }}
            />
          </FormControl>
        </Grid> */}
      </Grid>
      : null}
      <div className={`jr-btn-group d-flex flex-wrap mt-3 ${classes.btnRoot}`}>
            <Button onClick={!props.edit ? craeteAircraft : editAircraft} variant="contained" color="primary" className="jr-btn text-white">{!props.edit ? 'Create' : 'Edit'}</Button>
        </div>
        {error.hasError && NotificationManager.error(error.errorMsg)}
        <NotificationContainer />
        {success.hasSuccess && NotificationManager.success(error.successMsg)}
        <NotificationContainer />


    </React.Fragment>

  )
}
export default CreateOrEdit;

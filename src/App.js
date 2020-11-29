import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import {BreadCrumb} from 'antd'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }

  function handleClick() {
    alert('You clicked the Chip.');
  }

  useEffect(()=>{
    localStorage.setItem('token') = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWVmMmYyNGVhYzU0NjIyMTU4MTBlZWIiLCJpc19hZG1pbiI6ZmFsc2UsInJvbGVzIjpbInVzZXIiXSwiYWlybGluZV9pZCI6IjVmMDJkOTRiNGRlYmU3MDM0MDBjY2I4NyIsImlhdCI6MTU5NDgzODE4OSwiZXhwIjozMzE1MjQzODE4OX0.vCTSOURWanqNBQw2bKDEp6FXnSH6WqSNkgaWjaNAOas'
  },[])
  return (
    <div className={classes.root}>
      <Chip label="Basic Chip" className={classes.chip} variant="outlined" />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Clickable Chip"
        onClick={handleClick}
        className={classes.chip}
        variant="outlined"
      />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Deletable Chip"
        onDelete={handleDelete}
        className={classes.chip}
        variant="outlined"
      />
      <Chip
        avatar={
          <Avatar>
            <FaceIcon />
          </Avatar>
        }
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Clickable Deletable Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        variant="outlined"
      />
      <Chip
        label="Custom delete icon Chip"
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        label="Clickable Link Chip"
        className={classes.chip}
        component="a"
        href="#chip"
        clickable
        variant="outlined"
      />
      <Chip
        avatar={<Avatar>MB</Avatar>}
        label="Primary Clickable Chip"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Primary Clickable Chip"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
        variant="outlined"
      />
      <Chip
        label="Deletable Primary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="primary"
        variant="outlined"
      />
      <Chip
        avatar={
          <Avatar>
            <FaceIcon />
          </Avatar>
        }
        label="Deletable Secondary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="secondary"
        variant="outlined"
      />
      <Chip
        icon={<FaceIcon />}
        label="Deletable Secondary Chip"
        onDelete={handleDelete}
        className={classes.chip}
        color="secondary"
        variant="outlined"
      />
    </div>
  );
}

export default App;

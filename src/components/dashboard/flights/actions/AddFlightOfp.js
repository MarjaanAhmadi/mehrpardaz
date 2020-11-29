import React from "react";
// import { List, PostId } from "DataManager/DataManager";
// import {
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Input,
//   Button,
// } from "@material-ui/core";
import SelectedOfp from "./SelectedOfp";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  btnRoot: {
    direction: "rtl",
  },
  formControl: {
    minWidth: 200,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  radioTop: {
    marginTop: "2.2rem",
  },
});

const AddFlightOfp = (props) => {
  const { detailId, data } = props;
  const selectedFlight = data.find((item) => item.id === detailId);
  const classes = useStyles();
  return (
    <React.Fragment>
      <SelectedOfp id={props.detailId} flight={selectedFlight} />
    </React.Fragment>
  );
};
export default AddFlightOfp;

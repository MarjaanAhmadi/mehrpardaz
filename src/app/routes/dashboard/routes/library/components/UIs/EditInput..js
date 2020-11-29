import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import EditIcon from "@material-ui/icons/Edit";
// import DirectionsIcon from "@material-ui/icons/Directions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "6.5px 4px",
    display: "flex",
    alignItems: "center",
    width: "auto",
    marginTop: -3.5,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function EditInput(props) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        onKeyDown={props.onKeyDown}
        className={classes.input}
        value={props.value}
        onChange={props.onChange}
      />
    </Paper>
  );
}

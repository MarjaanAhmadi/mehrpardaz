import React, { useState, useEffect } from "react";
import { Retrieve } from "DataManager/DataManager";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "10 0",
  },
});
const DetailsComp = (props) => {
  const classes = useStyles();
  const [aircraft, setAircraft] = useState({});
  const getAircraft = async () => {
    try {
      const response = await Retrieve("aircrafts", props.detailId, undefined);
      setAircraft(response);
    } catch (error) {}
  };

  useEffect(() => {
    getAircraft();
  }, [getAircraft]);

  return (
    <React.Fragment>
      {aircraft !== undefined ? (
        <div className={classes.root}>
          <span>Id: {aircraft.id}</span>
          <span>Model Number: {aircraft.model_no}</span>
          <span>Modal Name: {aircraft.model_name}</span>
          <span>Model Version: {aircraft.model_version}</span>
          <span>Engine Count: {aircraft.engine_count}</span>

          <span>Engine Type: {aircraft.engine_type}</span>
          <span>Aircraft Description: {aircraft.aircraft_desc}</span>
          <span>Description: {aircraft.description}</span>
          <span>WTC: {aircraft.wtc}</span>
          <span>Tdesig: {aircraft.tdesig}</span>
          <span>Manufacturer Code: {aircraft.manufacturer_code}</span>
          <span>Type: {aircraft.type}</span>
          <span>Apc: {aircraft.apc}</span>
          <span>Recat EU: {aircraft.recat_eu}</span>
          <span>Wing Span: {aircraft.wing_span}</span>
          <span>Length: {aircraft.length}</span>
          <span>Height: {aircraft.height}</span>
          <span>Power Plant: {aircraft.power_plant}</span>
          <span>Wing Position: {aircraft.wing_position}</span>
          <span>Engine Position: {aircraft.engine_position}</span>
          <span>Tail Configuration: {aircraft.tail_configuration}</span>
          <span>Landing Gear: {aircraft.landing_gear}</span>
          <span>Recognition Similarity: {aircraft.recognition_similarity}</span>
          <span>Path: {aircraft.path}</span>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default DetailsComp;

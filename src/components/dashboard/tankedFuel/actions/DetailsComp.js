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
  const [landing, setLanding] = useState({});
  const getLanding = async () => {
    try {
      const response = await Retrieve("landings", props.detailId, undefined);
      setLanding(response);
    } catch (error) {}
  };
  useEffect(() => {
    getLanding();
  }, []);

  return (
    <React.Fragment>
      {landing !== undefined ? (
        <div className={classes.root}>
          <span>Id: {landing._id}</span>
          <span>Number: {landing.number}</span>
          <span>Origin: {landing.origin}</span>
          <span>Destination: {landing.destination}</span>
          <span>Scheduled Start Time: {landing.scheduled_start_time}</span>
          <span>Scheduled End Time: {landing.scheduled_start_time}</span>
          <span>On Block Time: {landing.on_block_time}</span>
          <span>Off Block Time: {landing.off_block_time}</span>
          <span>Takeoff Time: {landing.takeoff_time}</span>
          <span>Landing Time: {landing.landing_time}</span>
          <span>Created Time: {landing.created_time}</span>
          <span>Updated Time: {landing.updated_time}</span>
          <span>
            Related Organization:{" "}
            {landing.related_organization !== undefined &&
            landing.related_organization !== null
              ? landing.related_organization._id
              : "-"}
          </span>
          <span>
            Related Aircraft Assignment:{" "}
            {landing.related_aircraft_assignment !== undefined &&
            landing.related_aircraft_assignment !== null
              ? landing.related_aircraft_assignment._id
              : null}
          </span>
          <span>Adult Pax: {landing.adult_pax}</span>
          <span>Child Pax: {landing.child_pax}</span>
          <span>InfantPax: {landing.infant_pax}</span>
          <span>Fuel: {landing.fuel}</span>
          <span>Cargo Baggage: {landing.cargo_baggage}</span>
          <span>Route: {landing.route}</span>
          <span>Paths: {landing.paths}</span>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default DetailsComp;

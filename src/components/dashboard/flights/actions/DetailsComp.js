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
  const [flight, setFlight] = useState({});
  const getFlight = async () => {
    try {
      const response = await Retrieve("flights", props.detailId, undefined);
      setFlight(response);
    } catch (error) {}
  };
  useEffect(() => {
    getFlight();
  }, []);

  return (
    <React.Fragment>
      {flight !== undefined ? (
        <div className={classes.root}>
          <span>Id: {flight.id}</span>
          <span>Number: {flight.number}</span>
          <span>Origin: {flight.origin}</span>
          <span>Destination: {flight.destination}</span>
          <span>Scheduled Start Time: {flight.scheduled_start_time}</span>
          <span>Scheduled End Time: {flight.scheduled_start_time}</span>
          <span>On Block Time: {flight.on_block_time}</span>
          <span>Off Block Time: {flight.off_block_time}</span>
          <span>Takeoff Time: {flight.takeoff_time}</span>
          <span>Landing Time: {flight.landing_time}</span>
          <span>Created Time: {flight.created_time}</span>
          <span>Updated Time: {flight.updated_time}</span>
          <span>
            Related Organization:{" "}
            {flight.related_organization !== undefined &&
            flight.related_organization !== null
              ? flight.related_organization.id
              : "-"}
          </span>
          <span>
            Related Aircraft Assignment:{" "}
            {flight.related_aircraft_assignment !== undefined &&
            flight.related_aircraft_assignment !== null
              ? flight.related_aircraft_assignment.id
              : null}
          </span>
          <span>Adult Pax: {flight.adult_pax}</span>
          <span>Child Pax: {flight.child_pax}</span>
          <span>InfantPax: {flight.infant_pax}</span>
          <span>Fuel: {flight.fuel}</span>
          <span>Cargo Baggage: {flight.cargo_baggage}</span>
          <span>Route: {flight.route}</span>
          <span>Paths: {flight.paths}</span>
        </div>
      ) : null}
    </React.Fragment>
  );
};
export default DetailsComp;

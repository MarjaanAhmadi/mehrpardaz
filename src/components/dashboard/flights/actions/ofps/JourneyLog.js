import React, { useState, useEffect } from "react";
import { List, Patch } from "DataManager/DataManager";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CardLayout from "components/CardLayout";
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

const JourneyLogs = (props) => {
  const [JourneyLogs, setJourneyLogs] = useState("");
  const [JourneyLog, setJourneyLog] = useState("");
  const [journeyLogData, setJourneyLogData] = useState({});
  const classes = useStyles();
  const getJourneyLogs = async () => {
    try {
      const response = await List(
        "journeylogs",
        undefined,
        100,
        1,
        undefined,
        undefined
      );
      const li = response.filter((i) => i.is_deleted === false);
      setJourneyLogs({
        ...JourneyLogs,
        list: li,
      });
    } catch (error) {}
  };
  const linkJourneyLogToFlight = async () => {
    try {
      const data = {
        journeylogs: JourneyLog,
      };
      await Patch("flights", data, props.id);
      const selectedJourney = JourneyLogs.list.filter(
        (i) => i.id === JourneyLog
      )[0];
      setJourneyLogData(selectedJourney);
    } catch (error) {}
  };
  useEffect(() => {
    getJourneyLogs();
  }, []);
  return (
    <React.Fragment>
      <Grid container>
        <Grid md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Journey Log</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={JourneyLog}
              onChange={(event) => {
                setJourneyLog(event.target.value);
              }}
            >
              {JourneyLogs.list && JourneyLogs.list.length > 0
                ? JourneyLogs.list.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item.id}>
                        {item.id}
                      </MenuItem>
                    );
                  })
                : false}
            </Select>
          </FormControl>
        </Grid>
        <Grid md={6} className="mt-4">
          <Button
            onClick={linkJourneyLogToFlight}
            variant="raised"
            className="jr-btn bg-info text-white"
          >
            Add Journey Log
          </Button>
        </Grid>
        {Object.keys(journeyLogData).length !== 0 ? (
          <CardLayout>
            <div className="jr-card-header mb-3 d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="card-heading mb-0">
                  <i className="zmdi zmdi-notifications-active mr-2" />
                  Journey Log Details
                </h3>
              </div>
            </div>
            <Grid container className="mt-3">
              {Object.entries(journeyLogData).map(([key, value]) => {
                return (
                  <Grid md={6}>
                    {key} : {value.toString()}
                  </Grid>
                );
              })}
            </Grid>
          </CardLayout>
        ) : (
          false
        )}
      </Grid>
    </React.Fragment>
  );
};
export default JourneyLogs;

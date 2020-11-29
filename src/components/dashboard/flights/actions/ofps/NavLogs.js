import React, { useState, useEffect } from "react";
import { List, Patch } from "DataManager/DataManager";
import {
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CardLayout from "components/CardLayout";
import * as R from "ramda";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";

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

const FieldSelect = (props) => {
  const { items, classes, name, value, onChange, showKey, placeHolder } = props;

  function handleChange(e) {
    const { name, value } = e.target;

    onChange((prev) => ({ ...prev, [name]: value }));
    // onChange(e.target.value);
  }
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Grid item xs={6} sm={6} style={{ margin: "1rem 0rem" }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">{placeHolder}</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={value}
          name={name}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => {
            return (
              <div className={classes.chips}>
                {selected.map((id) => {
                  const item = R.find(R.propEq("id", id))(items);
                  return (
                    <Chip
                      className={classes.chip}
                      key={item.id}
                      label={item[showKey]}
                    />
                  );
                })}
              </div>
            );
          }}
          MenuProps={MenuProps}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item[showKey]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};
const NavLogs = (props) => {
  const [navLogs, setNavLogs] = useState({
    list: [],
  });
  const [form, setForm] = useState({
    navlogs: [],
  });
  const [navLog, setNavLog] = useState("");
  const [navLogData, setNavLogData] = useState([]);
  const classes = useStyles();
  const getNavLogs = async () => {
    try {
      const response = await List(
        "navlogs",
        undefined,
        100,
        1,
        undefined,
        undefined
      );
      const li = response.filter((i) => i.is_deleted === false);

      setNavLogs({
        ...navLogs,
        list: li,
      });
    } catch (error) {}
  };
  const linknavLogToFlight = async () => {
    try {
      await Patch("flights", form, props.id);

      let list = [];
      form.navlogs.forEach((element) => {
        const selectedNav = navLogs.list.filter((i) => i.id === element)[0];
        list.push(selectedNav);
      });
      setNavLogData(list);
    } catch (error) {}
  };
  useEffect(() => {
    getNavLogs();
  }, []);
  return (
    <React.Fragment>
      <Grid container>
        <Grid md={6}>
          <FormControl className={classes.formControl}>
            <FieldSelect
              classes={classes}
              name={"navlogs"}
              items={navLogs.list}
              value={form.navlogs}
              onChange={setForm}
              showKey={"id"}
              placeHolder={"Nav Logs"}
            />
          </FormControl>
        </Grid>
        <Grid md={6} className="mt-4">
          <Button
            onClick={linknavLogToFlight}
            variant="raised"
            className="jr-btn bg-info text-white"
          >
            Add Nav Log
          </Button>
        </Grid>
        {Object.keys(navLogData).length !== 0 ? (
          <CardLayout>
            <div className="jr-card-header mb-3 d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="card-heading mb-0">
                  <i className="zmdi zmdi-notifications-active mr-2" />
                  Nav Log Details
                </h3>
              </div>
            </div>
            <Grid container className="mt-3">
              {navLogData.map((item, idx) => {
                return (
                  <React.Fragment>
                    {Object.entries(item).map(([key, value]) => {
                      return (
                        <React.Fragment>
                          <Grid md={6}>
                            {key} : {value.toString()}
                          </Grid>
                          <br />
                        </React.Fragment>
                      );
                    })}
                    <br />
                  </React.Fragment>
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
export default NavLogs;

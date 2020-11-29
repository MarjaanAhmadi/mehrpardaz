import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import CardLayout from "components/CardLayout/index";
import FuelAndWeights from "./ofps/FuelAndWeights";
import JourneyLogs from "./ofps/JourneyLog";
import NavLogs from "./ofps/NavLogs";
// import { Patch } from "DataManager/DataManager";
// import { publishFlight } from "./apis";

function TabContainer({ children }) {
  return <div>{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const LibraryHistory = (props) => {
  // const { flight } = props;
  // const publishInit = flight.is_published ? true : false;

  const [value, setValue] = useState(0);
  // const [menuState, setMenuState] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(undefined);

  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <CardLayout>
      <div className="jr-card-header mb-3 d-flex align-items-center">
        <div className="mr-auto">
          <h3 className="card-heading mb-0">
            <i className="zmdi zmdi-notifications-active mr-2" />
            OFP
          </h3>
        </div>

        <div className={`jr-btn-group d-flex flex-wrap mt-3 `}>
          {/* <button onClick={publishFlight}>publish</button> */}
          {/* <Button
            // onClick={publishFlight}
            className="jr-btn bg-warning text-white"
          >
            {"Publish"}
          </Button> */}
        </div>
      </div>

      <div className="tab-notifications">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          variant="fullWidth"
        >
          <Tab className="tab text-capitalize" label="Fuel And Weight" />
          <Tab className="tab text-capitalize" label="Journey Log" />
          <Tab className="tab text-capitalize" label="Nav Log" />
        </Tabs>
      </div>

      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabContainer>
          <FuelAndWeights id={props.id} />
        </TabContainer>
        <TabContainer>
          <JourneyLogs id={props.id} />
        </TabContainer>
        <TabContainer>
          <NavLogs id={props.id} />
        </TabContainer>
      </SwipeableViews>
      {/* <CardMenu menuState={menuState} anchorEl={anchorEl}
                  handleRequestClose={this.handleRequestClose.bind(this)}/> */}
    </CardLayout>
  );
};

LibraryHistory.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withStyles(null, { withTheme: true })(LibraryHistory);

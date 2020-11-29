import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import CardLayout from "components/CardLayout";
import CreateOrEdit from "../CreateOrEdit";
import History from "./index";

function TabContainer({ children, dir }) {
  return <div dir={dir}>{children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const LibraryHistory = (props) => {
  const [value, setValue] = useState(0);
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [publishStatus, setPublishStatus] = useState(false);
  const handleChange = (event, value) => {
    setValue(value);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onOptionMenuSelect = (event) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  };
  const handleRequestClose = () => {
    setMenuState(false);
  };

  return (
    <CardLayout>
      <div className="jr-card-header mb-3 d-flex align-items-center">
        <div className="mr-auto">
          <h3 className="card-heading mb-0">
            <i className="zmdi zmdi-notifications-active mr-2" />
            {props.title}
          </h3>
        </div>
        {/* {publishStatus && (
          <div className={`jr-btn-group d-flex flex-wrap mt-3 `}>
            <Button variant="raised" className="jr-btn bg-success text-white">
              Published
            </Button>
          </div>
        )} */}
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
          <Tab
            className="tab text-capitalize"
            label={props.edit ? "Edit" : "Create"}
          />

          <Tab className="tab text-capitalize" label="History" />
        </Tabs>
      </div>

      <SwipeableViews
        axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={props.theme.direction}>
          <CreateOrEdit
            publishStatus={(status) => {
              setPublishStatus(status);
            }}
            getFilesAndFolders={props.getFilesAndFolders}
            editedId={props.editedId}
            edit={props.edit}
            toggle={props.handleCancel}
            reset={props.resetCurrentFolder}
            curFolder={props.curFolder}
            detailId={props.detailId}
          />
        </TabContainer>
        <TabContainer dir={props.theme.direction}>
          <History />
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

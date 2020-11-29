import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { mailFolderListItems, otherMailFolderListItems } from "../tileData";
import CardBox from "components/CardBox";

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const sideList = (
      <div className="drawer">
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );


    return (
        <div className="row">
          <CardBox
            styleName="col-lg-3 col-sm-6"
            cardStyle="text-center py-sm-5"
          >
            <Button
              variant="contained"
              className="jr-btn text-white bg-primary"
              onClick={this.toggleDrawer("right", true)}
            >
              <i className="zmdi zmdi-long-arrow-left zmdi-hc-fw" />
              <span>Open Right</span>
            </Button>
          </CardBox>

        <Drawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer("right", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("right", false)}
            onKeyDown={this.toggleDrawer("right", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default TemporaryDrawer;

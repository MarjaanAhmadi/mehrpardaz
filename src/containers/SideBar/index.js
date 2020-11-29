import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import UserInfo from "components/UserInfo";
import {
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from "constants/ActionTypes";
import { toggleCollapsedNav, updateWindowWidth } from "actions/Setting";
import SideBarContent from "./SideBarContent";

const SideBar = () => {
  const dispatch = useDispatch();
  const { navCollapsed, drawerType, width, navigationStyle } = useSelector(
    ({ settings }) => settings
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, [dispatch]);

  const onToggleCollapsedNav = (e) => {
    const val = !navCollapsed;
    dispatch(toggleCollapsedNav(val));
  };

  let drawerStyle = drawerType.includes(FIXED_DRAWER)
    ? "d-xl-flex"
    : drawerType.includes(COLLAPSED_DRAWER)
    ? ""
    : "d-flex";
  let type = "permanent";
  if (
    drawerType.includes(COLLAPSED_DRAWER) ||
    (drawerType.includes(FIXED_DRAWER) && width < 1200)
  ) {
    type = "temporary";
  }

  if (navigationStyle === HORIZONTAL_NAVIGATION) {
    drawerStyle = "";
    type = "temporary";
  }
  return (
    <></>
  );
};

export default withRouter(SideBar);

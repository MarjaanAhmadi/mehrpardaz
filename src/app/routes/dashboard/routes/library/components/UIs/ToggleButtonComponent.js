import React from "react";

import AppsIcon from "@material-ui/icons/Apps";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { ToggleButton } from "@material-ui/lab";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { selShowType, setShowType } from "./../../slice/librarySlice";

export default function ToggleButtonComponent(props) {
  const showType = useSelector(selShowType);
  const dispatch = useDispatch();

  const changeShowType = (type) => () => dispatch(setShowType(type));
  const [alignment, setAlignment] = React.useState(
    showType === "grid" ? "left" : "right"
  );

  function handleAlignment(e, newAlignment) {
    setAlignment(newAlignment);
  }

  return (
    <ToggleButtonGroup
      size="small"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton
        onClick={changeShowType("grid")}
        value="left"
        aria-label="left"
      >
        <AppsIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton
        onClick={changeShowType("list")}
        value="center"
        aria-label="right"
      >
        <FormatListBulletedIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

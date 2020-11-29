import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
const CustomSwitch = () => {
  const [checked, setChecked] = useState(true);
  return (
    <React.Fragment>
      <Switch color="primary" checked={checked} />
    </React.Fragment>
  );
};
export default CustomSwitch;

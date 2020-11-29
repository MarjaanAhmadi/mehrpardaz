import React from "react";
import "./index.css";
import LoadingComponent from "./LoadingComponent";

export default function (props) {
  return (
    <div className={"simple-loader"}>
      <LoadingComponent />
    </div>
  );
}

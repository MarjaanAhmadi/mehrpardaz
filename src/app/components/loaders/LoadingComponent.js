import React from "react";
import "./simple.css";

const LoadingComponent = () => {
  return (
    <div className="lds-ripple">
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingComponent;

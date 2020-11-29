import React from "react";

const BigLoader = ({ isLoading, message }) =>
  isLoading ? <div>...loading: {message}</div> : "";

export default BigLoader;

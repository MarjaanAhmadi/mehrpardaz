import React, { useState } from "react";
import { Col } from "reactstrap";
import Folder from "../UIs/FolderComponent";
import File from "../UIs/FileComponent";
import TemporaryDrawer from "./temporary/TemporaryDrawer";
const GridView = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawer = (status) => {
    setOpenDrawer(status);
  };
  return (
    <React.Fragment>
      <Col xs="3">
        <Folder
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <Folder
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <Folder
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <File
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <File
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <File
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <File
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      <Col xs="3">
        <File
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
        />
      </Col>
      {openDrawer ? (
        <TemporaryDrawer
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
          open={openDrawer}
        />
      ) : (
        false
      )}
    </React.Fragment>
  );
};
export default GridView;

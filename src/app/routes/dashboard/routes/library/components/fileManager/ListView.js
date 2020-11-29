import React, { useState } from "react";
import FileTable from "../FileTable";
import { Col } from "reactstrap";
import TemporaryDrawer from "./temporary/TemporaryDrawer";

const ListView = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawer = (status) => {
    setOpenDrawer(status);
  };
  return (
    <Col xs="12">
      {handleDrawer ? (
        <TemporaryDrawer
          handleDrawer={(status) => {
            handleDrawer(status);
          }}
          open={openDrawer}
        />
      ) : (
        false
      )}
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card">
              <FileTable
                handleDrawer={(status) => {
                  handleDrawer(status);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};
export default ListView;

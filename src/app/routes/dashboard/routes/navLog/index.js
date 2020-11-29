import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import NavLogTable from "components/dashboard/navLogs/NavLogTable";
import IntlMessages from "util/IntlMessages";
import { List } from "DataManager/DataManager";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateOrEdit from "../../../../../components/dashboard/navLogs/actions/CreateOrEdit";
import Button from "@material-ui/core/Button";

const NavLogs = ({ match }) => {
  const dispatch = useDispatch();
  const [navLogs, setNavLogs] = useState({
    list: [],
  });
  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const getNavLogs = async () => {
    try {
      const response = await List(
        "navlogs",
        undefined,
        10,
        1,
        undefined,
        undefined
      );
      const li = response.filter((i) => i.is_deleted === false);
      setNavLogs({
        ...navLogs,
        list: li,
      });
      if (previewVisible) {
        setPreviewVisible(false);
      }

      dispatch({ navLogs: response, type: "SET_NAV_LOGS" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  useEffect(() => {
    getNavLogs();
  }, []);

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        match={match}
        title={<IntlMessages id="sidebar.flight.navLogs" />}
      />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card">
            <div className="jr-card-header d-flex align-items-center">
              <div className={`jr-btn-group d-flex flex-wrap mt-3`}>
                <Button
                  onClick={() => {
                    setPreviewVisible(true);
                    setEditedId("");
                    setEdit(false);
                  }}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-white"
                >
                  <h3 className="mb-0">Create New NavLog Row</h3>
                </Button>
              </div>
            </div>
            <NavLogTable
              openModal={(data) => {
                setPreviewVisible(true);
                setEdit(true);
                setEditedId(data);
              }}
              getNavLogs={getNavLogs}
              data={navLogs.list}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={previewVisible} toggle={handleCancel}>
        <ModalHeader toggle={handleCancel}>
          {edit ? "Edit Nav Log" : "Create Nav Log"}
        </ModalHeader>
        <ModalBody>
          <CreateOrEdit getNavLogs={getNavLogs} id={editedId} edit={edit} />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default NavLogs;

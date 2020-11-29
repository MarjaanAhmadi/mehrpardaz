import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import JourneyLogTable from "components/dashboard/journeyLog/JourneyLogTable";
import IntlMessages from "util/IntlMessages";
import { List } from "DataManager/DataManager";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateOrEdit from "components/dashboard/journeyLog/actions/CreateOrEdit";
import Button from "@material-ui/core/Button";

const JourneyLog = ({ match }) => {
  const dispatch = useDispatch();
  const [journeyLogs, setJourneyLogs] = useState({
    list: [],
  });
  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const getJourneyLogs = async () => {
    try {
      const response = await List(
        "journeylogs",
        undefined,
        10,
        1,
        undefined,
        undefined
      );
      const li = response.filter((i) => i.is_deleted === false);
      setJourneyLogs({
        ...journeyLogs,
        list: li,
      });
      if (previewVisible) {
        setPreviewVisible(false);
      }

      dispatch({ journeyLogs: response, type: "SET_NAV_LOGS" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  useEffect(() => {
    getJourneyLogs();
  }, []);

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        match={match}
        title={<IntlMessages id="sidebar.flight.journeyLogs" />}
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
                  <h3 className="mb-0">Create New Journey Log</h3>
                </Button>
              </div>
            </div>
            <JourneyLogTable
              openModal={(data) => {
                setPreviewVisible(true);
                setEdit(true);
                setEditedId(data);
              }}
              getJourneyLogs={getJourneyLogs}
              data={journeyLogs.list}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={previewVisible} toggle={handleCancel}>
        <ModalHeader toggle={handleCancel}>
          {edit ? "Edit Journey Log" : "Create Journey Log"}
        </ModalHeader>
        <ModalBody>
          <CreateOrEdit
            getJourneyLogs={getJourneyLogs}
            id={editedId}
            edit={edit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default JourneyLog;

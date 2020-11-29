import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import LandingTable from "components/dashboard/landings/LandingTable";
import IntlMessages from "util/IntlMessages";
import { List } from "DataManager/DataManager";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateOrEdit from "components/dashboard/landings/actions/CreateOrEdit";
import Button from "@material-ui/core/Button";
import DetailsComp from "components/dashboard/landings/actions/DetailsComp";
import LatestNotifications from "components/dashboard/Common/LatestNotifications";

const Landings = ({ match }) => {
  const dispatch = useDispatch();
  const [landings, setLandings] = useState({
    list: [],
  });
  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);
  const [previewVisibleDetail, setPreviewVisibleDetail] = useState(false);
  const [detailId, setDetailedId] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const getLandings = async () => {
    try {
      const response = await List(
        "landings",
        undefined,
        10,
        1,
        undefined,
        undefined
      );

      setLandings({
        ...landings,
        list: response,
      });
      if (previewVisible) {
        setPreviewVisible(false);
      }

      dispatch({ landings: response, type: "SET_Landings" });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelDetail = () => {
    setPreviewVisibleDetail(false);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  useEffect(() => {
    getLandings();
  }, []);

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        match={match}
        title={<IntlMessages id="sidebar.dashboard.landings" />}
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
                  <h3 className="mb-0">Create New Landingt</h3>
                </Button>
              </div>
            </div>
            <LandingTable
              openModal={(data) => {
                setPreviewVisible(true);
                setEdit(true);
                setEditedId(data);
              }}
              openDetailedLog={(data) => {
                setPreviewVisibleDetail(true);
                setEdit(false);
                setDetailedId(data);
              }}
              getLandings={getLandings}
              data={landings.list}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={previewVisible} toggle={handleCancel}>
        <ModalHeader toggle={handleCancel}>
          {edit ? "Edit Landingt" : "Create Landingt"}
        </ModalHeader>
        <ModalBody>
          <CreateOrEdit getLandings={getLandings} id={editedId} edit={edit} />
        </ModalBody>
      </Modal>
      <Modal isOpen={previewVisibleDetail} toggle={handleCancelDetail}>
        <ModalHeader toggle={handleCancelDetail}>
          Notification Details
        </ModalHeader>
        <ModalBody>
          <LatestNotifications title="Landingt Details" detailId={detailId} />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default Landings;

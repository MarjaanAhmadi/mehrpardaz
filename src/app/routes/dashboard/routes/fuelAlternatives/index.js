import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import FuelAlternativesTable from "components/dashboard/fuelAlternatives/FuelAlternativesTable";
import IntlMessages from "util/IntlMessages";
// import { List } from 'DataManager/DataManager';
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateOrEdit from "components/dashboard/fuelAlternatives/actions/CreateOrEdit";
import Button from "@material-ui/core/Button";
import axiosInstance from "config/axios/axiosInstance";
// import DetailsComp from 'components/dashboard/flights/actions/DetailsComp';
import LatestNotifications from "components/dashboard/Common/LatestNotifications";

const FuelAlternatives = ({ match }) => {
  const dispatch = useDispatch();
  const [fuelAlternatives, setFuelAlternatives] = useState({
    list: [],
  });
  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);
  const [previewVisibleDetail, setPreviewVisibleDetail] = useState(false);
  const [addAttachmentModal, setAddAttachmentModal] = useState(false);

  console.log("FuelAlternatives -> addAttachmentModal", addAttachmentModal);

  const [detailId, setDetailedId] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  async function getFuelAlternatives() {
    try {
      const response = await axiosInstance.get("/fuel-alternatives");
      const li = response.data.message.filter((i) => i.is_deleted === false);
      setFuelAlternatives({
        ...fuelAlternatives,
        list: li,
      });
      if (previewVisible) {
        setPreviewVisible(false);
      }

      dispatch({ fuelAlternatives: response, type: "SET_FuelAlternatives" });
    } catch (error) {
      console.log(error);
    }
  }
  function handleCancelDetail() {
    setPreviewVisibleDetail(false);
  }
  //   function  handleCancelAddAttachment  () {
  //     setAddAttachmentModal(false);
  //   };

  function handleCancel() {
    setPreviewVisible(false);
  }

  function onShowCard() {
    setPreviewVisible(true);
    setEditedId("");
    setEdit(false);
  }

  function onModalOpen(data) {
    setPreviewVisible(true);
    setEdit(true);
    setEditedId(data);
  }
  function openDetailedLog(data) {
    setPreviewVisibleDetail(true);
    setEdit(false);
    setDetailedId(data);
  }
  function openAddAtachmentModal(data) {
    setAddAttachmentModal(true);
    setEdit(false);
    setDetailedId(data);
  }

  useEffect(() => {
    getFuelAlternatives();
  }, []);

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <ContainerHeader
        match={match}
        title={<IntlMessages id="sidebar.settings.fuelAlternatives" />}
      />
      <div className="row mb-md-3">
        <div className="col-12">
          <div className="jr-card">
            <div className="jr-card-header d-flex align-items-center">
              <div className={`jr-btn-group d-flex flex-wrap mt-3`}>
                <Button
                  onClick={onShowCard}
                  variant="contained"
                  color="primary"
                  className="jr-btn text-white"
                >
                  <h3 className="mb-0">Create New Fuel Alternative</h3>
                </Button>
              </div>
            </div>
            <FuelAlternativesTable
              openModal={onModalOpen}
              openDetailedLog={openDetailedLog}
              openAddAtachmentModal={openAddAtachmentModal}
              getFuelAlternatives={getFuelAlternatives}
              data={fuelAlternatives.list}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={previewVisible} toggle={handleCancel}>
        <ModalHeader toggle={handleCancel}>
          {edit ? "Edit Fuel Alternative" : "Create Fuel Alternative"}
        </ModalHeader>
        <ModalBody>
          <CreateOrEdit
            getFuelAlternatives={getFuelAlternatives}
            id={editedId}
            edit={edit}
          />
        </ModalBody>
      </Modal>
      <Modal isOpen={previewVisibleDetail} toggle={handleCancelDetail}>
        <ModalHeader toggle={handleCancelDetail}>
          Notification Details
        </ModalHeader>
        <ModalBody>
          <LatestNotifications
            title="Fuel Alternative Details"
            detailId={detailId}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
export default FuelAlternatives;

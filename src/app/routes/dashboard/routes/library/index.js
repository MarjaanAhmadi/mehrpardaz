import React, { useState, useEffect } from "react";
// import * as R from "ramda";
// import axiosInstance from "config/axios/axiosInstance";
import ContainerHeader from "./components/UIs/ContainerHeader";
import IntlMessages from "util/IntlMessages";
import FileManager from "./components/fileManager/FileManager";
import UnpublishedTable from "./components/unpublishTable/UnpublshTable";
import NewContent from "./components/Modals/NewContent";
import FilesModal from "./components/Modals/FilesModal";
import { getRootFolder } from "./slice/libraryThunks";
import { useDispatch } from "react-redux";
import DeleteTable from "./components/deletedTable/DeleteTable";
import { debounce_ } from "util/index";

import UploaderBox from "./components/UploaderBox/Uploader";

function Library({ match }) {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [fileModal, setFileModal] = useState(false);

  function closeModal(type) {
    if (type === "folder") {
      setModal(false);
    } else {
      setFileModal(false);
    }
  }

  function openModal(type) {
    if (type === "folder") {
      setModal(true);
    } else {
      setFileModal(true);
    }
  }

  useEffect(() => {
    dispatch(getRootFolder());
  }, [dispatch]);

  return (
    <>
      <NewContent closeModal={closeModal} modal={modal} />
      <FilesModal closeModal={closeModal} modal={fileModal} />

      <ContainerHeader
        openModal={openModal}
        match={match}
        title={<IntlMessages id="sidebar.dashboard.library" />}
      />

      <div>
        <FileManager />
        <br />
        <UnpublishedTable />

        {/* <UploaderBox /> */}
        {/* <DeleteTable /> */}
      </div>
    </>
  );
}

export default Library;

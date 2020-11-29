import React, { useState, useEffect } from "react";
import * as R from "ramda";
// import axiosInstance from "config/axios/axiosInstance";
import { getFolderByID, deleteFileOrFolder } from "./apis";
import { makeStyles } from "@material-ui/styles";
// import Uploader from "./uploader";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import CardMenu from "components/dashboard/Common/CardMenu";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Downloader from "./Downloader";
import CreateOrEdit from "components/dashboard/library/actions/CreateOrEdit";

const useStyle = makeStyles({
  backBreadCrumb: {
    backgroundColor: "white",
    padding: 10,
  },
  folder: {
    width: 40,
    height: 40,
  },
  contentSection: {
    marginTop: 10,
    padding: 20,
  },
  folderContent: {
    justifyContent: "space-between",
    flexDirection: "row",
    display: "flex",
  },
  details: {
    color: "gray",
    fontSize: 12,
  },
});
// async function getFolders() {
//   const res = await axiosInstance.get("/documents");
//   console.log("getFolders -> res", res);
// }

const Library = ({ match }) => {
  const classes = useStyle();

  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [menuStateFolder, setMenuStateFolder] = useState(false);
  const [anchorElFolder, setAnchorElFolder] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);

  const [curFolder, setCurFolder] = useState({
    id: "5f3c1991bee8d0397fbcef17",
    files: [],
    folders: [],
  });

  const onOptionMenuSelectFolder = (event) => {
    setMenuStateFolder(true);
    setAnchorElFolder(event.currentTarget);
  };

  const getFilesAndFolders = async () => {
    const cur = await getFolderByID(curFolder.id);
    console.log("fetchData -> cur", cur);
    setCurFolder(cur);
    setLoading(false);
  };

  const handleRequestClose = (idx) => {
    if (idx !== null) {
      switch (idx) {
        case 0:
          setEdit(true);
          setPreviewVisible(true);
          break;
        case 1:
          //update
          break;
        case 2:
          onFileDelete();
          break;
        default:
          break;
      }
    }
    setMenuState(false);
    setMenuStateFolder(false);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  useEffect(() => {
    async function fetchData() {
      const cur = await getFolderByID(curFolder.id);
      console.log("fetchData -> cur", cur);
      setCurFolder(cur);
      setLoading(false);
    }
    fetchData();
  }, []);

  async function resetCurrentFolder() {
    const cur = await getFolderByID(curFolder.id);
    setCurFolder(cur);
  }

  const handleRequestCloseFolder = (idx) => {
    if (idx !== null) {
      switch (idx) {
        case 0:
          setPreviewVisible(true);
          setEdit(true);
          break;
        case 2:
          onFileDelete();
          break;
        default:
          break;
      }
    }
    setMenuState(false);
    setMenuStateFolder(false);
  };

  const onOptionMenuSelect = (event) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  };

  const onFolderClick = (id) => async () => {
    const cur = await getFolderByID(id);
    console.log("onFolderClick -> cur", cur);
    setCurFolder(cur);
  };

  function onBackClick() {
    if (curFolder.title === "root") return "";
    onFolderClick(curFolder.parent.id)();
    return "";
  }

  const onFileDelete = async () => {
    await deleteFileOrFolder(editedId);
    await resetCurrentFolder();
    return "";
  };
  const { folders, files } = curFolder;

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className={classes.folderContent}>
          <div>
            <ArrowBackIcon
              onClick={onFolderClick("5f3c1991bee8d0397fbcef17")}
            />
            <span>Home</span>
            <ArrowBackIcon onClick={onBackClick} />
            <span>{curFolder.title}</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setPreviewVisible(true);
              setEditedId(curFolder.id);
              setEdit(false);
            }}
          >
            Create
          </Button>
        </div>
        {/* <span>{curFolder.title}</span> */}

        <div className={classes.contentSection}>
          {folders.map((folder) => {
            return (
              <div className={classes.folderContent}>
                <div
                  className={classes.itemContent}
                  onClick={onFolderClick(folder.id)}
                >
                  <img
                    className={classes.folder}
                    src={require("assets/images/folder.png")}
                    alt="folder"
                    title="folder"
                  />
                  <span>{folder.title}</span>
                </div>
                <div className={classes.details}>
                  <IconButton
                    onClick={(event) => {
                      onOptionMenuSelectFolder(event);
                      setEditedId(folder.id);
                    }}
                  >
                    <i className="zmdi zmdi-more-vert" />
                  </IconButton>
                  <CardMenu
                    menuState={menuStateFolder}
                    anchorEl={anchorElFolder}
                    handleRequestClose={(idx) => {
                      handleRequestCloseFolder(idx);
                    }}
                  />
                </div>
              </div>
            );
          })}
          {files.map((file) => {
            return (
              <div className={classes.folderContent}>
                <div>
                  <Downloader
                    fileId={file.src}
                    fileName={file.title}
                    fileExtension={file.extension}
                  >
                    <img
                      src={require("assets/images/file.png")}
                      className={classes.folder}
                      title="folder"
                      alt="folder"
                    />
                    <span>{file.title}</span>
                  </Downloader>
                </div>
                <div className={classes.details}>{file.created_time}</div>
                <div className={classes.details}>
                  {file.created_by.username}
                </div>
                <div className={classes.details}>{file.extension}</div>
                <div className={classes.details}>
                  <IconButton
                    onClick={(event) => {
                      onOptionMenuSelect(event);
                      setEditedId(file.id);
                    }}
                  >
                    <i className="zmdi zmdi-more-vert" />
                  </IconButton>
                  <CardMenu
                    menuState={menuState}
                    anchorEl={anchorEl}
                    handleRequestClose={(idx) => {
                      handleRequestClose(idx);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Modal isOpen={previewVisible} toggle={handleCancel}>
          <ModalHeader toggle={handleCancel}>Upload</ModalHeader>
          <ModalBody>
            <CreateOrEdit
              getFiles={getFilesAndFolders}
              editedId={editedId}
              edit={edit}
              toggle={handleCancel}
              reset={resetCurrentFolder}
              curFolder={curFolder}
            />
          </ModalBody>
        </Modal>

        {/* <Modal isOpen={fileModal}>
        <ModalHeader toggle={() => setFileModal(false)}>
          Delete File
        </ModalHeader>
        <ModalBody>
          <FileModal
            closeModal={() => {
              setFileModal(false);
            }}
            file={curFile}
            getFiles={getFiles}
            toggle={() => setFileModal(false)}
          />
        </ModalBody>
      </Modal>
   */}
      </div>
    </div>
  );
};
export default Library;

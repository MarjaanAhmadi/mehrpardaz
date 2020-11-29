import React, { useState, useEffect } from "react";
import ContainerHeader from "components/ContainerHeader";
import FileTable from "components/dashboard/files/FileTable";
import IntlMessages from "util/IntlMessages";
import IconButton from "@material-ui/core/IconButton";
import { List } from "DataManager/DataManager";
import { useDispatch } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateOrEdit from "components/dashboard/files/actions/CreateOrEdit";
import Button from "@material-ui/core/Button";
import CardMenu from "components/dashboard/Common/CardMenu";
import { compose } from "ramda";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import { folderCreator, uniqPathsByKey, setObjToKey } from "./func";
import FileModal from "./fileModal/fileModal";

import * as R from "ramda";
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

const Files = ({ match }) => {
  const classes = useStyle();
  // const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false);
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [menuStateFolder, setMenuStateFolder] = useState(false);
  const [anchorElFolder, setAnchorElFolder] = useState(undefined);
  const [contents, setContents] = useState({
    files: {},
    folders: [],
  });
  const [curFolder, setCurFolder] = useState({
    title: "",
    path: "",
    children: [],
  });

  const [editedId, setEditedId] = useState("");
  const [edit, setEdit] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [initFoldersData, setInitFoldersData] = useState([]);

  const getFiles = async (finalPath = null) => {
    const response = await List(
      "file_managers",
      undefined,
      0,
      100,
      undefined,
      undefined
    );

    const folders = compose(folderCreator, uniqPathsByKey)(
      response,
      "file_path"
    );

    const files = setObjToKey(response, "file_path");

    setContents({
      files,
      folders,
    });

    let folder = {};

    if (finalPath) {
      folder = folders.find((el) => el.path === finalPath) || {};
    } else {
      folder = folders[5];
    }

    const { title, path, children } = folder;
    setCurFolder({ title, path, children });
  };

  const onOptionMenuSelect = (event) => {
    setMenuState(true);
    setAnchorEl(event.currentTarget);
  };

  const onOptionMenuSelectFolder = (event) => {
    setMenuStateFolder(true);
    setAnchorElFolder(event.currentTarget);
  };

  const handleRequestClose = (idx, file) => {
    if (idx !== null) {
      switch (idx) {
        case 0:
          setEdit(true);
          setEditedId(file._id);
          setPreviewVisible(true);
          break;
        case 1:
          //update
          break;
        case 2:
          onFileClick(file);
          break;
        default:
          break;
      }
    }
    setMenuState(false);
  };

  const deleteFolder = async (folder) => {
    try {
      const selectedFile = files[curFolder.path];

      curFolder.children.forEach((item, idx) => {});
    } catch (error) {}
  };

  const handleRequestCloseFolder = (idx, folder) => {
    if (idx !== null) {
      switch (idx) {
        case 2:
          deleteFolder(folder);
          break;
        default:
          break;
      }
    }
    setMenuState(false);
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };
  const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  useEffect(() => {
    async function fetchData() {
      await getFiles();
      setLoading(false);
    }
    fetchData();
  }, []);

  const { folders, files } = contents;

  const checkFilePath = (idx) => () => {
    if (idx === 0) {
      const { title, path, children } = folders.contents[5];
      setCurFolder({ title, path, children });
    }
  };

  const onFolderClick = (path, status) => () => {
    const folder = folders.find((el) => el.path === path) || {};
    setCurFolder(folder);
  };
  const [fileModal, setFileModal] = useState(false);
  const [curFile, setCurFile] = useState({});
  const onFileClick = (file) => {
    setFileModal(true);
    setCurFile(file);
  };

  function handleBack() {
    const curPath = curFolder.path;
    const { init, tail, join, split, compose } = R;

    let path = compose(join("/"), init, init, tail, split("/"))(curPath);
    path = "/" + path + "/";
    if (curPath !== "/droot/") {
      const folder = folders.find((el) => el.path === path) || {};
      setCurFolder(folder);
    }
  }

  if (loading) return "";

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      <div className={classes.folderContent}>
        <div>
          <ArrowBackIcon onClick={handleBack} />
          <span>{curFolder.path}</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setPreviewVisible(true);
            setEditedId("");
            setEdit(false);
          }}
        >
          Create
        </Button>
      </div>
      {/* <span>{curFolder.title}</span> */}

      <div className={classes.contentSection}>
        {curFolder.children &&
          curFolder.children.map((folder) => {
            return (
              <div className={classes.folderContent}>
                <div
                  className={classes.itemContent}
                  onClick={onFolderClick(folder.path, "next")}
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
                  <IconButton onClick={onOptionMenuSelectFolder}>
                    <i className="zmdi zmdi-more-vert" />
                  </IconButton>
                  <CardMenu
                    menuState={menuStateFolder}
                    anchorEl={anchorElFolder}
                    handleRequestClose={(idx) => {
                      handleRequestCloseFolder(idx, folder);
                    }}
                  />
                </div>
              </div>
            );
          })}
        {files[curFolder.path] &&
          files[curFolder.path].map((file) => {
            return (
              <div className={classes.folderContent}>
                <div>
                  
                </div>
                <div className={classes.details}>{file.created_time}</div>
                <div className={classes.details}>
                  {file.created_by.username}
                </div>
                <div className={classes.details}>{file.extension}</div>
                <div className={classes.details}>
                  <IconButton onClick={onOptionMenuSelect}>
                    <i className="zmdi zmdi-more-vert" />
                  </IconButton>
                  <CardMenu
                    menuState={menuState}
                    anchorEl={anchorEl}
                    handleRequestClose={(idx) => {
                      handleRequestClose(idx, file);
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
            getFiles={getFiles}
            initPath={curFolder.path}
            editedId={editedId}
            edit={edit}
            toggle={handleCancel}
          />
        </ModalBody>
      </Modal>

      <Modal isOpen={fileModal}>
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
    </div>
  );
};
export default Files;

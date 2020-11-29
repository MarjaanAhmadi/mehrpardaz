import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ConfirmToast from "components/ConfirmToast";
import moment from "moment";
import {
  Card,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardBody,
  Button,
} from "reactstrap";
import { makeStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
// import DropZone from "../../../components/actions/DropZone";
import Progress from "../../UIs/Progress";
import classnames from "classnames";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
import VersionSection from "./VersionSection";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { selNavs, selDrawerContent } from "./../../../slice/librarySlice";
import {
  deleteContent,
  createFileNewVersion,
  getContentSetDrawer,
  editContentTitle,
  unPublishByContent,
  restoreContent,
} from "./../../../slice/libraryThunks";
import * as R from "ramda";
import Tumbs from "../../Modals/Tumbs";
import { IconButton } from "@material-ui/core";
import Downloader from "../../Downloader";
import EditInput from "../../UIs/EditInput.";
import filteringTime from "../../../filteringExtension/filteringTime";
import filteringExtension from "../../../filteringExtension";
import iconSelector from "../../icons/iconSelctor";
import getDateFns from "util/getDateFn";

const useStyles = makeStyles({
  root: {
    width: "400px !important",
  },
  details: {
    flexDirection: "column",
  },
  folder: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 60,
  },
  folderDetails: {
    marginTop: 16,
  },
  infoKey: {
    fontSize: 13,
    fontWeight: "bold",
    padding: "8px 0",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "normal",
  },
  titleSection: {
    width: 172,
  },
  title: {
    color: "#364a63",
    textAlign: "center",
  },
  icon: {
    marginLeft: 4,
    color: "#364a63",
  },
  removeBtn: {
    position: "absolute",
    top: 27,
    right: 37,
  },
  publishBtn: {
    position: "absolute",
    top: 27,
    right: 110,
  },
  downloadBtn: {
    position: "absolute",
    top: 20,
    right: 16,
  },
  version: {
    marginLeft: 6,
    marginBottom: 8,
    display: "flex",
    justifyContent: "space-between",
  },
  chip: {
    marginTop: 8,
  },
});

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const TemporaryDrawer = (props) => {
  const { open, handleDrawer, current } = props;
  const content = useSelector(selDrawerContent);

  const dispatch = useDispatch();
  const classes = useStyles();
  const navs = useSelector(selNavs);
  const path = R.compose(R.join("/"), R.map(R.prop("title")))(navs);
  const { title } = content;
  const type = content.is_folder ? "folder" : "file";
  const initVer = type === "folder" ? "1.0.0" : content.version;

  const [activeTab, setActiveTab] = useState("1");
  const [expanded, setExpanded] = useState("panel1");
  const [suggestion, setSuggestion] = useState(suggestionFunc(initVer));
  const [version, setVersion] = useState(suggestionFunc(initVer));
  const [files, setFiles] = useState([]);
  const [name, setName] = useState(title);
  const [inputStatus, setInputStatus] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => {
          console.log(file);
          return Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
        })
      );
    },
  });

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  function onDelete() {
    toast(
      <ConfirmToast
        message="Do you want to delete this item?"
        confirm={confirmDelete}
      />
    );
  }

  function confirmDelete() {
    dispatch(deleteContent(content, current));
    handleDrawer(false);
  }

  function onRestore() {
    toast(
      <ConfirmToast
        message="Do you want to restore this item?"
        confirm={confirmRestore}
      />
    );
  }

  function confirmRestore() {
    dispatch(restoreContent(content, current));
    handleDrawer(false);
  }

  function onUnpublish() {
    toast(
      <ConfirmToast
        message="Do you want to unpublish this item?"
        confirm={confirmUnpublish}
      />
    );
  }

  function confirmUnpublish() {
    dispatch(unPublishByContent(content, current));
    handleDrawer(false);
  }

  const handleChangeAccordin = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function suggestionFunc(a) {
    // const a = type === "folder" ? "1.0.0" : content.version;
    let x = a.split(".");
    let first = Number(x[0]);
    let second = Number(x[1]);
    let tirth = Number(x[2]);
    if (tirth + 1 >= 20) {
      if (second + 1 >= 20) {
        first++;
        second = 0;
      } else {
        second++;
      }
      tirth = 0;
    } else {
      tirth++;
    }
    return `${first}.${second}.${tirth}`;
    // setSuggestion(`${first}.${second}.${tirth}`);
    // setVersion(`${first}.${second}.${tirth}`);
  }

  // useEffect(() => {
  //   setVersion(suggestionFunc(initVer));
  //   setSuggestion(suggestionFunc(initVer));
  // }, [initVer]);

  function handleChangeVersion(e) {
    const { value } = e.target;
    setVersion(value);
  }

  const Thumbs = files.map((file, idx) => (
    <Tumbs
      file={file}
      title={title}
      freeze={true}
      key={`${file.name}_modalFile`}
    />
  ));

  function handleChange(e) {
    const { value } = e.target;
    setName(value);
  }
  function HandleInputStatus() {
    setInputStatus(!inputStatus);
  }

  async function handleUploadFile() {
    if (files.length > 0) {
      await dispatch(createFileNewVersion(files[0], content, current, version));
      setFiles([]);

      handleChangeAccordin("panel2")(null, true);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onAction("EDIT_TITLE")();
    }
  }

  const onAction = (action, payload) => () => {
    switch (action) {
      case "EDIT_TITLE":
        setInputStatus(false);
        dispatch(editContentTitle(content, name, current));
        break;

      default:
        break;
    }
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const sideList = (
    <Card className="shadow border-0">
      <CardHeader>
        <Nav className="card-header-tabs" tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Details
            </NavLink>
          </NavItem>
          {type === "file" && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                History
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </CardHeader>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <CardBody>
            <div className={classes.folder}>
              {type === "folder" ? (
                <img
                  src={require("assets/images/folder.png")}
                  alt="folder"
                  title="folder"
                  className={classes.image}
                />
              ) : (
                <img
                  src={iconSelector(content.src.mimetype)}
                  alt="folder"
                  title="folder"
                  className={classes.image}
                />
              )}
            </div>
            <div className={classes.folderDetails}>
              <div className="d-flex justify-content-center">
                {!inputStatus ? (
                  <div className={classes.titleSection}>
                    <h3 className={`card-title ${classes.title}`}>{name}</h3>
                  </div>
                ) : (
                  <EditInput
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    value={name}
                  />
                )}
                {inputStatus ? (
                  <CheckIcon
                    size="small"
                    onClick={onAction("EDIT_TITLE")}
                    className={classes.icon}
                  />
                ) : (
                  <EditIcon
                    size="small"
                    onClick={HandleInputStatus}
                    className={classes.icon}
                  />
                )}
              </div>
              <div className={classes.infoKey}>
                Type: <span className={classes.infoValue}>{type}</span>
              </div>
              <div className={classes.infoKey}>
                Extension:{" "}
                <span className={classes.infoValue}>
                  {!content.is_folder ? content.src.mimetype : "-"}
                </span>
              </div>
              {/* <div className={classes.infoKey}>
               
                Size: <span className={classes.infoValue}>100kb</span>
              </div> */}

              <div className={classes.infoKey}>
                Location: <span className={classes.infoValue}>{path}</span>
              </div>
              <div className={classes.infoKey}>
                Owner:{" "}
                <span className={classes.infoValue}>
                  {content.created_by.username}
                </span>
              </div>
              <div className={classes.infoKey}>
                Creation Date:{" "}
                <span className={classes.infoValue}>
                  {
                    getDateFns("diffFromToday")(content.created_time)
                    // filteringTime(
                    //   moment(content.created_time)
                    //     .locale("ir")
                    //     .startOf("days")
                    //     .fromNow()
                    // )
                  }
                </span>
              </div>
              <div className={classes.infoKey}>
                Modified at:{" "}
                <span className={classes.infoValue}>
                  {
                    getDateFns("diffFromToday")(content.updated_time)
                    // filteringTime(
                    //   moment(content.updated_time)
                    //     .locale("ir")
                    //     .startOf("days")
                    //     .fromNow()
                    // )
                  }
                </span>
              </div>
            </div>
          </CardBody>
        </TabPane>

        <TabPane tabId="2">
          <CardBody>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChangeAccordin("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Upload New Version
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                {/* <Progress /> */}
                <div className="dropzone-card">
                  <div className="dropzone">
                    <div {...getRootProps({ className: "dropzone-file-btn" })}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </div>
                  <div className="dropzone-content" style={thumbsContainer}>
                    {Thumbs}
                  </div>
                </div>
                {/* <DropZone /> */}
                <div className={classes.version}>
                  <TextField
                    placeholder="Version"
                    value={version}
                    onChange={handleChangeVersion}
                  />
                  {/* <Chip
                    size="small"
                    icon={<DynamicFeedIcon />}
                    label={`Suggestion: ${suggestion}`}
                    color="primary"
                    className={classes.chip}
                  /> */}
                </div>
                <Button
                  outline={files.length > 0 ? false : true}
                  color={"primary"}
                  onClick={handleUploadFile}
                >
                  Upload
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChangeAccordin("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Version History
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <VersionSection content={content} current={current} />
              </AccordionDetails>
            </Accordion>
          </CardBody>
        </TabPane>
      </TabContent>
      {!content.is_deleted ? (
        <Button
          outline
          color="primary"
          className={classes.removeBtn}
          onClick={onDelete}
        >
          Delete
        </Button>
      ) : (
        <Button
          outline
          color="primary"
          className={classes.removeBtn}
          onClick={onRestore}
        >
          Restore
        </Button>
      )}
      {content.is_published && !content.is_deleted ? (
        <Button
          color="primary"
          className={classes.publishBtn}
          onClick={onUnpublish}
        >
          Unpublish
        </Button>
      ) : (
        false
      )}
      {type === "file" && (
        <Downloader
          fileId={content.src && content.src.id}
          fileName={content.title}
          fileExtension={content.extension}
        >
          <IconButton
            className="icon-btn size-30"
            className={classes.downloadBtn}
          >
            <i className="zmdi zmdi-download" />
          </IconButton>
        </Downloader>
      )}
    </Card>
  );

  return (
    <div className="row">
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          handleDrawer(false);
        }}
      >
        <div className={classes.root} tabIndex={0}>
          {sideList}
        </div>
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;

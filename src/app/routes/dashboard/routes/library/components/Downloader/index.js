// import { Post, Retrieve, Download } from 'DataManager/DataManager';
import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-confirm-alert/src/react-confirm-alert.css";
// import { confirmAlert } from "react-confirm-alert";
import { Document, Page, pdfjs } from "react-pdf";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { save } from "save-file";
import axiosInstanceDownload from "api/axiosDownload";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default class Downloader extends Component {
  constructor() {
    super();
    this.state = {
      content: undefined,
      preview: false,
      loaded: false,
    };

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  static propTypes = {
    fileName: PropTypes.string.isRequired,
    fileId: PropTypes.string.isRequired,
  };
  // const Download = async (moduleName, Id) => {
  //   try {
  //     const data = await axiosInstanceDownload.get(`${moduleName}/download/5f947c260bd56a27ad1671d8`);
  //     if (typeof data.data.message === "object")
  //       return data.data.message;
  //     else return data.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async downloadFile() {
    const response = await axiosInstanceDownload.get(
      `/filemanager/download/${this.props.fileId}`
    );
    if (response) {
      await save(response.data, this.props.fileName).then(() => {
        var fileUrl = URL.createObjectURL(response.data);
        this.setState({ preview: true, content: fileUrl });
      });
    }
  }

  handleCancel(e) {
    this.setState({ preview: false, content: undefined });
  }

  async onDocumentLoadSuccess() {
    this.setState({ loaded: true });
  }

  render() {
    const { children, className, fileName, fileExtension } = this.props;
    //const [pageNumber, setPageNumber] = useState(1);
    //const [numPages, setNumPages] = useState(null);
    const { preview, content } = this.state;

    return (
      <Tooltip title="Click to download" aria-label="add">
        <div
          onClick={() => this.downloadFile()}
          style={{ cursor: "pointer" }}
          className={className}
          className="container"
        >
          {children}
        </div>
      </Tooltip>
    );
  }
}

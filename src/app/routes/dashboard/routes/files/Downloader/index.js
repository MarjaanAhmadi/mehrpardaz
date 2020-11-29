import { Post, Retrieve, Download } from "DataManager/DataManager";
import React, { Component, useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "app/routes/dashboard/routes/library/components/Downloader/node_modules/react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { Document, Page, pdfjs } from "react-pdf";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { save } from "save-file";

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
    this.submit = this.submit.bind(this);
  }

  static propTypes = {
    fileExtension: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    fileId: PropTypes.string.isRequired,
  };

  async downloadFile() {
    const response = await Download("file_managers", this.props.fileId);

    if (response) {
      await save(response, this.props.fileName).then(() => {
        var fileUrl = URL.createObjectURL(response);
        this.setState({ preview: true, content: fileUrl });
      });
    }
  }

  handleCancel(e) {
    this.setState({ preview: false, content: undefined });
  }

  async submit() {
    confirmAlert({
      title: "Downlod file",
      message: "Are you sure you want to download this file?",
      buttons: [
        { label: "Yes", onClick: () => this.downloadFile() },
        { label: "No", onClick: () => {} },
      ],
    });
  }

  async onDocumentLoadSuccess() {
    this.setState({ loaded: true });
  }

  render() {
    const {
      children,
      className,
      style,
      fileId,
      fileName,
      fileExtension,
    } = this.props;
    //const [pageNumber, setPageNumber] = useState(1);
    //const [numPages, setNumPages] = useState(null);
    const { preview, content } = this.state;

    return (
      <Tooltip title="Click to download" aria-label="add">
        <div
          onClick={() => this.submit()}
          style={{ cursor: "pointer" }}
          className={className}
          className="container"
        >
          {children}
          {content && (
            <Modal isOpen={preview} toggle={this.handleCancel}>
              <ModalHeader toggle={this.handleCancel}>{fileName}</ModalHeader>
              <ModalBody>
                {fileExtension == ".pdf" ? (
                  (// this.state.loaded ?
                  <div>
                    <Document
                      onLoadSuccess={() => this.onDocumentLoadSuccess()}
                      file={content}
                    >
                      <Page pageNumber={1} />
                    </Document>
                    {/* <p>{`Page ${pageNumber} of ${numPages}`}</p> */}
                  </div> /*: <p>{"Loading pdf file ..."}</p>*/ /*: <p>{"Loading pdf file ..."}</p>*/ /*: <p>{"Loading pdf file ..."}</p>*/)
                ) : // : <p>{"Loading pdf file ..."}</p>
                fileExtension == ".png" || fileExtension == ".jpg" ? (
                  <img style={{ width: "100%" }} src={content} />
                ) : (
                  false
                )}
              </ModalBody>
            </Modal>
          )}
        </div>
      </Tooltip>
    );
  }
}

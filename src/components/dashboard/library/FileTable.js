import React from "react";
import FileTableCell from "./FileTableCell";
import { Delete } from "DataManager/DataManager";

const FileTable = (props) => {
  const deleteFile = async (id) => {
    try {
      await Delete("file_managers", id);
      props.getFiles();
    } catch (error) {}
  };
  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>File Id</th>
            <th>File Path</th>
            <th>Public</th>
            <th>Src</th>
            <th>File Name</th>
            <th>Created By</th>
            <th></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                return (
                  <FileTableCell
                    openModal={(data) => {
                      props.openModal(data);
                    }}
                    deleteFile={(id) => {
                      deleteFile(id);
                    }}
                    getFiles={props.getFiles}
                    key={data._id}
                    data={data}
                  />
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;

import React from "react";
import FileTableCell from "./FileTableCell";

const FileTable = (props) => {
  const { items, handleDrawer } = props;
  const { folders = [], files = [], current } = items;

  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Type</th>
            <th>Extension</th>
            <th>Owner</th>
            <th>Version</th>
            <th>Modified</th>
            <th></th>
            <th />
          </tr>
        </thead>
        <tbody>
          {folders.map((folder) => {
            return (
              <FileTableCell
                handleDrawer={handleDrawer}
                key={folder.id}
                content={folder}
                current={current}
              />
            );
          })}
          {files.map((file) => {
            return (
              <FileTableCell
                handleDrawer={handleDrawer}
                key={file.id}
                content={file}
                current={current}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;

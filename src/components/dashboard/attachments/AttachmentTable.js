import React from "react";
import { useSelector } from "react-redux";
import AttachmentTableCell from "./AttachmentTableCell";
import { Delete } from "DataManager/DataManager";

const AttachmentTable = (props) => {
  const deleteAttachment = async (id) => {
    try {
      await Delete("attachments", id);
      props.getAttachments();
    } catch (error) {}
  };
  return (
    <div className="table-responsive-material">
      <table className="default-table table-unbordered table table-sm table-hover">
        <thead className="th-border-b">
          <tr>
            <th>Attachment Id</th>
            <th>Title</th>
            <th>UUID</th>
            <th>Related User</th>
            <th>Created Time</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {props.data.length > 0
            ? props.data.map((data) => {
                return (
                  <AttachmentTableCell
                    openModal={(data) => {
                      props.openModal(data);
                    }}
                    deleteAttachment={(id) => {
                      deleteAttachment(id);
                    }}
                    getAttachments={props.getAttachments}
                    key={data. id}
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

export default AttachmentTable;

import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import Folder from "./../UIs/FolderComponent";
import File from "./../UIs/FileComponent";
import {
  selContent,
  selShowType,
  setDrawerContent,
} from "./../../slice/librarySlice";
import { useDispatch, useSelector } from "react-redux";
import TemporaryDrawer from "./temporary/TemporaryDrawer";
import FileTable from "../FileTable";
import DeleteTable from "../deletedTable/DeleteTable";

function FileManager(props) {
  const dispatch = useDispatch();
  const items = useSelector(selContent);
  const showType = useSelector(selShowType);

  const [openDrawer, setOpenDrawer] = useState(false);
  // const [drawerContent, setDrawerContent] = useState({});

  function handleDrawer(status, content) {
    // setDrawerContent(content);
    dispatch(setDrawerContent(content));
    setOpenDrawer(status);
  }

  return (
    <div>
      <Row>
        {showType === "grid" ? (
          <GridViews items={items} handleDrawer={handleDrawer} />
        ) : (
          <ListViews items={items} handleDrawer={handleDrawer} />
        )}
      </Row>

      <DeleteTable items={items} handleDrawer={handleDrawer} />

      {openDrawer && (
        <TemporaryDrawer
          handleDrawer={handleDrawer}
          open={openDrawer}
          // content={drawerContent}
          current={items.current}
        />
      )}
    </div>
  );
}

export default FileManager;

const GridViews = React.memo((props) => {
  const { items, handleDrawer } = props;
  const { folders = [], files = [], current } = items;
  return (
    <>
      {folders.map((folder) => {
        return (
          <Col xs="3" key={folder.id}>
            <Folder
              folder={folder}
              current={current}
              handleDrawer={handleDrawer}
            />
          </Col>
        );
      })}

      {files.map((file) => {
        return (
          <Col xs="3" key={file.id}>
            <File file={file} current={current} handleDrawer={handleDrawer} />
          </Col>
        );
      })}
    </>
  );
});

const ListViews = React.memo((props) => {
  const { items, handleDrawer } = props;

  return (
    <Col xs="12">
      <div className="dashboard animated slideInUpTiny animation-duration-3">
        <div className="row mb-md-3">
          <div className="col-12">
            <div className="jr-card">
              <FileTable handleDrawer={handleDrawer} items={items} />
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
});

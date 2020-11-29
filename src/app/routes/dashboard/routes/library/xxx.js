






import React, { useState, useEffect } from "react";
import * as R from "ramda";
import axiosInstance from "config/axios/axiosInstance";
import { getFolderByID, deleteFileOrFolder } from "./apis";

import Uploader from "./uploader";

// async function getFolders() {
//   const res = await axiosInstance.get("/documents");
//   console.log("getFolders -> res", res);
// }

const Library = ({ match }) => {
  const [loading, setLoading] = useState(true);

  const [curFolder, setCurFolder] = useState({
    id: "5f3c1991bee8d0397fbcef17",
    files: [],
    folders: [],
  });

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

  const onFileDelete = async (id) => {
    await deleteFileOrFolder(id);
    await resetCurrentFolder();
    return "";
  };
  const { folders, files } = curFolder;

  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">
      {loading && <div>loading</div>}
      <button onClick={onFolderClick("5f3c1991bee8d0397fbcef17")}>home </button>
      <button onClick={onBackClick}>back </button>

      <div>library </div>
      <h1>current folder :{curFolder.title}</h1>
      <h2>files: </h2>
      {files.map((file) => {
        return (
          <div>
            <div> file: {file.title} </div>
          </div>
        );
      })}

      <br />
      <br />
      <br />
      <h2>folders: </h2>
      {folders.map((folder) => {
        return (
          <div>
            <div onClick={onFolderClick(folder.id)}>Folder: {folder.title}</div>
          </div>
        );
      })}
      <br />
      <br />
      <br />
      <Uploader curFolder={curFolder} reset={resetCurrentFolder} />
    </div>
  );
};
export default Library;

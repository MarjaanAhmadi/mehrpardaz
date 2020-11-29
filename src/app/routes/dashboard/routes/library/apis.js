import axios from "config/axios/axiosInstance";

import * as R from "ramda";

async function masterApi(url, type, data = null) {
  let res = {};
  try {
    res = await axios[type](url, data);
    if (!res || res.error)
      throw { message: "no res or error ", error: res.error };
    return res.data;
  } catch (error) {
    console.log(error);
    return { data: null };
  }
}
const cMasterApi = R.curryN(3, masterApi);

const getFolderApi = (id) => cMasterApi(`/library/${id}`)("get")(null);

export async function getFolders() {
  const res = await cMasterApi("/library?limit=1000")("get")(null);

  if (res.error) return { data: null, error: true };
}

// export const getUnpublished = ()=>{
//   const allFilesAndFolders = cMasterApi(
//     '/library?limit=1000'
//   )("get")(null);
// }

export const publishByIds = async (ids) => {
  const res = await cMasterApi("/library/publish")("post")({
    libraryIds: ids,
    is_published: true,
  });

  console.log("publishByIds -> res", res);
};

export async function getChildernsFromApi(id, is_folder) {
  const res = cMasterApi(
    `/library?limit=1000&${
      is_folder !== null ? "&is_folder=true" : `parent=${id}`
    }`
  )("get")(null);
  return res;
}

function folderFileDivider(arr) {
  const reducer = (acc, item) =>
    item.is_folder
      ? { ...acc, folders: [...acc.folders, item] }
      : { ...acc, files: [...acc.files, item] };
  return R.reduce(reducer, { files: [], folders: [] }, arr);
}

export async function getFolderByID(id) {
  const res = await getFolderApi(id);

  if (res.error) return { data: null, error: true };

  const resChildren = await getChildernsFromApi(id, null);
  if (resChildren.error) return { data: null, error: true };
  const existItems = resChildren.message.filter((i) => i.is_deleted === false);
  const children = folderFileDivider(existItems);

  return { ...res.message, ...children };
}

export async function uploadFolderToServer(title, parent) {
  const res = await masterApi("/library", "post", {
    title,
    parent,
    is_folder: true,
  });
  if (res.error) return { error: res.error };
  return res.message;
}

export async function setFileToFolder(title, parent, data, method, id) {
  const upload = await masterApi("/filemanager/upload", "post", data);

  const res = await masterApi(`/library/${id !== null ? id : ""}`, method, {
    title,
    parent,
    src: upload.message.id,
    is_folder: false,
    version: "1.0.0",
  });
  if (res.error) return { error: res.error };
  return res.message;
}
export async function addNewSrc(data, id, version) {
  const upload = await masterApi("/filemanager/upload", "post", data);
  const res = await masterApi(`/library/upgrade/${id}`, "patch", {
    src: upload.message.id,
    version: version || "1.0.0",
  });
  if (res.error) return { error: res.error };
  return res.message;
}

export async function setFileSrc(id, src, version) {
  const res = await masterApi(`/library/upgrade/${id}`, "patch", {
    src,
    version: version || "1.0.0",
  });

  if (res.error) return { error: res.error };
  return res.message;
}

export async function deleteFileOrFolder(id) {
  const response = await masterApi(`/library/${id}`, "delete");
  return response;
}

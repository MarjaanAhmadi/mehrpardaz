import { actions } from "./librarySlice";
import * as R from "ramda";
import loaderClient from "api/reduxLoaderApi";
import uploadService from "api/uploadService";
import { setLoading } from "store/slices";

// const AXIOSFAILED = "axios_failed";
// const WAITING = "waiting";
const {
  setContents,
  setRoute,
  setUnpublishedContenst,
  setDrawerContent,
} = actions;

const masterApi = loaderClient;
const cMasterApi = R.curryN(3, loaderClient);

export async function getFolders() {
  const res = await cMasterApi("/library?limit=1000")("get")(null);
  if (res.error) return { data: null, error: true };
}

export const getRootFolder = (condition = false) => async (dispatch) => {
  const client = loaderClient("get")("/library?title=root");
  const res = await client({})({});
  if (!res.message) return "";
  const rootFolder = res.message[0];
  return dispatch(
    changeCurFolderByContentWithUnpublished(rootFolder, condition ? 0 : "push")
  );
};

export const getUnpublished = () => async (dispatch) => {
  const client = loaderClient("get")(
    `/library?is_published=false&is_deleted=false`
  );
  const res = await client({})({});
  if (!res.message) return "";
  return dispatch(setUnpublishedContenst(res.message));
};

export const publishAll = () => async (dispatch) => {
  const client = loaderClient("get")(`/library?is_published=false`);
  const res = await client({})({});
  if (!res.message) return "";
  const allIds = R.map(R.prop("id"), res.message);
  const publish = loaderClient("post")(`library/publish`);
  const checkForPublish = await publish({
    libraryIds: allIds,
    is_published: true,
  })({});
  if (checkForPublish.error) return "";
  return dispatch(getRootFolder(true));
};

export const publishByIds = (ids) => async (dispatch) => {
  const publish = loaderClient("post")(`library/publish`);
  const checkForPublish = await publish({
    libraryIds: ids,
    is_published: true,
  })({});

  if (checkForPublish.error) return "";
  return dispatch(getRootFolder(true));
};

export const unPublishByContent = (content, current) => async (dispatch) => {
  const client = loaderClient("post")("/library/publish");
  const res = await client({
    libraryIds: [content.id],
    is_published: false,
  })({});
  console.log("unPublishByContent -> res", res);
  if (res.error) return "";

  return dispatch(changeCurFolderByContentWithUnpublished(current, "current"));
};

export const changeCurFolderByContent = (content, routeIdx) => async (
  dispatch
) => {
  const client = loaderClient("get")(
    `/library?limit=1000&parent=${content.id}`
  );
  const res = await client({})({});
  if (!res.message) return "";

  const contents = res.message;
  const byIsFolder = R.groupBy((content) => {
    const { is_folder, is_deleted } = content;
    return is_deleted ? "deleted" : is_folder ? "folders" : "files";
  });
  const dividedContents = byIsFolder(contents);
  console.log("dividedContents", dividedContents);

  routeIdx !== "current" &&
    dispatch(setRoute({ content: content, idx: routeIdx }));

  dispatch(
    setContents({
      current: content,
      contents,
      files: dividedContents.files || [],
      folders: dividedContents.folders || [],
      deleted: dividedContents.deleted || [],
    })
  );
};

export const changeCurFolderByContentWithUnpublished = (
  content,
  routeIdx
) => async (dispatch) => {
  const client = loaderClient("get")(
    `/library?limit=1000&parent=${content.id}`
  );
  const res = await client({})({});
  if (!res.message) return "";
  await dispatch(getUnpublished());
  const contents = res.message;

  const byIsFolder = R.groupBy((content) => {
    const { is_folder, is_deleted } = content;
    return is_deleted ? "deleted" : is_folder ? "folders" : "files";
  });

  const dividedContents = byIsFolder(contents);

  routeIdx !== "current" &&
    dispatch(setRoute({ content: content, idx: routeIdx }));

  dispatch(
    setContents({
      current: content,
      contents,
      files: dividedContents.files || [],
      folders: dividedContents.folders || [],
      deleted: dividedContents.deleted || [],
    })
  );
};

export const deleteContent = (content, current) => async (dispatch) => {
  const client = loaderClient("delete")(`/library/${content.id}`);
  const res = await client({})({});
  if (res.error) return "";
  return dispatch(changeCurFolderByContent(current, "current"));
};

export const restoreContent = (content, current) => async (dispatch) => {
  const client = loaderClient("patch")(`/library/${content.id}`);
  const res = await client({ is_deleted: false, is_published: false })({});
  if (res.error) return "";
  console.log("res", res);
  return dispatch(changeCurFolderByContent(current, "current"));
};

export const unDeleteContent = (content, current) => async (dispatch) => {
  const client = loaderClient("delete")(`/library/${content.id}`);
  const res = await client({})({});
  if (res.error) return "";
  return dispatch(changeCurFolderByContent(current, "current"));
};

export const editContentTitle = (content, title, current) => async (
  dispatch
) => {
  const client = loaderClient("patch")(`/library/${content.id}`);
  const res = await client({ title })({});
  if (res.error) return "";
  return dispatch(changeCurFolderByContent(current, "current"));
};

export const editContentTitleUnpublished = (content, title, current) => async (
  dispatch
) => {
  const client = loaderClient("patch")(`/library/${content.id}`);
  const res = await client({ title })({});
  if (res.error) return "";
  return dispatch(changeCurFolderByContentWithUnpublished(current, "current"));
};

export const addNewFolder = (parentContent, title) => async (dispatch) => {
  const client = loaderClient("post")(`/library`);
  const res = await client({
    title,
    parent: parentContent.id,
    is_folder: true,
  })({});

  if (res.error) return "";
  return dispatch(
    changeCurFolderByContentWithUnpublished(parentContent, "current")
  );
};

export const createFile = (file, current, title) => async (dispatch) => {
  dispatch(setLoading(true));
  const uploadedFile = await uploadService.upload(file, "/filemanager/upload");
  dispatch(setLoading(false));
  if (uploadedFile.data.error) return "";
  const client = loaderClient("post")(`/library`);
  const res = await client({
    title,
    parent: current.id,
    src: uploadedFile.data.message.id,
    is_folder: false,
    version: "1.0.0",
  })({});

  if (res.error) return "";

  dispatch(changeCurFolderByContentWithUnpublished(current, "current"));
};

export const getContentSetDrawer = (content) => async (dispatch) => {
  const client = loaderClient("get")(`/library/${content.id}`);
  const res = await client({})({});
  if (res.error) return "";

  dispatch(setDrawerContent(res.message));
};

export const createFileNewVersion = (file, content, current, version) => async (
  dispatch
) => {
  dispatch(setLoading(true));
  const uploadedFile = await uploadService.upload(file, "/filemanager/upload");
  dispatch(setLoading(false));

  if (uploadedFile.data.error) return "";
  const client = loaderClient("patch")(`/library/upgrade/${content.id}`);

  const res = await client({
    src: uploadedFile.data.message.id,
    version: version,
  })({});
  if (!res) return "";
  if (res.error) return "";

  await dispatch(changeCurFolderByContent(current, "current"));
  return dispatch(getContentSetDrawer(content));
};

export const setFromArchive = (content, current, archive) => async (
  dispatch
) => {
  const client = loaderClient("patch")(`/library/upgrade/${content.id}`);

  const res = await client({
    src: archive.src.id,
    version: archive.version,
  })({});

  if (!res) return "";
  if (res.error) return "";

  await dispatch(changeCurFolderByContent(current, "current"));
  return dispatch(getContentSetDrawer(content));
};

export const getContentById = async (id) => {
  const client = loaderClient("get")(`/library?limit=1000&parent=${id}`);
  return await client({})({});
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
  // const res = await getFolderApi(id);
  const res = {};
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

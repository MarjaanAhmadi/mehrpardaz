import axios from "./axiosConfig";
import * as R from "ramda";
// import { toast } from "react-toastify";

// const notify = (message, opt = {}) =>
//   toast(message, {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     progress: undefined,
//     ...opt,
//   });

// const notify = console.log;

export const masterApi = async (method, url, data, params) => {
  method = method.toLowerCase();
  let res = null;
  try {
    res = await axios[method](url, data);
    return res.data;
  } catch (error) {
    // error.response && error.response.data;
    const { response } = error;
    return response && { ...response, status: "axios_failed" };
  }
};

export const masterApiWithOptions = async ({ method, url, data, params }) => {
  method = method.toLowerCase();
  let res = { data: null };
  try {
    res = await axios[method](url, data);
    return res.data;
  } catch (error) {
    // console.error(error);
    return error.response && error.response.data;
  }
};

export const catcher = async (
  method,
  url,
  inData,
  params,
  axiosConfig,
  ...args
) => {
  const res = await masterApi(method, url, inData, params, ...args);

  if (!res) return { data: null };
  // res.message && notify(res.message);

  const { status } = res;

  switch (status) {
    case "axios_failed":
      // const notifyConcatKeyValue = (value, key) =>
      //   notify(key + ":" + R.join("|", value));
      // R.forEachObjIndexed(notifyConcatKeyValue, error);

      return { data: null, status: "axios_failed" };

    case "success":
      return { ...res, status: "success" };

    case "failed":
      return { ...res, status: "failed" };

    default:
      // notify("bad request Error ");
      return { ...res };
  }
};

export const client = async (method, url, data, params) => {
  const res = await masterApi(method, url, data, params);
  return { ...res };
};

const CatcherLoadingRedux = async (
  dispatch,
  loaderAction,
  method,
  link,
  data,
  params
) => {
  dispatch(loaderAction(true));
  const res = await client(method, link, data, params);
  dispatch(loaderAction(false));
  return { ...res };
};

const curClientLoader = R.curryN(6, CatcherLoadingRedux);

let curClient = R.curryN(4, client);

export { curClientLoader, curClient };

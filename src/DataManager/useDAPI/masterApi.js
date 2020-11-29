import axios from "./apiClient";

export const MasterApi = async (method, link, data, port, isDefaultParams) => {
  method = method.toLowerCase();
  let res = {};
  try {
    res = await axios[method](link, data);
    return res.data;
  } catch (error) {
    console.error(error);
    return error.response && error.response.data;
  }
};

export const MasterApiWithOptions = async ({ method, link, data }) => {
  method = method.toLowerCase();
  let res = {};
  try {
    res = await axios[method](link, data);
    return res.data;
  } catch (error) {
    // console.log("in errror rororor ");
    // console.log("eeeee", error.response);
    // return error.response && error.response.data;
    return error.response && error.response;
  }
};

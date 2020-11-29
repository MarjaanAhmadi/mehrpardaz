import axiosInstance from "config/axios/axiosInstance";
import {toast} from 'react-toastify';
/* you can change the base url from here */
//========================================================================================//

const List = async (moduleName, props, limit, page, param, inline) => {
  try {
    if (param === undefined) {
      param = {};
    }
    if (limit != null) {
      param.limit = limit;
    }
    if (page != null) {
      param.page = page;
    }

    const data = await axiosInstance.get(moduleName, {
      params: inline === undefined ? param : null,
    });
    let response = [];
    if (data.data.message.length > 0) {
      response = data.data.message.filter((i) => i.is_deleted === false);
    }
    toast.success('Action completed successfully.')
    return response;
  } catch (error) {
    toast.error('There is problem while fetching data.')
    console.log(error);
  }
};

/*this function used to send some data to server and catch lists then it returns lists to redux store :) */
//=======================================================================================================//

const Post = async (moduleName, Data) => {
  try {
    const data = await axiosInstance.post(moduleName, Data);
    toast.success('Action completed successfully.')
    return data;
  } catch (error) {
    toast.error('There is problem while saving data.')
    console.log(error);
  }
};

const PostId = async (moduleName, Data, Id) => {
  try {
    const data = await axiosInstance.post(`${moduleName}/${Id}`, Data);
    toast.success('Action completed successfully.')
    return data;
  } catch (error) {
    toast.error('There is problem while saving data.')
    console.log(error);
  }
};

/*this function just do post with our restfull api */
//======================================================================================================//

const Patch = async (moduleName, Data, Id) => {
  try {
    const data = await axiosInstance.patch(`${moduleName}/${Id}`, Data);
    toast.success('Action completed successfully.');
    return data;
  } catch (error) {
    toast.error('There is problem while saving data.')
    console.log(error);
  }
};

/*this function will update your data in server */
//=======================================================================================================//
const Put = async (moduleName, Data) => {
  try {
    const data = await axiosInstance.put(`${moduleName}`, Data);
    toast.success('Action completed successfully.')
    return data;
  } catch (error) {
    toast.error('There is problem while saving data.')
    console.log(error);
  }
};

const Delete = async (moduleName, Id) => {
  try {
    const data = await axiosInstance.delete(`${moduleName}/${Id}`);
    toast.success('Action completed successfully.')
    return data;
  } catch (error) {
    toast.error('There is problem while deleting data.')
    console.log(error);
  }
};

/* this function will delete an object in server */
//=======================================================================================================//

const Retrieve = async (moduleName, Id, props) => {
  try {
    const data = await axiosInstance.get(`${moduleName}/${Id}`);
    toast.success('Action completed successfully.')
    if (typeof data.data.message === "object") return data.data.message;
    else return data.data.message[0];
  } catch (error) {
    toast.error('There is problem while fetching data.')
    console.log(error);
  }
};

const Download = async (moduleName, Id) => {
  try {
    const data = await axiosInstance.get(`${moduleName}/download/${Id}`);
    toast.success('Action completed successfully.')
    if (typeof data.data.message === "object") return data.data.message;
    else return data.data.message[0];
  } catch (error) {
    toast.error('There is problem while downloading data.')
    console.log(error);
  }
};

/* this function will catch only one object's data */
//=======================================================================================================//

export { List, Put, Post, Patch, Delete, Retrieve, Download, PostId };

/* developer of this data manager is shyn99 don't use it without permission! :))) */

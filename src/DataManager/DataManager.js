import axiosInstanceDownload from "../config/axios/axiosInstanceDownload";
import axiosInstance from "../config/axios/axiosInstance";

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
    //  
    // const data = await axiosInstance.get(moduleName);

    // console.log('ppaaaraaam:::', data)
    // props.SetList(data.data, moduleName)
    return data.data.message;
  } catch (error) {
    console.log(error);
  }
};

/*this function used to send some data to server and catch lists then it returns lists to redux store :) */
//=======================================================================================================//

const Post = async (moduleName, Data) => {
  try {
    const data = await axiosInstance.post(moduleName, Data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const PostId = async (moduleName, Data, Id) => {
  try {
     ;
    const data = await axiosInstance.post(`${moduleName}/${Id}`, Data);
    return data;
  } catch (error) {
     ;
    console.log(error);
  }
};

/*this function just do post with our restfull api */
//======================================================================================================//

const Patch = async (moduleName, Data, Id) => {
  try {
    const data = await axiosInstance.patch(`${moduleName}/${Id}`, Data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/*this function will update your data in server */
//=======================================================================================================//
const Put = async (moduleName, Data) => {
  try {
    const data = await axiosInstance.put(`${moduleName}`, Data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const Delete = async (moduleName, Id) => {
  try {
    const data = await axiosInstance.delete(`${moduleName}/${Id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

/* this function will delete an object in server */
//=======================================================================================================//

const Retrieve = async (moduleName, Id, props) => {
  try {
    const data = await axiosInstance.get(`${moduleName}/${Id}`);
    if (typeof data.data.message === "object")
      return data.data.message;
    else return data.data.message[0];
  } catch (error) {
    console.log(error);
  }
};

const Download = async (moduleName, Id) => {
  try {
    const data = await axiosInstanceDownload.get(`${moduleName}/download/5f947c260bd56a27ad1671d8`);
    debugger
    if (typeof data.data.message === "object")
      return data.data.message;
    else return data.data;
  } catch (error) {
    console.log(error);
  }
};

/* this function will catch only one object's data */
//=======================================================================================================//

export { List, Put, Post, Patch, Delete, Retrieve, Download, PostId };

/* developer of this data manager is shyn99 don't use it without permission! :))) */

// 0: "/onlyfortest_path/"
// 1: "/droot/dnewFolder/dnewFolder/"
// 2: "/droot/dnew2/dnew3/"
// 3: "/droot/dnew2/"
// 4: "/droot/dnew2/dnewFolder/"

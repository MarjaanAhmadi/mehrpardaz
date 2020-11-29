// import { useAlert, positions } from "react-alert";
import useMaterApiWithOptions from "./useMasterAPI";

// import Reset from "utils/Reset";
export default function useActions(params) {
  const apiFetch = useMaterApiWithOptions();

  const List = async (moduleName, props, limit, page, param = {}, inline) => {
    if (param === undefined) {
      param = {};
    }
    if (limit != null) {
      param.limit = limit;
    }
    if (page != null) {
      param.page = page;
    }

    const req = {
      method: "get",
      data: {
        params: inline === undefined ? param : null,
      },
      link: moduleName,
    };

    const res = await apiFetch(req);
    if (res.data) {
      let response = [];
      if (res.data.length > 0) {
        response = res.data.filter((i) => {
          if (i.is_deleted) {
            if (i.is_deleted === false) {
              return i;
            }
          } else {
            return i;
          }
        });
      } else {
        response = res.data;
      }
      return response;
    } else {
      return { data: null };
    }

    // const data = await axiosInstance.get(moduleName, {
    //   params: inline === undefined ? param : null,
    // });
    //  ;
    // const data = await axiosInstance.get(moduleName);
    // console.log('ppaaaraaam:::', data)
    // props.SetList(data.data, moduleName)
  };

  const Post = async (moduleName, Data) => {
    const req = {
      method: "post",
      data: Data,
      link: moduleName,
    };
    const res = await apiFetch(req);
    if (!res.data) return { data: null };
    return res;
  };

  const PostId = async (moduleName, Data, Id) => {
    const req = {
      method: "post",
      data: Data,
      link: `${moduleName}/${Id}`,
    };

    const res = await apiFetch(req);
    if (!res.data) return { data: null };

    return res;
  };

  /*this function just do post with our restfull api */
  //======================================================================================================//

  const Patch = async (moduleName, Data, Id) => {
    const req = {
      method: "patch",
      data: Data,
      link: `${moduleName}/${Id}`,
    };

    const res = await apiFetch(req);
    if (!res.data) return { data: null };

    return res;
  };

  /*this function will update your data in server */
  //=======================================================================================================//
  const Put = async (moduleName, Data) => {
    const req = {
      method: "put",
      data: Data,
      link: moduleName,
    };

    const res = await apiFetch(req);
    if (!res.data) return { data: null };
    return res;
  };

  const Delete = async (moduleName, Id) => {
    const req = {
      method: "delete",
      link: `${moduleName}/${Id}`,
    };
    const res = await apiFetch(req);
    if (!res.data) return { data: null };
    return res;
  };

  /* this function will delete an object in server */
  //=======================================================================================================//

  const Retrieve = async (moduleName, Id, props) => {
    const req = {
      method: "delete",
      link: `${moduleName}/${Id}`,
    };

    const res = apiFetch(req);
    if (!res.data) return { data: null };

    if (typeof res.data.message === "object") return res.data.message;
    return res.data.message[0];
  };

  const Download = async (moduleName, Id) => {
    const req = {
      method: "delete",
      link: `${moduleName}/download/${Id}`,
    };

    const res = apiFetch(req);
    if (!res.data) return { data: null };
    if (typeof res.data.message === "object") return res.data.message;
    return res.data.message[0];
  };

  /* this function will catch only one object's data */
  //=======================================================================================================//

  return { List, Put, Post, Patch, Delete, Retrieve, Download, PostId };
}

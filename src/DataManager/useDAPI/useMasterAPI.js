// import { useAlert, positions } from "react-alert";
import { MasterApi, MasterApiWithOptions } from "./masterApi";
// import Reset from "utils/Reset";

export function useMaterApi(opt = null) {
  const catcher = async (method, link, data, port = "lab", isDefaultParams) => {
    const res = await MasterApi(method, link, data, port, isDefaultParams);

    if (res && res.status === 2) {
      // res.message &&
      //   alert.show(res.message, {
      //     timeout: 10000,
      //     ...options,
      //     type: "info",
      //   });
      const newData = res.data || res.data === 0 ? res.data : {};
      return { ...res, data: newData };
    }

    if (res && res.status === 401) {
      // alert.show(" unAuthorized app will reset in 5s  ", {
      //   timeout: 5000,
      //   type: "error",
      //   ...options,
      // });
      // setTimeout(() => {
      //   Reset();
      // }, 5000);
      return { data: null };
    }

    if (res && res.status === 1) {
      // const errors = JSON.parse(res.errors);
      // for (let BKey in errors) {
      //   for (let IKey in errors[BKey]) {
      //     alert.show(errors[BKey][IKey] || "Bad Request Error", {
      //       ...options,
      //       timeout: 10000,
      //       type: "info",
      //     });
      //   }
      // }
      return { ...res, data: null };
    }

    if (res && res.status === 3) {
      // const errors = JSON.parse(res.errors);
      // for (let BKey in errors) {
      //   for (let IKey in errors[BKey]) {
      //     alert.show(errors[BKey][IKey], {
      //       ...options,
      //       timeout: 10000,
      //       type: "info",
      //     });
      //   }
      // }
      return { ...res, data: null };
    }

    // alert.show("bad request Error ", {
    //   timeout: 2000,
    //   type: "error",
    //   ...options,
    // });

    return { ...res, data: null };
  };

  return catcher;
}

export default function useMaterApiWithOptions(opt = null) {
  const catcher = async (req) => {
    const res = await MasterApiWithOptions(req);
     
    console.log("catcher -> res", res);

    // if (!res || !res.status ) {
    //   alert("noRes");
    //   return { data: null };
    // }

    if (res.error) {
      alert(res.message);
      return { data: null };
    }

    if (res.message) {
      return { ...res, data: res.message || {} };
    }

    if (res.status === 1) {
      return { ...res, data: null };
    }
    if (res.status === 3) {
      return { ...res, data: null };
    }
    if (res.status === 404) {
      alert("error 404");
      return { ...res, data: null };
    }

    return { ...res, data: null };
  };

  return catcher;
}

import { useAlert, positions } from "react-alert";
import { MasterApi, MasterApiWithOptions } from "API";
import Reset from "utils/Reset";

export default function useMaterApi(opt = null) {
  const alert = useAlert();
  const options = {
    ...opt,
    type: "info",
    position: positions.BOTTOM_LEFT,
    timeout: 10000,
  };

  const catcher = async (method, link, data, port = "lab", isDefaultParams) => {
    const res = await MasterApi(method, link, data, port, isDefaultParams);

    //#region
    // if (!res || !res.status) {
    //   alert.show(
    //     "server did't connect or unAuthorized app will reset in 5s  ",
    //     {
    //       timeout: 2000,
    //       type: "error",
    //       ...options,
    //     }
    //   );
    //   setTimeout(() => {
    //     Reset();
    //   }, 5000);
    //   return { data: null };
    // }
    //#endregion

    if (res && res.status === 2) {
      res.message &&
        alert.show(res.message, {
          timeout: 10000,
          ...options,
          type: "info",
        });
      const newData = res.data || res.data === 0 ? res.data : {};
      return { ...res, data: newData };
    }

    if (res && res.status === 401) {
      alert.show(" unAuthorized app will reset in 5s  ", {
        timeout: 5000,
        type: "error",
        ...options,
      });
      setTimeout(() => {
        Reset();
      }, 5000);
      return { data: null };
    }

    if (res && res.status === 1) {
      const errors = JSON.parse(res.errors);
      for (let BKey in errors) {
        for (let IKey in errors[BKey]) {
          alert.show(errors[BKey][IKey] || "Bad Request Error", {
            ...options,
            timeout: 10000,
            type: "info",
          });
        }
      }
      return { ...res, data: null };
    }

    if (res && res.status === 3) {
      const errors = JSON.parse(res.errors);
      for (let BKey in errors) {
        for (let IKey in errors[BKey]) {
          alert.show(errors[BKey][IKey], {
            ...options,
            timeout: 10000,
            type: "info",
          });
        }
      }
      return { ...res, data: null };
    }

    alert.show("bad request Error ", {
      timeout: 2000,
      type: "error",
      ...options,
    });

    return { ...res, data: null };
  };

  return catcher;
}

export function useMaterApiWithOptions(opt = null) {
  const alert = useAlert();
  const options = {
    type: "info",
    position: positions.BOTTOM_LEFT,
    ...opt,
  };

  const catcher = async (req) => {
    const res = await MasterApiWithOptions(req);

    if (!res || !res.status) {
      alert.show(
        "server did't connect or unAuthorized app will reset in 5s  ",
        {
          timeout: 10000,
          type: "error",
          ...options,
        }
      );
      setTimeout(() => {
        Reset();
      }, 5000);
      return { data: null };
    }

    if (res.status === 2) {
      res.message &&
        alert.show(res.message, {
          timeout: 10000,
          type: "info",
          ...options,
        });
      return { ...res, data: res.data || {} };
    }

    if (res.status === 1) {
      const errors = JSON.parse(res.errors);
      for (let BKey in errors) {
        for (let IKey in errors[BKey]) {
          alert.show(errors[BKey][IKey] || "Bad Request Error", {
            ...options,
            timeout: 10000,
            type: "error",
          });
        }
      }
      return { ...res, data: null };
    }
    if (res.status === 3) {
      const errors = JSON.parse(res.errors);
      for (let BKey in errors) {
        for (let IKey in errors[BKey]) {
          alert.show(errors[BKey][IKey], {
            timeout: 10000,
            type: "info",
            ...options,
          });
        }
      }
      return { ...res, data: null };
    }

    alert.show("bad request Error ", {
      ...options,
      timeout: 10000,
      type: "error",
    });

    return { ...res, data: null };
  };

  return catcher;
}

export function useCatchApi(opt = null) {
  const alert = useAlert();
  const options = {
    type: "info",
    position: positions.BOTTOM_LEFT,
    ...opt,
  };

  const catcher = async (fn) => {
    const res = await fn;

    if (!res || !res.status) {
      alert.show("server did't connect check your ", {
        ...options,
        timeout: 10000,
        type: "error",
      });
      return { data: null };
    }
    if (res.status === 2) {
      res.message &&
        alert.show(res.message, {
          ...options,
          timeout: 10000,
          type: "info",
        });
      return res;
    }
    if (res.status === 3) {
      const errors = JSON.parse(res.errors);
      for (let BKey in errors) {
        for (let IKey in errors[BKey]) {
          alert.show(errors[BKey][IKey], {
            timeout: 5000,
            type: "info",
            ...options,
          });
        }
      }
      return { ...res, data: null };
    }

    alert.show("bad request Error ", {
      timeout: 5000,
      type: "error",
      ...options,
    });

    return { ...res, data: null };
  };

  return catcher;
}

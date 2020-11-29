import { actions, init } from "./";
import * as middleActions from "src/dRedux/actions";
import client from "src/api/masterApi";
import { curCatcherLoader as loaderClient } from "src/api/masterApi";

const { pendingOTP, setLoading } = actions;
const { apiCall } = middleActions;

export const sendFirstLoginValues = (data) => async (dispatch) => {
  return dispatch(
    apiCall({
      method: "POST",
      url: "/login",
      data,
      params: {},
      onSuccess: pendingOTP.type,
    })
  );
};

export const ThunkSimple = (data) => async (dispatch) => {
  const client = loaderClient(dispatch)(setLoading);
  const res = await client("POST", "/check", data, {});
  const { status } = res;
  switch (status) {
    case "verified":
      sessionStorage.setItem("token", JSON.stringify(res.data.token));
      return "";
    // return dispatch(init(res.data.token))
    default:
      break;
  }
  if (!res.data) return "";
};

export const thunkWithApiMiddle = (phoneNumber) => (dispatch) => {
  return dispatch(
    apiCall({
      method: "POST",
      url: "/login",
      data: { phone: phoneNumber },
      params: {},
      onSuccess: pendingOTP.type,
    })
  );
};

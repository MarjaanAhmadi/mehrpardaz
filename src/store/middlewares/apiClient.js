import { setLoading } from "store/slices";
import { curClientLoader, curClient } from "api/masterApi";
import * as actions from "../actions";

const apiClientMiddleWare = (later) => ({ dispatch, getState }) => (
  next
) => async (action) => {
  if (action.type !== actions.apiCall.type) return next(action);

  let client = curClientLoader(dispatch, setLoading);
  const {
    url,
    method = "GET",
    data = {},
    params = {},
    loading = true,
    onSuccess,
    onFailed,
  } = action.payload;

  if (!loading) client = curClient;
  const res = await client(method, url, data, params);
  if (!res.data && onFailed) {
    return dispatch({ type: onFailed, payload: res });
  }
  if (onSuccess) return dispatch({ type: onSuccess, payload: res });
};

export default apiClientMiddleWare;

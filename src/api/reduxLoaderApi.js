import store from "store/index";
import { setLoading } from "store/slices";
import { catcher } from "./masterApi";
import * as R from "ramda";

const dispatch = store.dispatch;

const clientLoader = async (method, link, data, params) => {
  dispatch(setLoading(true));
  const res = await catcher(method, link, data, params);
  dispatch(setLoading(false));
  return { ...res };
};

export default R.curryN(4, clientLoader);

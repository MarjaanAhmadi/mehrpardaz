import axios from "config/axios/axiosInstance";

import * as R from "ramda";

async function masterApi(url, type, data = null) {
  let res = {};
  try {
    res = await axios[type](url, data);
    if (!res || res.error)
      throw { message: "no res or error ", error: res.error };
    return res.data;
  } catch (error) {
    console.log(error);
    return { data: null };
  }
}

const cMasterApi = R.curryN(3, masterApi);

export async function publishFlight(id, condition) {
  const res = await cMasterApi("/flights/publish")("post")({
    flightIds: [id],
    is_published: condition,
  });

  if (res.error) return { data: null, error: true };
}

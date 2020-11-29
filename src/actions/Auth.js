import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
} from "../constants/ActionTypes";
import axios from "util/Api";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const userSignUp = ({ name, email, password }) => {
  console.log(name, email, password);
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/register", {
        email: email,
        password: password,
        name: name,
      })
      .then(({ data }) => {
        console.log("data:", data);
        if (data.result) {
          localStorage.setItem(
            "token",
            JSON.stringify(data.token.access_token)
          );
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + data.token.access_token;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_TOKEN_SET, payload: data.token.access_token });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          console.log("payload: data.error", data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  };
};

export const userSignIn = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    console.log(email, password);
    axios
      .post("https://enrouteservice.com/api/auth/login", {
        username: email,
        password: password,
      })
      .then((response) => {
        if (response.data.error === false) {
          localStorage.setItem('user', response.data.message.user.username)
          // localStorage.setItem(
          //   "token",
          //   JSON.stringify(responsedata.token.access_token)
          // );
          localStorage.setItem(
            "token",
            "Bearer " + response.data.message.tokens.access.token
          );
          localStorage.setItem(
            "refresh-token",
            response.data.message.tokens.refresh.token
          );

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.message.tokens.access.token;
            dispatch({ type: FETCH_SUCCESS });
            dispatch({
              type: USER_TOKEN_SET,
              payload: response.data.message.token,
            });
            window.location.reload(false);
        } else {
          // dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.response.data.error });
        console.log("Error****:", error.message);
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/me")
      .then(({ data }) => {
        console.log("userSignIn: ", data);
        if (data.result) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/logout")
      .then(({ data }) => {
        if (data.result) {
          dispatch({ type: FETCH_SUCCESS });
          localStorage.removeItem("token");
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: SIGNOUT_USER_SUCCESS });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  };
};

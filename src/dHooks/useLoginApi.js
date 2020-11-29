import useMasterApi from "hooks/useMasterApi";

export default function useLoginApi() {
  const MasterApi = useMasterApi();

  const loginApi = async (data, roleId = 1) => {
    const response = await MasterApi("POST", "/General/Login", data);
    if (!response.token) return false;

    sessionStorage.setItem("his_token", response.token);

    const secApi = await MasterApi("POST", "/General/SetSection", {
      sectionId: 2,
      roleId,
    });
    if (secApi.status !== 2) return false;

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        userName: response.userInfo.userName,
        fullName: response.userInfo.fullName,
        language: data.language,
        menus: { top: secApi.data.menu },
      })
    );

    return { menus: { top: secApi.data.menu }, lang: data.language };
  };

  const queryApi = async (query) => {
    const { username, fullname, lang } = query;
    if (!lang || !username || !fullname) return false;

    const secApi = await MasterApi("POST", "/General/SetSection", {
      sectionId: 2,
    });
    if (secApi.status !== 2) return false;

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        userName: username,
        fullName: fullname,
        language: lang,
        menus: { top: secApi.data.menu },
      })
    );

    return { menus: { top: secApi.data.menu }, lang };
  };

  return { loginApi, queryApi };
}

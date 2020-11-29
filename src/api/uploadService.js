import axios from "./axiosConfig";

const upload = (file, link, onUploadProgress) => {
  let formData = new FormData();
  formData.append("file", file);

  return axios.post(link, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export default {
  upload,
};

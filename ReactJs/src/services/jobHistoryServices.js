import axios from "../axios";

const getAll = (inputId) => {
  return axios.get(
    `http://localhost:8090/api/get-all-job-history?id=${inputId}`
  );
};
const createNew = (data) => {
  return axios.post("http://localhost:8090/api/create-new-job-history", data);
};
const deleteJobHistory = (userId) => {
  return axios.delete("http://localhost:8090/api/delete-job-history", {
    data: {
      id: userId,
    },
  });
};
const editJobHistory = (inputData) => {
  return axios.put("http://localhost:8090/api/edit-job-history", inputData);
};

export { getAll, createNew, deleteJobHistory, editJobHistory };

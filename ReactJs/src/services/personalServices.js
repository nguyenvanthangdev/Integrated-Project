import axios from "../axios";

const getAllPersonal = (inputId) => {
  return axios.get(`http://localhost:8090/api/get-all-personal?id=${inputId}`);
};
const createNewPersonal = (data) => {
  return axios.post("http://localhost:8090/api/create-new-personal", data);
};
const deletePersonal = (userId) => {
  return axios.delete("http://localhost:8090/api/delete-personal", {
    data: {
      id: userId,
    },
  });
};
const editPersonal = (inputData) => {
  return axios.put("http://localhost:8090/api/edit-personal", inputData);
};

export { getAllPersonal, createNewPersonal, deletePersonal, editPersonal };

import axios from "../axios";
const handleLoginApi = (userName, userPassword) => {
  return axios.post("/api/login", {
    User_Name: userName,
    Password: userPassword,
  });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
const countUser = () => {
  return axios.get("/api/get-user-count");
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  countUser,
};

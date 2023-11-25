import axios from "../axios";

const getAll = (inputId) => {
  return axios.get(`/api/get-all-employee?id=${inputId}`);
};
const createNew = (data) => {
  return axios.post("/api/create-new-employee", data);
};
const deleteEmployee = (userId) => {
  return axios.delete("/api/delete-employee", {
    data: {
      id: userId,
    },
  });
};
const editEmployee = (inputData) => {
  return axios.put("/api/edit-employee", inputData);
};

const SumVacationDays = () => {
  return axios.get("/api/get-sum-vacation-days");
};
export { getAll, createNew, deleteEmployee, editEmployee, SumVacationDays };

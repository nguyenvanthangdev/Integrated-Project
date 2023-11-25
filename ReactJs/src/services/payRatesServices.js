import axios from "../axios";

const getAllPayRate = (inputId) => {
  return axios.get(`/api/get-all-pay-rates?id=${inputId}`);
};
const createNew = (data) => {
  return axios.post("/api/create-new-pay-rates", data);
};
const deletePayRate = (userId) => {
  return axios.delete("/api/delete-pay-rates", {
    data: {
      id: userId,
    },
  });
};
const editPayRate = (inputData) => {
  return axios.put("/api/edit-pay-rates", inputData);
};
const SumPayRates = () => {
  return axios.get("/api/get-sum-pay-rates");
};
export { getAllPayRate, createNew, deletePayRate, editPayRate, SumPayRates };

import axios from "../axios";

const getAll = (inputId) => {
  return axios.get(
    `http://localhost:8090/api/get-all-benefit-plans?id=${inputId}`
  );
};
const createNew = (data) => {
  return axios.post("http://localhost:8090/api/create-new-benefit-plans", data);
};
const deleteBenefitPlans = (userId) => {
  return axios.delete("http://localhost:8090/api/delete-benefit-plans", {
    data: {
      id: userId,
    },
  });
};
const editBenefitPlans = (inputData) => {
  return axios.put("http://localhost:8090/api/edit-benefit-plans", inputData);
};

export { getAll, createNew, deleteBenefitPlans, editBenefitPlans };

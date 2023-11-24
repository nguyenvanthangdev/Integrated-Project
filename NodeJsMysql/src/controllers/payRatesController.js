import payRatesServices from "../services/payRatesServices";

let handleGetAll = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await payRatesServices.getAll(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreate = async (req, res) => {
  let message = await payRatesServices.createNew(req.body);
  return res.status(200).json(message);
};

let handleDelete = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters !",
    });
  }

  let message = await payRatesServices.deletePayRate(req.body.id);
  return res.status(200).json(message);
};

let handleEdit = async (req, res) => {
  let data = req.body;
  try {
    let message = await payRatesServices.updateData(data);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      errMessage: "Internal server error",
    });
  }
};
let handleSumPayRates = async (req, res) => {
  try {
    let sum = await payRatesServices.SumPayRates();
    return res.status(200).json({
      sum: sum,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "An internal server error occurred",
    });
  }
};
module.exports = {
  handleGetAll: handleGetAll,
  handleCreate: handleCreate,
  handleEdit: handleEdit,
  handleDelete: handleDelete,
  handleSumPayRates: handleSumPayRates,
};

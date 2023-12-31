import personalServices from "../services/personalServices";

let handleGetAll = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await personalServices.getAll(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreate = async (req, res) => {
  let message = await personalServices.createNew(req.body);
  return res.status(200).json(message);
};

let handleDelete = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await personalServices.deletePersonal(req.body.id);
  return res.status(200).json(message);
};

let handleEdit = async (req, res) => {
  let data = req.body;
  try {
    let message = await personalServices.updateData(data);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      errMessage: "Internal server error",
    });
  }
};
let handleCountPersonalGenderMale = async (req, res) => {
  try {
    let count = await personalServices.CountPersonalGenderMale();
    return res.status(200).json({
      count: count,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "An internal server error occurred",
    });
  }
};
let handleCountPersonalGenderFemale = async (req, res) => {
  try {
    let count = await personalServices.CountPersonalGenderFemale();
    return res.status(200).json({
      count: count,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "An internal server error occurred",
    });
  }
};
let handleShareholderStatus = async (req, res) => {
  try {
    let count = await personalServices.CountShareholderStatus();
    return res.status(200).json({
      count: count,
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
  handleCountPersonalGenderMale: handleCountPersonalGenderMale,
  handleCountPersonalGenderFemale: handleCountPersonalGenderFemale,
  handleShareholderStatus: handleShareholderStatus,
};

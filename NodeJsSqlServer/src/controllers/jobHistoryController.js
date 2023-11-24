import jobHistoryServices from "../services/jobHistoryServices";

let handleGetAll = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await jobHistoryServices.getAll(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreate = async (req, res) => {
  let message = await jobHistoryServices.createNew(req.body);
  return res.status(200).json(message);
};

let handleDelete = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await jobHistoryServices.deleteJobHistory(req.body.id);
  return res.status(200).json(message);
};

let handleEdit = async (req, res) => {
  let data = req.body;
  try {
    let message = await jobHistoryServices.updateData(data);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      errMessage: "Internal server error",
    });
  }
};

module.exports = {
  handleGetAll: handleGetAll,
  handleCreate: handleCreate,
  handleEdit: handleEdit,
  handleDelete: handleDelete,
};

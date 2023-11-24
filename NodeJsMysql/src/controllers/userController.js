import userService from "../services/userServices";

let handleLogin = async (req, res) => {
  let User_Name = req.body.User_Name;
  let Password = req.body.Password;
  if (!User_Name || !Password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input parameter!",
    });
  }
  let userData = await userService.handleUserLogin(User_Name, Password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};
let handleCountUsers = async (req, res) => {
  try {
    let count = await userService.countUser();
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
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  handleCountUsers: handleCountUsers,
};

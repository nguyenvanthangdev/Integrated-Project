import db from "../models/index";

let handleUserLogin = (User_Name, Password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExit = await checkUserName(User_Name);
      if (isExit) {
        let user = await db.User.findOne({
          attributes: ["User_Name", "Password", "Email", "Active"],
          where: { User_Name: User_Name },
          raw: true,
        });
        if (user) {
          let check = await (Password === user.Password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.Password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User`s not found";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage =
          "Your's User Name isn't exist in your system. Plz try other User Name!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserName = (User_Name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { User_Name: User_Name },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll();
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserName(data.User_Name);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your User Name is already in use. Please try another User Name!",
        });
      } else {
        await db.User.create({
          User_Name: data.User_Name,
          Password: data.Password,
          Email: data.Email,
          Active: data.Active === "1" ? true : false,
        });
        resolve({
          errCode: 0,
          message: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user is not exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "The user is deleted",
    });
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.User_Name = data.User_Name;
        user.Password = data.Password;
        user.Email = data.Email;
        user.Active = data.Active;
        await user.save();
        resolve({
          errCode: 0,
          message: "Update the user succeeds !",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User is not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let countUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let countUsers = await db.User.count();
      resolve(countUsers);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  countUser: countUser,
};

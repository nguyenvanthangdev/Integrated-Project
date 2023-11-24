import db from "../models/index";

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.Job_History.findAll();
      }
      if (id && id !== "ALL") {
        users = await db.Job_History.findOne({
          where: { id: id },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let checkId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Job_History.findOne({
        where: { id: id },
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
let createNew = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkId(data.id);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Your id is already in use. Please try another id!",
        });
      } else {
        await db.Job_History.create({
          id: data.id,
          Employee_ID: data.Employee_ID,
          Department: data.Department,
          Division: data.Division,
          Start_Date: data.Start_Date,
          End_Date: data.End_Date,
          Job_Category: data.Job_Category,
          Location: data.Location,
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
let deleteJobHistory = (Id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Job_History.findOne({
      where: { id: Id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user is not exist",
      });
    }
    await db.Job_History.destroy({
      where: { id: Id },
    });
    resolve({
      errCode: 0,
      message: "The user is deleted",
    });
  });
};
let updateData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }
      let user = await db.Job_History.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.Employee_ID = data.Employee_ID),
          (user.Department = data.Department),
          (user.Division = data.Division),
          (user.Start_Date = data.Start_Date),
          (user.End_Date = data.End_Date),
          (user.Job_Category = data.Job_Category),
          (user.Location = data.Location),
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

module.exports = {
  getAll: getAll,
  createNew: createNew,
  deleteJobHistory: deleteJobHistory,
  updateData: updateData,
};

import db from "../models/index";

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.Employee.findAll();
      }
      if (id && id !== "ALL") {
        users = await db.Employee.findOne({
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
      let user = await db.Employee.findOne({
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
        await db.Employee.create({
          id: data.id,
          idEmployee: data.idEmployee,
          Last_Name: data.Last_Name,
          First_Name: data.First_Name,
          SSN: data.SSN,
          Pay_Rate: data.Pay_Rate,
          Vacation_Days: data.Vacation_Days,
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
let deletePayRate = (Id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Employee.findOne({
      where: { id: Id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user is not exist",
      });
    }
    await db.Employee.destroy({
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
      let user = await db.Employee.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.idEmployee = data.idEmployee),
          (user.Last_Name = data.Last_Name),
          (user.First_Name = data.First_Name),
          (user.SSN = data.SSN),
          (user.Pay_Rate = data.Pay_Rate),
          (user.Vacation_Days = data.Vacation_Days),
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
  deletePayRate: deletePayRate,
  updateData: updateData,
};

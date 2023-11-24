import db from "../models/index";

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.Benefit_Plans.findAll();
      }
      if (id && id !== "ALL") {
        users = await db.Benefit_Plans.findOne({
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
      let user = await db.Benefit_Plans.findOne({
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
        await db.Benefit_Plans.create({
          id: data.id,
          Plan_Name: data.Plan_Name,
          Deductable: data.Deductable,
          Percentage_CoPay: data.Percentage_CoPay,
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
let deleteBenefitPlans = (Id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Benefit_Plans.findOne({
      where: { id: Id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user is not exist",
      });
    }
    await db.Benefit_Plans.destroy({
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
      let user = await db.Benefit_Plans.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.Plan_Name = data.Plan_Name),
          (user.Deductable = data.Deductable),
          (user.Percentage_CoPay = data.Percentage_CoPay),
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
  deleteBenefitPlans: deleteBenefitPlans,
  updateData: updateData,
};

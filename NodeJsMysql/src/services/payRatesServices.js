import db from "../models/index";

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.Pay_rates.findAll();
      }
      if (id && id !== "ALL") {
        users = await db.Pay_rates.findOne({
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
      let user = await db.Pay_rates.findOne({
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
        await db.Pay_rates.create({
          id: data.id,
          Pay_Rate_Name: data.Pay_Rate_Name,
          Value: data.Value,
          Tax_Percentage: data.Tax_Percentage,
          Pay_Type: data.Pay_Type,
          Pay_Amount: data.Pay_Amount,
          PT_Level_C: data.PT_Level_C,
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
    let user = await db.Pay_rates.findOne({
      where: { id: Id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user is not exist",
      });
    }
    await db.Pay_rates.destroy({
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
      let user = await db.Pay_rates.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.Pay_Rate_Name = data.Pay_Rate_Name),
          (user.Value = data.Value),
          (user.Tax_Percentage = data.Tax_Percentage),
          (user.Pay_Type = data.Pay_Type),
          (user.Pay_Amount = data.Pay_Amount),
          (user.PT_Level_C = data.PT_Level_C),
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
let SumPayRates = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sumPayRates = await db.Pay_rates.sum("Pay_Amount");
      resolve(sumPayRates);
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
  SumPayRates: SumPayRates,
};

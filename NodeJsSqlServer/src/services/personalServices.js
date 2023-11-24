import db from "../models/index";

let getAll = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (id === "ALL") {
        users = await db.Personal.findAll();
      }
      if (id && id !== "ALL") {
        users = await db.Personal.findOne({
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
      let user = await db.Personal.findOne({
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
        await db.Personal.create({
          id: data.id,
          First_Name: data.First_Name,
          Last_Name: data.Last_Name,
          City: data.City,
          Email: data.Email,
          Phone_Number: data.Phone_Number,
          Gender: data.Gender === "1" ? true : false,
          Shareholder_Status: data.Shareholder_Status === "1" ? true : false,
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
let deletePersonal = (Id) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.Personal.findOne({
      where: { id: Id },
    });
    if (!user) {
      resolve({
        errCode: 2,
        errMessage: "The user is not exist",
      });
    }
    await db.Personal.destroy({
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
      let user = await db.Personal.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.First_Name = data.First_Name),
          (user.Last_Name = data.Last_Name),
          (user.City = data.City),
          (user.Email = data.Email),
          (user.Phone_Number = data.Phone_Number),
          (user.Gender = data.Gender),
          (user.Shareholder_Status = data.Shareholder_Status),
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
let CountPersonalGenderMale = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Personal.count({
        where: {
          Gender: true,
        },
      });
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
let CountPersonalGenderFemale = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let count = await db.Personal.count({
        where: {
          Gender: false,
        },
      });
      resolve(count);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getAll: getAll,
  createNew: createNew,
  deletePersonal: deletePersonal,
  updateData: updateData,
  CountPersonalGenderMale: CountPersonalGenderMale,
  CountPersonalGenderFemale: CountPersonalGenderFemale,
};

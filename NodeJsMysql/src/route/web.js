import express from "express";

import userController from "../controllers/userController";
import payRatesController from "../controllers/payRatesController";
import employeeController from "../controllers/employeeController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  //User
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  //Pay Rates
  router.get("/api/get-all-pay-rates", payRatesController.handleGetAll);
  router.post("/api/create-new-pay-rates", payRatesController.handleCreate);
  router.put("/api/edit-pay-rates", payRatesController.handleEdit);
  router.delete("/api/delete-pay-rates", payRatesController.handleDelete);
  //Employee
  router.get("/api/get-all-employee", employeeController.handleGetAll);
  router.post("/api/create-new-employee", employeeController.handleCreate);
  router.put("/api/edit-employee", employeeController.handleEdit);
  router.delete("/api/delete-employee", employeeController.handleDelete);

  // Count User
  router.get("/api/get-user-count", userController.handleCountUsers);
  // Sum Pay-Rates
  router.get("/api/get-sum-pay-rates", payRatesController.handleSumPayRates);

  return app.use("/", router);
};
module.exports = initWebRoutes;

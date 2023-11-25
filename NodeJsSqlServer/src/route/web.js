import express from "express";
import personalController from "../controllers/personalController";
import jobHistoryController from "../controllers/jobHistoryController";
import benefitPlansController from "../controllers/benefitPlansController";

let router = express.Router();
let initWebRoutes = (app) => {
  //Personal
  router.get("/api/get-all-personal", personalController.handleGetAll);
  router.post("/api/create-new-personal", personalController.handleCreate);
  router.put("/api/edit-personal", personalController.handleEdit);
  router.delete("/api/delete-personal", personalController.handleDelete);
  //JobHistory
  router.get("/api/get-all-job-history", jobHistoryController.handleGetAll);
  router.post("/api/create-new-job-history", jobHistoryController.handleCreate);
  router.put("/api/edit-job-history", jobHistoryController.handleEdit);
  router.delete("/api/delete-job-history", jobHistoryController.handleDelete);
  //BenefitPlans
  router.get("/api/get-all-benefit-plans", benefitPlansController.handleGetAll);
  router.post(
    "/api/create-new-benefit-plans",
    benefitPlansController.handleCreate
  );
  router.put("/api/edit-benefit-plans", benefitPlansController.handleEdit);
  router.delete(
    "/api/delete-benefit-plans",
    benefitPlansController.handleDelete
  );
  // Count Personal Gender Male
  router.get(
    "/api/get-count-personal-gender-male",
    personalController.handleCountPersonalGenderMale
  );
  //Count Personal Gender Female
  router.get(
    "/api/get-count-personal-gender-female",
    personalController.handleCountPersonalGenderFemale
  );
  // Count Shareholder Status
  router.get(
    "/api/get-sum-shareholdesr-tatus",
    personalController.handleShareholderStatus
  );
  return app.use("/", router);
};
module.exports = initWebRoutes;

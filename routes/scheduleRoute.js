var scheduleController = require("../controller/scheduleController");

module.exports = (app, router) => {
  router.post("/schedule", scheduleController.createSchedule);
  router.get("/schedule/:scheduleId", scheduleController.getScheduleById);
  router.get("/schedules", scheduleController.getallList);
  router.get("/unsentmails", scheduleController.getallList_unsentMails);
  router.put("/updateSchedule", scheduleController.updateSchedule);
  router.delete(
    "/deleteSchedule/:scheduleId",
    scheduleController.deleteSchedule
  );

  app.use("/api", router);
};

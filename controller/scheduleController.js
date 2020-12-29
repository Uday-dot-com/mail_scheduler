var scheduleService = require("../services/scheduleService");

var HttpStatus = require("http-status-codes");

module.exports = {
  createSchedule(req, res) {
    const body = req.body;
    {
      scheduleService.createSchedule(body, async (err, result) => {
        if (err) {
          return res.status(err.httpCode).json({
            status: err.message,
          });
        }
        return res.status(HttpStatus.OK).json({
          status: "MESSAGES.SCHEDULE_CREATED_SUCCESSFULLY",
          data: result,
        });
      });
    }
  },
  getScheduleById(req, res) {
    const params = req.params;

    try {
      scheduleService.getScheduleById(params, async (err, result) => {
        if (err) {
          return res.status(err.httpCode).json({
            status: err.message,
          });
        }
        return res.status(HttpStatus.OK).json({
          status: "MESSAGES.SCHEDULE_RETRIEVED_SUCCESSFULLY,",
          data: result,
        });
      });
    } catch (e) {
      logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
      console.log(e);
    }
    // }
  },

  getallList(req, res) {
    try {
      scheduleService.getSchedulelist(async (err, result) => {
        if (err) {
          return res.status(err.httpCode).json({
            status: err.message,
          });
        }
        return res.status(HttpStatus.OK).json({
          status: "MESSAGES.SCHEDULE_RETRIEVED_SUCCESSFULLY",
          data: result,
        });
      });
    } catch (e) {
      //   logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
      console.log(e);
    }
    //}
  },

  getallList_unsentMails(req, res) {
    try {
      scheduleService.getallListunsentMails(async (err, result) => {
        if (err) {
          return res.status(err.httpCode).json({
            status: err.message,
          });
        }
        return res.status(HttpStatus.OK).json({
          status: "MESSAGES.SCHEDULE_RETRIEVED_SUCCESSFULLY",
          data: result,
        });
      });
    } catch (e) {
      //   logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
      console.log(e);
    }
  },
  updateSchedule(req, res) {
    const body = req.body;
    {
      console.log(body);
      scheduleService.updateSchedule(body, async (err, result) => {
        if (err) {
          return res.status(err.httpCode).json({
            status: err.message,
          });
        }
        return res.status(HttpStatus.OK).json({
          status: "MESSAGES.SCHEDULE_UPDATED_SUCCESSFULLY,",
          data: body,
        });
      });
    }
  },
  deleteSchedule(req, res) {
    const params = req.params;

    try {
      scheduleService.deleteSchedule(params, async (err, result) => {
        if (err) {
          return res.status(err.httpCode).json({
            status: err.message,
          });
        }
        return res.status(HttpStatus.OK).json({
          status: "MESSAGES.SCHEDULE_DELETED_SUCCESSFULLY",
        });
      });
    } catch (e) {
      logger.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  },
};

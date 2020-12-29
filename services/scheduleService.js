var models = require("../models/index");

const setSchedule = require("../scheduleforMail");

var HttpStatus = require("http-status-codes");

module.exports = {
  createSchedule(body, callback) {
    models.h_schedule
      .create({
        sendDate: body.sendDate,
        sendTime: body.sendTime,
        sendStatus: false,
      })
      .then((Product) => {
        /// console.log(Product.dataValues.sendDate);
        setSchedule.set_schedule(
          Product.dataValues.sendDate,
          Product.dataValues.scheduleId
        );
        //console.log(Product);
        return callback(null, Product);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getScheduleById(params, callback) {
    models.h_schedule
      .findOne({
        where: { scheduleId: params.scheduleId },
        order: [["sendDate", "ASC"]],
      })
      .then((schedule) => {
        if (schedule == null) {
          logger.error(MESSAGES.SCHEDULE_NOT_FOUND);
          return callback(
            {
              httpCode: HttpStatus.NOT_FOUND,
              message: MESSAGES.SCHEDULE_NOT_FOUND,
            },
            null
          );
        } else {
          return callback(null, schedule);
        }
      });
  },

  getSchedulelist(callback) {
    models.h_schedule
      .findAll({
        order: [["sendDate", "ASC"]],
      })
      .then((schedule) => {
        if (schedule == 0) {
          logger.error(MESSAGES.SCHEDULE_NOT_FOUND);
          return callback(
            {
              httpCode: HttpStatus.NOT_FOUND,
              message: MESSAGES.SCHEDULE_NOT_FOUND,
            },
            null
          );
        } else {
          return callback(null, schedule);
        }
      });
  },
  getallListunsentMails(callback) {
    models.h_schedule
      .findAll({
        where: { sendStatus: false },
        order: [["sendDate", "ASC"]],
      })
      .then((schedule) => {
        if (schedule == 0) {
          return callback(
            {
              httpCode: HttpStatus.NOT_FOUND,
              message: "MESSAGES.SCHEDULE_NOT_FOUND",
            },
            null
          );
        } else {
          return callback(null, schedule);
        }
      });
  },
  updateSchedule(body, callback) {
    models.h_schedule
      .findOne({ where: { scheduleId: body.scheduleId } })
      .then((result) => {
        if (result == null) {
          logger.error(MESSAGES.SCHEDULE_DOES_NOT_EXISTS);
          return callback(
            {
              httpCode: HttpStatus.NOT_FOUND,
              message: MESSAGES.SCHEDULE_DOES_NOT_EXISTS,
            },
            null
          );
        } else {
          models.h_schedule
            .update(
              {
                sendDate: body.sendDate,
                sendTime: body.sendTime,
                sendStatus: false,
              },
              { where: { scheduleId: body.scheduleId } }
            )
            .then(function (updated) {
              if (updated == 1) {
                setSchedule.set_schedule(body.sendDate, body.scheduleId);
                return callback(null, updated);
              } else {
                logger.error(MESSAGES.SCHEDULE_CANNOT_BE_UPDATED);
                return callback(
                  {
                    httpCode: HttpStatus.BAD_REQUEST,
                    message: MESSAGES.SCHEDULE_CANNOT_BE_UPDATED,
                  },
                  null
                );
              }
            });
        }
      })
      .catch((err) => {
        logger.error(MESSAGES.INTERNAL_SERVER_ERROR);
        return callback(
          {
            httpCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: MESSAGES.INTERNAL_SERVER_ERROR,
          },
          null
        );
      });
  },
  deleteSchedule(params, callback) {
    models.h_schedule
      .findOne({
        where: { scheduleId: params.scheduleId },
      })
      .then((schedule) => {
        if (schedule == null) {
          //logger.error(MESSAGES.SCHEDULE_DOES_NOT_EXISTS);
          return callback(
            {
              httpCode: HttpStatus.NOT_FOUND,
              message: "MESSAGES.SCHEDULE_DOES_NOT_EXISTS",
            },
            null
          );
        } else {
          models.h_schedule
            .destroy({ where: { scheduleId: params.scheduleId } })
            .then((schedule) => {
              return callback(null, schedule);
            });
        }
      });
  },
};

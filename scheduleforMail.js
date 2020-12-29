const { METHOD_FAILURE } = require("http-status-codes");
var schedule = require("node-schedule");
const mail = require("./mail");
// var date = new Date(2012, 11, 21, 5, 30, 0);
module.exports = {
  set_schedule(senddate, id) {
    schedule.scheduleJob(senddate, function () {
      mail.sendMail(id);
    });
  },
};

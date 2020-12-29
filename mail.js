var nodemailer = require("nodemailer");
var models = require("./models/index");

module.exports = {
  sendMail(id) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testing21041995@gmail.com",
        pass: "!@#Area51",
      },
    });

    var mailOptions = {
      from: "testing21041995@gmail.com",
      to: "udaygupta120@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        models.h_schedule.update(
          {
            sendStatus: true,
          },
          { where: { scheduleId: id } }
        );
        console.log("Email sent: " + info.response);
      }
    });
  },
  //   sendNotification(emailTo, code, subject, text) {
  //     const msg = {
  //       to: emailTo,
  //       from: "training@neocepts.co.in",
  //       subject: subject,
  //       text: text,
  //       html: String(code),
  //     };
  //     sgMail.send(msg).catch((error) => {
  //       console.error(JSON.stringify(error));
  //     });
  //   },
};

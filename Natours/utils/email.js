const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1-) Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',  for gmail setup
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    //  For gmail setup, Activate in gmail  "less secure app" option, only send 500 emails per day and also, will be quickly marked as a spammer
  });

  // 2-) Define the email options

  const mailOptions = {
    from: ' Asiye Yaliz <hello@asiye.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html
  };

  // 3-) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

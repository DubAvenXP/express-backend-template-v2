const nodemailer = require('./nodemailer');
const response = require('./response');
const sendEmail = require('./send-email');
module.exports = {
  ...nodemailer,
  ...response,
  ...sendEmail
}

const moment = require('moment-timezone');

const { err, success } = require('./response');
const { transporter } = require('./nodemailer');

const from = process.env.EMAIL_USER;

const now = moment().tz('America/Guatemala').format('YYYY-MM-DD HH:mm:ss');
//List of receivers
let receivers = [];

async function sendEmail(req, res) {
  const { message, name, email, phone, department } = req.body;

  switch (department) {
    case 'Cuentas':
      receivers.push('project@agenciaotb.com', 'project2@agenciaotb.com', 'webmaster@agenciaotb.com', 'roberto@agenciaotb.com');
      break;
    case 'Planning':
      receivers.push('sara@agenciaotb.com', 'webmaster@agenciaotb.com', 'roberto@agenciaotb.com');
      break;
    case 'Estrategia':
      receivers.push('diego@agenciaotb.com', 'webmaster@agenciaotb.com', 'roberto@agenciaotb.com');
      break;
    case 'Diseño':
      receivers.push('heber@agenciaotb.com', 'webmaster@agenciaotb.com', 'roberto@agenciaotb.com');
      break;
    case 'Produccion':
      receivers.push('samantha@agenciaotb.com', 'webmaster@agenciaotb.com', 'roberto@agenciaotb.com');
      break;
    case 'Desarrollo':
      receivers.push('josue@agenciaotb.com', 'webmaster@agenciaotb.com', 'roberto@agenciaotb.com');
      break;
  }

  try {
    await transporter.sendMail({
      from: '"Webmaster 💬" <webmaster.agenciaotb@gmail.com>',
      to: receivers,
      subject: `Un cliente se quiere comunicar contigo (${department}) ${now}`,
      html: `
      <div style="
              width: 100%;
          margin: 0 auto;
          font-family: 'Roboto', sans-serif;
          font-size: 1.2rem;
          text-align: center;
          padding: 25px 0;
          ">
          <h2
          style="
          padding: 10px;
          background-color: #265798;
          color: #f5f5f5;
          text-decoration: none;
          border-radius: 5px;
          font-size: 2rem;"
          
          >Un cliente se quiere comunicar contigo</h2>
          <img src="https://res.cloudinary.com/dj6nxwrae/image/upload/v1633105698/otb/photo1632938550_1_rxw83s-removebg-preview_bmzheo_brsvsx.png" alt="logo" style="width: 200px;">
          <ul style="
            list-style: none;
            padding: 0;
            margin: 0 auto;
            width: 20rem;
      ">
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Name: </span><span style="color: #265798">${name}</span>
        </li>
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Email: </span><span style="color: #265798">${email}</span>
        </li>
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Phone: </span><span style="color: #265798">${phone}</span>
        </li>
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Message: </span><span style="color: #265798">${message}</span>
        </li>
        <li style="margin: 1rem 0">
            <span style="font-weight: bold;">Fecha: </span><span style="color: #265798">${now}</span>
        </li>
      </ul>
      
      </div>
      `

    });
    receivers = [];
    success(req, res, 'Mensaje enviado con exito!', 200);
  } catch (error) {
    console.error(error);
    err(req, res, error, 500, 'Internal server error, contact the administrator');
  }
}

module.exports = {
  sendEmail
};
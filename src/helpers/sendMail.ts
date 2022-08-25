const nodemailer = require('nodemailer');

import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const {
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_REFRESH_TOKEN,
  OAUTH2_REDIRECT_URI,
  SENDER_EMAIL_ADDRESS
} = process.env;


const OAuth2Client = new OAuth2(
  OAUTH2_CLIENT_ID,
  OAUTH2_CLIENT_SECRET,
  OAUTH2_REDIRECT_URI
);



export const sendMail = async (customers: string[], subject: string, htmlBody: string) => {

  OAuth2Client.setCredentials({ refresh_token: OAUTH2_REFRESH_TOKEN });
  const accessToken = await OAuth2Client.getAccessToken();

  let transporter = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: OAUTH2_CLIENT_ID,
      clientSecret: OAUTH2_CLIENT_SECRET,
      refreshToken: OAUTH2_REFRESH_TOKEN,
      accessToken
    },
    
  });

  let mailOptions = {
    from: `Universal Music<${SENDER_EMAIL_ADDRESS}>`,
    to: customers,
    subject,
    html: htmlBody,
  };

  transporter.sendMail(mailOptions, function (err: any) {
    if (err) {
      console.log("Transporter Error:  " + err);
      throw new Error("Send mail failed");
    }
    return console.log("Send mail success");
  });
};
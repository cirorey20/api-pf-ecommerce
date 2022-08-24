// import * as nodemailer from "nodemailer";
const nodemailer = require('nodemailer');

import { google } from 'googleapis';

const { OAuth2} = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const 
CLIENT_ID= '104027180786-evj9t0hjomce55vea7fmifvq9f59h437.apps.googleusercontent.com',
CLIENT_SECRET= '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',
REFRESH_TOKEN= '1//04KwHIYpl9wIHCgYIARAAGAQSNwF-L9IrPgQ6asdAcYIoP4Uan4h69C_Dij1_TNqMnrE23VI37-G-VNuF5YX-ZtDdeFToQjeSN_o',
SENDER_EMAIL_ADDRESS= 'universalmusicpf12@gmail.com'; // Pendiente poner estas constantes en .env

const  OAuth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  OAUTH_PLAYGROUND
);



export const sendMail = async (customers:string[], subject:string, htmlBody:string) => {

  console.log(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, OAUTH_PLAYGROUND, '>>>>>>>>>>>>>>>>>>>')
    OAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    const accessToken = await OAuth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
        // host: "smtp.gmail.com",
        // secure: true,
        // port: 465,
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: SENDER_EMAIL_ADDRESS,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken
        },
        // tls: {
        //   ciphers: "SSLv3",
        //   rejectUnauthorized: false,
        // },
      });
  
      // **** Build Email mailOptions for Nodemailer Transporter Object ***
      let mailOptions: any = {
        from: `Universal Music<${SENDER_EMAIL_ADDRESS}>`,
        to: customers,
        subject,
        html: htmlBody,
      };
      
      transporter.sendMail(mailOptions, function (err:any) {
        if (err) {
          console.log("Transporter Error:  " + err);
          throw new Error("Send mail failed");
        }
        return console.log("Send mail success");
      });
};
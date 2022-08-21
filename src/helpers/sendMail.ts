import nodemailer from "nodemailer";


export const sendMail = (customers:string[], subject:string, htmlBody:string) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "universalmusicpf12@gmail.com",
          pass: "ysurdkrtruggsdih",
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
      });
  
      // **** Build Email mailOptions for Nodemailer Transporter Object ***
      let mailOptions: any = {
        to: customers,
        subject,
        html: htmlBody,
      };
      
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.log("Transporter Error:  " + err);
          throw new Error("Send mail failed");
        }
        return console.log("Send mail success");
      });
};
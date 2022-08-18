import nodemailer from "nodemailer";


export const sendMail = (customers:string[], subject:string, htmlBody:string) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "jorgecamargo2012902@gmail.com",
          pass: "vuzsmyocfhxdyumm",
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
      });
  
      // **** Build Email mailOptions for Nodemailer Transporter Object ***
      let mailOptions: any = {
        from: "jorgecamargo2012902@gmail.com",
        to: customers,
        subject,
        html: htmlBody,
  
        //*** Nodemailer Attachment Section
        // attachments: [{
        //     filename: 'file.pdf',
        //     content: buffer,
        //     contentType: 'application/pdf'
        // }]
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.log("Transporter Error:  " + err);
          throw new Error("Send mail failed");
        }
        return console.log("Send mail success");
      });
};
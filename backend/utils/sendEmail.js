const nodemailer=require('nodemailer');

const sendEmail=async options=>{
    const  transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ed0234ab82589c",
          pass: "f5432163679766"
        }
      });
      const message={
         from:`${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}`,
          to:options.email,
          subject:options.subject,
          text:options.message
      }
      await transporter.sendMail(message)
}
module.exports=sendEmail;
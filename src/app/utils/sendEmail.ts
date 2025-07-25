import nodemailer from 'nodemailer';
import config from '../config';


export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'worldholidaystuhin@gmail.com',
      pass: 'cduz kuhq ldjy ifla',
    },
  });

  await transporter.sendMail({
    from: 'worldholidaystuhin@gmail.com', // sender address
    to,
    subject: 'Reset your password within ten mins!', // Subject line
    text: '', // plain text body
    html,
  });
};
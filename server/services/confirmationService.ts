import nodemailer from "nodemailer"

let confirmationCodes = {};


const transporter = nodemailer.createTransport({
  service: 'Gmail', // use your email service
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: 'islomali3110@gmail.com',
      pass: 'lddiefjldcpfguud'
  }
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

export async function sendConfirmationCode(email) {
  const code = generateCode();
  confirmationCodes[email] = code;

  const mailOptions = {
      from: 'Instagram uz',
      to: email,
      subject: 'Your confirmation code',
      text: `Your confirmation code is ${code}`
  };

  await transporter.sendMail(mailOptions);
  console.log(`Confirmation code sent to ${email}: ${code}`);
}

export function verifyConfirmationCode(email, code) {
  if (confirmationCodes[email] === code) {
      delete confirmationCodes[email]; // Code verified, remove it
      return true;
  } else {
      return false;
  }
}
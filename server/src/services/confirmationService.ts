import nodemailer from "nodemailer"

let confirmationCodes: { [key: string]: string } = {};


const transporter = nodemailer.createTransport({
  service: 'Gmail',
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

export async function sendConfirmationCode(email:string) {
  const code = generateCode();
  confirmationCodes[email] = code;

  const mailOptions = {
      from: 'Instagram uz',
      to: email,
      subject: 'Ваш код подтверждения',
      text: `Ваш код подтверждения ${code}`
  };

  await transporter.sendMail(mailOptions);
  console.log(`Ваш код подтверждения ${email}: ${code}`);
}

export function verifyConfirmationCode(email:string, code:string) {
  if (confirmationCodes[email] === code) {
      delete confirmationCodes[email];
      return true;
  } else {
      return false;
  }
}
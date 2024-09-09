import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD?.toString(),
  },
});

export const sendVerificationMail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmationLink = `http://localhost:3000/auth/newVerification?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: "Verify your email address",
    html: `
        <div>
            <p>Hello <span>${name}</span> !!</p>

            <p>
                You registered an account on Next-Auth, 
                before being able to use your account you need to verify that this is your email address. by clicking here: 
            </p>

            <p>
                <a href="${confirmationLink}">Email Verification Link</a>
            </p>

            <p>Kind Regards, Makdoom Shaikh</p>
        </div>
    `,
  });
};

export const sendResetPasswordMail = async (
  name: string,
  email: string,
  token: string
) => {
  const confirmationLink = `http://localhost:3000/auth/newPassword?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Password",
    text: "Reset your password",
    html: `
        <div>
            <p>Hello <span>${name}</span> !!</p>

            <p>
              Forgot your password ? \n
              We received a request to reset the password for your account
            </p>

            <p>
              To reset your password, click on the link
              <a href="${confirmationLink}">Reset Password Link</a>
            </p>

            <p>Kind Regards, Makdoom Shaikh</p>
        </div>
    `,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "2FA Code",
    text: "Your 2FA Code",
    html: `<p>Your 2FA Code: ${token}</p>`,
  });
};

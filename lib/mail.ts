import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD?.toString(),
  },
});

export const sendMail = async (name: string, email: string, token: string) => {
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

            <p>
                Kind Regards, 
                Makdoom Shaikh
            </p>

        </div>
    `,
  });

  console.log("mail has been sent");
};

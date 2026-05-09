// // 7. Email Templates (lib/emailTemplates.ts)
// export const createWelcomeEmail = (name: string) => ({
//   subject: "Welcome!",
//   html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//         <h1 style="color: #333; text-align: center;">Welcome, ${name}!</h1>
//         <p>Thank you for joining us. We're excited to have you on board.</p>
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="https://yoursite.com" style="background-color: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
//             Get Started
//           </a>
//         </div>
//       </div>
//     `,
// });

export const createWelcomeEmail = (name: string) => ({
  subject: "Welcome!",
  html: `  <div
  style="
    font-family: Arial, sans-serif;
   
    margin: 10px auto;
    overflow: hidden;
    border: #e9ecef 1px solid;
    border-radius: 10px;
  "
>
  <div style="background-color: #fff; padding: 20px">
    <img
      alt=""
      style="height: 50px; width: auto"
      src="https://wz0varc9o3.ufs.sh/f/TAzAL7HJ3lsfK70X9kqHwd2Lju7pmDaERYli0BA1yUZ9f3q4"
    />
  </div>
  <div class="" style="background: #e9ecef; padding: 20px">
    <div
      style="
        background-color: #fff;
        padding: 30px 20px;
       border-radius: 10px;
      "
    >
      <h1 style="color: #333">Welcome, ${name}!</h1>
      <p>Thank you for joining us. We're excited to have you on board.</p>
      <div style="margin-top: 30px">
        <a
          href="https://ungarn-immo-kompass.vercel.app"
          style="
            background-color: #fd7e14;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
  <div class="" style="padding: 20px; color: #818182;">
    <p>© 2025 Ungarn-immo, Inc. All Rights Reserved.</p>
  </div>
</div>
 `,
});

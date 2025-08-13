// 7. Email Templates (lib/emailTemplates.ts)
export const createWelcomeEmail = (name: string) => ({
    subject: 'Welcome!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333; text-align: center;">Welcome, ${name}!</h1>
        <p>Thank you for joining us. We're excited to have you on board.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yoursite.com" style="background-color: #007cba; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">
            Get Started
          </a>
        </div>
      </div>
    `,
  });
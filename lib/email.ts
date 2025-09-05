import nodemailer from "nodemailer";

export interface EmailConfig {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Create transporter with configuration optimized for custom email servers
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT === '465', // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Extended timeout settings for custom servers
    connectionTimeout: 60000, // 60 seconds
    greetingTimeout: 30000, // 30 seconds  
    socketTimeout: 60000, // 60 seconds
    // TLS settings for custom servers
    tls: {
      // Don't fail on invalid certs (common with custom servers)
      rejectUnauthorized: false,
      // Support older TLS versions if needed
      minVersion: 'TLSv1',
    },
    // Enable debug mode to see connection details
    debug: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development',
    // Ignore certificate errors (use with caution)
    ignoreTLS: false,
    requireTLS: process.env.EMAIL_PORT === '587', // require TLS for port 587
  });

  // Verify connection configuration
export const verifyEmailConnection = async (): Promise<boolean> => {
    try {
      await transporter.verify();
      console.log('Email server is ready to take our messages');
      return true;
    } catch (error) {
      console.error('Email server connection failed:', error);
      return false;
    }
  };

  // Send email function
export const sendEmail = async (config: EmailConfig): Promise<boolean> => {
    try {
      const info = await transporter.sendMail({
        from: `Ungarn Immo <${process.env.EMAIL_FROM}>`,
        to: config.to,
        subject: config.subject,
        text: config.text,
        html: config.html,
      });
  
      console.log('Message sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  };
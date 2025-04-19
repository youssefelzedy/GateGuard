interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  html?: string; // Optional
}

export default EmailOptions;

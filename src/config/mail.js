export default {
  host: process.env.MAIL_HOST,
  posrt: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Contact GoBarber <noreply@gobarber.com>',
  },
};

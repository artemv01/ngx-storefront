declare var process: NodeJS.Process;

export const environment = {
  production: true,
  apiUrl: process.env.API_URL,
  recaptchaKey: process.env.RECAPTCHA_SITE_KEY,
};

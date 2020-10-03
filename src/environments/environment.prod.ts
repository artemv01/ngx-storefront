declare var process: NodeJS.Process;

export const environment = {
  production: true,
  apiUrl: process.env.API_URL,
  recaptchaKey: process.env.RECAPTCHA_SITE_KEY,
  googleMapsKey: process.env.GOOGLE_MAPS_KEY,
  algoliaPlacesAppId: process.env.ALGOLIA_PLACES_APP_ID,
  algoliaPlacesApiKey: process.env.ALGOLIA_PLACES_KEY,
};

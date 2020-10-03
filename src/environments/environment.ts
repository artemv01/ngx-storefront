// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
declare var process: NodeJS.Process;

export const environment = {
  production: false,
  apiUrl: process.env.API_URL_TESTING,
  recaptchaKey: process.env.RECAPTCHA_SITE_KEY,
  googleMapsKey: process.env.GOOGLE_MAPS_KEY,
  algoliaPlacesAppId: process.env.ALGOLIA_PLACES_APP_ID,
  algoliaPlacesApiKey: process.env.ALGOLIA_PLACES_KEY,
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be reviewed out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

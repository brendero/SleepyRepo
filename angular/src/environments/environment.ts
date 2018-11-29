// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  client_id: '',
  client_secret: '',
  api: {
    url: 'http://localhost/',
    jsonurl: 'wp-json/',
    jsonendpoint: 'wp/v2/',
    endPoints: {
      auth: {
        url: 'jwt-auth/v1/token'
      },
      Users: {
        url: 'users'
      },
      photofeed: {
        url: 'wokeuplikethis'
      },
      tools: {
        url: 'rest_tools'
      },
      media: {
        url: 'media'
      },
      acf: {
        url: 'acf/v3/'
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

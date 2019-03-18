import * as functions from 'firebase-functions';
import { Response, Request } from 'firebase-functions';
import { getFlickrPhotosMethod } from './flickr';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function helloWorldMethod(request: Request, response: Response): void {
  console.log('test me here');
  response.send("Hello from World!!");
}

export const helloWorld = functions.https.onRequest(helloWorldMethod);

export const getFlickPhotos = functions.https.onRequest(getFlickrPhotosMethod);
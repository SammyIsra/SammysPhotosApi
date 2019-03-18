import * as functions from 'firebase-functions';
import { Response, Request } from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function helloWorldMethod(request: Request, response: Response) {
  response.send("Hello from World!");
}

export const helloWorld = functions.https.onRequest(helloWorldMethod);
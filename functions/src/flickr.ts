import { Response, Request, config } from "firebase-functions";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

/**
 * Gets the pictures from Flickr as requested by the HTTP request
 * @param request
 * @param response
 */
export function getFlickrPhotosMethod(
  request: Request,
  response: Response
): void {
  newGetPhotos(request.query)
    .then(data => response.send(data))
    .catch(err => response.send(err));
}

function newGetPhotos(query: IQuery) {
  console.log("config:", config());

  const params = new URLSearchParams({
    method: "flickr.people.getPhotos",
    api_key: config().flickr.appkey,
    user_id: "132868185@N07", // me
    format: "json",
    extras: [
      "original_format",
      "date_taken",
      "date_upload",
      "views",
      "url_s",
      "url_q",
      "url_m",
      "url_z",
      "url_c",
      "url_l",
      "url_o"
    ].join(","),
    nojsoncallback: "1"
  });
  const flickUrl = "https://api.flickr.com/services/rest/";
  const requestUrl = `${flickUrl}?${params.toString()}`;

  return fetch(requestUrl)
    .then(res => res.json())
    .then(function processResponse(res) {
      const { photo }: { photo: Array<any> } = res.photos;

      switch (query.sortBy) {
        case "views":
          // Sort by most views first
          photo.sort((a, b) => b.views - a.views);
          break;

        case "date":
          // do nothing, default is sort by date
          break;
      }

      //Return the pictures, all the data
      return query.limitTo ? photo.slice(0, query.limitTo) : photo;
    });
}

export interface IQuery {
  limitTo: number;
  sortBy: "views" | "date";
}

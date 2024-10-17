import { api_endpoints } from "../config/api_endpoints";
import { ApiServicesClass } from "../config/api_ServicesClass";

export const api_services = {
  audio: new ApiServicesClass(api_endpoints.audio),
  books: new ApiServicesClass(api_endpoints.books),
  documents: new ApiServicesClass(api_endpoints.documents),
  magazines: new ApiServicesClass(api_endpoints.magazines),
  newspapers: new ApiServicesClass(api_endpoints.newspapers),
  photos: new ApiServicesClass(api_endpoints.photos),
  photoCollection: new ApiServicesClass(api_endpoints.photoCollection),
  postcards: new ApiServicesClass(api_endpoints.postcards),
  posters: new ApiServicesClass(api_endpoints.posters),
  stamps: new ApiServicesClass(api_endpoints.stamps),
  video: new ApiServicesClass(api_endpoints.video),
  entireDb: new ApiServicesClass(api_endpoints.entireDB),
};

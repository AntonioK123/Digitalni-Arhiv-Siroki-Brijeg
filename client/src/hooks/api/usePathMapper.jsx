import { api_services } from "../../services/api/services/api_services";

const usePathMapper = (path, endP = "") => {
  let data, collectionName;

  const pathMappings = {
    [`/app/audio${endP}`]: {
      data: api_services.audio,
      collectionName: "Audio",
    },
    [`/app/books${endP}`]: {
      data: api_services.books,
      collectionName: "Knjige",
    },
    [`/app/documents${endP}`]: {
      data: api_services.documents,
      collectionName: "Dokumenti",
    },
    [`/app/magazines${endP}`]: {
      data: api_services.magazines,
      collectionName: "Časopisi",
    },
    [`/app/newspapers${endP}`]: {
      data: api_services.newspapers,
      collectionName: "Novine",
    },
    [`/app/photos${endP}`]: {
      data: api_services.photos,
      collectionName: "Fotografije",
    },
    [`/app/photo_collections${endP}`]: {
      data: api_services.photoCollection,
      collectionName: "Fotografske Zbirke",
    },
    [`/app/postcards${endP}`]: {
      data: api_services.postcards,
      collectionName: "Razglednice",
    },
    [`/app/posters${endP}`]: {
      data: api_services.posters,
      collectionName: "Plakati",
    },
    [`/app/stamps${endP}`]: {
      data: api_services.stamps,
      collectionName: "Poštanske Markice",
    },
    [`/app/video${endP}`]: {
      data: api_services.video,
      collectionName: "Film i Video",
    },
  };

  if (path in pathMappings) {
    const { data: mappedData, collectionName: mappedCollectionName } =
      pathMappings[path];
    data = mappedData;
    collectionName = mappedCollectionName;
  }
  return { data, collectionName };
};
export { usePathMapper };

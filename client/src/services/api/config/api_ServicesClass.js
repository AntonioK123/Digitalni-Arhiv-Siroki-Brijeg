import { apiClient } from "./axiosConfig";

class ApiServicesClass {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  create = async (
    { ...formData },
    progressBar,
    isCollectionUrl,
    collectionId
  ) => {
    let result;
    if (this.endpoint === "photo_collections" && isCollectionUrl) {
      result = await apiClient.post(
        this.endpoint,
        { ...formData },
        progressBar
      );
    } else if (this.endpoint === "photo_collections" && !isCollectionUrl) {
      result = await apiClient.postForm(
        `${this.endpoint}/${collectionId}/photos`,
        { ...formData },
        progressBar
      );
    } else {
      result = await apiClient.postForm(
        this.endpoint,
        { ...formData },
        progressBar
      );
    }
    return result;
  };

  read = async ({ signal }) => {
    const result = await apiClient.get(this.endpoint, {
      signal,
    });
    return result;
  };

  readFromCollection = async (collectionId, { signal }) => {
    const result = await apiClient.get(
      `${this.endpoint}/${collectionId}/photos`,
      { signal }
    );
    return result;
  };

  readOne = async (id, signal, collectionId, isCollectionUrl) => {
    let result;
    if (this.endpoint === "photo_collections" && isCollectionUrl) {
      result = await apiClient.get(`${this.endpoint}/${id}`, { signal });
    } else if (this.endpoint === "photo_collections" && !isCollectionUrl) {
      result = await apiClient.get(
        `${this.endpoint}/${collectionId}/photos/${id}`,
        { signal }
      );
    } else {
      result = await apiClient.get(`${this.endpoint}/${id}`, { signal });
    }
    return result;
  };

  update = async ({ ...formData }, id, collectionId, isCollectionUrl) => {
    let result;
    if (this.endpoint === "photo_collections" && isCollectionUrl) {
      result = await apiClient.put(`${this.endpoint}/${id}`, { ...formData });
    } else if (this.endpoint === "photo_collections" && !isCollectionUrl) {
      result = await apiClient.putForm(
        `${this.endpoint}/${collectionId}/photos/${id}`,
        { ...formData }
      );
    } else {
      result = await apiClient.putForm(`${this.endpoint}/${id}`, {
        ...formData,
      });
    }
    return result;
  };

  delete = async (id) => {
    const result = await apiClient.delete(`${this.endpoint}/${id}`);
    return result;
  };

  deleteDocumentFromCollection = async (id, collectionId) => {
    const result = await apiClient.delete(
      `${this.endpoint}/${collectionId}/photos/${id}`
    );
    return result;
  };
}

export { ApiServicesClass };

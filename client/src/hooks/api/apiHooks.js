import { useState, useEffect, useRef } from "react";

const useCreateData = (endpoint, isCollectionUrl, collectionId) => {
  const [loading, setLoading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const createItems = ({ ...formData }) => {
    setLoading(true);
    return endpoint
      .create(
        formData,
        {
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        },
        isCollectionUrl,
        collectionId
      )
      .then((t) => {
        setLoading(false);
        console.log(t);
        setSuccessMessage("Uspješno ste spremili novu datoteku");
        setTimeout(() => {
          setSuccessMessage("");
          setUploadPercentage(0);
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        setUploadPercentage(0);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Error: Failed to create item.");
        }
        throw error;
      });
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
  };

  const handleCloseError = () => {
    setError(null);
  };

  return {
    createItems,
    loading,
    uploadPercentage,
    error,
    handleCloseError,
    successMessage,
    handleCloseSuccess,
  };
};
//Treba postavit ovaj hook da radi bez strict mode u produkciji u developmentu je dobro medjutim u produkciji ne fetcha samo loading state
const useGetData = (endpoint, collectionId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const effectRan = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    if (effectRan.current === true) {
      let readData = collectionId
        ? endpoint.readFromCollection(collectionId, { signal })
        : endpoint.read({ signal });
      readData
        .then((res) => {
          setItemsList(res.data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          if (err.message === "canceled" && err.name === "CanceledError") {
            console.log("Request canceled:", err.message);
          } else {
            setError("Došlo je do pogreške. Pokušajte ponovno kasnije.");
            console.error("Request error:", err);
          }
          setLoading(false);
        });
    }
    return () => {
      controller.abort();
      effectRan.current = true;
    };
  }, [endpoint, collectionId]);

  return { loading, error, itemsList };
};

const useGetSingleItem = (endpoint, id, collectionId, isCollectionUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [singleItem, setSingleItem] = useState({});
  const effectRan = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    if (effectRan.current === true) {
      endpoint
        .readOne(id, signal, collectionId, isCollectionUrl)
        .then((res) => {
          setSingleItem(res.data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          if (err.message === "canceled" && err.name === "CanceledError") {
            console.log("Request canceled:", err.message);
          } else {
            setError("Došlo je do pogreške. Pokušajte ponovno kasnije.");
            console.error("Request error:", err);
          }
          setLoading(false);
        });
    }
    return () => {
      controller.abort();
      effectRan.current = true;
    };
  }, [endpoint, id, collectionId, isCollectionUrl]);

  return { loading, error, singleItem };
};

const useUpdateData = (endpoint, id, collectionId, isCollectionUrl) => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  const updateItem = ({ ...formData }) => {
    setLoading(true);
    console.log(id);
    return endpoint
      .update({ ...formData }, id, collectionId, isCollectionUrl)
      .then(() => {
        setLoading(false);
        setSuccessMessage("Uspješno ste uredili datoteku");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("Error: Failed to update item.");
        }
        throw error;
      });
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
  };

  const handleCloseError = () => {
    setError(null);
  };

  return {
    updateItem,
    loading,
    successMessage,
    error,
    handleCloseError,
    handleCloseSuccess,
  };
};

const useDeleteData = (endpoint, collectionId) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = (id) => {
    setLoading(true);
    let deleteData = collectionId
      ? endpoint.deleteDocumentFromCollection(id, collectionId)
      : endpoint.delete(id);
    return deleteData.then(() => {
      window.location.reload(false);
      setLoading(false);
    });
  };
  return { deleteItem, loading };
};

export {
  useCreateData,
  useGetData,
  useGetSingleItem,
  useUpdateData,
  useDeleteData,
};

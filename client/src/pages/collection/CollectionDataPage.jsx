import { useState, useEffect } from "react";
import { usePathMapper } from "../../hooks/api/usePathMapper";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import CollectionDataTable from "../../components/ui/CollectionDataTable";
import DataTable from "../../components/ui/DataTable";
import { api_services } from "../../services/api/services/api_services";

const CollectionDataPage = () => {
  const location = useLocation();
  const path = location.pathname;

  const { data, collectionName } = usePathMapper(path);
  const collectionEndPoint = data?.endpoint;
  const { id } = useParams();

  //Collection name data transfer from child to parent component
  const [collectionNameById, setCollectionNameById] = useState(() => {
    return sessionStorage.getItem("collectionName") || "Fotografije";
  });

  const handleCollectionNameById = (name) => {
    setCollectionNameById(name);
    sessionStorage.setItem("collectionName", name);
  };

  const collectionData = {
    data: api_services.photoCollection,
    collectionName: collectionNameById,
  };

  useEffect(() => {
    // On mount, retrieve collection name from sessionStorage
    const storedName = sessionStorage.getItem("collectionName");
    if (storedName) {
      setCollectionNameById(storedName);
    }
  }, []);

  return (
    <>
      {collectionEndPoint === "photo_collections" ? (
        <CollectionDataTable
          data={data}
          collectionName={collectionName}
          getCollectionName={handleCollectionNameById}
        />
      ) : (
        <DataTable
          data={collectionData.data}
          collectionName={collectionData.collectionName}
          collectionId={+id}
        />
      )}
    </>
  );
};

export default CollectionDataPage;

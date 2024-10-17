import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from "../../components/forms/Form";
import { api_services } from "../../services/api/services/api_services";

const EditDataInsideCollectionPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const id = segments[3];
  const itemId = segments[segments.length - 1];

  const [collectionNameFromSession, setCollectionNameFromSession] =
    useState("");

  useEffect(() => {
    const value = sessionStorage.getItem("collectionName");
    if (value) {
      setCollectionNameFromSession(value);
    }
  }, []);

  const collectionData = {
    data: api_services.photoCollection,
    collectionId: id,
    collectionName: collectionNameFromSession,
  };

  return (
    <>
      <Form
        data={collectionData.data}
        collectionName={collectionData.collectionName}
        formType="edit"
        id={+itemId}
        collectionId={+id}
      />
    </>
  );
};

export default EditDataInsideCollectionPage;

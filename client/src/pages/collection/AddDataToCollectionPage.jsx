import { useParams } from "react-router-dom";
import Form from "../../components/forms/Form";
import { api_services } from "../../services/api/services/api_services";

const AddDataToCollectionPage = () => {
  const { id } = useParams();

  const collectionData = {
    data: api_services.photoCollection,
    collectionId: id,
    collectionName: "Fotografije",
  };

  return (
    <>
      <Form
        data={collectionData.data}
        collectionName={collectionData.collectionName}
        formType="add"
        collectionId={+collectionData.collectionId}
      />
    </>
  );
};

export default AddDataToCollectionPage;

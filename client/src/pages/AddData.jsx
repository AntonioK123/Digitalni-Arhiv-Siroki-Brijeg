import { usePathMapper } from "../hooks/api/usePathMapper";
import { useLocation, useParams } from "react-router-dom";
import Form from "../components/forms/Form";
import { api_services } from "../services/api/services/api_services";

const AddData = () => {
  const location = useLocation();
  const path = location.pathname;
  const endP = "/add";
  const { data, collectionName } = usePathMapper(path, endP);
  const { id } = useParams();

  const collectionData = {
    data: api_services.photoCollection,
    collectionId: id,
  };

  return (
    <>
      <Form
        data={data}
        collectionName={collectionName}
        formType="add"
        collectionData={collectionData}
      />
    </>
  );
};

export default AddData;

import { usePathMapper } from "../hooks/api/usePathMapper";
import { useLocation } from "react-router-dom";
import Form from "../components/forms/Form";

const EditData = () => {
  const location = useLocation();
  const path = location.pathname;
  const segments = path.split("/");
  const itemId = segments[segments.length - 1];
  const endP = `/edit/${itemId}`;

  const { data, collectionName } = usePathMapper(path, endP);

  return (
    <>
      <Form
        data={data}
        collectionName={collectionName}
        formType="edit"
        id={+itemId}
      />
    </>
  );
};

export default EditData;

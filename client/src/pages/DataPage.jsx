import { usePathMapper } from "../hooks/api/usePathMapper";
import { useLocation } from "react-router-dom";
import DataTable from "../components/ui/DataTable";
import "../styles/pages/page.css";

const DataPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const { data, collectionName } = usePathMapper(path);

  return <DataTable data={data} collectionName={collectionName} />;
};

export default DataPage;

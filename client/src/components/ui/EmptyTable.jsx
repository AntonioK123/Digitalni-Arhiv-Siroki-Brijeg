import { Typography } from "@mui/material";
import "../../styles/ui/dataTable.css";

const EmptyTable = () => {
  return (
    <div className="empty-table-message">
      <Typography variant="h5">Kolekcija je trenutačno prazna.</Typography>
      <br />
      <Typography>
        Tablica sa podacima će se prikazati <br />
        nakon što spremite prvi dokument.
      </Typography>
    </div>
  );
};

export default EmptyTable;

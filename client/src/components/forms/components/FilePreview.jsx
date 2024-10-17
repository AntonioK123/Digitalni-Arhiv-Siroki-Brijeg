import PropTypes from "prop-types";
import { PhotoCamera as PhotoCameraIcon } from "@mui/icons-material";
import {
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
} from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "../../../styles/form/fileDropZone.css";

const FilePreview = ({ existingFiles }) => {
  // Ensure the value is an array
  const fileUrls = Array.isArray(existingFiles) ? existingFiles : [];

  const displayTable = fileUrls.length === 0;

  return (
    <>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        Datoteka
      </Typography>
      <PhotoCameraIcon fontSize="large" style={{ width: "100%" }} />
      {displayTable ? (
        <Typography variant="body1" style={{ textAlign: "center" }}>
          No files uploaded
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={4}
          className="images-preview-wrapper"
        >
          <Table aria-label="caption table" className="table">
            <TableHead>
              <TableRow>
                <TableCell>Datoteka</TableCell>
                <TableCell>Naziv Datoteke</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="typo">
              {fileUrls.map((file, index) => {
                const fileName =
                  typeof file === "string" ? file.split("/").pop() : file.name; 

                return (
                  <TableRow key={index} hover={true} className="image-box">
                    <TableCell component="th" scope="row">
                      <Zoom>
                        <img
                          src={file.source}
                          alt={`preview-${index}`}
                          style={{
                            maxWidth: "150px",
                            maxHeight: "100px",
                            margin: "10px",
                          }}
                        />
                      </Zoom>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{fileName}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

FilePreview.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  existingFiles: PropTypes.array,
};

FilePreview.displayName = "FilePreview";

export default FilePreview;

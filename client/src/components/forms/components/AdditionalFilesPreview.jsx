import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import {
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Tooltip,
} from "@mui/material";

import "react-medium-image-zoom/dist/styles.css";
import "../../../styles/form/fileDropZone.css";

const AdditionalFilesPreview = ({ existingAdditionalFiles, type }) => {
  // Ensure the value is an array
  const fileUrls = Array.isArray(existingAdditionalFiles)
    ? existingAdditionalFiles
    : [];

  const displayTable = fileUrls.length === 0;

  return (
    <>
      {type === "audio" ? (
        <>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Audio
          </Typography>
          <AudioFileIcon fontSize="large" style={{ width: "100%" }} />
        </>
      ) : (
        <>
          <Typography variant="h5" style={{ textAlign: "center" }}>
            Datoteka
          </Typography>
          <FileOpenIcon fontSize="large" style={{ width: "100%" }} />
        </>
      )}
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
                  typeof file === "string" ? file.split("/").pop() : file.name; // Adjust based on actual data structure

                return (
                  <TableRow key={index} hover={true} className="image-box">
                    {type === "audio" ? (
                      <>
                        <TableCell component="th" scope="row">
                          <AudiotrackIcon />
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            <Tooltip
                              title="Otvori audio datoteku"
                              placement="right-end"
                            >
                              <Link
                                to={file.source}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {fileName}{" "}
                              </Link>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell component="th" scope="row">
                          <FileOpenIcon />
                        </TableCell>
                        <TableCell>
                          <Typography variant="h6">
                            <Tooltip
                              title="Otvori datoteku"
                              placement="right-end"
                            >
                              <Link
                                to={file.source}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                {fileName}{" "}
                              </Link>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </>
                    )}
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

AdditionalFilesPreview.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  existingAdditionalFiles: PropTypes.array,
  type: PropTypes.string.isRequired,
};

AdditionalFilesPreview.displayName = "AdditionalFilesPreview";

export default AdditionalFilesPreview;

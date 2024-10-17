import "../../styles/ui/dataTable.css";
import { base_url } from "../../services/api/config/axiosConfig";
import { useEffect, useState } from "react";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Button,
  Pagination,
} from "@mui/material";
import TableLoader from "../loaders/TableLoader";
import propTypes from "prop-types";
import { useDeleteData, useGetData } from "../../hooks/api/apiHooks";
import { Link, useLocation } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EmptyTable from "./EmptyTable";

const DataTable = ({ data, collectionName, collectionId }) => {
  const { itemsList, loading, error } = useGetData(data, collectionId);
  const { deleteItem } = useDeleteData(data, collectionId);

  const location = useLocation();

  // Function to get unique sessionStorage key based on collectionName
  const getSessionStorageKey = (name) => `currentPage_${name}`;

  // Manage currentPage state
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize currentPage from sessionStorage or default to 1
    const storedPage = sessionStorage.getItem(
      getSessionStorageKey(collectionName)
    );
    return storedPage ? +storedPage : 1;
  });

  // Reset currentPage and sessionStorage when collectionName changes
  useEffect(() => {
    const storedPage = sessionStorage.getItem(
      getSessionStorageKey(collectionName)
    );
    setCurrentPage(storedPage ? +storedPage : 1);
  }, [collectionName, location.key]);

  useEffect(() => {
    // Initialize sessionStorage for the current collectionName
    const setInitialSessionStorage = () => {
      sessionStorage.setItem(getSessionStorageKey(collectionName), "1");
    };
    setInitialSessionStorage();
  }, [collectionName]);

  useEffect(() => {
    sessionStorage.setItem(
      getSessionStorageKey(collectionName),
      currentPage.toString()
    );
  }, [currentPage, collectionName]);

  const [emptyTable, setEmptyTable] = useState("");

  useEffect(() => {
    const isEmpty = itemsList.length === 0;
    setEmptyTable(isEmpty && !error);
  }, [itemsList, error]);

  const itemsPerPage = 4;
  const tablePages = Math.ceil(itemsList.length / itemsPerPage);

  const displayItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return itemsList.slice(startIndex, endIndex);
  };

  // Adjust currentPage if out of bounds
  useEffect(() => {
    if (currentPage > tablePages && tablePages > 0) {
      setCurrentPage(tablePages);
    }
  }, [currentPage, tablePages]);

  return (
    <>
      <div className="wrapper">
        {!loading && !error && (
          <div className="title">
            <Typography variant="h4">{collectionName}</Typography>
          </div>
        )}
        <div className="table-wrapper">
          {loading ? (
            <TableLoader />
          ) : emptyTable ? (
            <EmptyTable />
          ) : error ? (
            <div className="table-server-error">
              <Typography variant="h6" style={{ color: "#d93d3d" }}>
                {error}
              </Typography>
            </div>
          ) : (
            <TableContainer component={Paper} className="table-container">
              <Table aria-label="caption table" className="table">
                {/* Head */}
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Naslov</TableCell>
                    <TableCell>Datoteka</TableCell>
                    <TableCell>Opis</TableCell>
                    <TableCell>Datum</TableCell>
                    <TableCell>Komentar</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                {/* Body */}
                <TableBody>
                  {/* Start */}
                  {displayItems().map((item) => (
                    <TableRow key={item._id} hover={true}>
                      <TableCell component="th" scope="row">
                        {item._id}
                      </TableCell>
                      <TableCell>{item.naslov}</TableCell>
                      <TableCell>
                        {item.file &&
                        Array.isArray(item.file) &&
                        item.file.length > 0 ? (
                          <Avatar
                            alt={collectionName}
                            src={
                              collectionId !== undefined
                                ? `${base_url}${data.endpoint}/${collectionName}/${item.file[0]}`
                                : `${base_url}${data.endpoint}/${item.file[0]}`
                            }
                            sx={{ width: 54, height: 54 }}
                          />
                        ) : (
                          <Avatar
                            alt={collectionName}
                            src="default_avatar"
                            sx={{ width: 54, height: 54 }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{item.opis}</TableCell>
                      <TableCell>{item.datum}</TableCell>
                      <TableCell>{item.komentar}</TableCell>
                      <TableCell>
                        <Link
                          to={
                            collectionId
                              ? `${
                                  data.endpoint.startsWith("/") ? "" : "/"
                                }app/${
                                  data.endpoint
                                }/${collectionId}/photos/edit/${item?._id}`
                              : `${
                                  data.endpoint.startsWith("/") ? "" : "/"
                                }app/${data.endpoint}/edit/${item?._id}`
                          }
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <Button
                            color="primary"
                            variant="contained"
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>{" "}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Jeste li sigurni da želite izbrisati dokument?"
                            );
                            if (confirmBox === true) {
                              deleteItem(item._id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div className="table-pagination">
          {!loading && !error && itemsList.length > 0 && (
            <Pagination
              count={tablePages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              size="large"
            />
          )}
        </div>
      </div>
    </>
  );
};

DataTable.propTypes = {
  data: propTypes.object,
  collectionName: propTypes.string,
  collectionId: propTypes.number,
};
export default DataTable;

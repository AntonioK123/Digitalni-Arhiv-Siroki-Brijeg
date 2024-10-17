import { createBrowserRouter } from "react-router-dom";
import Root from "../components/layout/Root";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import DataPage from "../pages/DataPage";
import AddData from "../pages/AddData";
import EditData from "../pages/EditData";
import CollectionDataPage from "../pages/collection/CollectionDataPage";
import AddDataToCollectionPage from "../pages/collection/AddDataToCollectionPage";
import EditDataInsideCollectionPage from "../pages/collection/EditDataInsideCollectionPage";
import PrivateRoute from "./PrivateRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <PrivateRoute element={<Root />} />,
    children: [
      { path: "", element: <PrivateRoute element={<Home />} /> },
      ...[
        "audio",
        "books",
        "documents",
        "magazines",
        "newspapers",
        "postcards",
        "posters",
        "stamps",
        "video",
      ].map((path) => ({
        path,
        element: <PrivateRoute element={<DataPage />} />,
      })),
      ...["photo_collections", "photo_collections/:id/photos"].map((path) => ({
        path,
        element: <PrivateRoute element={<CollectionDataPage />} />,
      })),
      {
        path: "photo_collections/:id/photos/add",
        element: <PrivateRoute element={<AddDataToCollectionPage />} />,
      },
      {
        path: "photo_collections/:id/photos/edit/:id",
        element: <PrivateRoute element={<EditDataInsideCollectionPage />} />,
      },
      ...[
        "audio/add",
        "books/add",
        "documents/add",
        "magazines/add",
        "newspapers/add",
        "photos/add",
        "photo_collections/add",
        "postcards/add",
        "posters/add",
        "stamps/add",
        "video/add",
      ].map((path) => ({
        path,
        element: <PrivateRoute element={<AddData />} />,
      })),
      ...[
        "audio/edit/:id",
        "books/edit/:id",
        "documents/edit/:id",
        "magazines/edit/:id",
        "newspapers/edit/:id",
        "photos/edit/:id",
        "photo_collections/edit/:id",
        "postcards/edit/:id",
        "posters/edit/:id",
        "stamps/edit/:id",
        "video/edit/:id",
      ].map((path) => ({
        path,
        element: <PrivateRoute element={<EditData />} />,
      })),
    ],
  },
  {
    path: "*",
    element: <h1>404 Not found</h1>,
  },
]);

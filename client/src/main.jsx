import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/routes";
import { AuthContextProvider } from "./services/providers/AuthContext";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  //   {/* Baci pogled na react strict mode i production */}
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

import { Typography } from "@mui/material";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Digitalni Arhiv Široki Brijeg {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;

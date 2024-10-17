import { useState, useContext, useEffect } from "react";
import "../../styles/login/login.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AuthContext from "../../services/providers/AuthContext";
import Copyright from "../../components/ui/Copyright";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { handleLogin, loggedIn } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem("loggedIn");
    if (storedLoggedInStatus === "true") {
      navigate("/app"); // Redirect to /app if already logged in
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(loginData);
    if (loggedIn) {
      navigate("/app");
    }
  };

  return (
    <Grid container component="main" className="main-wrapper">
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={10}
        square
        className="login-component-wrapper"
      >
        <div>
          <div className="heading-wrapper">
            <div className="logo"></div>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Login
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;

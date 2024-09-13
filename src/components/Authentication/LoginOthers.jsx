import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  Paper,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { ServerConfig } from "../../serverconfiguration/serverconfig";

import { postRequest, getRequest } from "../../serverconfiguration/requestcomp";
import {
  EMPLOYEELOGIN,
  PAYMEMPLOYEE,
} from "../../serverconfiguration/controllers";
import { useNavigate } from "react-router-dom";
import { PAYMBRANCHES } from "../../serverconfiguration/controllers";
import { connect } from "react-redux";

import { setUser } from "../../reduxcomp/actions/actionfunctions";
import { encryptData } from "./encryption";
function LoginForm(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //const [loggedIn,isLoggedIn]=useState(false)
  const changeState = (status) => {
    props.isLoggedIn(status);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    postRequest(ServerConfig.url, EMPLOYEELOGIN, { username, password })
      .then((e) => {
        console.log(e);
        sessionStorage.setItem("jwt", e.data.message);

        changeState(true);
        sessionStorage.setItem("user", username);

        navigate("/HomePage");
        setError("");
        getRequest(ServerConfig.url, PAYMEMPLOYEE).then((e) => {
          var branchdet = e.data.filter((s) => s.employeeCode == username);
          console.log(branchdet);
          // props.dispatchx(
          //   setUser({
          //     branch: branchdet[0].pnEmployeeId,
          //     company: branchdet[0].,
          //   })
          // );
          sessionStorage.setItem("employee", encryptData(branchdet));
        });
      })
      .catch(() => {
        setError("Invalid username or password");
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}>
      <Paper
        elevation={3}
        sx={{ padding: 4, maxWidth: "400px", width: "100%" }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#1976D2", fontWeight: "bold" }}>
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
                sx={{ backgroundColor: "#f9f9f9" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                sx={{ backgroundColor: "#f9f9f9" }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#1976D2",
              color: "#fff",
              "&:hover": { backgroundColor: "#1565C0" },
            }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

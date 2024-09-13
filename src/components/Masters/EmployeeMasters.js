import React from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Sidenav from "../Home Page/Sidenav";
import Navbar from "../Home Page/Navbar";

const PaymEmployeeMasters = () => {
  return (
    <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <Container maxWidth="1000px">
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Employee Details
        </Typography>
        <Box
          sx={{
            border: 1,
            borderRadius: 1,
            borderColor: "grey.300",
            p: 2,
            mt: 2,
          }}>
          <Typography variant="h6" align="left" gutterBottom>
            Enter Employee Details
          </Typography>
          <Grid container spacing={2} mt={2}>
            {[
              "Employee Code",
              "Emp First Name",
              "Emp Middle Name",
              "Emp Last Name",
              "Date Of Birth",
              "Password",
              "Gender",
              "Status",
              "Emp Full Name",
              "Reader Id",
              "OT Eligible",
              "PF No",
              "ESI No",
              "Basic Salary",
              "Bank Code",
              "Bank Name",
              "IFSC Code",
              "Address",
              "PAN No",
              "Salary Type",
            ].map((label, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <TextField label={label} variant="outlined" fullWidth />
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="flex-start" mt={2}>
            <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
              + Add More Fields
            </Button>
          </Box>

          <Grid container spacing={2} mt={2} justifyContent="flex-end">
            <Grid item>
              <Button variant="contained" color="success">
                Save
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="error">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="info">
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </Grid>
    </Box>
    </div>
    </Grid>
  );
};

export default PaymEmployeeMasters;
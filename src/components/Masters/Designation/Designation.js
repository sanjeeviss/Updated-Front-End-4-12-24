import React, { useState, useEffect } from "react";
import { REPORTS, SAVE } from "../../../serverconfiguration/controllers";
import { postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Button,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CssBaseline,
  IconButton,
  Grid,
  Card,Container,CardContent,
  Box,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const DesignationMaster = () => {
  const [isLoggedin, setLoggedin] = useState(sessionStorage.getItem("user")); // Retrieve logged-in user from session storage
  const [loggedBranch, setloggedBranch] = useState([]); // To store branch data
  const [loggedCompany, setloggedCompany] = useState([]); // To store company data
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pn_BranchID: "", // Branch ID will be populated dynamically
    pn_CompanyID: "", // Company ID will be populated dynamically
    v_DesignationName: "",
    Authority:"",
    status: "A", // Default status for the new designation
  });

  // Fetch the branch details based on the logged-in user
  useEffect(() => {
    async function fetchInitialData() {
      try {
        console.log("Fetching branch data for user:", isLoggedin); // Log the user ID
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Branch WHERE Branch_User_Id = '${isLoggedin}'`,
        });

        if (loggedBranchData.data) {
          console.log("Branch data fetched:", loggedBranchData.data); // Log the fetched branch data
          setloggedBranch(loggedBranchData.data);

          // Set BranchID dynamically from the fetched branch data
          setFormData((prevData) => ({
            ...prevData,
            pn_BranchID: loggedBranchData.data[0].pn_BranchID,
          }));
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }

    if (isLoggedin) {
      fetchInitialData();
    }
  }, [isLoggedin]);

  // Fetch company details based on the branch data
  useEffect(() => {
    async function fetchLoggedCompany() {
      try {
        if (loggedBranch.length > 0) {
          console.log("Fetching company data for branch:", loggedBranch[0].pn_CompanyID); // Log the branch's company ID
          const loggedCompanyData = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT * FROM paym_Company WHERE pn_CompanyID = ${loggedBranch[0].pn_CompanyID}`,
          });

          if (loggedCompanyData.data) {
            console.log("Company data fetched:", loggedCompanyData.data); // Log the fetched company data
            setloggedCompany(loggedCompanyData.data);

            // Set CompanyID dynamically from the fetched company data
            setFormData((prevData) => ({
              ...prevData,
              pn_CompanyID: loggedCompanyData.data[0].pn_CompanyID,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }

    if (loggedBranch.length > 0) {
      fetchLoggedCompany();
    }
  }, [loggedBranch]);

  // Handle form submission
  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Form Data to be submitted:", formData); // Log the form data

    // Ensure status is a single character and string values are properly formatted
    const query = `
      INSERT INTO [dbo].[paym_Designation]
        (pn_CompanyID, BranchID, v_DesignationName, Authority,status)
      VALUES (${formData.pn_CompanyID}, ${formData.pn_BranchID}, '${formData.v_DesignationName}','${formData.Authority}', '${formData.status.toUpperCase()}');
    `;

    console.log("Generated SQL Query:", query); // Log the query being executed

    const response = await postRequest(ServerConfig.url, SAVE, { query });

    // Check for success in the response
    if (response.data === 1 || response.success) {
      console.log("Success response from server:", response); // Log the success response
      alert("Designation added successfully!"); // Show alert for successful submission
      navigate("/DesignationHome");
    } else {
      console.error("Failed to add Designation. Response:", response); // Log the failure response
      alert("Failed to add Designation.");
    }
  } catch (error) {
    console.error("Error adding Designation:", error); // Log the error
    alert("An error occurred while adding the Designation. Please try again.");
  }
};

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`changed: ${name}, Value: ${value}`); // Log the changed field and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Grid container>
    <Grid item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Container maxWidth="md" sx={{ p: 2 }}>
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom color="textPrimary" align="center">
            Add New Designation 
            </Typography>
            <form onSubmit={handleSubmit}>

            <Grid  xs={12}  sm={12} item style={{padding:"20px 20px 0 20px " }}>
              <Typography style={{textAlign:"left",paddingBottom:"10px"}} gutterBottom>Designation Name </Typography>
                  <FormControl fullWidth> 
                  <TextField
                         name="v_DesignationName"
                         value={formData.v_DesignationName}
                         onChange={handleChange}
                        
                        fullWidth // Makes the TextField take the full width of the container
                        variant="outlined" // You can also use "filled" or "standard" for different styles
                      />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={12} item style={{padding:"20px 20px 0 20px " }}>
              <Typography style={{textAlign:"left",paddingBottom:"10px"}} gutterBottom>Authority </Typography>
                  <FormControl fullWidth> 
                  <TextField
                         type="text"
                         name="Authority"
                         value={formData.Authority}
                         onChange={handleChange}
                        
                        fullWidth // Makes the TextField take the full width of the container
                        variant="outlined" // You can also use "filled" or "standard" for different styles
                      />
                </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}style={{padding:"20px"}}>
                    <Typography style={{textAlign:"left",paddingBottom:"10px"}} gutterBottom> Status </Typography>
                    <FormControl fullWidth>
                        
                          <Select
                         
                            sx={{ width: "300px" }}
                            variant="outlined"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                          >
                            <MenuItem value="A">Active</MenuItem>
                            <MenuItem value="I">Inactive</MenuItem>
                          </Select>
                          </FormControl>
                        </Grid>

<Grid  align="right" style={{padding:"18px"}}>
<Button type="submit" variant="contained" color="primary">Submit</Button>
</Grid>
                

    {/* <div>
      <h2>Add New Designation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Designation Name:</label>
          <input
            type="text"
            name="v_DesignationName"
            value={formData.v_DesignationName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Authority :</label>
          <input
            type="text"
            name="Authority"
            value={formData.Authority}
            onChange={handleChange}
            required
          />
        </div>

        <div>
  <label>Status:</label>
  <select
    name="status"
    value={formData.status}
    onChange={handleChange}
  >
    <option value="A">Active</option>
    <option value="I">Inactive</option>
  </select>
</div>


        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div> */}

    </form>
    </CardContent>
    </Card>
    </Grid>
    </div>
    </Container>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>
  );
};

export default DesignationMaster;

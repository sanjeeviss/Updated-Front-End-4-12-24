import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper, 
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { REPORTS, SAVE } from "../../serverconfiguration/controllers";
import { Checkbox } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import './Styles.css';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Switch} from "@material-ui/core";
import Select from 'react-select';
import Sidenav from "../Home Page-comapny/Sidenav1";
import Navbar from "../Home Page-comapny/Navbar1"


const EarnDeductCompanyMasters = () => {
  const [formData, setFormData] = useState({
    pn_CompanyID: "",
    pn_BranchID: "",
    Allowance1: "",
    Allowance2: "",
    Allowance3: "",
    Allowance4: "",
    Allowance5: "",
    Allowance6: "",
    Allowance7: "",
    Allowance8: "",
    Allowance9: "",
    Allowance10: "",
    Deduction1: "",
    Deduction2: "",
    Deduction3: "",
    Deduction4: "",
    Deduction5: "",
    Deduction6: "",
    Deduction7: "",
    Deduction8: "",
    Deduction9: "",
    Deduction10: "",
  });
  const [isloggedin, setloggedin] = useState(sessionStorage.getItem("user"));
  const [loggedCompany, setloggedCompany] = useState([]);
 const [loggedBranch, setloggedBranch] = useState([])
  const [tabIndex, setTabIndex] = useState(0);
  const [allowanceCount, setAllowanceCount] = useState(6);
  const [deductionCount, setDeductionCount] = useState(6);
  const [fetchedData, setFetchedData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [checkedAllowances, setCheckedAllowances] = useState(Array(10).fill(true));
  const [checkedDeductions, setCheckedDeductions] = useState(Array(10).fill(true));
  const [selectedBranches, setSelectedBranches] = useState([]);

  const handleCheckboxChange = (index, type) => {
    if (type === 'allowances') {
      const newChecked = [...checkedAllowances];
      newChecked[index] = !newChecked[index];
      setCheckedAllowances(newChecked);
  
      // Check the corresponding allowance and log it
      const allowance = fetchedData[0][`Allowance${index + 1}`];
      console.log(`Allowance ${index + 1}: ${allowance} is ${newChecked[index] ? "Checked" : "Unchecked"}`);
      
    } else {
      const newChecked = [...checkedDeductions];
      newChecked[index] = !newChecked[index];
      setCheckedDeductions(newChecked);
  
      // Check the corresponding deduction and log it
      const deduction = fetchedData[0][`Deduction${index + 1}`];
      console.log(`Deduction ${index + 1}: ${deduction} is ${newChecked[index] ? "Checked" : "Unchecked"}`);
    }
  };
  


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from paym_Company where Company_User_Id = '${isloggedin}'`,
        });
  
        if (loggedBranchData.data) {
          setloggedCompany(loggedBranchData.data);
  
          // Dynamically set pn_BranchID based on the fetched data
          setFormData((prevData) => ({
            ...prevData,
           pn_CompanyID: loggedBranchData.data[0].pn_CompanyID,
          }));
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }
  
    // Always fetch fresh data based on isloggedin
    if (isloggedin) {
      fetchInitialData();
    }
  }, [isloggedin]);

  useEffect(() => {
    async function fetchLoggedBranch() {
      try {
        if (loggedCompany.length > 0) {
          const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_Branch where pn_CompanyID = ${loggedCompany[0].pn_CompanyID}`,
          });
          console.log("LoggedBranch", loggedBranchData)
  
          if (loggedBranchData.data) {
            setloggedBranch(loggedBranchData.data);
  
            // Dynamically set pn_CompanyID based on the fetched data
            setFormData((prevData) => ({
              ...prevData,
              pn_BranchID: loggedBranchData.data[0].pn_BranchID,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    }
  
    
    if (loggedCompany.length > 0) {
      fetchLoggedBranch();
     
    }
  }, [loggedCompany]);
  
  const branchOptions = loggedBranch.map((e) => ({
    value: e.pn_BranchID,
    label: e.BranchName,
  }));

  const handleBranchChange = (selectedOptions) => {
    setSelectedBranches(selectedOptions.map((option) => option.value));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim() === "" ? null : value,
    }));
  };

  const handleSave = async () => {
    try {
      // Transform formData to handle empty strings
      const transformedData = { ...formData };
      Object.keys(transformedData).forEach((key) => {
        if (transformedData[key] === "") {
          transformedData[key] = null;
        }
      });
  
      // Save data for each selected branch
      if (selectedBranches.length === 0) {
        // Insert with null branch ID
        const query = `INSERT INTO [dbo].[EarnDeductMasters]
             ([pn_CompanyID],[pn_BranchID],[Allowance1],[Allowance2],[Allowance3],[Allowance4],[Allowance5],[Allowance6],[Allowance7],[Allowance8],[Allowance9],[Allowance10],
             [Deduction1],[Deduction2],[Deduction3],[Deduction4],[Deduction5],[Deduction6],[Deduction7],[Deduction8],[Deduction9],[Deduction10])
          VALUES (
            ${transformedData.pn_CompanyID}, null,
            ${Array(10).fill(0).map((_, i) => `'${transformedData[`Allowance${i + 1}`]}'`).join(", ")},
            ${Array(10).fill(0).map((_, i) => `'${transformedData[`Deduction${i + 1}`]}'`).join(", ")})`;
  
        // Save the data
        const response = await postRequest(ServerConfig.url, SAVE, { query });
  
        if (response.status === 200) {
          console.log("Data saved successfully with null for branch ID");
        } else {
          console.error("Error saving data with null branch ID:", response.statusText);
        }
      } else {
        // Loop through each selected branch and execute an insert query
        for (const branchID of selectedBranches) {
          const query = `INSERT INTO [dbo].[EarnDeductMasters]
               ([pn_CompanyID],[pn_BranchID],[Allowance1],[Allowance2],[Allowance3],[Allowance4],[Allowance5],[Allowance6],[Allowance7],[Allowance8],[Allowance9],[Allowance10],
               [Deduction1],[Deduction2],[Deduction3],[Deduction4],[Deduction5],[Deduction6],[Deduction7],[Deduction8],[Deduction9],[Deduction10])
            VALUES (
              ${transformedData.pn_CompanyID}, ${branchID},
              ${Array(10).fill(0).map((_, i) => `'${transformedData[`Allowance${i + 1}`]}'`).join(", ")},
              ${Array(10).fill(0).map((_, i) => `'${transformedData[`Deduction${i + 1}`]}'`).join(", ")})`;
  
          const response = await postRequest(ServerConfig.url, SAVE, { query });
  
          if (response.status === 200) {
            console.log(`Data saved successfully for branch ${branchID}`);
          } else {
            console.error(`Error saving data for branch ${branchID}:`, response.statusText);
          }
        }
      }
  
      // Fetch data for selected branches and company ID
      if (selectedBranches.length > 0) {
        // Create a list of branch IDs for the query
        const branchIDs = selectedBranches.join(", ");
  
        // SQL query to fetch data based on company ID and selected branches
        const fetchQuery = `SELECT * FROM earndeductmasters 
                            WHERE pn_CompanyID = ${loggedCompany[0].pn_CompanyID} 
                            AND pn_BranchID IN (${branchIDs})`;
  
        const fetchearndeductmasters = await postRequest(ServerConfig.url, REPORTS, { query: fetchQuery });
  
        setFetchedData(fetchearndeductmasters.data); // Set the fetched data
        console.log("fetchedmasters", fetchearndeductmasters);
      } else {
        console.log("No branches selected for fetching data.");
      }
    } catch (error) {
      console.error("Error occurred during save:", error);
    }
  };
  

  const handleDone = () => {
    // Show confirmation alert before proceeding
    confirmAlert({
      title: 'Confirm Submission',
      message: 'Are you sure you want to submit these allowances and deductions?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // Proceed with the submission after user confirms
            saveData();
          }
        },
        {
          label: 'No',
          onClick: () => {
            // User canceled, do nothing
          }
        }
      ]
    });
  };
  
  const saveData = async () => {
    const allowanceValues = [...Array(10)].map((_, i) => {
      const allowance = fetchedData[0][`Allowance${i + 1}`];
      return allowance && allowance !== "null"
        ? checkedAllowances[i]
          ? "'Y'"
          : "'N'"
        : 'null';
    });
  
    const deductionValues = [...Array(10)].map((_, i) => {
      const deduction = fetchedData[0][`Deduction${i + 1}`];
      return deduction && deduction !== "null"
        ? checkedDeductions[i]
          ? "'Y'"
          : "'N'"
        : 'null';
    });
  
    const queryValues = [
      ...allowanceValues,
      ...deductionValues
    ].join(',');
  
    const branchIDs = fetchedData.map(item => item.pn_BranchID);
  
    try {
      await Promise.all(
        branchIDs.map(branchID => 
          postRequest(ServerConfig.url, SAVE, {
            query: `INSERT INTO [dbo].[ProRataBasisMasters] 
              ([pn_CompanyID], [pn_BranchID], [Allowance1PRB], [Allowance2PRB], [Allowance3PRB], [Allowance4PRB], 
               [Allowance5PRB], [Allowance6PRB], [Allowance7PRB], [Allowance8PRB], [Allowance9PRB], [Allowance10PRB], 
               [Deduction1PRB], [Deduction2PRB], [Deduction3PRB], [Deduction4PRB], [Deduction5PRB], [Deduction6PRB], 
               [Deduction7PRB], [Deduction8PRB], [Deduction9PRB], [Deduction10PRB])
            VALUES (${loggedCompany[0].pn_CompanyID}, ${branchID}, ${queryValues})`
          })
        )
      );
      
      // Show success message after successful submission
      confirmAlert({
        title: 'Success',
        message: 'Data saved successfully!',
        buttons: [
          {
            label: 'OK',
            onClick: () => {}
          }
        ]
      });
  
    } catch (error) {
      console.error("Error saving data: ", error);
      confirmAlert({
        title: 'Error',
        message: 'There was an error saving the data.',
        buttons: [
          {
            label: 'OK',
            onClick: () => {}
          }
        ]
      });
    }
  };
  
  
  

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const addAllowanceField = () => {
    if (allowanceCount < 10) {
      setAllowanceCount(allowanceCount + 1);
    }
  };

  const addDeductionField = () => {
    if (deductionCount < 10) {
      setDeductionCount(deductionCount + 1);
    }
  };

  if (fetchedData) {
    return (
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            ProRataBasis Masters
          </Typography>
          <Typography className="animated-message" gutterBottom>
          Exclude the allowances and deductions that you dont want to include for Pro rata basis 
          </Typography>
          <Grid container spacing={3}>
            {/* Allowances Section */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Allowances
              </Typography>
              <Box
                sx={{
                  border: "1px solid black",
                  p: 2,
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {[...Array(10)].map((_, i) => {
                  const allowance = fetchedData[0][`Allowance${i + 1}`];
                  return allowance && allowance !== "null" ? (
                    <Box
                      key={`fetched-allowance-${i}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="body1">{allowance}</Typography>
                      <Switch 
                      color="primary"
                        checked={checkedAllowances[i]} 
                        onChange={() => handleCheckboxChange(i, 'allowances')} 
                        id={`allowance-switch-${i + 1}`} 
                      />
                    </Box>
                  ) : null;
                })}
              </Box>
            </Grid>
            {/* Deductions Section */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ textAlign: "center", fontWeight: "bold" }}
              >
                Deductions
              </Typography>
              <Box
                sx={{
                  border: "1px solid black",
                  p: 2,
                  minHeight: "150px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {[...Array(10)].map((_, i) => {
                  const deduction = fetchedData[0][`Deduction${i + 1}`];
                  return deduction && deduction !== "null" ? (
                    <Box
                      key={`fetched-deduction-${i}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body1">{deduction}</Typography>
                      <Switch 
                     
                      color="primary"
                        checked={checkedDeductions[i]} 
                        onChange={() => handleCheckboxChange(i, 'deductions')} 
                        id={`deduction-switch-${i + 1}`} 
                      />
                    </Box>
                  ) : null;
                })}
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 4 }}>
            <Grid item>
              <button type="button" onClick={handleDone} className="btn btn-primary btn-sm">
                Done
              </button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }

  return (
    <Grid container>
    {/* Navbar and Sidebar */}
    <Grid item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "50px 50px 50px 50px"  }}>

    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Allowance and Deductions Master
        </Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Allowances" />
          <Tab label="Deductions" />
        </Tabs>
        <form>
          <Box sx={{ mt: 3 }}>
            {tabIndex === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="CompanyName"
                    value={
                      loggedCompany.length > 0 ? loggedCompany[0].CompanyName : ""
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
  <div style={{ width: "200px", position: "relative" }}>
    <label
      htmlFor="Branch"
      style={{
        position: "absolute",
        top: "-10px",
        left: "10px",
        backgroundColor: "white",
        padding: "0 4px",
        zIndex: 1,
      }}
    >
      Branch
    </label>
    <Select
      id="Branch"
      name="Branch"
      options={branchOptions}
      isMulti
      onChange={handleBranchChange}
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: state.hasValue ? "auto" : "55px", // Adjust height dynamically
          padding: "10px",
          width: "189%",
          flexWrap: "wrap", // Allow the values to wrap into multiple lines
        }),
        valueContainer: (base) => ({
          ...base,
          display: "flex",
          flexWrap: "wrap", // Ensure values wrap to new lines
          alignItems: "flex-start", // Align selected values at the top
        }),
        multiValue: (base) => ({
          ...base,
          margin: "2px", // Adjust margins for better spacing
        }),
      }}
    />
  </div>
</Grid>

               

                {[...Array(allowanceCount)].map((_, i) => (
                  <Grid item xs={12} sm={4} key={`allowance${i + 1}`}>
                    <TextField
                      fullWidth
                      label={`Allowance ${i + 1}`}
                      name={`Allowance${i + 1}`}
                      value={formData[`Allowance${i + 1}`] || ""}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={addAllowanceField}
                    disabled={allowanceCount >= 10}
                  >
                    Add
                  </Button>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setTabIndex(1)}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}

            {tabIndex === 1 && (
              <Grid container spacing={3}>
                {[...Array(deductionCount)].map((_, i) => (
                  <Grid item xs={12} sm={4} key={`deduction${i + 1}`}>
                    <TextField
                      fullWidth
                      label={`Deduction ${i + 1}`}
                      name={`Deduction${i + 1}`}
                      value={formData[`Deduction${i + 1}`] || ""}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={addDeductionField}
                    disabled={deductionCount >= 10}
                  >
                    Add
                  </Button>
                </Grid>

                <Grid container spacing={2} sx={{ justifyContent: "flex-end" }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setTabIndex(0)}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>
    
  );
};

export default EarnDeductCompanyMasters;

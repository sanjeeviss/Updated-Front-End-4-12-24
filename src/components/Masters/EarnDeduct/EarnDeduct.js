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
import { postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { REPORTS, SAVE } from "../../../serverconfiguration/controllers";
import { Checkbox } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
// import './Styles.css';
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EarnDeductMastersss = () => {
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
  const [loggedBranch, setloggedBranch] = useState([]);
  const [loggedCompany, setloggedCompany] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [allowanceCount, setAllowanceCount] = useState(4);
  const [deductionCount, setDeductionCount] = useState(4);
  const [fetchedData, setFetchedData] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);
  const [checkedAllowances, setCheckedAllowances] = useState(Array(10).fill(false));
const [checkedDeductions, setCheckedDeductions] = useState(Array(10).fill(false));

const handleCheckboxChange = (index, type) => {
  if (type === 'allowances') {
    const newChecked = [...checkedAllowances];
    newChecked[index] = !newChecked[index];
    setCheckedAllowances(newChecked);
  } else {
    const newChecked = [...checkedDeductions];
    newChecked[index] = !newChecked[index];
    setCheckedDeductions(newChecked);
  }
};


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from paym_Branch where Branch_User_Id = '${isloggedin}'`,
        });
  
        if (loggedBranchData.data) {
          setloggedBranch(loggedBranchData.data);
  
          // Dynamically set pn_BranchID based on the fetched data
          setFormData((prevData) => ({
            ...prevData,
            pn_BranchID: loggedBranchData.data[0].pn_BranchID,
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
    async function fetchLoggedCompany() {
      try {
        if (loggedBranch.length > 0) {
          const loggedCompanyData = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_Company where pn_CompanyID = ${loggedBranch[0].pn_CompanyID}`,
          });
  
          if (loggedCompanyData.data) {
            setloggedCompany(loggedCompanyData.data);
  
            // Dynamically set pn_CompanyID based on the fetched data
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
  
    // Fetch company data when loggedBranch is available
    if (loggedBranch.length > 0) {
      fetchLoggedCompany();
    }
  }, [loggedBranch]);
  
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

      // SQL Insert Query
      const query = `
        INSERT INTO [dbo].[EarnDeductMasters] (
          [pn_CompanyID], [pn_BranchID], [Allowance1], [Allowance2], [Allowance3], [Allowance4], [Allowance5], [Allowance6], [Allowance7], [Allowance8], [Allowance9], [Allowance10],
          [Deduction1], [Deduction2], [Deduction3], [Deduction4], [Deduction5], [Deduction6], [Deduction7], [Deduction8], [Deduction9], [Deduction10],
          [Allowance1PRB], [Allowance2PRB], [Allowance3PRB], [Allowance4PRB], [Allowance5PRB], [Allowance6PRB], [Allowance7PRB], [Allowance8PRB], [Allowance9PRB], [Allowance10PRB],
          [Deduction1PRB], [Deduction2PRB], [Deduction3PRB], [Deduction4PRB], [Deduction5PRB], [Deduction6PRB], [Deduction7PRB], [Deduction8PRB], [Deduction9PRB], [Deduction10PRB]
        )
        VALUES (
          ${transformedData.pn_CompanyID}, ${transformedData.pn_BranchID},
          ${Array(10)
            .fill(0)
            .map((_, i) => `'${transformedData[`Allowance${i + 1}`]}'`)
            .join(", ")},
          ${Array(10)
            .fill(0)
            .map((_, i) => `'${transformedData[`Deduction${i + 1}`]}'`)
            .join(", ")},
          null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null,null,null,null
        )
      `;

      // Save the data
      const response = await postRequest(ServerConfig.url, SAVE, { query });

      if (response.status === 200) {
        console.log("Data saved successfully");

        // Fetch earndeductmasters using loggedBranch[0].pn_CompanyID
        const fetchearndeductmasters = await postRequest(
          ServerConfig.url,
          REPORTS,
          {
            query: `SELECT * FROM earndeductmasters WHERE pn_BranchID = ${loggedBranch[0].pn_BranchID}`,
          }
        );
        setFetchedData(fetchearndeductmasters.data); // Set the fetched data
        console.log("fetchedmasters", fetchearndeductmasters);
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred during save:", error);
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

  const handleDone = async () => {
    try {
      const includedAllowances = [];
      const notIncludedAllowances = [];
      const includedDeductions = [];
      const notIncludedDeductions = [];

      // Loop through all allowances
      for (let i = 1; i <= 10; i++) {
        const allowance = fetchedData[0][`Allowance${i}`];
        if (allowance && allowance !== "null") {
          const checkbox = document.querySelector(`#allowance-checkbox-${i}`);
          if (checkbox) {
            const isChecked = checkbox.checked;
            const inclusionStatus = isChecked ? "Included" : "Not Included";

            // Log the status for debugging
            if (isChecked) {
              includedAllowances.push(`Allowance${i}PRB: ${allowance.trim()}`);
            } else {
              notIncludedAllowances.push(`Allowance${i}PRB: ${allowance.trim()}`);
            }

            // Update query for Allowance
            const updateQuery = `
              UPDATE EarnDeductMasters 
              SET Allowance${i}PRB = '${inclusionStatus}'
              WHERE Allowance${i} = '${allowance.trim()}' 
              AND pn_BranchID = ${loggedBranch[0].pn_BranchID}
            `;

            // Execute the query
            await postRequest(ServerConfig.url, SAVE, { query: updateQuery });
          }
        }
      }

      // Loop through all deductions
      for (let i = 1; i <= 10; i++) {
        const deduction = fetchedData[0][`Deduction${i}`];
        if (deduction && deduction !== "null") {
          const checkbox = document.querySelector(`#deduction-checkbox-${i}`);
          if (checkbox) {
            const isChecked = checkbox.checked;
            const inclusionStatus = isChecked ? "Included" : "Not Included";

            // Log the status for debugging
            if (isChecked) {
              includedDeductions.push(`Deduction${i}PRB: ${deduction.trim()}`);
            } else {
              notIncludedDeductions.push(`Deduction${i}PRB: ${deduction.trim()}`);
            }

            // Update query for Deduction
            const updateQuery = `
              UPDATE EarnDeductMasters 
              SET Deduction${i}PRB = '${inclusionStatus}'
              WHERE Deduction${i} = '${deduction.trim()}' 
              AND pn_BranchID = ${loggedBranch[0].pn_BranchID}
            `;

            // Execute the query
            await postRequest(ServerConfig.url, SAVE, { query: updateQuery });
          }
        }
      }

      // Console logs for debugging
      confirmAlert({
        title: 'Success',
        message: 'Allowances and deductions updated successfully. You can now assign values and map them to the employee in the next section.',
        buttons: [
          {
            label: 'OK',
            onClick: () => {
              navigate('/EarnDeductValueMaters')
            }
          }
        ]
      });
  
    } catch (error) {
      console.error("Error occurred during updating status:", error);
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
          <Typography className="animated-message" gutterBottom >
          Select the allowances and deductions that you want to include for Pro rata basis 
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

                      <Checkbox 
  checked={checkedAllowances[i]} 
  onChange={() => handleCheckboxChange(i, 'allowances')} 
  id={`allowance-checkbox-${i + 1}`} 
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
    justifyContent: "space-between" // Add this line
  }}>
                     
                      <Typography variant="body1">{deduction}</Typography>
                      <Checkbox 
  checked={checkedDeductions[i]} 
  onChange={() => handleCheckboxChange(i, 'deductions')} 
  id={`deduction-checkbox-${i + 1}`} 
/>

                    </Box>
                  ) : null;
                })}
              </Box>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" spacing={2} sx={{ mt: 4 }}>
  <Grid item>
    <button className="btn btn-outline-primary" onClick={handleDone}>
      Done
    </button>
  </Grid>
</Grid>
        </Paper>
      </Container>
    );
  }

  return (
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
                    label="Company Name"
                    name="CompanyName"
                    value={
                      loggedCompany.length > 0
                        ? loggedCompany[0].CompanyName
                        : ""
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Branch Name"
                    name="BranchName"
                    value={
                      loggedBranch.length > 0 ? loggedBranch[0].BranchName : ""
                    }
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                {[...Array(allowanceCount)].map((_, i) => (
                  <Grid item xs={12} sm={3} key={`allowance${i + 1}`}>
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
                  <Grid item xs={12} sm={3} key={`deduction${i + 1}`}>
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
  );
};

export default EarnDeductMastersss;

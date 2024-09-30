import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
  SAVE,
} from "../../../serverconfiguration/controllers";

const HolidayForm1 = () => {
  const [formData, setFormData] = useState({
    pn_CompanyID: "",
    pn_BranchID: "",
    pn_Holidaycode: "",
    pn_Holidayname: "",
    Fyear: "",
    From_date: "",
    To_date: "",
    days: "",
  });

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_holiday]
                   ([pn_CompanyID]
                   ,[pn_BranchID]
                   ,[pn_Holidaycode]
                   ,[pn_Holidayname]
                   ,[Fyear]
                   ,[From_date]
                   ,[To_date]
                   ,[days])
                VALUES
                   (${formData.pn_CompanyID}
                   ,${formData.pn_BranchID}
                   ,'${formData.pn_Holidaycode}'
                   ,'${formData.pn_Holidayname}'
                   ,${formData.Fyear}
                   ,'${formData.From_date}'
                   ,'${formData.To_date}'
                   ,${formData.days})`,
      });

      if (response.status === 200) {
        alert("Data saved successfully");
        // Additional logic if needed, e.g., navigate to another page
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data");
    }
  };

  const handleReset = () => {
    setFormData({
      pn_CompanyID: "",
      pn_BranchID: "",
      pn_Holidaycode: "",
      pn_Holidayname: "",
      Fyear: "",
      From_date: "",
      To_date: "",
      days: "",
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={2} mb={4}>
        Holiday Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={3}
          style={{
            padding: 20,
            margin: "100px",
            maxWidth: "auto",
            height: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Grid container spacing={2}>
            {/* Form Fields */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="company-select-label">Company Name</InputLabel>
                <Select
                  labelId="company-select-label"
                  name="pn_CompanyID"
                  value={formData.pn_CompanyID}
                  onChange={handleChange}
                  label="Company ID"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {companies.map((company) => (
                    <MenuItem
                      key={company.pnCompanyId}
                      value={company.pnCompanyId}
                    >
                      {company.companyName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="branch-select-label">Branch Name</InputLabel>
                <Select
                  labelId="branch-select-label"
                  name="pn_BranchID"
                  value={formData.pn_BranchID}
                  onChange={handleChange}
                  label="Branch ID"
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {branches
                    .filter(
                      (branch) => branch.pnCompanyId === formData.pn_CompanyID
                    )
                    .map((branch) => (
                      <MenuItem
                        key={branch.pnBranchId}
                        value={branch.pnBranchId}
                      >
                        {branch.branchName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Additional Form Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="pn_Holidaycode"
                label="Holiday Code"
                value={formData.pn_Holidaycode}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="pn_Holidayname"
                label="Holiday Name"
                value={formData.pn_Holidayname}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="Fyear"
                label="Calendar Year"
                type="number"
                value={formData.Fyear}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="From_date"
                label="From Date"
                type="date"
                value={formData.From_date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="To_date"
                label="To Date"
                type="date"
                value={formData.To_date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="days"
                label="Days"
                type="number"
                value={formData.days}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          <Grid item xs={12} mt={3}>
            <Button
              onClick={handleReset}
              variant="contained"
              color="secondary"
              style={{ marginTop: "20px" }}
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", marginLeft: "50px" }}
            >
              Submit
            </Button>
          </Grid>
        </Paper>
      </form>
    </Container>
  );
};

export default HolidayForm1;
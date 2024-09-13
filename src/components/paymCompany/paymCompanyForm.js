import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
} from "@mui/material";
import { useState } from "react";

import { inputpaymCompanyForm } from "./paymCompany";
import { PAYMCOMPANIES } from "../../serverconfiguration/controllers";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

const CompanyForm = () => {
  const navigate = useNavigate();

  const margin = { margin: "0 5px" };

  const [formData, setFormData] = useState({
    pnCompanyId: 0,
    companyCode: "",
    companyName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
    country: "",
    state: "",
    phoneNo: "",
    faxNo: "",
    emailId: "",
    alternateEmailId: "",
    pfno: "",
    esino: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData);
      const response = await postRequest(
        ServerConfig.url,
        PAYMCOMPANIES,
        formData
      );
      if (response.status === 200 || response.status === 201) {
        console.log("Data saved successfully!");
        navigate("/PaycompanyTable");
      } else {
        console.error("Error saving data:", response.statusText);
        console.error("Server validation errors:", response);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  function handleon2click() {
    navigate("/Setup");
  }
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: 20 }}>
          <CardContent>
            <Typography
              variant="h5"
              color="textPrimary"
              align="center"
              gutterBottom>
              PAYMCOMPANY Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {inputpaymCompanyForm.map((input) => (
                  <Grid item xs={12} key={input.name}>
                    <TextField
                      fullWidth
                      {...input}
                      value={formData[input.name]}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Grid container justifyContent="flex-end" style={{ margin: 20 }}>
                <Button
                  style={margin}
                  type="reset"
                  variant="contained"
                  color="primary">
                  RESET
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={margin}>
                  Save
                </Button>
                <Button
                  style={margin}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleon2click}>
                  Cancel
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CompanyForm;

import React, { useState } from "react";
import { postRequest, getRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Typography,
  Grid,
  CardContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DatePicker } from "@mui/lab"; // Import DatePicker component
//import { inputFormElements17 } from './salaryperiod';
import { JOBSTATUS, YEAREND } from "../../serverconfiguration/controllers";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
} from "../../serverconfiguration/controllers";
import { decryptData } from "../Authentication/encryption";

const JobStatusForm = () => {
  const navigate = useNavigate();
  const margin = { margin: "0 5px" };
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [companyid, setCompanyid] = useState("");
  const [branchid, setBranchid] = useState("");
  const [pnJobStatusId, setPnJobStatusId] = useState("");
  const [vJobStatusName, setVJobStatusName] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: companyid,
      pnBranchId: branchid,
      pnJobStatusId: pnJobStatusId,
      vJobStatusName: vJobStatusName,
      status: status,
      PnCompany: {
        pnCompanyId: companyid,
      },
    };
  };

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);

      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
      console.log(data1);
    }
    getData();
  }, []);

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
              Job status
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="PnCompanyid"
                      onChange={(e) => {
                        setCompanyid(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {company.map((e) => (
                        <option>{e.pnCompanyId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select
                      name="PnBranchid"
                      onChange={(e) => {
                        setBranchid(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {branch.map((e) => (
                        <option>{e.pnBranchId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="pnJobStatusId"
                      label="pnJobStatusId"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setPnJobStatusId(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="vJobStatusName"
                      label="vJobStatusName"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setVJobStatusName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="status"
                      label="status"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                justifyContent="flex-end"
                style={{ marginTop: 20 }}>
                <Button
                  style={margin}
                  type="reset"
                  variant="outlined"
                  color="primary">
                  RESET
                </Button>
                <Button
                  onClick={() => {
                    const formData = {
                      pnCompanyId: companyid,
                      pnBranchId: branchid,

                      vJobStatusName: vJobStatusName,
                      status: status,
                      pnCompany: {
                        pnCompanyId: companyid,
                      },
                    };
                    console.log(formData);
                    postRequest(ServerConfig.url, JOBSTATUS, formData)
                      .then((e) => {
                        console.log(e);
                        navigate("/PaymJobStatusTable");
                      })
                      .catch((e) => console.log(e));
                  }}
                  variant="contained"
                  color="primary">
                  SAVE
                </Button>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default JobStatusForm;

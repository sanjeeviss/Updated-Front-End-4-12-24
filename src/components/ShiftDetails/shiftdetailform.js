import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Grid,
  CardContent,
  FormControl,
} from "@mui/material";
import { inputFormElements14 } from "./shiftdetail";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
} from "../../serverconfiguration/controllers";

import React, { useState, useEffect } from "react";
import { FormData } from "@mui/material";

// import {  Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';

import { SHIFTDETAILS } from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { Label } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ServerConfig } from "../../serverconfiguration/serverconfig";

const DetailsForm = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [companyid, setCompanyid] = useState("");
  const [branchid, setBranchid] = useState("");
  const [shiftCode, setShiftCode] = useState("");
  const [startTime, setStarTime] = useState("");
  const [breakTimeIn, setBreaktimein] = useState("");
  const [breakTimeOut, setBreaktimeout] = useState("");
  const [endTime, setEndtime] = useState("");
  const [shiftIndicator, setShiftindicator] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyid: companyid,
      pnBranchid: branchid,
      shiftCode: shiftCode,
      startTime: startTime, // Added employee name field to state
      breakTimeOut: breakTimeOut,
      breakTimeIn: breakTimeIn,
      endTime: endTime,
      shiftIndicator: shiftIndicator,
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

  const margin = { margin: "0 5px" };

  function handleclick20() {
    navigate("/Shiftpattern007");
  }
  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              Shift Detail
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paddingBottom={"20px"}>
              Fill all the Mandatory fields
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
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
                      name="pnBranchId"
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
                    <InputLabel shrink>ShiftCode</InputLabel>
                    <TextField
                      name="ShiftCode"
                      label="ShifrCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftCode(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>StartTime</InputLabel>
                    <TextField
                      name="StartTime"
                      label="StartTime"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setStarTime(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BreakTimeIn</InputLabel>
                    <TextField
                      name="BreakTimeIn"
                      label="BreakTimeIn"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setBreaktimein(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BreakTimeOut</InputLabel>
                    <TextField
                      name="BreakTimeOut"
                      label="BreakTimeOut"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setBreaktimeout(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>EndTime</InputLabel>
                    <TextField
                      name="EndTime"
                      label="EndTime "
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setEndtime(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>ShiftIndicator</InputLabel>
                    <TextField
                      name="shiftIndicator"
                      label="shiftIndicator "
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftindicator(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                {inputFormElements14.map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    {/* <TextField {...input}  InputLabelProps={{shrink:true}}/>  */}
                  </Grid>
                ))}
              </Grid>
              <Grid container spacing={1} paddingTop={"20px"}>
                <Grid item xs={12} align="right">
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
                        pnCompanyid: companyid,
                        pnBranchid: branchid,
                        shiftCode: shiftCode,
                        startTime: startTime, // Added employee name field to state
                        breakTimeOut: breakTimeOut,
                        breakTimeIn: breakTimeIn,
                        endTime: endTime,
                        shiftIndicator: shiftIndicator,
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, SHIFTDETAILS, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/ShiftDetailsTable");
                        })
                        .catch((e) => console.log(e));
                    }}
                    variant="contained"
                    color="primary">
                    SAVE
                  </Button>
                  <Button
                    style={margin}
                    type="reset"
                    variant="outlined"
                    color="primary"
                    onClick={handleclick20}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
export default DetailsForm;

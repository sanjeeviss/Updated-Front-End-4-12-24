import { inputFormElements12 } from "./shiftpattern";
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
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
  SHIFTPATTERN,
} from "../../serverconfiguration/controllers";

import React, { useState, useEffect } from "react";
import { FormData } from "@mui/material";

// import {  Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';

import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { Label } from "@mui/icons-material";
import { useNavigate, navigate } from "react-router-dom";
import { ServerConfig } from "../../serverconfiguration/serverconfig";

const Sample12 = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [companyid, setCompanyid] = useState("");
  const [branchid, setBranchid] = useState("");
  const [patternCode, setPatterncode] = useState("");
  const [shiftCode1, setShiftcode1] = useState("");
  const [days1, setDays1] = useState("");

  const [shiftCode2, setShiftcode2] = useState("");
  const [days2, setDays2] = useState("");
  const [shiftCode3, setShiftcode3] = useState("");
  const [days3, setDays3] = useState("");
  const [shiftCode4, setShiftcode4] = useState("");
  const [days4, setDays4] = useState("");
  const [shiftCode5, setShiftcode5] = useState("");
  const [days5, setDays5] = useState("");
  const [shiftCode6, setShiftcode6] = useState("");
  const [days6, setDays6] = useState("");
  const [shiftCode7, setShiftcode7] = useState("");
  const [days7, setDays7] = useState("");
  const [shiftCode8, setShiftcode8] = useState("");
  const [days8, setDays8] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyid: companyid,
      pnBranchid: branchid,
      patternCode: patternCode,
      shiftCode1: shiftCode1, // Added employee name field to state
      days1: days1,
      shiftCode2: shiftCode2,
      days2: days2,
      shiftCode3: shiftCode3,
      days3: days3,
      shiftCode4: shiftCode4,
      days4: days4,
      shiftCode5: shiftCode5,
      days5: days5,
      shiftCode6: shiftCode6,
      days6: days6,
      shiftCode7: shiftCode7,
      days7: days7,
      shiftCode8: shiftCode8,
      days8: days8,
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

  function handleclick20() {
    navigate("/Shiftpatterns0009");
  }

  const margin = { margin: "0 5px" };
  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              ShiftPattern
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
                      name="patternCode"
                      label="PatternCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPatterncode(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode1"
                      label="ShiftCode1"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode1(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days1"
                      label="Days1"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays1(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode2"
                      label="ShiftCode2"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode2(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days2"
                      label="Days2"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays2(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode3"
                      label="ShiftCode3"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode3(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days3"
                      label="Days3"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays3(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode4"
                      label="ShiftCode4"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode4(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days4"
                      label="Days4"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays4(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode5"
                      label="ShiftCode5"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode5(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days5"
                      label="Days5"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays5(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode6"
                      label="ShiftCode6"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode6(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days6"
                      label="Days6"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays6(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode7"
                      label="ShiftCode7"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode7(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days7"
                      label="Days7"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays7(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="shiftCode8"
                      label="ShiftCode8"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setShiftcode8(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days8"
                      label="Days8"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays8(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid container spacing={2}>
                  {inputFormElements12.map((input) => (
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
                          patternCode: patternCode,
                          shiftCode1: shiftCode1, // Added employee name field to state
                          days1: days1,
                          shiftCode2: shiftCode2,
                          days2: days2,
                          shiftCode3: shiftCode3,
                          days3: days3,
                          shiftCode4: shiftCode4,
                          days4: days4,
                          shiftCode5: shiftCode5,
                          days5: days5,
                          shiftCode6: shiftCode6,
                          days6: days6,
                          shiftCode7: shiftCode7,
                          days7: days7,
                          shiftCode8: shiftCode8,
                          days8: days8,
                        };
                        console.log(formData);
                        postRequest(ServerConfig.url, SHIFTPATTERN, formData)
                          .then((e) => {
                            console.log(e);
                            navigate("/ShiftPatternTable");
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
                      Camcel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Sample12;

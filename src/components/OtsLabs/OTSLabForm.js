import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import { OTSLAB, PAYMEMPLOYEE } from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function OTSlabForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");

  const [otFrom, setOtFrom] = useState("");
  const [otTo, setOtTo] = useState("");
  const [otSlab1, setOtslab1] = useState("");
  const [pnCategory, setPnCategory] = useState("");
  const [otHrs, setOtHrs] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyid: company,
      pnBranchid: branch,
      empCode: employeeCode,
      empName: employeeName,

      otFrom: otFrom,
      otTo: otTo,
      otSlab1: otSlab1,
      pnCategory: pnCategory,
      otHrs: otHrs,
    };
    console.log(formData);
  };

  const margin = { margin: "0 5px" };
  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              OTSLAB
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {employee.map((e) => (
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
                        setBranch(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {employee
                        .filter((e) => e.pnCompanyId == company)
                        .map((e) => (
                          <option>{e.pnBranchId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>empCode</InputLabel>
                    <select
                      name="empCode"
                      onChange={(e) => {
                        var v = e.currentTarget.value;
                        var empname = employee.filter(
                          (e) => e.employeeCode == v
                        );
                        setEmployeeCode(v);
                        setEmployeeName(empname[0].employeeFullName);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>

                      {employee
                        .filter(
                          (e) =>
                            e.pnCompanyId == company && e.pnBranchId == branch
                        )
                        .map((e) => (
                          <option>{e.employeeCode}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="empName"
                      value={employeeName}
                      label="employeename"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otFrom"
                      type="time"
                      label="otFrom"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOtFrom(e.target.value + ":00.000")}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otTo"
                      label=" otTo"
                      variant="outlined"
                      type="time"
                      fullWidth
                      required
                      onChange={(e) => setOtTo(e.target.value + ":00.000")}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otSlab1"
                      label="otSlab1"
                      variant="outlined"
                      type="time"
                      fullWidth
                      required
                      onChange={(e) => setOtslab1(e.target.value + ":00.000")}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="pnCategory"
                      label="pnCategory"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPnCategory(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otHrs"
                      label="otHrs"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOtHrs(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={"10px"}>
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
                        pnCompanyid: company,
                        pnBranchid: branch,
                        otFrom: otFrom,
                        otTo: otTo,
                        otSlab1: otSlab1,
                        pnCategory: pnCategory,
                        otHrs: otHrs,
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, OTSLAB, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/OtsLabTable");
                        })
                        .catch((e) =>
                          alert(
                            "Either form fields are blank or values are invalid ,or there is a network issue"
                          )
                        );
                    }}
                    variant="contained"
                    color="primary">
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

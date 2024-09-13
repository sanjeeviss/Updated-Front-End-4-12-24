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
import { inputFormElements13 } from "./shiftmonth";
import {
  SHIFTMONTH,
  PAYMEMPLOYEE,
  SHIFTDETAILS,
} from "../../serverconfiguration/controllers";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate, navigate } from "react-router-dom";
import { decryptData } from "../Authentication/encryption";

export default function Sample13() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState(
    decryptData(sessionStorage.getItem("company"))
  );
  const [branch, setBranch] = useState(
    decryptData(sessionStorage.getItem("branch"))
  );
  const [shiftdetails, setShiftDetails] = useState([]);

  const [employeeCode, setPnEmployeeCode] = useState("");
  const [employeeName, setPnEmployeeName] = useState("");
  const [shiftCode, setShiftCode] = useState("");
  const [monthyear, setMonthyear] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const shiftdata = await getRequest(ServerConfig.url, SHIFTDETAILS);
      setShiftDetails(shiftdata.data);
    }
    getData();

    console.log(branch);
    console.log(company);
    setBranch(branch);
    setCompany(company);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyid: company,
      pnBranchid: branch,
      pnEmployeeCode: employeeCode,
      pnEmployeeName: employeeName,
      monthyear: monthyear,
      date: date,
      shiftCode: shiftCode,

      // Add other form data here
    };
    console.log(formData);
  };

  const margin = { margin: "0 5px" };
  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              Shift Month
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paddingBottom={"20px"}>
              Fill all the Mandatory fields
            </Typography>

            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        // setCompany(e.target.value)
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
                        //setBranch(e.target.value)
                        setShiftDetails(
                          shiftdetails.filter(
                            (e) =>
                              e.pnBranchid == branch && e.pnCompanyid == company
                          )
                        );
                        console.log(shiftdetails);
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
                    <InputLabel shrink>pnEmployeeCode</InputLabel>
                    <select
                      name="pnEmployeeCode"
                      onChange={(e) => {
                        var v = e.currentTarget.value;
                        var empname = employee.filter(
                          (e) => e.employeeCode == v
                        );
                        setPnEmployeeCode(v);
                        setPnEmployeeName(empname[0].employeeFullName);
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
                      name="pnEmployeeName"
                      value={employeeName}
                      label="pnEmployeeName"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>shiftCode</InputLabel>
                    <select
                      name="shiftCode"
                      onChange={(e) => {
                        var s = e.currentTarget.value;
                        var shcode = shiftdetails.filter(
                          (e) => e.shiftCode == s
                        );
                        setShiftCode(shcode[0].shiftCode);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {shiftdetails.map((e) => (
                        <option>{e.shiftCode}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                {/* <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>shiftCode</InputLabel>
                    <TextField
                      value={shiftCode}
                      label="shiftcode"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </FormControl>
                </Grid> */}

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="monthyear"
                      label="monthyear"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMonthyear(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="date"
                      label="date"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid container spacing={2}>
                  {inputFormElements13.map((input) => (
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
                          pnCompanyid: company,
                          pnBranchid: branch,
                          pnEmployeeCode: employeeCode,
                          pnEmployeeName: employeeName,
                          monthyear: monthyear,
                          date: date,
                          shiftCode: shiftCode,
                          // Add other form data here
                        };
                        console.log(formData);
                        postRequest(ServerConfig.url, SHIFTMONTH, formData)
                          .then((e) => {
                            console.log(e);
                            navigate("/ShiftMonthTable");
                          })
                          .catch((e) => console.log(e));
                      }}
                      variant="contained"
                      color="primary">
                      SAVE
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
}

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
import {
  LEAVESETTLEMENT,
  PAYMEMPLOYEE,
  PAYMLEAVE,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";

import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function LeaveSettleForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState(sessionStorage.getItem("company"));
  const [branch, setBranch] = useState(sessionStorage.getItem("branch"));
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [paymLeave, setPaymLeave] = useState([]);
  const [pnLeaveId, setLeaveId] = useState("");
  const [vLeaveName, setLeaveName] = useState("");
  const [pnLeaveCode, setLeaveCode] = useState("");
  const [daysAllowed, setDaysAllowed] = useState("");
  const [daysTaken, setDaysTaken] = useState("");
  const [daysBalance, setDaysBalance] = useState("");
  const [ec, setEc] = useState("");
  const [cf, setCf] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [flag, setFlag] = useState("");
  const [calendarYear, setCalenderYear] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const paymleave = await getRequest(ServerConfig.url, PAYMLEAVE);
      setPaymLeave(paymleave.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: company,
      pnBranchId: branch,
      pnEmployeeId: pnEmployeeId,
      empCode: employeeCode,
      empName: employeeName,
      pnLeaveId: pnLeaveId,
      pnLeavename: vLeaveName,
      pnLeavecode: pnLeaveCode,
      daysAllowed: daysAllowed,
      daysTaken: daysTaken,
      daysBalance: daysBalance,
      ec: ec,
      cf: cf,
      maxDays: maxDays,
      flag: flag,
      calendarYear: calendarYear,
    };
    console.log(formData);
  };
  function handleon2click() {
    navigate("/Leavesettlement");
  }

  const margin = { margin: "0 5px" };
  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              Leave Settlement
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    {/* <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {employee.map((e) => (
                        <option>{e.pnCompanyId}</option>
                      ))}
                    </select> */}
                    <input type="text" value={company} disabled={true} />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    {/* <select
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
                    </select> */}
                    <input type="text" value={branch} disabled={true} />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>EmployeeId</InputLabel>
                    <select
                      name="pnEmployeeId"
                      onChange={(e) => {
                        setEmployeeId(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {employee
                        .filter(
                          (e) =>
                            e.pnCompanyId == company && e.pnBranchId == branch
                        )
                        .map((e) => (
                          <option>{e.pnEmployeeId}</option>
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

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>LeaveId</InputLabel>
                    <select
                      name="pnLeaveId"
                      onChange={(e) => {
                        setLeaveId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {paymLeave.map((e) => (
                        <option>{e.pnLeaveId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>pnLeaveCode</InputLabel>
                    <select
                      name="pnLeaveCode"
                      onChange={(e) => {
                        var v = e.currentTarget.value;
                        var leavename = paymLeave.filter(
                          (e) => e.pnLeaveCode == v
                        );
                        setLeaveCode(v);
                        setLeaveName(leavename[0].vLeaveName);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>

                      {paymLeave
                        .filter((e) => e.pnLeaveId == pnLeaveId)
                        .map((e) => (
                          <option>{e.pnLeaveCode}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="vLeaveName"
                      value={vLeaveName}
                      label="LeaveName"
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="daysAllowed"
                      label="daysAllowed"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDaysAllowed(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="daysTaken"
                      label="daysTaken"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDaysTaken(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="daysBalance"
                      label="daysBalance"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDaysBalance(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ec"
                      label="ec"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEc(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="cf"
                      label="cf"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCf(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="maxDays"
                      label="maxDays"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMaxDays(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="flag"
                      label="flag"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setFlag(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="calendarYear"
                      label="calendarYear"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCalenderYear(e.target.value)}
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
                        pnCompanyId: company,
                        pnBranchId: branch,
                        pnEmployeeId: pnEmployeeId,
                        empCode: employeeCode,
                        empName: employeeName,
                        pnLeaveId: pnLeaveId,
                        pnLeavename: vLeaveName,
                        pnLeavecode: pnLeaveCode,
                        daysAllowed: daysAllowed,
                        daysTaken: daysTaken,
                        daysBalance: daysBalance,
                        ec: ec,
                        cf: cf,
                        maxDays: maxDays,
                        flag: flag,
                        calendarYear: calendarYear,
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, LEAVESETTLEMENT, formData)
                        .then((e) => {
                          alert("data saved successfully");
                          navigate("/LeaveSettlementTable");
                        })
                        .catch((e) =>
                          alert(
                            "Either form fields are empty ,or values are invalid ,or you have a network issue!"
                          )
                        );
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
                    onClick={handleon2click}>
                    cancel
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

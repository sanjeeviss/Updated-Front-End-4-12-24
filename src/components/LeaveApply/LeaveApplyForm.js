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
  LEAVEAPPLY,
  PAYMEMPLOYEE,
  PAYMLEAVE,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { inputLeaveApplyForm } from "./LeaveApply";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../Authentication/encryption";
export default function LeaveAppForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState(
    decryptData(sessionStorage.getItem("company"))
  );
  const [branch, setBranch] = useState(
    decryptData(sessionStorage.getItem("branch"))
  );
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [paymLeave, setPaymLeave] = useState([]);
  const [pnLeaveId, setLeaveId] = useState("");
  const [vLeaveName, setLeaveName] = useState("");
  const [pnLeaveCode, setLeaveCode] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [fromStatus, setFromStatus] = useState("");
  const [toDate, setToDate] = useState("");
  const [status, setStatus] = useState("");
  const [days, setDays] = useState("");
  const [reason, setReason] = useState("");
  const [submittedDate, setSubmittedDate] = useState("");
  const [approve, setApprove] = useState("");
  const [reminder, setReminder] = useState("");
  const [priority, setPriority] = useState("");
  const [comments, setComments] = useState("");
  const [record, setRecord] = useState("");
  const [flag, setFlag] = useState("");
  const [yearend, setYearEnd] = useState("");

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
      fromDate: fromDate + ":00.000",
      fromStatus: fromStatus,
      toDate: toDate + ":00.000",
      status: status,
      days: days,
      reason: reason,
      submittedDate: submittedDate + ":00.000",
      approve: approve,
      reminder: reminder + ":00.000",
      priority: priority,
      comments: comments,
      record: record,
      flag: flag,
      yearend: yearend,
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
              Leave Apply
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    {/* <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 onChange={(e)=>{
                  setCompany(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {

                        employee.map((e)=><option>{e.pnCompanyId}</option>)
                        
                     }
                 </select> */}
                    <input type="text" value={company} disabled="true" />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    {/* <InputLabel shrink>BranchId</InputLabel>
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
                            e.pnCompanyId == company &&
                            e.pnBranchId == branch &&
                            e.pnEmployeeId == pnEmployeeId
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
                      name="fromDate"
                      label="fromDate"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      required
                      onChange={(e) => setFromDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="fromStatus"
                      label="fromStatus"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setFromStatus(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name=" toDate"
                      label=" toDate"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      required
                      onChange={(e) => setToDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
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
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name=" days"
                      label="days"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDays(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="reason"
                      label="reason"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="submittedDate"
                      label="submittedDate"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      required
                      onChange={(e) => setSubmittedDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="approve"
                      label="approve"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setApprove(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="reminder"
                      label="reminder"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      required
                      onChange={(e) => setReminder(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="priority"
                      label="priority"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPriority(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="comments"
                      label="comments"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setComments(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name=" record"
                      label="record"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setRecord(e.target.value)}
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
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="yearend"
                      label="yearend"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setYearEnd(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                {inputLeaveApplyForm.map((input) => (
                  <Grid xs={input.xs} sm={input.sm} item>
                    {/* <TextField {...input}  />  */}
                  </Grid>
                ))}
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
                        fromDate: fromDate,
                        fromStatus: fromStatus,
                        toDate: toDate,
                        status: status,
                        days: days,
                        reason: reason,
                        submittedDate: submittedDate,
                        approve: approve,
                        reminder: reminder,
                        priority: priority,
                        comments: comments,
                        record: record,
                        flag: flag,
                        yearend: yearend,
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, LEAVEAPPLY, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/LeaveApplyTable");
                        })
                        .catch((e) =>
                          alert(
                            "Either form fields are blank or invalid ,or  you are having issue with network!"
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

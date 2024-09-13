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
  PAYMEMPLOYEE,
  PAYMLEAVE,
  PAYMDESIGNATION,
  LEAVEAPPROVEMANAGER,
  PAYMLEAVEALLOCATION1,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { decryptData } from "../Authentication/encryption";
export default function LeaveAllocation1Form() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [paymLeave, setPaymLeave] = useState([]);
  const [pnLeaveId, setLeaveId] = useState("");
  const [nCount, setNCount] = useState("");
  const [cyCount, setCyCount] = useState("");
  const [leaveby, setLeaveby] = useState([]);
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
      pnEmployeeid: pnEmployeeId,
      pnLeaveId: pnLeaveId,
      nCount: nCount,
      cyCount: cyCount,
      leaveby: leaveby,
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
              Paym Leave Allocation
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    {/* <select name = "pnCompanyId" 
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
                    <input
                      type="text"
                      value={decryptData(sessionStorage.getItem("company"))}
                      disabled={true}
                    />
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
                    <input
                      type="text"
                      value={decryptData(sessionStorage.getItem("branch"))}
                      disabled={true}
                    />
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
                            e.pnCompanyId ==
                              sessionStorage.getItem("company") &&
                            e.pnBranchId == sessionStorage.getItem("branch")
                        )
                        .map((e) => (
                          <option>{e.pnEmployeeId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>LeaveId</InputLabel>
                    <select
                      name="pnLeaveid"
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
                    <TextField
                      name="nCount"
                      label="nCount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setNCount(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="cyCount"
                      label="cyCount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCyCount(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="leaveby"
                      label="leaveby"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setLeaveby(e.target.value)}
                      InputLabelProps={{ shrink: true }}
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
                        pnCompanyId: sessionStorage.getItem("company"),
                        pnBranchId: sessionStorage.getItem("branch"),
                        pnEmployeeid: pnEmployeeId,
                        pnLeaveId: pnLeaveId,
                        nCount: nCount,
                        cyCount: cyCount,
                        leaveby: leaveby,
                        yearend: yearend,
                      };
                      console.log(formData);
                      postRequest(
                        ServerConfig.url,
                        PAYMLEAVEALLOCATION1,
                        formData
                      )
                        .then((e) => {
                          console.log(e);
                          navigate("/Paymleaveallocation1Tables");
                        })
                        .catch((e) =>
                          alert(
                            "Either Form Fields as blank ,or you have not selected values from drop down ,or you are entering invalid values , or you are not connected to server ,please check again!"
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

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
  PAYMEARNING,
  PAYMEMPEARNING,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { inputpaymEmpEarningsForm } from "./paymEmpEarnings";

export default function PaymEmpEarningsForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [empEarnings, setEmpEarnings] = useState([]);
  const [pnBranchId, setPnBranchId] = useState("");

  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [pnEarningsId, setPnEarningsId] = useState("");
  const [pid, setPid] = useState("");
  const [nAmount, setNAmount] = useState("");
  const [dDate, setDate] = useState("");
  const [cEligible, setCEligible] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [flag, setFlag] = useState("");

  const formatTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  };

  // Handler for changing the date in the time picker
  const handleDateChange = (date, setter) => {
    const formattedTime = formatTime(date);
    console.log(formattedTime);
    console.log(date);
    setter(formattedTime);
  };

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const data2 = await getRequest(ServerConfig.url, PAYMEARNING);
      setEarnings(data2.data);
      const data1 = await getRequest(ServerConfig.url, PAYMEMPEARNING);
      setEmpEarnings(data1.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: pnCompanyId,
      pnBranchId: pnBranchId,
      pnEmployeeId: pnEmployeeId,
      pnEarningsId: pnEarningsId,
      pid: pid,
      nAmount: nAmount,
      dDate: dDate,
      cEligible: cEligible,
      fromDate: fromDate,
      toDate: toDate,
      flag: flag,
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
              Paym Emp Earning
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setPnCompanyId(e.target.value);
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
                        setPnBranchId(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {employee
                        .filter((e) => e.pnCompanyId == pnCompanyId)
                        .map((e) => (
                          <option>{e.pnBranchId}</option>
                        ))}
                    </select>
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
                            e.pnCompanyId == pnCompanyId &&
                            e.pnBranchId == pnBranchId
                        )
                        .map((e) => (
                          <option>{e.pnEmployeeId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Earnings</InputLabel>
                    <select
                      name="pnEarningsId"
                      onChange={(e) => {
                        setPnEarningsId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {earnings.map((e) => (
                        <option>{e.pnEarningsId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="pid"
                      label="pid"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPid(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="nAmount"
                      label="nAmount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setNAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name=" dDate"
                      label=" dDate"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      required
                      onChange={(e) =>
                        handleDateChange(new Date(e.target.value), setDate)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="cEligible"
                      label="cEligible"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCEligible(e.target.value)}
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
                      onChange={(e) =>
                        handleDateChange(new Date(e.target.value), setFromDate)
                      }
                      InputLabelProps={{ shrink: true }}
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
                      onChange={(e) =>
                        handleDateChange(new Date(e.target.value), setToDate)
                      }
                      InputLabelProps={{ shrink: true }}
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

                {inputpaymEmpEarningsForm.map((input) => (
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
                        pnCompanyId: pnCompanyId,
                        pnBranchId: pnBranchId,
                        pnEmployeeId: pnEmployeeId,
                        pnEarningsId: pnEarningsId,
                        pid: pid,
                        nAmount: nAmount,
                        dDate: new Date(dDate).toISOString(),
                        cEligible: cEligible,
                        cEligible: cEligible,
                        fromDate: new Date(fromDate).toISOString(), // Ensure proper date format
                        toDate: new Date(toDate).toISOString(),
                        flag: flag,
                        paymBranch: {
                          pnBranchId: pnBranchId,
                        },
                        paymEarnings: {
                          pnEarningsId: pnEarningsId,
                        },
                        paymEmployee: {
                          pnEmployeeid: pnEmployeeId,
                        },
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, PAYMEMPEARNING, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/PaymEmpEarningsTable");
                        })
                        .catch((e) => console.log(e));
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

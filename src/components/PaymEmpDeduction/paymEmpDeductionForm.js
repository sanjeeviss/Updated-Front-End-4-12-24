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
  PAYMEMPDEDUCTION,
  PAYMEMPLOYEE,
  PAYMDEDUCTION,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { inputpaymEmpDeductionForm } from "./paymEmpDeduction";

export default function EmpDeductionForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [deduction, setDeduction] = useState([]);
  const [empdeduction, setEmpdeduction] = useState([]);
  const [pnBranchId, setPnBranchId] = useState("");

  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [pnDeductionId, setPnDeductionId] = useState("");
  const [nAmount, setNAmount] = useState("");
  const [dDate, setDDate] = useState("");
  const [cEligible, setCEligible] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [periodCode, setPeriodCode] = useState("");

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
      const data2 = await getRequest(ServerConfig.url, PAYMDEDUCTION);
      setDeduction(data2.data);
      const data1 = await getRequest(ServerConfig.url, PAYMEMPDEDUCTION);
      setEmpdeduction(data1.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: company,
      pnBranchId: branch,
      pnEmployeeId: pnEmployeeId,
      nAmount: nAmount,
      dDate: dDate,
      cEligible: cEligible,
      fromDate: fromDate + ":00.000",
      toDate: toDate + ":00.000",
      periodCode: periodCode,
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
              EMP DEDUCTION
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
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Deduction</InputLabel>
                    <select
                      name="pnDeductionId"
                      onChange={(e) => {
                        setPnDeductionId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {deduction.map((e) => (
                        <option>{e.pnDeductionId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>
                {/* <Grid xs={12} sm={6} item>
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
                </Grid> */}

                {/* <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name=" dDate"
                      label=" dDate"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      required
                      onChange={(e) =>
                        handleDateChange(new Date(e.target.value), setDDate)
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid> */}
                {/* <Grid xs={12} sm={6} item>
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
                </Grid> */}

                {/* <Grid xs={12} sm={6} item>
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
                </Grid> */}
                {/* <Grid xs={12} sm={6} item>
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
                </Grid> */}

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="periodCode"
                      label="periodCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPeriodCode(e.target.value)}
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
                        pnDeductionId: pnDeductionId,
                        nAmount: 0,
                        dDate: new Date(), // Ensure proper date format
                        cEligible: "Y",
                        fromDate: new Date(), // Ensure proper date format
                        toDate: new Date(),
                        periodCode: periodCode,
                        PaymBranch: {
                          pnCompany: {
                            pnCompanyId: company,
                          },
                          pnBranchId: branch,
                        },
                        PaymDeduction: {
                          pnCompany: {
                            pnCompanyId: company,
                          },
                          pnDeductionId: pnDeductionId,
                          VDeductionCode: "",
                          VDeductionName: "",
                        },
                        PaymEmployee: {
                          PaymBranch: {
                            pnCompany: {
                              pnCompanyId: company,
                            },
                            pnBranchId: branch,
                          },
                          pnEmployee: pnEmployeeId,
                        },
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, PAYMEMPDEDUCTION, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/PaymEmpDeductionTable");
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

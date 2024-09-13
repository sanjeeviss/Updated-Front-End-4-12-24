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
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import {
  PAYMEMPLOYEE,
  SHIFTDETAILS,
  DAILYTIMECARD,
} from "../../serverconfiguration/controllers";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { inputDailyTimecardForm } from "./DailyTimeCard";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { decryptData } from "../Authentication/encryption";
function validate(formData) {
  console.log(formData.shiftCode);
}
function DailyTimeCardForm(props) {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState(
    decryptData(sessionStorage.getItem("company"))
  );
  const [branch, setBranch] = useState(
    decryptData(sessionStorage.getItem("branch"))
  );
  const [employeeCode, setEmployeeCode] = useState(props.state.company);
  const [employeeName, setEmployeeName] = useState("");
  const [shiftdetails, setShiftDetails] = useState([]);
  const [shiftCode, setShiftCode] = useState("");
  const [machineNum, setMachineNum] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [verifyMode, setVerifyMode] = useState("");
  const [inOutMode, setInOutMode] = useState("");
  const [dates, setDates] = useState("");
  const [days, setDays] = useState("");
  const [intime, setInTime] = useState("");
  const [breakOut, setBreakOut] = useState("");
  const [breakIn, setBreakIn] = useState("");
  const [outtime, setOutTime] = useState("");
  const [otHrs, setOtHrs] = useState("");
  const [status, setStatus] = useState("");
  console.log(props.state);
  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const shiftdetails = await getRequest(ServerConfig.url, SHIFTDETAILS);
      setShiftDetails(shiftdetails.data);
    }
    getData()
      .then((e) => console.log(e))
      .catch((e) => {
        window.location.href = "http://localhost:3000";
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("intime:", intime);
    console.log(formData);
    const formData = {
      pnCompanyid: company,
      pnBranchid: branch,
      machineNum: machineNum,
      cardNo: cardNo,
      empCode: employeeCode,
      empName: employeeName,
      verifyMode: verifyMode,
      inOutMode: inOutMode,
      shiftCode: shiftCode,
      dates: dates,
      days: days,
      intime: intime,
      breakOut: breakOut,
      breakIn: breakIn,
      outtime: outtime,
      otHrs: otHrs,
      status: status,
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
              DailyTimeCard
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
                    {/* <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {
                        employee.map((e) => (
                        <option>{e.pnCompanyId}</option>
                      ))
                       
                      }
                    </select> */}
                    <input type="text" value={company} disabled="true" />
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
                    <input type="text" value={branch} disabled="true" />
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
                    <InputLabel shrink>Shiftcode</InputLabel>
                    <select
                      name="shiftCode"
                      onChange={(e) => {
                        setShiftCode(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {shiftdetails.map((e) => (
                        <option>{e.shiftCode}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="machineNum"
                      label="MachineNum"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMachineNum(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="cardNo"
                      label="cardNo"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCardNo(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="verifyMode"
                      label="verifyMode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVerifyMode(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="inOutMode"
                      label="inOutMode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setInOutMode(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="dates"
                      label="dates"
                      variant="outlined"
                      fullWidth
                      required
                      type="datetime-local"
                      onChange={(e) => setDates(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="days"
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
                      name="intime"
                      label="intime"
                      variant="outlined"
                      type="time"
                      fullWidth
                      required
                      onChange={(e) =>
                        setInTime(e.target.value + ":00.0000000")
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="breakOut"
                      label="breakOut"
                      type="time"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) =>
                        setBreakOut(e.target.value + ":00.0000000")
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="breakIn"
                      label="breakIn"
                      type="time"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) =>
                        setBreakIn(e.target.value + ":00.0000000")
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="outtime"
                      label="outtime"
                      type="time"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) =>
                        setOutTime(e.target.value + ":00.0000000")
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otHrs"
                      label="otHrs"
                      type="datetime-local"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOtHrs(e.target.value)}
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
                        pnCompanyid: sessionStorage.getItem("company"),
                        pnBranchid: sessionStorage.getItem("branch"),
                        machineNum: machineNum,
                        cardNo: cardNo,
                        empCode: employeeCode,
                        empName: employeeName,
                        verifyMode: verifyMode,
                        inOutMode: inOutMode,
                        shiftCode: shiftCode,
                        dates: dates,
                        days: days,
                        intime: intime,
                        breakOut: breakOut,
                        breakIn: breakIn,
                        outtime: outtime,
                        otHrs: otHrs,
                        status: status,
                      };
                      console.log(validate(formData));
                      console.log(formData);
                      postRequest(ServerConfig.url, DAILYTIMECARD, formData)
                        .then((e) => {
                          console.log(e);
                          alert("data added successfully!");
                          navigate("/dailytimecardtable");
                        })
                        .catch((e) =>
                          alert(
                            "Either form fields are blank or you are sending an invalid value ! Kindly contact administrator " +
                              e
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
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({ dispatch: dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(DailyTimeCardForm);

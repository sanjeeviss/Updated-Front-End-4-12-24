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
import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { Label } from "@mui/icons-material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import {
  PAYMEMPLOYEE,
  PAYMEMPLOYEEWORKDETAILS,
} from "../../serverconfiguration/controllers";
import { useNavigate } from "react-router-dom";
import { PAYMEMPLOYEELEAVE } from "../../serverconfiguration/controllers";
import { inputpaymEmployeeWorkDetailsForm } from "./paymEmployeeWorkDetails";

export default function EmployeeWorkDetailsForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnEmployeeId, setPnEmployeeID] = useState("");
  const [joiningDate, setJoiningdate] = useState(""); // Declare status state
  const [offerDate, setOfferdate] = useState(""); // Declare status state
  const [probationUpto, setProbationupto] = useState(""); // Declare status state
  const [extendedUpto, setExtendedupto] = useState(""); // Declare status state
  const [confirmationDate, setConfirmationdate] = useState(""); // Declare status state
  const [retirementDate, setRetirementdate] = useState("");
  const [contractRenviewDate, setContractrenviewdate] = useState("");
  const [vReason, setVreason] = useState("");

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
      pnCompanyId: company,
      pnBranchId: branch,
      pnEmployeeId: pnEmployeeId,
      joiningDate: joiningDate,
      offerDate: offerDate,
      probationUpto: probationUpto,
      extendedUpto: extendedUpto,
      confirmationDate: confirmationDate,
      retirementDate: retirementDate,
      contractRenviewDate: contractRenviewDate,
      vReason: vReason,
    };
    console.log(formData);
  };
  const margin = { margin: "0 5px" };
  return (
    <div className="App">
      <Card style={{ maxWidth: 600, margin: "0 auto", font: "initial" }}>
        <CardContent>
          <Typography
            sx={{ mt: 3 }}
            align="center"
            color="primary"
            variant="h5">
            Paym Employee Work Details
          </Typography>

          <form>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel shrink>CompanyID</InputLabel>
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
                      //  setShiftDetails(shiftdetails.filter((e)=>(e.pnBranchid==1 && e.pnCompanyid==1)))
                      //  console.log(shiftdetails)
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
                  <InputLabel shrink>empId</InputLabel>
                  <select
                    name="pnEmployeeId"
                    onChange={(e) => {
                      var v = e.currentTarget.value;
                      var empname = employee.filter((e) => e.employeeCode == v);
                      setPnEmployeeID(v);
                      // setEmployeeName(empname[0].employeeFullName)
                      // setCardNo(empname[0].cardNo)
                    }}
                    style={{ height: "50px" }}>
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
                  <TextField
                    name="joiningDate"
                    label="joiningDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setJoiningdate(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="offerDate"
                    label="offerDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setOfferdate(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="probationUpto"
                    label="probationUpto"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setProbationupto(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="extendedUpto"
                    label="extendedUpto"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setExtendedupto(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="confirmationDate"
                    label="confirmationDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setConfirmationdate(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="retirementDate"
                    label="retirementDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setRetirementdate(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="contractRenviewDate"
                    label="contractRenviewDate"
                    variant="outlined"
                    fullWidth
                    required
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setContractrenviewdate(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <TextField
                    name="vReason"
                    label="vReason"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setVreason(e.target.value)}
                  />
                </FormControl>
              </Grid>

              {inputpaymEmployeeWorkDetailsForm.map((input) => (
                <Grid xs={input.xs} sm={input.sm} item>
                  {" "}
                  {/* <TextField {...input}  InputLabelProps={{shrink:true}}/> */}
                </Grid>
              ))}

              <Grid item xs={12} align="right">
                <Button
                  type="reset"
                  variant="contained"
                  color="primary"
                  style={{ paddingRight: "3" }}>
                  Reset
                </Button>
                <Button
                  onClick={() => {
                    const formData = {
                      pnCompanyId: company,
                      pnBranchId: branch,
                      pnEmployeeId: pnEmployeeId,
                      joiningDate: joiningDate,
                      offerDate: offerDate,
                      probationUpto: probationUpto,
                      extendedUpto: extendedUpto,
                      confirmationDate: confirmationDate,
                      retirementDate: retirementDate,
                      contractRenviewDate: confirmationDate,
                      vReason: vReason,
                      paymEmployee: {
                        pnEmployeeId: pnEmployeeId,
                        paymBranch: {
                          pnBranchId: branch,
                          pnCompany: {
                            pnCompanyId: company,
                          },
                        },
                      },
                    };
                    console.log(formData);
                    postRequest(
                      ServerConfig.url,
                      PAYMEMPLOYEEWORKDETAILS,
                      formData
                    )
                      .then((e) => {
                        console.log(e);
                        navigate("/PaymEmployeeWorkDetailTables");
                      })
                      .catch((e) => console.log(e));
                  }}
                  variant="contained"
                  color="primary">
                  SAVE
                </Button>{" "}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

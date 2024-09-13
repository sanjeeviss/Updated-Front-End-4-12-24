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
  PAYMCOMPANIES,
  PAYMBRANCHES,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function PaymEmployeeForm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [empEarnings, setEmpEarnings] = useState([]);
  const [pnBranchId, setPnBranchId] = useState("");

  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeFirstName, setEmployee_First_Name] = useState("");
  const [employeeMiddleName, setEmployee_Middle_Name] = useState("");
  const [employeeLastName, setEmployee_Last_Name] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [status, setstatus] = useState("");
  const [employeeFullName, setEmployee_Full_Name] = useState("");

  const [readerid, setReaderid] = useState("");

  const [otEligible, setOT_Eligible] = useState("");
  const [pfno, setPfno] = useState("");
  const [esino, setEsino] = useState("");
  const [otCalc, setOT_calc] = useState("");

  const [ctc, setCTC] = useState("");

  const [basicSalary, setbasic_salary] = useState("");
  const [bankCode, setBank_code] = useState("");
  const [bankName, setBank_Name] = useState("");
  const [branchName, setBranch_Name] = useState("");
  const [accountType, setAccount_Type] = useState("");
  const [micrCode, setMICR_code] = useState("");
  const [ifscCode, setIFSC_Code] = useState("");
  const [address, setAddress] = useState("");
  const [otherInfo, setOther_Info] = useState("");
  const [reportingPerson, setReporting_person] = useState("");
  const [reportingId, setReportingID] = useState("");
  const [reportingEmail, setReporting_email] = useState("");
  const [panNo, setPan_no] = useState("");
  const [cardNo, setcard_no] = useState("");
  const [salaryType, setsalary_type] = useState("");
  const [tdsApplicable, setTDS_Applicable] = useState("");
  const [flag, setFlag] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
      const data2 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data2.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: pnCompanyId,
      pnBranchId: pnBranchId,
      pnEmployeeId: pnEmployeeId,
      employeeCode: employeeCode,
      employeeFirstName: employeeFirstName,
      employeeMiddleName: employeeMiddleName,
      employeeLastName: employeeLastName,
      dateofBirth: dateofBirth,
      password: password,
      gender: gender,
      status: status,
      employeeFullName: employeeFullName,
      readerid: readerid,
      otEligible: otEligible,
      pfno: pfno,
      esino: esino,
      otCalc: otCalc,
      ctc: ctc,
      basicSalary: basicSalary,
      bankCode: bankCode,
      bankName: bankName,
      branchName: branchName,
      accountType: accountType,
      micrCode: micrCode,
      ifscCode: ifscCode,
      address: address,
      otherInfo: otherInfo,
      reportingPerson: reportingPerson,
      reportingId: reportingId,
      reportingEmail: reportingEmail,
      panNo: panNo,
      cardNo: cardNo,
      salaryType: salaryType,
      tdsApplicable: tdsApplicable,
      flag: flag,
      role: role,
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
              Paym Employee
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
                      name="pnBranchId"
                      onChange={(e) => {
                        setPnBranchId(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {branch
                        .filter((e) => e.pnCompanyId == pnCompanyId)
                        .map((e) => (
                          <option>{e.pnBranchId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="employeeCode"
                      label="employeeCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmployeeCode(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="employeeFirstName"
                      label="employeeFirstName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmployee_First_Name(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name=" employeeMiddleName"
                      label=" employeeMiddleName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmployee_Middle_Name(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="employeeLastName"
                      label="employeeLastName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmployee_Last_Name(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="dateofBirth"
                      label="dateofBirth"
                      variant="outlined"
                      fullWidth
                      required
                      type="DATETIME-LOCAL"
                      onChange={(e) => setDateofBirth(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="password"
                      label="password"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="gender"
                      label="gender"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setGender(e.target.value)}
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
                      onChange={(e) => setstatus(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="employeeFullName"
                      label="employeeFullName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmployee_Full_Name(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="readerid"
                      label="readerid"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setReaderid(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otEligible"
                      label="otEligible"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOT_Eligible(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="pfno"
                      label="pfno"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPfno(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="esino"
                      label="esino"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEsino(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otCalc"
                      label="otCalc"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOT_calc(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ctc"
                      label="ctc"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCTC(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="basicSalary"
                      label="basicSalary"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setbasic_salary(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="bankCode"
                      label="bankCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBank_code(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="bankName"
                      label="bankName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBank_Name(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="branchName"
                      label="branchName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBranch_Name(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="accountType"
                      label="accountType"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAccount_Type(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="micrCode"
                      label="micrCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMICR_code(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ifscCode"
                      label="ifscCode"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setIFSC_Code(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="address"
                      label="address"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="otherInfo"
                      label="otherInfo"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOther_Info(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="reportingPerson"
                      label="reportingPerson"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setReporting_person(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="reportingId"
                      label="reportingId"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setReportingID(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="reportingEmail"
                      label="reportingEmail"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setReporting_email(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="panNo"
                      label="panNo"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPan_no(e.target.value)}
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
                      onChange={(e) => setcard_no(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="salaryType"
                      label="salaryType"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setsalary_type(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="tdsApplicable"
                      label="tdsApplicable"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setTDS_Applicable(e.target.value)}
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
                      name="role"
                      label="role"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setrole(e.target.value)}
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
                        pnCompanyId: pnCompanyId,
                        pnBranchId: pnBranchId,
                        employeeCode: employeeCode,
                        employeeFirstName: employeeFirstName,
                        employeeMiddleName: employeeMiddleName,
                        employeeLastName: employeeLastName,
                        dateofBirth: dateofBirth,
                        password: password,
                        gender: gender,
                        status: status,
                        employeeFullName: employeeFullName,
                        readerid: readerid,
                        otEligible: otEligible,
                        pfno: pfno,
                        esino: esino,
                        otCalc: otCalc,
                        ctc: ctc,
                        basicSalary: basicSalary,
                        bankCode: bankCode,
                        bankName: bankName,
                        branchName: branchName,
                        accountType: accountType,
                        micrCode: micrCode,
                        ifscCode: ifscCode,
                        address: address,
                        otherInfo: otherInfo,
                        reportingPerson: reportingPerson,
                        reportingId: reportingId,
                        reportingEmail: reportingEmail,
                        panNo: panNo,
                        cardNo: cardNo,
                        salaryType: salaryType,
                        tdsApplicable: tdsApplicable,
                        flag: flag,
                        role: role,

                        paymBranch: {
                          pnBranchId: pnBranchId,
                          pnCompany: {
                            pnCompanyId: pnCompanyId,
                          },
                        },
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, PAYMEMPLOYEE, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/PaymEmpTable");
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

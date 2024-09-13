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
  LEAVEALLOCATIONMASTER,
  PAYMEMPLOYEE,
  PAYMLEAVE,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";

import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function LeaveAllocationFormm() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnEmployeeId, setEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [paymLeave, setPaymLeave] = useState([]);
  const [pnLeaveId, setLeaveId] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [nCount, setNcount] = useState("");
  const [yearend, setYearEnd] = useState("");
  const [medical, setMedical] = useState("");
  const [official, setOfficial] = useState("");
  const [casual, setCasual] = useState("");
  const [ssss, setSsss] = useState("");
  const [personnel, setPersonnel] = useState("");
  const [personel, setPersonel] = useState("");
  const [maternity, setMaternity] = useState("");
  const [earned, setEarned] = useState("");

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
      category: category,
      subCategory: subCategory,
      nCount: nCount,
      yearend: yearend,
      medical: medical,
      official: official,
      casual: casual,
      ssss: ssss,
      personnel: personnel,
      personel: personel,
      maternity: maternity,
      earned: earned,
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
              Leave Allocation Master Form
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
                    <TextField
                      name="category"
                      label="category"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCategory(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="subCategory"
                      label="subCategory"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setSubCategory(e.target.value)}
                    />
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
                      onChange={(e) => setNcount(e.target.value)}
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

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="medical"
                      label="medical"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMedical(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="official"
                      label="official"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOfficial(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="casual"
                      label="casual"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCasual(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ssss"
                      label="ssss"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setSsss(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="personnel"
                      label="personnel"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPersonnel(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="personel"
                      label="personel"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPersonel(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="maternity"
                      label="maternity"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMaternity(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="earned"
                      label="earned"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEarned(e.target.value)}
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
                        category: category,
                        subCategory: subCategory,
                        nCount: nCount,
                        yearend: yearend,
                        medical: medical,
                        official: official,
                        casual: casual,
                        ssss: ssss,
                        personnel: personnel,
                        personel: personel,
                        maternity: maternity,
                        earned: earned,
                      };
                      console.log(formData);
                      postRequest(
                        ServerConfig.url,
                        LEAVEALLOCATIONMASTER,
                        formData
                      )
                        .then((e) => {
                          console.log(e);
                          navigate("/LeaveAllocationMasterTable");
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

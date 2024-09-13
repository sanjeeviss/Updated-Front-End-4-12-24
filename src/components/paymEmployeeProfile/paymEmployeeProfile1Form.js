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
  PAYMBRANCHES,
  PAYMCOMPANIES,
  PAYMEMPLOYEE,
  PAYMDIVISION,
  PAYMDEPARTMENT,
  PAYMDESIGNATION,
  PAYMGRADE,
  PAYMSHIFT,
  PAYMCATEGORY,
  JOBSTATUS,
  PAYMLEVEL,
  PAYMEMPLOYEEPROFILE1,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function EmployeeProfile1Form() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [division, setDivision] = useState([]);
  const [department, setDepartment] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [grade, setGrade] = useState([]);
  const [shift, setShift] = useState([]);
  const [category, setCategory] = useState([]);
  const [jobstatus, setJobStatus] = useState([]);
  const [level, setLevel] = useState([]);
  const [pnCompanyId, setpnCompanyId] = useState("");
  const [pnBranchId, setpnBranchId] = useState("");
  const [pnEmployeeId, setpnEmployeeId] = useState("");
  const [pnDivisionId, setpnDivisionId] = useState("");
  const [pnDepartmentId, setpnDepartmentId] = useState("");
  const [pnDesingnationId, setpnDesingnationId] = useState("");
  const [pnGradeId, setpnGradeId] = useState("");
  const [pnShiftId, setpnShiftId] = useState("");
  const [pnCategoryId, setpnCategoryId] = useState("");
  const [pnJobStatusId, setpnJobStatusId] = useState("");
  const [pnLevelId, setpnLevelId] = useState("");
  const [pnProjectsiteId, setpnProjectsiteId] = useState("");
  const [dDate, setdDate] = useState("");
  const [vReason, setvReason] = useState("");
  const [rDepartment, setrDepartment] = useState("");
  const [fatherName, setFatherName] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
      const data2 = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data2.data);
      const data3 = await getRequest(ServerConfig.url, PAYMDIVISION);
      setDivision(data3.data);
      const data4 = await getRequest(ServerConfig.url, PAYMDEPARTMENT);
      setDepartment(data4.data);
      const data5 = await getRequest(ServerConfig.url, PAYMDESIGNATION);
      setDesignation(data5.data);
      const data6 = await getRequest(ServerConfig.url, PAYMGRADE);
      setGrade(data6.data);
      const data7 = await getRequest(ServerConfig.url, PAYMSHIFT);
      setShift(data7.data);
      const data8 = await getRequest(ServerConfig.url, PAYMCATEGORY);
      setCategory(data8.data);
      const data9 = await getRequest(ServerConfig.url, JOBSTATUS);
      setJobStatus(data9.data);
      const data10 = await getRequest(ServerConfig.url, PAYMLEVEL);
      setLevel(data10.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: pnCompanyId,
      pnBranchId: pnBranchId,
      pnEmployeeId: pnEmployeeId,
      pnDivisionId: pnDivisionId,
      pnDepartmentId: pnDepartmentId,
      pnDesingnationId: pnDesingnationId,
      pnGradeId: pnGradeId,
      pnShiftId: pnShiftId,
      pnCategoryId: pnCategoryId,
      pnJobStatusId: pnJobStatusId,
      pnLevelId: pnLevelId,
      pnProjectsiteId: pnProjectsiteId,
      dDate: dDate,
      vReason: vReason,
      rDepartment: rDepartment,
      fatherName: fatherName,
      paymCategory: {
        pnCategoryId: pnCategoryId,
      },
      paymDepartment: {
        pnDepartmentId: pnDepartmentId,
      },
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
              Paym Employee Profile
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setpnCompanyId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {company.map((e) => (
                        <option>{e.pnCompanyId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select
                      name="pnBranchId"
                      onChange={(e) => {
                        setpnBranchId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {branch
                        .filter((e) => e.pnCompanyId == pnCompanyId)
                        .map((e) => (
                          <option>{e.pnBranchId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>EmployeeId</InputLabel>
                    <select
                      name="pnEmployeeId"
                      onChange={(e) => {
                        setpnEmployeeId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {employee
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => {
                          return <option>{e.pnEmployeeId}</option>;
                        })}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>DivisionId</InputLabel>
                    <select
                      name="pnDivisionId"
                      onChange={(e) => {
                        setpnDivisionId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {division
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnDivisionId}>
                            {e.vDivisionName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>DepartmentId</InputLabel>
                    <select
                      name="pnDepartmentId"
                      onChange={(e) => {
                        setpnDepartmentId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {department
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnDepartmentId}>
                            {e.vDepartmentName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>DesignationId</InputLabel>
                    <select
                      name=" pnDesingnationId"
                      onChange={(e) => {
                        setpnDesingnationId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {designation
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnDesignationId}>
                            {e.vDesignationName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>GradeId</InputLabel>
                    <select
                      name="pnGradeId"
                      onChange={(e) => {
                        setpnGradeId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {grade
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnGradeId}>{e.vGradeName}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>ShiftId</InputLabel>
                    <select
                      name="pnShiftId"
                      onChange={(e) => {
                        setpnShiftId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {shift
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnShiftId}>{e.vShiftName}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>CategoryId</InputLabel>
                    <select
                      name="pnCategoryId"
                      onChange={(e) => {
                        setpnCategoryId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {category
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnCategoryId}>
                            {e.vCategoryName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Job Status Id</InputLabel>
                    <select
                      name="pnJobStatusId"
                      onChange={(e) => {
                        setpnJobStatusId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {jobstatus
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option value={e.pnJobStatusId}>
                            {e.vJobStatusName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Level Id</InputLabel>
                    <select
                      name="pnLevelId"
                      onChange={(e) => {
                        setpnLevelId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {level
                        .filter((e) => {
                          return e.pnBranchId == pnBranchId;
                        })
                        .map((e) => (
                          <option>{e.pnLevelId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="pnProjectsiteId"
                      label="pnProjectsiteId"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setpnProjectsiteId(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="dDate"
                      label="dDate"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setdDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      type="datetime-local"
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
                      onChange={(e) => setvReason(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="rDepartment"
                      label="rDepartment"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setrDepartment(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="fatherName"
                      label="fatherName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setFatherName(e.target.value)}
                      InputLabelProps={{ shrink: true }}
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
                        pnEmployeeId: pnEmployeeId,
                        pnDivisionId: pnDivisionId,
                        pnDepartmentId: pnDepartmentId,
                        pnDesingnationId: pnDesingnationId,
                        pnGradeId: pnGradeId,
                        pnShiftId: pnShiftId,
                        pnCategoryId: pnCategoryId,
                        pnJobStatusId: pnJobStatusId,
                        pnLevelId: pnLevelId,
                        pnProjectsiteId: pnProjectsiteId,
                        dDate: dDate,
                        vReason: vReason,
                        rDepartment: rDepartment,
                        fatherName: fatherName,
                        paymCategory: {
                          pnCategoryId: pnCategoryId,
                        },
                        paymDepartment: {
                          pnDepartmentId: pnDepartmentId,
                        },
                      };
                      console.log(formData);
                      postRequest(
                        ServerConfig.url,
                        PAYMEMPLOYEEPROFILE1,
                        formData
                      )
                        .then((e) => {
                          console.log(e);
                          navigate("/OnDutyTable");
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

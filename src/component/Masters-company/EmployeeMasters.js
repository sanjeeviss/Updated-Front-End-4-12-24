import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
  InputLabel
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
  SAVE,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function Employeeprofile0909090() {
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
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [pnEmployeeId, setPnEmployeeId] = useState("");
  const [pnDivisionId, setPnDivisionId] = useState("");
  const [pnDepartmentId, setPnDepartmentId] = useState("");
  const [pnDesignationId, setPnDesignationId] = useState("");
  const [pnGradeId, setPnGradeId] = useState("");
  const [pnShiftId, setPnShiftId] = useState("");
  const [pnCategoryId, setPnCategoryId] = useState("");
  const [pnJobStatusId, setPnJobStatusId] = useState("");
  const [pnLevelId, setPnLevelId] = useState("");
  const [pnProjectsiteId, setPnProjectsiteId] = useState("");
  const [dDate, setDDate] = useState("");
  const [vReason, setVReason] = useState("");
  const [rDepartment, setRDepartment] = useState("");
  const [fatherName, setFatherName] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const [companies, branches, employees, divisions, departments, designations, grades, shifts, categories, jobStatuses, levels] = await Promise.all([
          getRequest(ServerConfig.url, PAYMCOMPANIES),
          getRequest(ServerConfig.url, PAYMBRANCHES),
          getRequest(ServerConfig.url, PAYMEMPLOYEE),
          getRequest(ServerConfig.url, PAYMDIVISION),
          getRequest(ServerConfig.url, PAYMDEPARTMENT),
          getRequest(ServerConfig.url, PAYMDESIGNATION),
          getRequest(ServerConfig.url, PAYMGRADE),
          getRequest(ServerConfig.url, PAYMSHIFT),
          getRequest(ServerConfig.url, PAYMCATEGORY),
          getRequest(ServerConfig.url, JOBSTATUS),
          getRequest(ServerConfig.url, PAYMLEVEL),
        ]);

        console.log('Fetched data:', { companies: companies.data, branches: branches.data }); // Debug log

        setCompany(companies.data);
        setBranch(branches.data);
        setEmployee(employees.data);
        setDivision(divisions.data);
        setDepartment(departments.data);
        setDesignation(designations.data);
        setGrade(grades.data);
        setShift(shifts.data);
        setCategory(categories.data);
        setJobStatus(jobStatuses.data);
        setLevel(levels.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    console.log('Selected company:', pnCompanyId);
  }, [pnCompanyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!pnCompanyId || !pnCategoryId || !vReason || !dDate || !rDepartment || !fatherName) {
      alert("Please fill out all required fields.");
      return;
    }
  
    // Prepare the form data
    const formData = {
      pnCompanyId,
      pnBranchId,
      pnEmployeeId,
      pnDivisionId,
      pnDepartmentId,
      pnDesignationId,
      pnGradeId,
      pnShiftId,
      pnCategoryId,
      pnJobStatusId,
      pnLevelId,
      pnProjectsiteId,
      dDate,
      vReason,
      rDepartment,
      fatherName,
    };
  
    console.log('Form Data:', formData); // Debug log
  
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `
          INSERT INTO [dbo].[paym_employee_profile1]
            ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [pn_DivisionId], [pn_DepartmentId], [pn_DesingnationId], [pn_GradeId], [pn_ShiftId], [pn_CategoryId], [pn_JobStatusId], [pn_LevelID], [pn_projectsiteID], [d_Date], [v_Reason], [r_Department], [father_name])
          VALUES
            (${formData.pnCompanyId}, ${formData.pnBranchId}, ${formData.pnEmployeeId}, ${formData.pnDivisionId}, ${formData.pnDepartmentId}, ${formData.pnDesignationId}, ${formData.pnGradeId}, ${formData.pnShiftId}, ${formData.pnCategoryId}, ${formData.pnJobStatusId}, ${formData.pnLevelId}, ${formData.pnProjectsiteId}, '${formData.dDate}', '${formData.vReason}', '${formData.rDepartment}', '${formData.fatherName}')
        `
      });
  
      console.log('Response:', response); // Debug log
    } catch (error) {
      console.error("Error submitting form", error.response?.data || error.message);
      alert("Submission failed. Check console for details.");
    }
  };
  
   
  
  return (
    <div>
     
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="textSecondary" align="center">
              Paym Employee Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      value={pnCompanyId}
                      onChange={(e) => setPnCompanyId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {company.map((e) => (
                        <option key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.companyName} {/* Displaying Company Name */}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Branch</InputLabel>
                    <select
                      name="pnBranchId"
                      value={pnBranchId}
                      onChange={(e) => setPnBranchId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {branch
                        .filter((e) => e.pnCompanyId == pnCompanyId) // Filter based on selected company
                        .map((e) => (
                          <option key={e.pnBranchId} value={e.pnBranchId}>
                            {e.branchName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Employee</InputLabel>
                    <select
                      name="pnEmployeeId"
                      value={pnEmployeeId}
                      onChange={(e) => setPnEmployeeId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {employee
                        .filter((e) => e.pnBranchId == pnBranchId) // Filter based on selected branch
                        .map((e) => (
                          <option key={e.pnEmployeeId} value={e.pnEmployeeId}>
                            {e.employeeFullName} {/* Displaying Employee Name */}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Division</InputLabel>
                    <select
                      name="pnDivisionId"
                      value={pnDivisionId}
                      onChange={(e) => setPnDivisionId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {division.map((e) => (
                        <option key={e.pnDivisionId} value={e.pnDivisionId}>
                          {e.vDivisionName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Department</InputLabel>
                    <select
                      name="pnDepartmentId"
                      value={pnDepartmentId}
                      onChange={(e) => setPnDepartmentId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {department
                        .filter((e) => e.pnCompanyId == pnCompanyId) // Filter based on selected company
                        .map((e) => (
                          <option key={e.pnDepartmentId} value={e.pnDepartmentId}>
                            {e.vDepartmentName}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Designation</InputLabel>
                    <select
                      name="pnDesignationId"
                      value={pnDesignationId}
                      onChange={(e) => setPnDesignationId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {designation.map((e) => (
                        <option key={e.pnDesignationId} value={e.pnDesignationId}>
                          {e.vDesignationName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Grade</InputLabel>
                    <select
                      name="pnGradeId"
                      value={pnGradeId}
                      onChange={(e) => setPnGradeId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {grade.map((e) => (
                        <option key={e.pnGradeId} value={e.pnGradeId}>
                          {e.vGradeName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Shift</InputLabel>
                    <select
                      name="pnShiftId"
                      value={pnShiftId}
                      onChange={(e) => setPnShiftId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {shift.map((e) => (
                        <option key={e.pnShiftId} value={e.pnShiftId}>
                          {e.vShiftName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Category</InputLabel>
                    <select
                      name="pnCategoryId"
                      value={pnCategoryId}
                      onChange={(e) => setPnCategoryId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {category
                       .filter((e) => e.pnCompanyId == pnCompanyId)
                      .map((e) => (
                        <option key={e.pnCategoryId} value={e.pnCategoryId}>
                          {e.vCategoryName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Job Status</InputLabel>
                    <select
                      name="pnJobStatusId"
                      value={pnJobStatusId}
                      onChange={(e) => setPnJobStatusId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {jobstatus.map((e) => (
                        <option key={e.pnJobStatusId} value={e.pnJobStatusId}>
                          {e.vJobStatusName}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Level</InputLabel>
                    <select
                      name="pnLevelId"
                      value={pnLevelId}
                      onChange={(e) => setPnLevelId(e.target.value)}
                      style={{ height: "50px" }}
                    >
                      <option value="">Select</option>
                      {level.map((e) => (
                        <option key={e.pnLevelId} value={e.pnLevelId}>
                          {e.vLevelName}
                        </option>
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
                      value={pnProjectsiteId}
                      required
                      onChange={(e) => setPnProjectsiteId(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="dDate"
                      label="Date"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={dDate}
                      onChange={(e) => setDDate(e.target.value)}
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="vReason"
                      label="Reason"
                      value={vReason}
                      onChange={(e) => setVReason(e.target.value)}
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      name="rDepartment"
                      label="Reporting Department"
                      value={rDepartment}
                      onChange={(e) => setRDepartment(e.target.value)}
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      name="fatherName"
                      label="Father's Name"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
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

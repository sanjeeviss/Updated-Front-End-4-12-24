import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { PhotoCamera } from "@mui/icons-material";
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
  REPORTS,
} from "../../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Employeeprofile0909 = () => {
  const navigate = useNavigate();

  // State variables for dropdown data
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

  // State variables for form fields
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

  // State variables for authentication and user-specific data
  const [isloggedin, setloggedin] = useState(sessionStorage.getItem("user"));
  const [loggedBranch, setloggedBranch] = useState([]);
  const [loggedCompany, setloggedCompany] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  // State variables for image upload
  const [profileImagePreview, setProfileImagePreview] = useState(null); // Stores the preview URL
  const MAX_IMAGE_DATA_LENGTH = 100000; // Set a limit according to your requirement
  const [imageError, setImageError] = useState("");
  useEffect(() => {
    async function getData() {
      try {
        const [
          companies,
          branches,
          employees,
          divisions,
          departments,
          designations,
          grades,
          shifts,
          categories,
          jobStatuses,
          levels,
        ] = await Promise.all([
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

        if (isloggedin) {
          const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_Branch where Branch_User_Id = '${isloggedin}'`,
          });

          if (loggedBranchData.data) {
            setloggedBranch(loggedBranchData.data);
            setPnBranchId(loggedBranchData.data[0].pn_BranchID);

            const loggedCompanyData = await postRequest(ServerConfig.url, REPORTS, {
              query: `select * from paym_Company where pn_CompanyID = ${loggedBranchData.data[0].pn_CompanyID}`,
            });

            if (loggedCompanyData.data) {
              setloggedCompany(loggedCompanyData.data);
              setPnCompanyId(loggedCompanyData.data[0].pn_CompanyID);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    getData();
  }, [isloggedin]);



  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];


    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5 MB. Please choose a smaller file.");
      return;
    }

    // Check for file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, JPEG, PNG, and GIF files are allowed.");
      return;
    }

    setProfileImage(file);
  };

  const handleImageRemove = () => {
    setProfileImage(null);
  };
  // utils.js
  // Function to convert the image to a binary format
  const convertImageToBinary = async (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        const binaryData = imageData.split(',')[1]; // Remove the data URL prefix
        const binaryString = atob(binaryData); // Decode base64
        const buffer = new Uint8Array(binaryString.length);
        
        // Convert the binary string to a Uint8Array
        for (let i = 0; i < binaryString.length; i++) {
          buffer[i] = binaryString.charCodeAt(i);
        }
        
        resolve(buffer); // Resolve with the Uint8Array
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(image);
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!pnCompanyId || !pnCategoryId || !vReason || !dDate || !rDepartment) {
      alert("Please fill out all required fields.");
      return;
    }

    // Declare and assign imageBinary
    const imageBinary = await convertImageToBinary(profileImage);
    // Declare and assign formDataToSubmit
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
      image_data: profileImage ? profileImage : null,
    };

     const reader = new FileReader();
    reader.onload = async () => {
      const arrayBuffer = reader.result;
      const binary = new Uint8Array(arrayBuffer);

      // Convert the Uint8Array to a hex string for SQL insertion
      const hexString = Array.from(imageBinary, byte => byte.toString(16).padStart(2, '0')).join('');

        const response = await postRequest(ServerConfig.url, SAVE, {
          
          query: `
          INSERT INTO [dbo].[paym_employee_profile1]
            ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [pn_DivisionId], [pn_DepartmentId], [pn_DesingnationId],
             [pn_GradeId], [pn_ShiftId], [pn_CategoryId], [pn_JobStatusId], [pn_LevelID], [pn_projectsiteID], 
             [d_Date], [v_Reason], [r_Department], [image_data])
          VALUES 
            (${formData.pnCompanyId}, ${formData.pnBranchId}, ${formData.pnEmployeeId}, ${formData.pnDivisionId}, 
            ${formData.pnDepartmentId}, ${formData.pnDesignationId}, ${formData.pnGradeId}, ${formData.pnShiftId}, 
            ${formData.pnCategoryId}, ${formData.pnJobStatusId}, ${formData.pnLevelId}, ${formData.pnProjectsiteId}, 
            '${formData.dDate}', '${formData.vReason}', '${formData.rDepartment}', 
            CONVERT(varbinary(max), '0x${hexString}', 1))
        `,
        
       
        });
        console.log('SQL Query:', response); // Print the query in the console

        if (response.status === 200) {
          alert('Data saved successfully');
          navigate("/EmployeeHome");
        } else {
          alert('Failed to save data');
        }
      };
      if (profileImage) {
        reader.readAsArrayBuffer(profileImage); // Convert file to ArrayBuffer
      }    } 
  //   else {
  //     const response = await postRequest(ServerConfig.url, SAVE, {
  //       query: `
  //         INSERT INTO [dbo].[paym_employee_profile1]
  //           ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [pn_DivisionId], [pn_DepartmentId], [pn_DesingnationId],
  //            [pn_GradeId], [pn_ShiftId],         [pn_CategoryId], [pn_JobStatusId], [pn_LevelID], [pn_projectsiteID], 
  //            [d_Date], [v_Reason], [r_Department], [image_data])
  //        (${formData.pnCompanyId}, ${formData.pnBranchId}, ${formData.pnEmployeeId}, ${formData.pnDivisionId}, 
  //  ${formData.pnDepartmentId}, ${formData.pnDesignationId}, ${formData.pnGradeId}, ${formData.pnShiftId}, 
  //  ${formData.pnCategoryId}, ${formData.pnJobStatusId}, ${formData.pnLevelId}, ${formData.pnProjectsiteId}, 
  //  '${formData.dDate}', '${formData.vReason}', '${formData.rDepartment}',NULL )
  //     `,
       
      
  //     });
  //     console.log('SQL Query (no image):', response); // Print the query in the console


  //     if (response.status === 200) {
  //       alert('Data saved successfully');
  //     } else {
  //       alert('Failed to save data ');
  //     }
  //   }
  

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Navbar */}
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      {/* Sidebar and Main Content */}
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
        {/* Sidebar */}
        <Grid item xs={2}>
          <Sidenav />
        </Grid>

        {/* Main Content */}
        <Grid
          item
          xs={10}
          sx={{
            padding: "60px 0 0 100px",
            overflowY: "auto",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card style={{ maxWidth: 800, width: "100%", position: "relative" }}>
            <CardContent>
              {/* Header with Title and Image Upload */}
            
                <Typography variant="h5" align="left" gutterBottom>
                  Paym Employee Profile
                </Typography>

                {/* Image Upload Section */}
              

              {/* Form */}
              <form onSubmit={handleSubmit}>
              <Grid item xs={12} sm={4}>
            
      <FormControl fullWidth>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="imageInput"
        />
        <label htmlFor="imageInput" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Uploaded"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'buttom',
                border: '2px dashed #ccc',
              }}
            >
              <AddCircleOutlineIcon style={{ fontSize: '48px', color: '#2196f3' }} />
            </div>
          )}
        </label>
        {/* {profileImage && (
          <IconButton color="secondary" onClick={handleImageRemove} style={{ marginTop: '10px' }}>
            <DeleteIcon />
          </IconButton>
        )} */}
        <Typography variant="caption" color="textSecondary" gutterBottom style={{ marginTop: '5px',marginBottom:"10px" }}>
          File Types: jpg, jpeg, png, gif
        </Typography>
      </FormControl>
    </Grid>
                <Grid container spacing={2}>
                  {/* Company Name (Read-Only) */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      name="CompanyName"
                      value={loggedCompany.length > 0 ? loggedCompany[0].CompanyName : ""}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Branch Name (Read-Only) */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Branch Name"
                      name="BranchName"
                      value={loggedBranch.length > 0 ? loggedBranch[0].BranchName : ""}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Employee Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Employee</InputLabel>
                      <select
                        name="pnEmployeeId"
                        value={pnEmployeeId}
                        onChange={(e) => setPnEmployeeId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {employee
                          .filter((e) => e.pnBranchId === pnBranchId)
                          .map((e) => (
                            <option key={e.pnEmployeeId} value={e.pnEmployeeId}>
                              {e.employeeFullName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Division Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Division</InputLabel>
                      <select
                        name="pnDivisionId"
                        value={pnDivisionId}
                        onChange={(e) => setPnDivisionId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {division
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnDivisionId} value={e.pnDivisionId}>
                              {e.vDivisionName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Department Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Department</InputLabel>
                      <select
                        name="pnDepartmentId"
                        value={pnDepartmentId}
                        onChange={(e) => setPnDepartmentId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {department
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnDepartmentId} value={e.pnDepartmentId}>
                              {e.vDepartmentName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Designation Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Designation</InputLabel>
                      <select
                        name="pnDesignationId"
                        value={pnDesignationId}
                        onChange={(e) => setPnDesignationId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {designation
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnDesignationId} value={e.pnDesignationId}>
                              {e.vDesignationName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Grade Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Grade</InputLabel>
                      <select
                        name="pnGradeId"
                        value={pnGradeId}
                        onChange={(e) => setPnGradeId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {grade
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnGradeId} value={e.pnGradeId}>
                              {e.vGradeName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Shift Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Shift</InputLabel>
                      <select
                        name="pnShiftId"
                        value={pnShiftId }
                        onChange={(e) => setPnShiftId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {shift
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnShiftId} value={e.pnShiftId}>
                              {e.vShiftName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Category Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Category</InputLabel>
                      <select
                        name="pnCategoryId"
                        value={pnCategoryId}
                        onChange={(e) => setPnCategoryId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {category
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnCategoryId} value={e.pnCategoryId}>
                              {e.vCategoryName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Job Status Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Job Status</InputLabel>
                      <select
                        name="pnJobStatusId"
                        value={pnJobStatusId}
                        onChange={(e) => setPnJobStatusId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {jobstatus
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnJobStatusId} value={e.pnJobStatusId}>
                              {e.vJobStatusName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Level Selection */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Level</InputLabel>
                      <select
                        name="pnLevelId"
                        value={pnLevelId}
                        onChange={(e) => setPnLevelId(e.target.value)}
                        style={{ height: "50px", width: "100%", padding: "10px" }}
                      >
                        <option value="">Select</option>
                        {level
                          .filter((e) => e.pnCompanyId === pnCompanyId)
                          .map((e) => (
                            <option key={e.pnLevelId} value={e.pnLevelId}>
                              {e.vLevelName}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  {/* Project Site ID */}
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <TextField
                        name="pnProjectsiteId"
                        label="Project Site ID"
                        variant="outlined"
                        fullWidth
                        value={pnProjectsiteId}
                        required
                        onChange={(e) => setPnProjectsiteId(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </FormControl>
                  </Grid>

                  {/* Date Field */}
                  <Grid item xs={12} sm={4}>
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

                  {/* Reason Field */}
                  <Grid item xs={12} sm={4}>
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

                  {/* Reporting Department Field */}
                  <Grid item xs={12} sm={4}>
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

                  {/* Submit Button */}
                  <Grid item xs={12} align="right">
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
          
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
);
}
export default Employeeprofile0909;




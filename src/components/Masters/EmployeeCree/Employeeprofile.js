import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  CardContent,
  FormControl,
  Tabs,
  Tab, Box,
  InputLabel,
  MenuItem,
  Select,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { PAYMCOMPANIES, PAYMBRANCHES, REPORTS } from "../../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { SAVE } from "../../../serverconfiguration/controllers";
//   import Employeeprofile0909090 from "./EmployeePrfile1Org"
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";

export default function PaymEmployeeFormm() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [errors, setErrors] = useState({});
  const [profileTabValue, setProfileTabValue] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [isloggedin, setloggedin] = useState(sessionStorage.getItem("user"))
  const [loggedBranch, setloggedBranch] = useState([])
  const [loggedCompany, setloggedCompany] = useState([])
  const [Gradebybranch , setGradebybranch] = useState([])
  const [Gradebydivision, setGradebydivision] = useState([])
  const [gradeData, setGradeData] = useState([]);
const [labelHeader, setLabelHeader] = useState("Grade"); 
const [GradebyDivision, setGradebyDivision] = useState([]);
const [result, setResult] = useState({});


  const [formData, setFormData] = useState({
    pn_CompanyID: "",
    pn_BranchID: "",
    employeeCode: "",
    employeeFirstName: "",
    employeeMiddleName: "",
    employeeLastName: "",
    dateofBirth: "",
    password: "",
    gender: "",
    status: "",
    employeeFullName: "",
    readerid: "",
    otEligible: "",
    pfno: "",
    esino: "",
    otCalc: "",
    ctc: "",
    basicSalary: "",
    bankCode: "",
    bankName: "",
    branchName: "",
    accountType: "",
    accountNo: "",
    micrCode: "",
    ifscCode: "",
    CurrentAddress:"",  
    otherInfo: "",
    reportingPerson: "",
    reportingId: "",
    reportingEmail: "",
    panNo: "",
    salaryType: "",
    tdsApplicable: "",
    flag: "",
    role: "",
    BloodGroup:"",
    PhoneNo:"",
    AlternatePhoneNo:"",
    permanantaddress:"",
    Aadharcard:"",
    FatherName:"",
    Email:"",
    AlternateEmail:"",
    Grade: "",
    Overall_Experience: ""
  });



  useEffect(() => {
    async function fetchInitialData() {
      const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(companyData.data);
  
      const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(branchData.data);
  
      
    }
  
    fetchInitialData();
  }, []); // Only run when isloggedin changes
  
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query:` select * from paym_Branch where Branch_User_Id = '${isloggedin}'`,
        });
  
        if (loggedBranchData.data) {
          setloggedBranch(loggedBranchData.data);
  
          // Dynamically set pn_BranchID based on the fetched data
          setFormData((prevData) => ({
            ...prevData,
            pn_BranchID: loggedBranchData.data[0].pn_BranchID,
          }));
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }
  
    // Always fetch fresh data based on isloggedin
    if (isloggedin) {
      fetchInitialData();
    }
  }, [isloggedin]);
  
  useEffect(() => {
    async function fetchLoggedCompany() {
      try {
        if (loggedBranch.length > 0) {
          const loggedCompanyData = await postRequest(ServerConfig.url, REPORTS, {
            query:` select * from paym_Company where pn_CompanyID = ${loggedBranch[0].pn_CompanyID}`,
          });
  
          if (loggedCompanyData.data) {
            setloggedCompany(loggedCompanyData.data);
  
            // Dynamically set pn_CompanyID based on the fetched data
            setFormData((prevData) => ({
              ...prevData,
              pn_CompanyID: loggedCompanyData.data[0].pn_CompanyID,
            }));
          }
        }
      } catch (error) {
        console.error`("Error fetching company data:", error)`;
      }
    }
  
    // Fetch company data when loggedBranch is available
    if (loggedBranch.length > 0) {
      fetchLoggedCompany();
    }
  }, [loggedBranch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uniqueGrades = Array.from(
    new Set(
      gradeData.map((grade) => (grade.Slab_Type === "Level" ? grade.Level_Name : grade.Grade_Name))
    )
  );

  useEffect(() => {
    async function getData() {
      try {
        if (loggedBranch.length > 0) {
          // Fetch Grade by Branch
          const GradebyBranch = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from GradeSlab_Branch where pn_branchid = ${loggedBranch[0].pn_BranchID}`,
          });
  
          // Fetch Grade by Division
          const GradebyDivisionResponse = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from GradeSlab_Division where pn_branchid = ${loggedBranch[0].pn_BranchID}`,
          });
  
          // Set the Grade by Division data
          setGradebyDivision(GradebyDivisionResponse.data);
  
          let slabType;
          if (GradebyBranch.data.length > 0) {
            setGradeData(GradebyBranch.data);
            slabType = GradebyBranch.data[0].Slab_Type;
          } else if (GradebyDivisionResponse.data.length > 0) {
            setGradeData(GradebyDivisionResponse.data);
            slabType = GradebyDivisionResponse.data[0].Slab_Type;
          }
  
          // Set the label based on Slab_Type
          if (slabType === "Grade") {
            setLabelHeader("Grade");
          } else if (slabType === "Level") {
            setLabelHeader("Level");
          }
        }
      } catch (error) {
        console.error("Error fetching grade data:", error);
      }
    }
  
    if (loggedBranch.length > 0) {
      getData();
    }
  }, [loggedBranch]);

  useEffect(() => {
    const executeStoredProcedure = async () => {
      if (formData.Grade && formData.Overall_Experience) {
        try {
          let result;
          if (gradeData.length > 0) {
            const slabType = gradeData[0].Slab_Type;
            if (GradebyDivision.length > 0) {
              if (slabType === "Grade") {
                result = await postRequest(ServerConfig.url, REPORTS, {
                  query: `EXEC GetCTCBySlabDivision @SlabType = 'Grade', @Grade_Name = '${formData.Grade}', @Experience = ${formData.Overall_Experience}`,
                });
              } else if (slabType === "Level") {
                result = await postRequest(ServerConfig.url, REPORTS, {
                  query: `EXEC GetCTCBySlabDivision @SlabType = 'Level', @Level_Name = '${formData.Grade}', @Experience = ${formData.Overall_Experience}`,
                });
              }
            } else {
              if (slabType === "Grade") {
                result = await postRequest(ServerConfig.url, REPORTS, {
                  query: `EXEC GetCTCBySlab @SlabType = 'Grade', @Grade_Name = '${formData.Grade}', @Experience = ${formData.Overall_Experience}`,
                });
              } else if (slabType === "Level") {
                result = await postRequest(ServerConfig.url, REPORTS, {
                  query: `EXEC GetCTCBySlab @SlabType = 'Level', @Level_Name = '${formData.Grade}', @Experience = ${formData.Overall_Experience}`,
                });
              }
            }
          }

          console.log("Stored Procedure Result:", result);
console.log("Type of Result:", typeof result);
console.log("Is Result an Array?:", Array.isArray(result));
// Log the result
          setResult(result); // Set the result in state
          console.log("Updated State Result:", { ...result });
        } catch (error) {
          console.error("Error executing stored procedure:", error);
        }
      }
    };

    if (formData.Grade && formData.Overall_Experience) {
      executeStoredProcedure();
    }
  }, [formData.Grade, formData.Overall_Experience, gradeData, GradebyDivision]);

  


  


  const validateForm = () => {
    const newErrors = {};

    // Helper function to validate email format
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Helper function to validate if value is a number
    const isNumber = (value) => !isNaN(value) && value.trim() !== "";

    // Example validation based on the current tab
    if (tabValue === 0) {
      // Validate fields for General Information
      if (!formData.employeeCode) newErrors.employeeCode = "This field is required enter the 50 characters";
      if (!formData.employeeFirstName) newErrors.employeeFirstName = "This field is required enter the 50 characters";
      if (formData.employeeMiddleName === '') {
        formData.employeeMiddleName = 'NULL';
      }
         if (!formData.employeeLastName) newErrors.employeeLastName = "This field is required enter the 50 characters";
       if (!formData.BloodGroup) newErrors.BloodGroup = "This field is required enter the 20 characters";
       if (!formData.permanantaddress) newErrors.permanantaddress = "This field is required enter the 20 characters";
  // Validate primary email
  if (!formData.Email) {
    newErrors.Email = "This field is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.Email)) {
    newErrors.Email = "Please enter a valid email address.";
  }

  // Validate alternate email
  if (!formData.AlternateEmail) {
    newErrors.AlternateEmail = "This field is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.AlternateEmail)) {
    newErrors.AlternateEmail = "Please enter a valid email address.";
  }
       if (!formData.Aadharcard) {
        newErrors.Aadharcard = "This field is required";
      } else if (!/^\d{12}$/.test(formData.Aadharcard)) {
        newErrors.Aadharcard = "Aadhaar card must be exactly 12 digits";
      }       //phonenumer
  if (!formData.PhoneNo) {
    newErrors.PhoneNo = "This field is required";
  } else if (!/^\d{10}$/.test(formData.PhoneNo)) {
    newErrors.PhoneNo = "Phone number must be exactly 20 digits";
  }
  if (!formData.AlternatePhoneNo) {
    newErrors.AlternatePhoneNo = "This field is required";
  } else if (!/^\d{10}$/.test(formData.AlternatePhoneNo)) {
    newErrors.AlternatePhoneNo = "Phone number must be exactly 20 digits";
  }
  if (!formData.CurrentAddress) newErrors.CurrentAddress = "This field is required at 50 character";

  if (!formData.FatherName) newErrors.FatherName = "This field is required at 50 character";

      if (!formData.dateofBirth) newErrors.dateofBirth = "This field is required";
      if (!formData.password) newErrors.password = "Password must be at Strong 20 characters";
      if (!formData.gender) newErrors.gender = "This field is required";
      if (!formData.status) newErrors.status = "This field is required at 1 character";
      if (!formData.employeeFullName) newErrors.employeeFullName = "This field is required enter the 70 characters";
      if (!formData.readerid) newErrors.readerid = "This field is required only integer";
      if (!formData.otEligible) newErrors.otEligible = "This field is required at 1 characters";
      if (!formData.pfno) newErrors.pfno = "This field is required  at 20 characters";
      if (!formData.esino) newErrors.esino = "This field is required at 20 characters";
      if (!formData.otCalc) newErrors.otCalc = "This field is required only float value";
           if (!formData.basicSalary) newErrors.basicSalary = "This field is required only float value";
    } else if (tabValue === 1) {
      // Validate fields for Bank Details
      if (!formData.bankCode) newErrors.bankCode = "This field is required at 10 character";
      if (!formData.bankName) newErrors.bankName = "This field is required at 30 character";
      if (!formData.branchName) newErrors.branchName = "This field is required at 30 character";
      if (!formData.accountType) newErrors.accountType = "This field is required at 20 character";
      if (!formData.accountNo) newErrors.accountNo = "This field is required at 50 character";
      if (!formData.micrCode) newErrors.micrCode = "This field is required at 20 character";
      if (!formData.ifscCode) newErrors.ifscCode = "This field is required at 20 character";
    } else if (tabValue === 2) {
      // Validate fields for Contact Details
      if (!formData.otherInfo) newErrors.otherInfo = "This field is required at 100 character";
      if (!formData.reportingPerson) newErrors.reportingPerson = "This field is required at 50 character";
      if (!formData.reportingId) newErrors.reportingId = "This field is required only integer";
      if (!formData.reportingEmail) newErrors.reportingEmail = "This field is required";
      if (formData.reportingEmail && !isValidEmail(formData.reportingEmail)) newErrors.reportingEmail = "Invalid email address";
    } else if (tabValue === 3) {
      // Validate fields for Additional Info
      if (!formData.panNo) newErrors.panNo = "This field is required at 20 character";
      if (!formData.salaryType) newErrors.salaryType = "This field is required at 5 character";
      if (!formData.tdsApplicable) newErrors.tdsApplicable = "This field is required at 1 character";
      
      if (!formData.flag ===''){ newErrors.flag = "NULL";}
      if (!formData.role) newErrors.role = "This field is required only integer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handlesave = async () => {
    try {
      // Ensure formData.ctc is updated correctly with the CTC value from the TextField
      if (formData.Grade && formData.Overall_Experience && result?.data?.length > 0) {
        formData.ctc = result.data[0]?.CTC || '';
      }

      // Capture form data values
      console.log("Form Data:", formData);
  
      // Construct SQL query
      const query = `
        INSERT INTO [dbo].[paym_Employee] (
         [pn_CompanyID], [pn_BranchID], [EmployeeCode], [Employee_First_Name],
          [Employee_Middle_Name], [Employee_Last_Name], [DateofBirth], [Password],
          [Gender], [status], [Employee_Full_Name], [Readerid], [OT_Eligible],
          [Pfno], [Esino], [OT_calc], [Grade], [Overall_Experience], [CTC], [basic_salary], [Bank_code], [Bank_Name],
          [Branch_Name], [Account_Type], [MICR_code], [IFSC_Code], [Other_Info],
          [Reporting_person], [ReportingID], [Reporting_email], [Pan_no], [salary_type],
          [TDS_Applicable], [Flag], [role], [Blood_Group], [Phone_No], [Alternate_Phone_No],
          [permanent_address], [Aadhar_Card], [Current_Address], [accountNo],[Father_Name] ,[Email]
      ,[Alternate_Email]
        ) VALUES (
          ${formData.pn_CompanyID}, ${formData.pn_BranchID}, '${formData.employeeCode}',
          '${formData.employeeFirstName}', '${formData.employeeMiddleName}', '${formData.employeeLastName}',
          '${formData.dateofBirth}', '${formData.password}', '${formData.gender}', '${formData.status}',
          '${formData.employeeFullName}', ${formData.readerid}, '${formData.otEligible}', '${formData.pfno}',
          '${formData.esino}', ${formData.otCalc}, '${formData.Grade}', ${formData.Overall_Experience}, ${formData.ctc}, ${formData.basicSalary},
          '${formData.bankCode}', '${formData.bankName}', '${formData.branchName}', '${formData.accountType}',
          '${formData.micrCode}', '${formData.ifscCode}', '${formData.otherInfo}', '${formData.reportingPerson}',
          ${formData.reportingId}, '${formData.reportingEmail}', '${formData.panNo}', '${formData.salaryType}',
          '${formData.tdsApplicable}', '${formData.flag}', ${formData.role}, '${formData.BloodGroup}',
          '${formData.PhoneNo}', '${formData.AlternatePhoneNo}', '${formData.permanantaddress}',
          '${formData.Aadharcard}', '${formData.CurrentAddress}', '${formData.accountNo}','${formData.FatherName}',
          '${formData.Email}','${formData.AlternateEmail}' 
        )
      `;
  
      console.log("SQL Query:", query);
  
      // Make API call
      const save = await postRequest(ServerConfig.url, SAVE, { query });
  
      if (save && save.status === 200) {
        alert("Data saved successfully");
        navigate("/Employeeprofile0909");
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred: " + error.message);
    }
  };

  
const getUniqueGrades = (grades) => {
  const uniqueSet = new Set(); // This will store unique values
  return grades.filter((grade) => {
    const key = grade.Slab_Type === "Level" ? grade.Level_Name : grade.Grade_Name;
    if (uniqueSet.has(key)) {
      return false; // Skip duplicates
    }
    uniqueSet.add(key); // Add unique values to the set
    return true;
  });
};


  const handleNext = () => {
    if (validateForm()) {
      setTabValue((prev) => {
        // Ensure the new tab index is within bounds
        return Math.min(prev + 1, 3);
      });
    }
  };


  const handleBack = () => {
    setTabValue((prev) => prev - 1);
  };

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
        <Grid item xs={10} sx={{ padding: "60px 0 0 100px", overflowY: "auto", marginLeft: 'auto', marginRight: 'auto', }}>

          <Typography variant="h5" align="center" fontWeight={'425'} gutterBottom textAlign={'left'}>
            Employee Form
          </Typography>


          <Card style={{ maxWidth: 800, width: "100%" }}>
            <CardContent>



              {profileTabValue === 0 && (
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} aria-label="employee-form-tabs">
                  <Tab label="General Information" />
                  <Tab label="Bank Details" />
                  <Tab label="Contact Details" />
                  <Tab label="Additional Info" />
                </Tabs>
              )}

             
              <form >


                <Grid container spacing={2} style={{ marginTop: "20px" }}>

                  {tabValue === 0 && (
                    <>

<Typography variant="h6"fontWeight={'500'} fontSize={'18px'} sx={{paddingLeft:'20px'}} gutterBottom>
  Company Information
</Typography>
<Divider style={{ width: '100%' }} />
                      {/* General Information Fields */}
                      <Grid item xs={12} sm={6}>
                      <TextField
                   label={
                    <span>
                      Company Name
                      <span style={{ color: 'red' }}>*</span>
                    </span>
                   }
                          InputLabelProps={{ shrink: true }}
                          // label="Company Name"
                          name="CompanyName"
                          fullWidth
                          value={loggedCompany.length > 0 ? loggedCompany[0].CompanyName : ""}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>


                      <Grid item xs={12} sm={4}>
                      <TextField
                  label={
                    <span>
                     Branch Name
                      <span style={{ color: 'red'}}>*</span>
                    </span>
                   }
                          InputLabelProps={{ shrink: true }}
                          // label="Branch Name"
                          fullWidth
                          name="BranchName"
                          value={loggedBranch.length > 0 ? loggedBranch[0].BranchName : ""}
                          variant="outlined"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>

  <Typography variant="h6"fontWeight={'500'} fontSize={'18px'}  sx={{paddingLeft:'20px' ,paddingTop:'20px'}} gutterBottom>
  Employee Basic  Information
</Typography>
<Divider style={{ width: '100%' }} />

<Grid xs={12} sm={12} display={'flex'} spacing={2} >
                      <Grid item xs={12} sm={4} sx={{paddingLeft:'16px',marginRight:'20px'}}>
                        <TextField
                          label={
                            <span>
                             Employee Code
                              <span style={{ color: 'red'}}>*</span>
                            </span>
                           }
                          name="employeeCode"
                          // label="Employee Code"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          // required
                          error={!!errors.employeeCode}
                          helperText={errors.employeeCode}
                          value={formData.employeeCode}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                      <FormControl fullWidth error={!!errors.status}>
                      <InputLabel shrink>Status<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>

                        <Select
                        
                          name="status"
                      label="Status"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.status}
                          helperText={errors.status}
                          value={formData.status}
                          onChange={handleInputChange}
                        >
                            <MenuItem value="A">Active</MenuItem>
                           <MenuItem value="I">Inactive</MenuItem>
                           </Select>
                           </FormControl>
                      </Grid>
                   
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={
                            <span>
                              First Name
                              <span style={{ color: 'red'}}>*</span>
                            </span>
                           }
                          name="employeeFirstName"
                          // label="First Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.employeeFirstName}
                          helperText={errors.employeeFirstName}
                          value={formData.employeeFirstName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                      <TextField
  name="employeeMiddleName"
  label="Middle Name"
  variant="outlined"
  fullWidth
  InputLabelProps={{ shrink: true }}
  value={formData.employeeMiddleName || ''}
  onChange={handleInputChange}
  inputProps={{ maxLength: 50 }}
/>
</Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={
                            <span>
                              Last Name
                              <span style={{ color: 'red'}}>*</span>
                            </span>
                           }
                          name="employeeLastName"
                          // label="Last Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.employeeLastName}
                          helperText={errors.employeeLastName}
                          value={formData.employeeLastName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    <Grid xs={12} sm={12}>
                    <Grid item xs={12} sm={4}  sx={{paddingLeft:'16px',paddingTop:"20px"}}>
                        <TextField
                         label={
                          <span>
                           Father Name
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="FatherName"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.FatherName  }
                          helperText={errors.FatherName}
                          value={formData.FatherName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>

                    
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={
                            <span>
                              Date Of Birth
                              <span style={{ color: 'red'}}>*</span>
                            </span>
                           }
                          name="dateofBirth"
                          // label="Date of Birth"
                          type="date"
                          variant="outlined"
                          fullWidth
                          //required
                          error={!!errors.dateofBirth}
                          helperText={errors.dateofBirth}
                          InputLabelProps={{ shrink: true }}
                          value={formData.dateofBirth}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth error={!!errors.gender}>
                        <InputLabel shrink>Gender<span style={{ color: 'red', marginLeft: '0.2rem' }}>*</span></InputLabel>
                          
                          <Select
                            name="gender"
                             label="Gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            displayEmpty
                          >
                            
                            <MenuItem value="">Select</MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                          </Select>
                          {errors.gender && (
                            <Typography color="error">{errors.gender}</Typography>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Blood Group
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="BloodGroup"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.BloodGroup}
                          helperText={errors.BloodGroup}
                          value={formData.BloodGroup}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    
                  
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label={
                            <span>
                              Password
                              <span style={{ color: 'red'}}>*</span>
                            </span>
                           }
                          name="password"
                          // label="Password"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.password}
                          helperText={errors.password}
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      {/* <Typography variant="h6"fontWeight={'500'} fontSize={'18px'}  sx={{paddingLeft:'20px' ,paddingTop:'20px'}} gutterBottom>
  Employee Basic  Information
</Typography>
<Divider style={{ width: '100%' }} />

<Grid xs={12} sm={12}> */}

                      
                    
                    
                      
                   
                    
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Phone No
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="PhoneNo"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.PhoneNo}
                          helperText={errors.PhoneNo}
                          value={formData.PhoneNo}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label="Alternate Phone NO"
                        
                         
                          name="AlternatePhoneNo"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.AlternatePhoneNo}
                          helperText={errors.AlternatePhoneNo}
                          value={formData.AlternatePhoneNo}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Email
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="Email"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.Email}
                          helperText={errors.Email}
                          value={formData.Email}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label="Alternate Email"
                          name="AlternateEmail"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.AlternateEmail}
                          helperText={errors.AlternateEmail}
                          value={formData.AlternateEmail}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <TextField
                         label={
                          <span>
                           Current Address
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="CurrentAddress"
                          // label="Address"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.CurrentAddress}
                          helperText={errors.CurrentAddress}
                          value={formData.CurrentAddress}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Permanant Address
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="permanantaddress"
                          // label="Address"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.permanantaddress}
                          helperText={errors.permanantaddress}
                          value={formData.permanantaddress}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Aadhaar No
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="Aadharcard"
                          // label="Full Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.Aadharcard}
                          helperText={errors.Aadharcard}
                          value={formData.Aadharcard}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                          Reader ID
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="readerid"
                          // label="Readerid"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.readerid}
                          helperText={errors.readerid}
                          value={formData.readerid}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           OT Eligible
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="otEligible"
                          // label="otEligible"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.otEligible}
                          helperText={errors.otEligible}
                          value={formData.otEligible}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           PF No
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="pfno"
                          // label="pfno"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.pfno}
                          helperText={errors.pfno}
                          value={formData.pfno}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Esi No
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="esino"
                          // label="esino"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.esino}
                          helperText={errors.esino}
                          value={formData.esino}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           OT Calculation
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="otCalc"
                          // label="otCalc"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.otCalc}
                          helperText={errors.otCalc}
                          value={formData.otCalc}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="grade-select-label">{labelHeader}</InputLabel>
      <Select
        labelId="grade-select-label"
        name="Grade" // Keep this static or change based on your requirements
        value={formData.Grade}
        onChange={handleInputChange}
        label={labelHeader}
      >
        {getUniqueGrades(gradeData).map((grade) => (
          // Check the Slab_Type to decide which name to show
          <MenuItem key={grade.id} value={grade.Slab_Type === "Level" ? grade.Level_Name : grade.Grade_Name}>
            {grade.Slab_Type === "Level" ? grade.Level_Name : grade.Grade_Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>
                 <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          
                           'Overall_Experience'
                            
                         }
                          name="Overall_Experience"
                          // label="otCalc"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                        
                          value={formData.Overall_Experience}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={4}>
                      <TextField
  label="CTC"
  variant="outlined"
  fullWidth
  value={
    formData.Grade && formData.Overall_Experience && result?.data?.length > 0 
      ? result.data[0]?.CTC || (result.data[0]?.Message === 'No matching records found.' ? 'Choose Correct Grade' : '')
      : ''
  }
  InputProps={{
    readOnly: true,
    style: {
      color: result?.data?.[0]?.Message === 'No matching records found.' ? 'red' : 'inherit',
      fontSize: result?.data?.[0]?.Message === 'No matching records found.' ? '0.95rem' : 'inherit',
    },
  }}
  onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}  // Update the formData.ctc here
/>

</Grid>




    
                <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Basic Salary
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="basicSalary"
                          // label="basicSalary"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.basicSalary}
                          helperText={errors.basicSalary}
                          value={formData.basicSalary}
                          onChange={handleInputChange}
                        />
                      </Grid>

                    </>
                  )}
                  {tabValue === 1 && (
                    <>
                      {/* Bank Details Fields */}
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Bank Code
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="bankCode"
                          // label="Bank Code"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.bankCode}
                          helperText={errors.bankCode}
                          value={formData.bankCode}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Bank Name
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="bankName"
                          // label="Bank Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.bankName}
                          helperText={errors.bankName}
                          value={formData.bankName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Branch Name
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="branchName"
                          // label="Branch Name"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.branchName}
                          helperText={errors.branchName}
                          value={formData.branchName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Account Type
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="accountType"
                          // label="accountType"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.accountType}
                          helperText={errors.accountType}
                          value={formData.accountType}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Account No
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="accountNo"
                          // label="AccountNumber"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.accountNo}
                          helperText={errors.accountNo}
                          value={formData.accountNo}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Micr Code
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="micrCode"
                          // label="MICR Code"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.micrCode}
                          helperText={errors.micrCode}
                          value={formData.micrCode}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Ifsc Code
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="ifscCode"
                          // label="IFSC Code"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.ifscCode}
                          helperText={errors.ifscCode}
                          value={formData.ifscCode}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </>
                  )}
                  {tabValue === 2 && (
                    <>
                      {/* Contact Details Fields */}
                     
                      <Grid item xs={12} sm={4}>
                        <TextField

                          name="otherInfo"
                          label="Other Information"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          
                          error={!!errors.otherInfo}
                          helperText={errors.otherInfo}
                          value={formData.otherInfo || ''}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                         Reporting Person
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="reportingPerson"
                          // label="Reporting Person"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.reportingPerson}
                          helperText={errors.reportingPerson}
                          value={formData.reportingPerson}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Reporting Id
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="reportingId"
                          // label="Reporting ID"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.reportingId}
                          helperText={errors.reportingId}
                          value={formData.reportingId}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Reporting Email
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="reportingEmail"
                          // label="Reporting Email"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.reportingEmail}
                          helperText={errors.reportingEmail}
                          value={formData.reportingEmail}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </>
                  )}
                  {tabValue === 3 && (
                    <>
                      {/* Additional Info Fields */}
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Pan No
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="panNo"
                          // label="PAN Number"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.panNo}
                          helperText={errors.panNo}
                          value={formData.panNo}
                          onChange={handleInputChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Salary Type
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="salaryType"
                          // label="Salary Type"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.salaryType}
                          helperText={errors.salaryType}
                          value={formData.salaryType}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Tds Applicable
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="tdsApplicable"
                          // label="TDS Applicable"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.tdsApplicable}
                          helperText={errors.tdsApplicable}
                          value={formData.tdsApplicable}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                        
                          name="flag"
                          label="Flag"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          
                          error={!!errors.flag}
                          helperText={errors.flag}
                          value={formData.flag || ''}
                          onChange={handleInputChange}
                        />  
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                         label={
                          <span>
                           Role
                            <span style={{ color: 'red'}}>*</span>
                          </span>
                         }
                          name="role"
                          // label="Role"
                          variant="outlined"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          //required
                          error={!!errors.role}
                          helperText={errors.role}
                          value={formData.role}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Grid container spacing={2} justifyContent="flex-end" style={{ marginTop: "20px" }}>
                  {tabValue > 0 && (
                    <Grid item>
                      <Button variant="contained" onClick={handleBack}>
                        Back
                      </Button>
                    </Grid>
                  )}
                  {tabValue < 3 ? (
                    <Grid item>
                      <Button variant="contained" onClick={handleNext}>
                        Next
                      </Button>
                    </Grid>
                  ) : (
                    <Grid item>
                      <Button variant="contained" onClick={handlesave}>
                        Submit
                      </Button>
                    </Grid>
                  )}
                </Grid>

              </form>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Grid>


  );
}



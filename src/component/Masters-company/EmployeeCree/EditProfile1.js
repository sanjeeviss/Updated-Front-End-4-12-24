import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import Sidenav from "../../Home Page-comapny/Sidenav1";
import Navbar from "../../Home Page-comapny/Navbar1";
import './custom.css'
import {
  Button,
  TextField,
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  
} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from '@mui/material';

import nodata from '../../../images/NoDataImage.jpeg';

function EditEmployeeh1() {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState({});
  const [v_DepartmentName, setDepartmentName] = useState('');
  const [v_DesignationName, setDesignationName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [image_data, setEmployeeImage] = useState(''); // State to hold the employee image
  const nodata = 'path_to_placeholder_image'; // Fallback image path
  const [tabIndex, setTabIndex] = useState(0); // State for active tab
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [isLoggedin, setLoggedin] = useState(sessionStorage.getItem("user"));
  const [branch, setBranch] = useState(sessionStorage.getItem('branch'));
  const [loggedBranch, setLoggedBranch] = useState([]);  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isEditable, setIsEditable] = useState(false); // Initially fields are disabled
  const [formData, setFormData] = useState(employeeData); // Initialize with employeeData
  const [tableData, setTableData] = useState({});
  const fetchEmployeeData = async () => {
    const query = `
      SELECT 
          e.Employee_Full_Name, 
          e.Phone_No, 
          e.Status, 
          e.CTC, 
          e.Bank_Code, 
          e.Bank_Name, 
          e.Branch_Name, 
          e.accountNo,
           e.EmployeeCode,  -- New field
          e.Readerid,      -- New field
          e.Account_Type,  -- New field
           e.Father_Name,     -- New field for Father Name
      e.Blood_Group,     -- New field for Blood Group
      e.MICR_code,      -- New field for MICR Code
      e.IFSC_Code,      -- New field for IFSC Code
      e.permanent_address, -- New field for Permanent Address
       e.OT_Eligible,    -- New field for OT_Eligible
          e.TDS_Applicable, -- New field for TDS_Applicable
          e.salary_type,    -- New field for Salary Type
          e.Reporting_email,-- New field for Reporting Email
          p.pn_DepartmentId,
          p.pn_DesingnationId
      FROM 
          paym_Employee e 
      JOIN 
          paym_employee_profile1 p ON e.pn_EmployeeID = p.pn_EmployeeID
      WHERE 
          e.pn_EmployeeID = ${employeeId};
    `;
    
    try {
      const response = await postRequest(ServerConfig.url, REPORTS, { query });
      if (response.status === 200) {
        setEmployeeData(response.data[0]);
        setTableData(response.data[0]); // Set the tableData state
        await fetchEmployeeImage(response.data[0].pn_EmployeeID);
        await fetchDepartments(response.data[0].pn_DepartmentId);
        await fetchDesignations(response.data[0].pn_DesingnationId);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);
  useEffect(() => {
    async function fetchBranchData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query:` SELECT * FROM paym_Branch WHERE Branch_User_Id = '${isLoggedin}'`,
        });

        if (loggedBranchData.data && loggedBranchData.data.length > 0) {
          setLoggedBranch(loggedBranchData.data);
        } else {
          console.log("No branch found for the logged-in user");
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }

    if (isLoggedin) {
      fetchBranchData();
    }
  }, [isLoggedin]);

  const fetchDesignations = async () => {
    if (loggedBranch.length > 0) {
      const branchId = loggedBranch[0].pn_BranchID; // Get the branch ID
      setIsLoading(true);
  
      try {
        const DesignationsData = await postRequest(ServerConfig.url, REPORTS, {
          query:` SELECT * FROM paym_Designation WHERE BranchID = '${branchId}'`, // Filter designations by branch ID
        });
  
        if (DesignationsData.data) {
          setDesignations(DesignationsData.data);
        } else {
          console.log("No Designations found for the selected branch");
        }
      } catch (error) {
        console.error("Error fetching Designations data:", error);
        setSnackbarMessage("Failed to load designations. Please try again.");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  useEffect(() => {
    if (loggedBranch.length > 0) {
      fetchDesignations();
    }
  }, [loggedBranch]);


useEffect(() => {
  async function fetchBranchData() {
    try {
      const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
        query:` SELECT * FROM paym_Branch WHERE Branch_User_Id = '${isLoggedin}'`, // Query to fetch branches for the logged-in user
      });

      if (loggedBranchData.data && loggedBranchData.data.length > 0) {
        setLoggedBranch(loggedBranchData.data); // Set the fetched branch data
      } else {
        console.log("No branch found for the logged-in user");
      }
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  }

  if (isLoggedin) {
    fetchBranchData(); // Fetch branch data on login
  }
}, [isLoggedin]);

// Fetch department data based on the logged-in branch
const fetchDepartments = async () => {
  if (loggedBranch.length > 0) {
    const branchId = loggedBranch[0].pn_BranchID; // Extract the branch ID from fetched branch data
    setIsLoading(true);

    try {
      const departmentsData = await postRequest(ServerConfig.url, REPORTS, {
        query: `SELECT * FROM paym_Department WHERE pn_BranchID = '${branchId}'`, // Fetch departments for the specific branch
      });

      if (departmentsData.data) {
        setDepartments(departmentsData.data); // Set department data
      } else {
        console.log("No departments found for the selected branch");
      }
    } catch (error) {
      console.error("Error fetching department data:", error);
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  }
};

// Fetch departments when loggedBranch is available
useEffect(() => {
  if (loggedBranch.length > 0) {
    fetchDepartments();
  }
}, [loggedBranch]);

  
  const handleStatusChange = (event) => {
    const value = event.target.value;
    setEmployeeData({ ...employeeData, Status: value === 'Active' ? 'A' : 'I' });
  };
  const fetchEmployeeImage = async () => {
    const query = `
        SELECT 
            e.image_data
        FROM 
            paym_employee_profile1 e
        WHERE 
            e.pn_EmployeeID = ${employeeId};
    `;

    try {
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        if (response.status === 200) {
            setEmployeeImage(response.data[0]?.image_data || nodata);
        }
    } catch (error) {
        console.error('Error fetching employee image:', error);
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue); // Update the active tab
  };

  const handleOTChange = (event) => {
    const value = event.target.value;
    setEmployeeData({ ...employeeData, OT_Eligible: value });
  };
  
  const handleTDSChange = (event) => {
    const value = event.target.value;
    setEmployeeData({ ...employeeData, TDS_Applicable: value });
  };

  const handleDropdownChange = async (field, value) => {
    let updatedState = { ...employeeData, [field]: value };

    if (field === 'pn_DepartmentId') {
        setEmployeeData(updatedState);
        const department = departments.find((dept) => dept.pn_DepartmentID === value);
        setDepartmentName(department.v_DepartmentName);

        // Update the department in paym_employee_profile1
        const updateProfileQuery = `
            UPDATE paym_employee_profile1
            SET pn_DepartmentId = '${value}'
            WHERE pn_EmployeeID = ${employeeId};
        `;

        try {
            const response = await postRequest(ServerConfig.url, REPORTS, { query: updateProfileQuery });
            if (response.status === 200) {
                console.log("Department updated successfully in paym_employee_profile1.");
            } else {
                console.error("Error updating department in paym_employee_profile1:", response);
            }
        } catch (error) {
            console.error("Error during department update:", error);
        }

    } else if (field === 'pn_DesingnationId') {
        setEmployeeData(updatedState);
        const designation = designations.find((desig) => desig.pn_DesignationID === value);
        setDesignationName(designation.v_DesignationName);

        // Update the designation in paym_employee_profile1
        const updateProfileQuery = `
            UPDATE paym_employee_profile1
            SET pn_DesingnationId = '${value}'
            WHERE pn_EmployeeID = ${employeeId};
        `;

        try {
            const response = await postRequest(ServerConfig.url, REPORTS, { query: updateProfileQuery });
            if (response.status === 200) {
                console.log("Designation updated successfully in paym_employee_profile1.");
            } else {
                console.error("Error updating designation in paym_employee_profile1:", response);
            }
        } catch (error) {
            console.error("Error during designation update:", error);
        }
    } else {
        setEmployeeData(updatedState);
    }
};


  const handleSalaryTypeChange = (event) => {
    const value = event.target.value;
     console.log('Selected Salary Type:', value); // Log selected value for debugging
    setEmployeeData((prevState) => ({
      ...prevState,
      salary_type: value,
    }));
  };
  

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend =  () => {
        const base64data = reader.result.split(',')[1]; // Get the base64 string
        setEmployeeImage(base64data); // Update the state with the new image data
        setEmployeeData({ ...employeeData, image_data: base64data });
        // Store the image data in local storage
        localStorage.setItem('employeeImage', image_data);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const base64ToBinary = (base64) => {
    const binaryString = atob(base64);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);
  
    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes;
  };
  const handleUpdate = async () => {
    const {
      Employee_Full_Name, Phone_No, CTC, Bank_Code, Bank_Name, Branch_Name, accountNo, Status,
      pn_DepartmentId, pn_DesingnationId, Father_Name, Blood_Group, permanent_address,
      OT_Eligible, TDS_Applicable, salary_type, Reporting_email, image_data, Readerid, Account_Type
    } = employeeData;
  
    if (!Employee_Full_Name || !Phone_No) {
      alert("Employee Full Name and Phone Number are required.");
      return;
    }
  
    // Construct the employee update query for paym_Employee table
    const fieldsToUpdateEmployee = [];
  
    if (Employee_Full_Name) fieldsToUpdateEmployee.push(Employee_Full_Name = '${Employee_Full_Name}');
    if (Phone_No) fieldsToUpdateEmployee.push(Phone_No = '${Phone_No}');
    if (CTC) fieldsToUpdateEmployee.push(CTC = '${CTC}');
    if (Father_Name) fieldsToUpdateEmployee.push(Father_Name = '${Father_Name}');
    if (Blood_Group) fieldsToUpdateEmployee.push(Blood_Group = '${Blood_Group}');
    if (permanent_address) fieldsToUpdateEmployee.push(permanent_address = '${permanent_address}');
    if (OT_Eligible) fieldsToUpdateEmployee.push(OT_Eligible = '${OT_Eligible}');
    if (TDS_Applicable) fieldsToUpdateEmployee.push(TDS_Applicable = '${TDS_Applicable}');
    if (salary_type) fieldsToUpdateEmployee.push(salary_type = '${salary_type}');
    if (Reporting_email) fieldsToUpdateEmployee.push(Reporting_email = '${Reporting_email}');
    if (Bank_Code) fieldsToUpdateEmployee.push(Bank_Code = '${Bank_Code}');
    if (Bank_Name) fieldsToUpdateEmployee.push(Bank_Name = '${Bank_Name}');
    if (Branch_Name) fieldsToUpdateEmployee.push(Branch_Name = '${Branch_Name}');
    if (accountNo) fieldsToUpdateEmployee.push(accountNo = '${accountNo}');
    if (Status) fieldsToUpdateEmployee.push(Status = '${Status}');
    if (Readerid) fieldsToUpdateEmployee.push(Readerid = '${Readerid}');
    if (Account_Type) fieldsToUpdateEmployee.push(Account_Type = '${Account_Type}');
  
    const updateEmployeeQuery = `
      UPDATE paym_Employee
      SET ${fieldsToUpdateEmployee.join(', ')}
      WHERE pn_EmployeeID = ${employeeId};
    `;
  
    // Update image_data if present
    let updateProfileQuery = '';
    if (pn_DepartmentId || pn_DesingnationId || image_data) {
      const binaryImageData = image_data ? base64ToBinary(image_data) : null;
      const imageHex = binaryImageData ? [...binaryImageData].map(b => b.toString(16).padStart(2, '0')).join('') : '';
  
      updateProfileQuery = `
        UPDATE paym_employee_profile1
        SET 
          pn_DepartmentId = '${pn_DepartmentId}', 
          pn_DesingnationId = '${pn_DesingnationId}', 
          ${image_data ?`image_data = CONVERT(VARBINARY(MAX), 0x${imageHex}, 1)` : ''}
        WHERE pn_EmployeeID = ${employeeId};
      `;
    }
  
    try {
      // Update employee details in paym_Employee table
      if (fieldsToUpdateEmployee.length > 0) {
        const responseEmployee = await postRequest(ServerConfig.url, REPORTS, { query: updateEmployeeQuery });
        if (responseEmployee.status === 200) {
          console.log("Employee details updated successfully in paym_Employee");
        } else {
          console.error("Error updating employee details in paym_Employee:", responseEmployee);
        }
      }
  
      // Update employee profile details in paym_employee_profile1 table
      if (updateProfileQuery) {
        const responseProfile = await postRequest(ServerConfig.url, REPORTS, { query: updateProfileQuery });
        if (responseProfile.status === 200) {
          console.log("Employee profile updated successfully.");
          setEmployeeData({ ...employeeData, image_data: image_data }); // Update the employeeData state with the new image
        } else {
          console.error("Error updating employee profile:", responseProfile);
        }
      }
  
    } catch (error) {
      console.error("Error during employee profile update:", error);
    }
  };
  
const handleSaveClick = async () => {
  await handleUpdate(); // Call the update function when the save button is clicked
  setIsEditable(false); // Disable form fields after saving
};
const handleEdit = () => {
  setIsEditable(true); // Enable form fields
};
const handleReset = () => {
  setFormData(employeeData); // Reset formData to original employeeData values
  setIsEditable(false); // Disable form fields again
};

useEffect(() => {
  // If the employeeData is fetched asynchronously, you can use useEffect to update the formData
  setFormData(employeeData);
}, [employeeData]);
const handleBackClick = () => {
  if (tabIndex > 0) {
    setTabIndex(tabIndex - 1);
  }
}

  if (isLoading) return <div>Loading...</div>;

  return (
    
    <Grid item xs={12}>
    <div style={{ backgroundColor: "#fff" }}>
    <Navbar />
    <Box height={30} />
    <Box sx={{ display: "flex" }}>
      <Sidenav />
      <Grid  
        item
        xs={12}
       
        style={{ marginLeft: "auto", marginRight: "auto", margin: "50px 20px 50px 20px" }}  
        >
    <Grid container style={{ margin: '20px' }}>
      <Paper style={{ padding: '20px', width: '100%' }}>
        <Grid container spacing={2}>
          {/* Left Side: Image */}
          <Grid style={{ paddingTop: "50px", paddingRight: "20px" }}>
            <Grid style={{ width: "300px", backgroundColor: "#608fc4", height: '530px', paddingTop:'10px'}}>
              <Grid>
                <div style={{
                  position: 'relative',
                  border: '3px solid #edf1f5',
                  borderRadius: '54px',
                  padding: '4px',
                  display: 'inline-block',
                  backgroundColor: '#608fc4',
                 
                }}>
                  <img
                    src={image_data ? `data:image/jpeg;base64,${image_data}` : nodata}
                    alt="Employee Avatar"
                    width={100}
                    height={100}
                    style={{
                      borderRadius: '50px',
                      border: '2px solid black',
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="icon-button-file"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton component="span">
                        <EditIcon />
                      </IconButton>
                    </label>
                  </div>
                </div>
                <Typography variant="h6" style={{ fontStyle: 'italic', color:'white'}}>{tableData.EmployeeCode}</Typography>
                <Typography variant="h6" style={{ fontStyle: 'italic',color:'white',paddingBottom:'20px' }}>{tableData.Employee_Full_Name}</Typography>
                <div style={{
                  // position: 'relative',
                
                  // borderRadius: '54px',
                  // padding: '4px',
                  // display: 'inline-block',
                  backgroundColor: '#ffffff'
                }}>
                <Table style={{ width: '100%' }}>
  <TableBody>
    <TableRow>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "150px", // Adjusted maxWidth for the label
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <strong>Designation:</strong>
      </TableCell>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "290px", // Adjusted for the value
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
 <Typography variant="body1" noWrap>
          {designations.find((designation) => designation.pn_DesignationID === tableData.pn_DesingnationId)?.v_DesignationName}
        </Typography>  
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <strong>Department:</strong>
      </TableCell>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "290px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
<Typography variant="body1" noWrap>
          {departments.find((department) => department.pn_DepartmentID === tableData.pn_DepartmentId)?.v_DepartmentName}
        </Typography>      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <strong>Blood Group:</strong>
      </TableCell>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "290px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
 <Typography variant="body1" noWrap>
          {tableData.Blood_Group}
        </Typography>      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <strong>Father Name:</strong>
      </TableCell>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "290px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
 <Typography variant="body1" noWrap>
          {tableData.Father_Name}
        </Typography>      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <strong>Phone:</strong>
      </TableCell>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "290px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {tableData.Phone_No}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "150px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <strong>CTC:</strong>
      </TableCell>
      <TableCell
        style={{
          paddingTop: '20px',
          textAlign: "left",
          maxWidth: "290px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
 <Typography variant="body1" noWrap>
          {tableData.CTC}
        </Typography>      </TableCell>
    </TableRow>
  </TableBody>
</Table>
</div>
              </Grid>
            </Grid>
          </Grid>
          {/* Right Side: Form Fields */}
          <Grid item xs={12} sm={7}>
            <Box>
              <Tabs value={tabIndex} onChange={handleTabChange} indicatorColor="primary" textColor="black" style={{fontWeight:'bold'}}>
                <Tab label="Basic Details"  style={{fontWeight:'bold'}}/>
                <Tab label="Bank Details"  style={{fontWeight:'bold'}}/>
                <Tab label="Contact Details"  style={{fontWeight:'bold'}} />
                <Tab label="Other Details"  style={{fontWeight:'bold'}}/>
              </Tabs>
              <Box hidden={tabIndex !== 0}>
                {/* General Information Tab Content */}
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" , textColor:"black" }}>
                  <TextField
                    label="Employee Code"
                    variant="outlined"
                    fullWidth
                    value={employeeData.EmployeeCode || ''}
                
                  />
                </Grid>
                <Grid item xs={12}  sm={12}  style={{padding:"10px",paddingTop:"20px", textColor:"black" }}>

<TextField
  label="Full Name"
  variant="outlined"
  fullWidth
  value={employeeData.Employee_Full_Name || ''}
  onChange={(e) => setEmployeeData({ ...employeeData, Employee_Full_Name: e.target.value })}
  disabled={!isEditable}

/>
</Grid>

<Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" }}>
 
<FormControl variant="outlined" fullWidth>
  <InputLabel>Department</InputLabel>
  <Select
    label="Department"
    value={employeeData.pn_DepartmentId || ''}
    onChange={(e) => {
      handleDropdownChange('pn_DepartmentId', e.target.value);
     
    }}
    fullWidth
    variant="outlined"
    disabled={!isEditable}
  >
    {departments.map((department) => (
      <MenuItem key={department.pn_DepartmentID} value={department.pn_DepartmentID}>
        {department.v_DepartmentName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

  
</Grid>
<Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" }}>
<FormControl variant="outlined" fullWidth>
  <InputLabel>Designation</InputLabel>
  <Select
    label="Designation"
    value={employeeData.pn_DesingnationId || ''}
    onChange={(e) => handleDropdownChange('pn_DesingnationId', e.target.value)}
    fullWidth
    variant="outlined"
    disabled={!isEditable}
  >
    {designations.map((designation) => (
      <MenuItem key={designation.pn_DesignationID} value={designation.pn_DesignationID}>
        {designation.v_DesignationName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

</Grid>
<Grid item xs={12}  sm={12}  style={{padding:"10px",paddingTop:"20px", textColor:"black" }}>
<TextField
// className='legent'
  label="CTC"
  variant="outlined"
  fullWidth
  value={employeeData.CTC || ''}
  onChange={(e) => setEmployeeData({ ...employeeData, CTC: e.target.value })}
  disabled={!isEditable}
/>
</Grid>
<Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" , textColor:"black" }}>
<FormControl variant="outlined" fullWidth>
<InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={employeeData.Status === 'A' ? 'Active' : 'Inactive'}
                    onChange={handleStatusChange}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Box display="flex" justifyContent="flex-end" mt={2}>
    <Button variant="contained" color="primary" onClick={() => setTabIndex(1)}>
      Next
    </Button>
  </Box>
                
              </Box>

              <Box hidden={tabIndex !== 2}>
                {/* Contact Details Tab Content */}
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px", textColor:"black"  }}>
                  <TextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    value={employeeData.Phone_No || ''}
                    onChange={(e) => setEmployeeData({ ...employeeData, Phone_No: e.target.value })}
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" , textColor:"black" }}>
    <TextField
      label="Permanent Address"
      variant="outlined"
      fullWidth
      value={employeeData.permanent_address || ''}
      onChange={(e) => setEmployeeData({ ...employeeData, permanent_address: e.target.value })}
      disabled={!isEditable}
    />
  </Grid>
  <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" , textColor:"black" }}>
                  <TextField
                    label="Reader ID"
                    variant="outlined"
                    fullWidth
                    value={employeeData.Readerid || ''}
                    onChange={(e) => setEmployeeData({ ...employeeData, Readerid: e.target.value })}
                    disabled={!isEditable}
                  />
                </Grid>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="contained" spacing={2} color="secondary" onClick={handleBackClick} style={{ marginRight: '10px' }}>
      Back
    </Button>
    <Button variant="contained" color="primary" onClick={() => setTabIndex(3)}>
      Next
    </Button>
  </Box>
                {/* Add more fields here */}
              </Box>

              <Box hidden={tabIndex !== 1}>
                {/* Bank Details Tab Content */}
                <Grid item xs={12} sm={12} style={{padding:"10px",paddingTop: "20px", textColor:"black" }}>
              <TextField
                  label="Bank Code"
                  variant="outlined"
                  fullWidth
                  value={employeeData.Bank_Code || ''}
                  onChange={(e) => setEmployeeData({ ...employeeData, Bank_Code: e.target.value })}
                  disabled={!isEditable}
                />
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" , textColor:"black" }}>
                  <TextField
                    label="Bank Name"
                    variant="outlined"
                    fullWidth
                    value={employeeData.Bank_Name || ''}
                    onChange={(e) => setEmployeeData({ ...employeeData, Bank_Name: e.target.value })}
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px", textColor:"black"  }}>
                  <TextField
                    label="Branch Name"
                    variant="outlined"
                    fullWidth
                    value={employeeData.Branch_Name || ''}
                    onChange={(e) => setEmployeeData({ ...employeeData,Branch_Name: e.target.value })}
                    disabled={!isEditable}
                  />
                </Grid>
                <Grid item xs={12}  sm={12}  style={{padding:"10px",paddingTop:"20px", textColor:"black" }}>
                <TextField
                  label="Account No"
                  variant="outlined"
                  fullWidth
                  value={employeeData.accountNo || ''}
                  onChange={(e) => setEmployeeData({ ...employeeData, accountNo: e.target.value })}
                  disabled={!isEditable}
                  

                 
                />
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" , textColor:"black" }}>
    <TextField
      label="MICR Code"
      variant="outlined"
      fullWidth
      value={employeeData.MICR_code || ''}
      onChange={(e) => setEmployeeData({ ...employeeData, MICR_code: e.target.value })}
      disabled={!isEditable}
    />
  </Grid>
  <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px", textColor:"black"  }}>
    <TextField
      label="IFSC Code"
      variant="outlined"
      fullWidth
      value={employeeData.IFSC_Code || ''}
      onChange={(e) => setEmployeeData({ ...employeeData,IFSC_Code: e.target.value })}
      disabled={!isEditable}
    />
  </Grid>
  <Box display="flex" justifyContent="flex-end" spacing={2} mt={2}>
  <Button variant="contained"  spacing={2} color="secondary" onClick={handleBackClick} style={{ marginRight: '10px' }}>
      Back
    </Button>
    <Button variant="contained" style={{paddingLeft:'10px'}} color="primary" onClick={() => setTabIndex(2)}>
      Next
    </Button>
  </Box>  {/* Add more fields here */}
              </Box>

              <Box hidden={tabIndex !== 3}>
                {/* Address Details Tab Content */}
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px"}}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel>OT Eligible</InputLabel>
                  <Select
                    label="OT Eligible"
                    value={employeeData.OT_Eligible || ''}
                    onChange={handleOTChange}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  >
                    <MenuItem value="y">Yes</MenuItem>
                    <MenuItem value="n">No</MenuItem>
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" }}>
                <FormControl variant="outlined" fullWidth>
                <InputLabel>TDS Applicable</InputLabel>
                  <Select
                    label="TDS Applicable"
                    value={employeeData.TDS_Applicable || ''}
                    onChange={handleTDSChange}
                    fullWidth
                    variant="outlined"
                    disabled={!isEditable}
                  >
                    <MenuItem value="Y">Yes</MenuItem>
                    <MenuItem value="N">No</MenuItem>
                    
                  </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" }}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Salary Type</InputLabel>
                    <Select
                     label="Salary Type"
                      value={employeeData.salary_type || ''}
                      onChange={handleSalaryTypeChange}
                      fullWidth
                      variant="outlined"
                      disabled={!isEditable}
                    >
                      <MenuItem value="Month">Monthly</MenuItem>
                      <MenuItem value="Year">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
    <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" }}>
    <TextField
        label="Reporting Email"
        variant="outlined"
        fullWidth
        value={employeeData.Reporting_email || ''}
        onChange={(e) => setEmployeeData({ ...employeeData, Reporting_email: e.target.value })}
        disabled={!isEditable}
      />
    </Grid>
                
  <Grid item xs={12} sm={12} style={{ padding: "10px", paddingTop: "20px" }}>
    <TextField
      label="Account Type"
      variant="outlined"
      fullWidth
      value={employeeData.Account_Type || ""}
      onChange={(e) => setEmployeeData({ ...employeeData, Account_Type: e.target.value })}
      disabled={!isEditable}
      style={{ marginBottom: "20px" }}
    />
  </Grid>
 
  <Grid item>
  <Stack direction="row"  justifyContent="flex-end">
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleBackClick} style={{ marginRight: '10px' }}>
      Back
      
    </Button>

    <Button 
      variant="contained" 
      color="secondary" 
      onClick={handleEdit} style={{ marginRight: '10px' }}>
      Edit
    </Button>

    <Button 
      variant="contained" 
      color="error" 
      onClick={handleReset} style={{ marginRight: '10px' }}>
      Cancel
    </Button>

    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleSaveClick} style={{ marginRight: '10px' }}>
      Save
    </Button >
  </Stack>
</Grid>

                {/* Add more fields here */}
              </Box>
            </Box>
           
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    </Grid>
    </Box>
    </div>
    </Grid>

  );
}

export default EditEmployeeh1;
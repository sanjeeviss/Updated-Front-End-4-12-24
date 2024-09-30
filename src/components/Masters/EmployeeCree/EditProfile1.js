import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import {
  Button,
  TextField,
  Typography,
  Avatar,
  Box,
  Grid,
  Paper,
  IconButton,  
} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";

import nodata from '../../../images/NoDataImage.jpeg';

function EditEmployee() {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState({});
  const [v_DepartmentName, setDepartmentName] = useState('');
  const [v_DesignationName, setDesignationName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [image_data, setEmployeeImage] = useState(''); // State to hold the employee image
  const nodata = 'path_to_placeholder_image'; // Fallback image path

  const navigate = useNavigate();


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
        await fetchEmployeeImage(response.data[0].pn_EmployeeID);
        await fetchDepartmentName(response.data[0].pn_DepartmentId);
        await fetchDesignationName(response.data[0].pn_DesingnationId);
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    } finally {
      setIsLoading(false);
    }
  };  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);


  const fetchDepartmentName = async (pn_DepartmentId) => {
    const query = `
      SELECT v_DepartmentName 
      FROM paym_Department 
      WHERE pn_DepartmentID = ${pn_DepartmentId};
    `;
    
    try {
      const response = await postRequest(ServerConfig.url, REPORTS, { query });
      if (response.status === 200 && response.data.length > 0) {
        setDepartmentName(response.data[0].v_DepartmentName);
      }
    } catch (error) {
      console.error('Error fetching department name:', error);
    }
  };

  const fetchDesignationName = async (pn_DesingnationId) => {
    const query = `
      SELECT v_DesignationName 
      FROM paym_Designation 
      WHERE pn_DesignationID = ${pn_DesingnationId};
    `;
    
    try {
      const response = await postRequest(ServerConfig.url, REPORTS, { query });
      if (response.status === 200 && response.data.length > 0) {
        setDesignationName(response.data[0].v_DesignationName);
      }
    } catch (error) {
      console.error('Error fetching designation name:', error);
    }
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
            // Use optional chaining (?.) to safely access image_data
            setEmployeeImage(response.data[0]?.image_data || nodata);
        }
    } catch (error) {
        console.error('Error fetching employee image:', error);
    }
};
  
const handleUpdate = async () => {
  const { 
    Employee_Full_Name, Phone_No, CTC, Bank_Code, Bank_Name, Branch_Name, accountNo, Status,
    pn_DepartmentId, pn_DesingnationId, image_data // Added image_data here
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
  if (Bank_Code) fieldsToUpdateEmployee.push(Bank_Code = '${Bank_Code}');
  if (Bank_Name) fieldsToUpdateEmployee.push(Bank_Name = '${Bank_Name}');
  if (Branch_Name) fieldsToUpdateEmployee.push(Branch_Name = '${Branch_Name}');
  if (accountNo) fieldsToUpdateEmployee.push(accountNo = '${accountNo}');
  if (Status) fieldsToUpdateEmployee.push(Status = '${Status}');

  const updateEmployeeQuery = `
    UPDATE paym_Employee
    SET ${fieldsToUpdateEmployee.join(', ')}
    WHERE pn_EmployeeID = ${employeeId};
  `;

  // Convert base64 image_data to binary using atob()
  const base64ToBinary = (base64) => {
    const binaryString = atob(base64);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes;
  };

  // Construct the employee profile update query for paym_employee_profile1 table
  const binaryImageData = image_data ? base64ToBinary(image_data) : null;
  const imageHex = binaryImageData ? [...binaryImageData].map(b => b.toString(16).padStart(2, '0')).join('') : '';

  const updateProfileQuery = `
    UPDATE paym_employee_profile1
    SET pn_DepartmentId = '${pn_DepartmentId}', pn_DesingnationId = '${pn_DesingnationId}', image_data = CONVERT(VARBINARY(MAX), 0x${imageHex}, 1)
    WHERE pn_EmployeeID = ${employeeId};
  `;

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
    if (pn_DepartmentId || pn_DesingnationId || image_data) {
      const responseProfile = await postRequest(ServerConfig.url, REPORTS, { query: updateProfileQuery });
      if (responseProfile.status === 200) {
        console.log("Employee profile updated successfully.");
      } else {
        console.error("Error updating employee profile:", responseProfile);
      }
    }
  } catch (error) {
    console.error("Error during employee profile update:", error);
  }
};


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1]; // Get the base64 string
        setEmployeeImage(base64data); // Update the state with the new image data
        // Update the employee data with the new image
        setEmployeeData({ ...employeeData, image_data: base64data });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSaveClick = async () => {
    await handleUpdate(); // Call the update function when the save button is clicked
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Grid container justifyContent="center" style={{ margin: '20px' }}>
      <Paper style={{ padding: '20px', width: '100%', maxWidth: '600px' }}>
        <Typography variant="h4" style={{paddingBottom:"10px"}}>Edit Employee</Typography>
       
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            src={image_data ?` data:image/jpeg;base64,${image_data}` : nodata}
            alt="Employee Avatar"
            style={{ width: 100, height: 100 }}
            onChange={handleImageChange}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }} // Hide the file input
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

    
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Employee Full Name"
              value={employeeData.Employee_Full_Name || ''}
              onChange={(e) => setEmployeeData({ ...employeeData, Employee_Full_Name: e.target.value })}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phone Number"
              value={employeeData.Phone_No || ''}
              onChange={(e) => setEmployeeData({ ...employeeData, Phone_No: e.target.value })}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Status"
              value={employeeData.Status || ''}
              onChange={(e) => setEmployeeData({ ...employeeData, Status: e.target.value })}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="CTC"
              value={employeeData.CTC || ''}
              onChange={(e) => setEmployeeData({ ...employeeData, CTC: e.target.value })}
              variant="outlined"
              margin="normal"
            />
          </Grid>
         <Grid item xs={12} sm={4}>
  <TextField
    fullWidth
    label="Department"
    value={v_DepartmentName || ''}
    onChange={(e) => setDepartmentName(e.target.value)} // Add this to handle changes
    variant="outlined"
    margin="normal"
  />
</Grid>
<Grid item xs={12} sm={4}>
  <TextField
    fullWidth
    label="Designation"
    value={v_DesignationName || ''}
    onChange={(e) => setDesignationName(e.target.value)} // Add this to handle changes
    variant="outlined"
    margin="normal"
  />
</Grid>

          <Grid item xs={12} container justifyContent="flex-start">
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => setShowBankDetails(!showBankDetails)}
            >
              {showBankDetails ? 'Hide Bank Details' : 'Show Bank Details'}
            </Button>
          </Grid>
          {showBankDetails && (
            <>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Bank Code"
                  value={employeeData.Bank_Code || ''}
                  onChange={(e) => setEmployeeData({ ...employeeData, Bank_Code: e.target.value })}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  value={employeeData.Bank_Name || ''}
                  onChange={(e) => setEmployeeData({ ...employeeData, Bank_Name: e.target.value })}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Branch Name"
                  value={employeeData.Branch_Name || ''}
                  onChange={(e) => setEmployeeData({ ...employeeData, Branch_Name: e.target.value })}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={employeeData.accountNo || ''}
                  onChange={(e) => setEmployeeData({ ...employeeData, accountNo: e.target.value })}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </>
          )}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
  <Button 
    variant="contained" 
    color="primary" 
    onClick={handleSaveClick}
  >
    Update
  </Button>
</div>

      </Paper>
    </Grid>
  );
}

export default EditEmployee;
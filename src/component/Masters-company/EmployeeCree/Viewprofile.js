import React from 'react'
import Sidenav from "../../Home Page-comapny/Sidenav1";
import Navbar from "../../Home Page-comapny/Navbar1";
import { useState,useEffect } from 'react';
import { Grid, Typography,Box, Table, TableCell, TableRow, TextField } from '@mui/material';
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import { useParams } from 'react-router-dom'; // Ensure this line is present
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
function Editprofileh1() {
  const { employeeId } = useParams(); // Get employeeId from the URL
  const [employeeDetails, setEmployeeDetails] = useState([]); // Correct initialization
  const [emp, setEmp] = useState([]);


  useEffect(() => {
    AOS.init({
        duration: 1000, // Set to 1 second for quick animation
        easing: 'ease-in-out', // Optional: Choose an easing function
    });
}, []);
  const fetchEmployeeDetails = async () => {
    try {
      const query = `SELECT e.pn_EmployeeID, e.EmployeeCode, e.Employee_Full_Name, e.Email,e.permanent_address,e.Current_Address,e.CTC,e.basic_salary, e.Phone_No, e.Gender, e.status, ep.image_data, d.v_DepartmentName, ds.v_DesignationName 
                     FROM dbo.paym_Employee e
                     LEFT JOIN dbo.paym_employee_profile1 ep ON e.pn_EmployeeID = ep.pn_EmployeeID
                     LEFT JOIN dbo.paym_Department d ON ep.pn_DepartmentId = d.pn_DepartmentId
                     LEFT JOIN dbo.paym_Designation ds ON ep.pn_DesingnationId = ds.pn_DesignationId
                     WHERE e.pn_EmployeeID = ${employeeId}`;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        console.log("Fetched employee details:", response.data);
        setEmployeeDetails(Array.isArray(response.data) ? response.data : [response.data]);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

 useEffect(() => {
    if (employeeId) {
      fetchEmployeeDetails(employeeId); // Fetch details using employeeId
    }
  }, [employeeId]);

  return (
  <div >
     <Grid item xs={12}>
    <div style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Grid  
          item
          xs={12}
         
          style={{ marginLeft: "auto", marginRight: "auto", margin: "50px 50px 50px 50px" }}  
          >
<Typography fontWeight={'500'} fontSize={'25px'}>Employee Profile View</Typography>
<div data-aos="fade-down-left">
            <Grid xs={12} sm={4} paddingTop={'20px'} >
                <Grid style={{width:"300px",height:"210px",backgroundColor:"#608fc4",padding:'15px'}}>
                {employeeDetails.map((emp) => (
  <div key={emp.pn_EmployeeID} style={{ 
    border: '3px solid #edf1f5',  // Outer border
    borderRadius: '54px',     // Adjust based on the img borderRadius + extra padding
    padding: '4px',
            // Space between the outer and inner border
          
    display: 'inline-block',
    backgroundColor: '#608fc4'   // Optional background between borders
  }}>
    
  <img 
    src={`data:image/jpeg;base64,${emp.image_data}`}  // Using Base64 data from the API response
    width={100} 
    height={100} 
    style={{  
      borderRadius: '50px', 
      border: '2px solid black',  // Inner border
      backgroundColor: '#f0f0f0' 
    }}
  />
</div>
 ))}
{employeeDetails.map((emp) => (
<Typography color={'white'} paddingTop={'10px'} fontSize={'20px'} key={emp.pn_EmployeeID}>{emp.Employee_Full_Name}</Typography>  
))}
<Typography  color={'white'} fontSize={'14px'}  paddingTop={'5px'}>Employee</Typography>
 
</Grid>

  
<Grid style={{maxWidth:"300px",height:"210px"}}>
<Table>

{employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
    <TableCell style={{ paddingTop: '20px', textAlign: "left",
       maxWidth: "100px", // Adjust as needed for label width
       whiteSpace: "nowrap", // Prevents wrapping for label
       overflow: "hidden", // Hides overflow text
       textOverflow: "ellipsis" // Adds ellipsis if text is too long
     }}>Name</TableCell>
    <TableCell style={{ paddingTop: '20px', textAlign: "left",
        maxWidth: "200px", // Adjust as needed for label width
        whiteSpace: "nowrap", // Prevents wrapping for label
        overflow: "hidden", // Hides overflow text
        textOverflow: "ellipsis" // Adds ellipsis if text is too long
     }}>{emp.Employee_Full_Name}</TableCell>
 </TableRow>
   ))}
  {employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
    
     maxWidth: "100px", // Adjust as needed for label width
     whiteSpace: "nowrap", // Prevents wrapping for label
     overflow: "hidden", // Hides overflow text
     textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >Email</TableCell>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
      maxWidth: "200px", // Adjust as needed for label width
      whiteSpace: "nowrap", // Prevents wrapping for label
      overflow: "hidden", // Hides overflow text
      textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >  {typeof emp.Email === 'string' ? emp.Email : 'N/A'}</TableCell>
</TableRow>
  ))}
 {employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",maxWidth: "100px",whiteSpace: "nowrap",
       overflow: "hidden", // Hides overflow text
       textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >Phone no</TableCell>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
      maxWidth: "200px", // Adjust as needed for label width
      whiteSpace: "nowrap", // Prevents wrapping for label
      overflow: "hidden", // Hides overflow text
      textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >{emp.Phone_No}</TableCell>
</TableRow>
 ))}
 {employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
     maxWidth: "100px", // Adjust as needed for label width
     whiteSpace: "nowrap", // Prevents wrapping for label
     overflow: "hidden", // Hides overflow text
     textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >Gender</TableCell>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
      maxWidth: "200px", // Adjust as needed for label width
      whiteSpace: "nowrap", // Prevents wrapping for label
      overflow: "hidden", // Hides overflow text
      textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >{emp.Gender}</TableCell>
  </TableRow>
 ))}
 {employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
   
  }} >Department</TableCell>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
     maxWidth: "200px", // Adjust as needed for label width
     whiteSpace: "nowrap", // Prevents wrapping for label
     overflow: "hidden", // Hides overflow text
     textOverflow: "ellipsis" // Adds ellipsis if text is too long
  }} >{emp.v_DepartmentName}</TableCell>
</TableRow>
 ))}
 {employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
     
  }} >Designation</TableCell>
  <TableCell  style={{paddingTop:'20px',textAlign:"left",
   
  }} >{emp.v_DesignationName} </TableCell>
</TableRow>
 ))}
 {employeeDetails.map((emp) => (
  <TableRow key={emp.pn_EmployeeID}>
<TableCell style={{paddingTop:'20px',textAlign:"left",
 maxWidth: "100px", // Adjust as needed for label width
 whiteSpace: "nowrap", // Prevents wrapping for label
 overflow: "hidden", // Hides overflow text
 textOverflow: "ellipsis" // Adds ellipsis if text is too long
}} >Status</TableCell>
<TableCell style={{paddingTop:'20px',textAlign:"left",
 maxWidth: "200px", // Adjust as needed for label width
 whiteSpace: "nowrap", // Prevents wrapping for label
 overflow: "hidden", // Hides overflow text
 textOverflow: "ellipsis" // Adds ellipsis if text is too long
}} >  {emp.status === 'A' ? 'Active' : emp.status === 'I' ? 'Inactive' : 'Unknown'}</TableCell>
</TableRow>
 ))}
  </Table> 
  </Grid> 
         
            </Grid>
            </div>
          </Grid>
          <Grid xs={12} sm={8} width={'700px'}  style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 0" }}>
          <Typography textAlign={'left'} fontSize={'16px'} fontWeight={'bold'}>Basic Details</Typography>
          <Grid display={'inline-flex'} justifyContent={'space-between'}>
  {employeeDetails.map((emp) => (
    <React.Fragment key={emp.pn_EmployeeID}>
      <Grid xs={12} sm={2} width={'200px'} paddingTop={'20px'} paddingRight={'20px'}>
        <Typography textAlign={'left'}>Employee code</Typography>
        <TextField
          style={{paddingTop: "10px", borderRadius: '20px'}}
          name='EmployeeCode'
          variant="outlined"
          fullWidth
          value={emp.EmployeeCode || ''} // Bind EmployeeCode from data
          InputProps={{ readOnly: true }} // Makes the field read-only
        />
      </Grid>

      <Grid xs={12} sm={2} width={'200px'} paddingTop={'20px'} paddingRight={'20px'}>
        <Typography textAlign={'left'}>Employee ID</Typography>
        <TextField
          style={{paddingTop: "10px", borderRadius: '20px'}}
          name='EmployeeID'
          variant="outlined"
          fullWidth
          value={emp.pn_EmployeeID || ''} // Bind Employee ID from data
          InputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid xs={12} sm={2} width={'200px'} paddingTop={'20px'}>
        <Typography textAlign={'left'}>Joined Date</Typography>
        <TextField
          style={{paddingTop: "10px", borderRadius: '20px'}}
          name='JoiningDate'
          variant="outlined"
          fullWidth
          value={emp.JoinedDate || ''} // Bind JoinedDate from data
          InputProps={{ readOnly: true }}
        />
      </Grid>
    </React.Fragment>
  ))}
</Grid>

           <Grid xs={12} sm={8} paddingTop={'20px'}>
           <Typography textAlign={'left'} fontSize={'16px'} fontWeight={'bold'}>Address Details</Typography>
           <Grid>
  {employeeDetails.map((emp) => (
    <React.Fragment key={emp.pn_EmployeeID}>
      <Grid>
        <Typography textAlign={'left'} paddingTop={'15px'} paddingBottom={'10px'}>Permanent Address</Typography>
        <TextField
          name='PermanentAddress'
          variant="outlined"
          fullWidth
          value={emp.permanent_address || ''} // Bind Permanent Address from data
          InputProps={{ readOnly: true }} // Optional: Makes the field read-only
        />
      </Grid>

      <Grid>
        <Typography textAlign={'left'} paddingTop={'15px'} paddingBottom={'10px'}>Current Address</Typography>
        <TextField
          name='CurrentAddress'
          variant="outlined"
          fullWidth
          value={emp.Current_Address || ''} // Bind Current Address from data
          InputProps={{ readOnly: true }} // Optional: Makes the field read-only
        />
      </Grid>
    </React.Fragment>
  ))}
</Grid>
            </Grid>
            <Grid xs={12} sm={8} paddingTop={'20px'}>
           <Typography textAlign={'left'} fontSize={'16px'} fontWeight={'bold'}>Salary Details</Typography>

           {employeeDetails.map((emp) => (
  <Grid key={emp.pn_EmployeeID} style={{ marginBottom: '20px' }}>
    <Typography textAlign={'left'} paddingTop={'15px'} paddingBottom={'10px'}>
      CTC
    </Typography>
    <div
      style={{ border: "1px solid grey", height: "50px", paddingTop: '10px', width: '200px', textAlign: 'center' }}
    >
      {emp.CTC || '0'}  {/* Display CTC or default to '0' if not available */}
    </div>

    <Typography textAlign={'left'} paddingTop={'15px'} paddingBottom={'10px'}>
      Salary
    </Typography>
    <div
      style={{ border: "1px solid grey", height: "50px", paddingTop: '10px', width: '200px', textAlign: 'center' }}
    >
      {emp.basic_salary || '0'}  {/* Display Salary or default to '0' if not available */}
    </div>
  </Grid>
))}

              </Grid>
            
           

          </Grid>
          </Box>
          </div>
          </Grid>
  </div>
  )
}

export default Editprofileh1
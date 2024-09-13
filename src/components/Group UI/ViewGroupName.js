import { Typography, Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { Navigate, useNavigate } from 'react-router-dom';

function ViewGroupName() {
const [employee, setEmployee] = useState('');

const navigate= useNavigate();

const handleclick = () => {
    navigate('enterinfos')
}

useEffect(() => {
async function getData() {
const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
setEmployee(data.data);
}
getData();
}, []);

return (
<Box
sx={{
border: '1px solid #ccc',
borderRadius: '8px',
padding: '20px',
marginTop: '20px',
width: '700px',
margin: 'auto',
position: 'relative',
}} 
>
<Typography variant='h5'>Group Names</Typography>
{employee.length > 0 ? (
<ul>
{employee.map((employee, index) => (
<Typography key={index} variant='h6' style={{ marginRight: '480px', textAlign:'left' }}>
{index + 1}. {employee.employeeFullName}
</Typography>
  ))}
  </ul>
) : (
  <Typography>No employees found.</Typography>
)}
<Button onClick={handleclick}>Add Infos for Groups</Button>
</Box>
);
}

export default ViewGroupName;
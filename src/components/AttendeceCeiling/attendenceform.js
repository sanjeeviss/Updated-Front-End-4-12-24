import { Grid, Card, TextField, Button, Typography, CardContent, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { inputFormAttendence } from './attendence';
import { ATTENDANCECEILING } from '../../serverconfiguration/controllers';
import { useNavigate } from 'react-router-dom';


const AttendenceForm = () => {

  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [company, setCompany] = useState('');
  const [branch, setBranch] = useState('');
  const [employeeCode,setEmployeeCode]=useState("")
  const [employeeName,setEmployeeName]=useState("")
  

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
    }
    getData();
  }, []);

 
    const [formData, setFormData] = useState({
      id: 0,
      pnCompanyid: company,
      pnBranchid: 0,
      intime: "",
      earlyIntime: "",
      shiftLin: "",
      lunchEin: "",
      halfday: "4:00:00.000",
      otLimit: "",
      permissionLimit: "4:00:00.000", 
      leaveDays:"" ,
      morningOt: "",
      monthType: "",
      weekOff1: "",
      weekOff2: "",
      manualDays: "",
      otDays: "",
      otHrs: "",
      timeCard: "",
      ptaxMonth: "",
      readerName: ""
      });

      const handleFormSubmit = async (e) => {
        e.preventDefault();
try {
  const response = await postRequest(ServerConfig.url, ATTENDANCECEILING, formData);
  if (response.status === 200 || response.status === 201) {
    console.log('Data saved successfully!');
    navigate('/AttendenceTable');
  } else {
    console.error('Error saving data:', response.statusText);
    console.error('Server validation errors:', response);
  }
}catch(error){
  console.error('Error saving data:', error);
}
  };

  const handleChange = (e) => {
    console.log(e.target.value,e.target.name)
    const { name, value } = e.target;
    const timeFields = ["intime", "earlyIntime", "shiftLin", "lunchEin", "halfday", "otLimit", "permissionLimit"];
    if (timeFields.includes(name)) {
      const formattedTime = formatTime(value); 
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: formattedTime
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return null; 
    
    const [hours = '00', minutes = '00', seconds = '00'] = timeString.split(':');
    return `${padWithZero(hours, 2)}:${padWithZero(minutes, 2)}:${padWithZero(seconds, 2)}.000`;
  };
  

  const padWithZero = (str, length) => {
    str = String(str);
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  };

  return (
    <div className="App">
    <Grid style={{ padding: "80px 5px 0 5px" }}>
      <Card style={{ maxWidth: 600, margin: "0 auto", font: 'initial' }}>
        <CardContent>
          <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">Attendence</Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2} columns={12} >
              <Grid item xs={12} sm={6} width={200}>
                <FormControl fullWidth>
                  <select name="pnCompanyid" onChange={(e)=>{

                   setCompany(e.currentTarget.value)
                   handleChange(e)
                  }}>
                    {employee.map((e) => <option>{e.pnCompanyId}</option>)}
                  </select>
                </FormControl>
              </Grid>
              <Grid xs={12} sm={6} item>
                <FormControl fullWidth>
                  <select name="pnBranchid"onChange={(e) => { 
                    setBranch(e.currentTarget.value);
                    handleChange(e)
                  }}>
                   {employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)}
                  </select>
                </FormControl>
              </Grid>
                  <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                 <select  onChange={(e)=>{
                    
                     var v=e.currentTarget.value
                  var empname=employee.filter((e)=>e.employeeCode==v)
                  setEmployeeName(empname[0].employeeFullName)
                     handleChange(e)

                 }}>
                 
                     {
                        
                        employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.employeeCode}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>
                  
            
                   <Grid xs={12} sm={6} item>
                   <FormControl fullWidth>
                  <TextField value={employeeName} disabled={true}/> 
                  </FormControl>
                  </Grid>
            
                  
                 
                {inputFormAttendence.map(input => (
                  <Grid key={input.id} xs={input.xs} sm={input.sm} item>
                    <TextField {...input}  onChange={handleChange} InputLabelProps={{ shrink: true }} />
                  </Grid>
                ))}
                <Grid container spacing={1}>
                  <Grid item xs={12} align="right">
                    <Button type="reset" variant="contained" color="primary" style={{ paddingRight: '3' }} >Reset</Button>
                    <Button type="submit"  variant="contained" color="primary" onSubmit={handleFormSubmit}>Submit</Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default AttendenceForm;
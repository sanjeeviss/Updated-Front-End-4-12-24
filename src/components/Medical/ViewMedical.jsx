import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl
  } from '@mui/material';
import { useState, useEffect } from 'react';
import {  PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';

import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';

  

export default function ViewMedical() {

const navigate = useNavigate();
const [employee,setEmployee]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [employeeCode,setEmployeeCode]=useState("")





useEffect(() => {
  async function getData() {
    const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
    setEmployee(data.data);
  }
  getData();
}, []);

const handlesave = () => {
    navigate('medicalslipview',
      {
        state: {
            pnEmployeeId,
            employeeCode,
        
        }
      }
    )
  }

    const margin={margin:"0 5px"}
    return (
      <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>View Medical</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
           

        <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>EmployeeID</InputLabel>
                 <select name = "pnEmployeeId" 
                 onChange={(e)=>{
                  setEmployeeId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {

                        employee.map((e)=><option>{e.pnEmployeeId}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>EmployeeCode</InputLabel>
                 <select 
                 name="EmployeeCode"
                 onChange={(e)=>{
                  setEmployeeCode(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                       
                          employee.filter((e)=>(e.pnEmployeeId== pnEmployeeId)).map((e)=><option>{e.employeeCode}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>



          </Grid>
          <Grid container spacing={1} paddingTop={'10px'}>
              
              <Grid item xs ={12} align="right" >
              <Button variant='contained' color='primary' onClick={handlesave} >Generate</Button>
              </Grid>
              </Grid>

        </form>
        </CardContent>
        </Card>
        </Grid>
      </div>
    );
  }
  
 
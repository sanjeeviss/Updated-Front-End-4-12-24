import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { PAYMEMPLOYEE, PAYMPAYBILL } from '../../serverconfiguration/controllers';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { useNavigate } from 'react-router-dom';
  
  
  export default function MedicalSlipGenerator() {
  
  const[employees , setEmployees] = useState([])
  const[pnCompanyId, setpnCompanyId] = useState("")
  const[pnBranchId, setpnBranchId] = useState("")
  const[pnEmployeeId, setpnEmployeeId] = useState("")
  const[employeeCode , setemployeeCode] = useState("")
  
  const navigate = useNavigate()

  const margin={margin:"0 5px"}
  
  useEffect(() => {
  async function getData() {
    const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
    setEmployees(data.data);
    
  }
  getData();
  }, []);

  const handlesave = () => {
    navigate('medical',
      {
        state: {
          pnEmployeeId,
          employeeCode,
          pnCompanyId,
          pnBranchId,
        }
      }
    )
  }
  
    return (
      <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>Generate MedicalSlip</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
        <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>Company</InputLabel>
               <select name = "pnCompanyId" 
               onChange={(e)=>{
                setpnCompanyId(e.target.value)
                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      employees.map((e)=><option>{e.pnCompanyId}</option>)
                      
                   }
               </select>
            </FormControl >
                </Grid>

                <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>BranchId</InputLabel>
                 <select name = "pnBranchId" 
                 onChange={(e)=>{
                    setpnBranchId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {
  
  employees.filter((e)=>(e.pnCompanyId == pnCompanyId)).map((e)=><option>{e.pnBranchId}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>

                  <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>EmployeeId</InputLabel>
                 <select name = "pnEmployeeId" 
                 onChange={(e)=>{
                    setpnEmployeeId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {
  
  employees.filter((e)=>(e.pnCompanyId == pnCompanyId && e.pnBranchId == pnBranchId )).map((e)=><option>{e.pnEmployeeId}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>


            <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>EmployeeCode</InputLabel>
                 <select name = "employeeCode" 
                 onChange={(e)=>{
                    setemployeeCode(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {
  
  employees.filter((e)=>(e.pnCompanyId == pnCompanyId && e.pnBranchId == pnBranchId && e.pnEmployeeId == pnEmployeeId )).map((e)=><option>{e.employeeCode}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>

                

                 
                
                
          </Grid>
          <Grid container spacing={1} paddingTop={'10px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button variant='contained' color='primary'onClick={handlesave} >Generate</Button>
              </Grid>
              </Grid>
  
        </form>
        </CardContent>
        </Card>
        </Grid>
      </div>
    );
  }
  
  
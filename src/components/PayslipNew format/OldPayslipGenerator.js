import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl
  } from '@mui/material';
  import { useState, useEffect } from 'react';
  import { PAYMPAYBILL } from '../../serverconfiguration/controllers';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { useNavigate } from 'react-router-dom';
  
  
  export default function OldPayslipGenerator() {
  
  const[paympaybills , setPaymPayBills] = useState([])
  const[pnEmployeeId, setPnEmployeeId] = useState("")
  const[employeeCode, setEmployeeCode] = useState("")
  const[dDate, setDdate] = useState("")
  const[month , setMonth] = useState("")
  const[year, setYear] = useState("")
  const navigate = useNavigate()

  const margin={margin:"0 5px"}
  
  useEffect(() => {
  async function getData() {
    const data = await getRequest(ServerConfig.url, PAYMPAYBILL);
    setPaymPayBills(data.data);
    
  }
  getData();
  }, []);

  const handlesave = () => {
    navigate('oldpayslip',
      {
        state: {
          pnEmployeeId,
          employeeCode,
          dDate,
          month,
          year
        }
      }
    )
  }
  
    return (
      <div>
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>Generate Old Payslip</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
            <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>EmployeeId</InputLabel>
                 <select name = "pnEmployeeId" 
                 onChange={(e)=>{
                    setPnEmployeeId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}
                
                 >
                  <option value="">Select</option>
                     {
  
                        paympaybills.map((e)=><option>{e.pnEmployeeId}</option>)
                        
                     }
                 </select>
              </FormControl >
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>EmployeeCode</InputLabel>
                 <select 
                 name="employeeCode"
                 onChange={(e)=>{
                  setEmployeeCode(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                       
                          paympaybills.filter((e)=>(e.pnEmployeeId == pnEmployeeId)).map((e)=><option>{e.employeeCode}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth >
                    <InputLabel shrink>dDate</InputLabel>
                 <select 
                 name="dDate"
                 onChange={(e)=>{
                  setDdate(e.target.value)
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                       
                          paympaybills.filter((e)=>(e.pnEmployeeId == pnEmployeeId && e.employeeCode == employeeCode)).map((e)=><option>{e.dDate}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>

  
                 
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="Month"
                   
                    label="Month"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setMonth(e.target.value)} 
                    InputLabelProps={{shrink:true}}
                    
                  />
                  </FormControl>
                  </Grid>
  
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="Year"
                   
                    label="Year"
                    variant="outlined"
                   
                    fullWidth
                    required
                    onChange={(e) => setYear(e.target.value)} 
                    InputLabelProps={{shrink:true}}
                    
                  />
                  </FormControl>
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
  
  
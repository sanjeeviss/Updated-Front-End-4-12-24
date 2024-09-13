import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { FORM7, PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { inputFormform7 } from './form7';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function SampleForm7() {
const navigate=useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [form7,setForm7]=useState([])
const [esino,setEsiNo]=useState("")
const [m1,setM1]=useState("")
const [m2,setM2]=useState("")
const [m3,setM3]=useState("")
const [m4,setM4]=useState("")
const [m5,setM5]=useState("")  
const [m6,setM6]=useState("")
const [d1,setD1]=useState("")
const [d2,setD2]=useState("")
const [d3,setD3]=useState("")
const [d4,setD4]=useState("")
const [d5,setD5]=useState("")
const [d6,setD6]=useState("")
const [w1,setW1]=useState("")
const [w2,setW2]=useState("")
const [w3,setW3]=useState("")
const [w4,setW4]=useState("")
const [w5,setW5]=useState("")
const [w6,setW6]=useState("")
const [esi1,setEsi1]=useState("")
const [esi2,setEsi2]=useState("")
const [esi3,setEsi3]=useState("")
const [esi4,setEsi4]=useState("")
const [esi5,setEsi5]=useState("")
const [esi6,setEsi6]=useState("")
const [empr1,setEmpr1]=useState("")
const [empr2,setEmpr2]=useState("")
const [empr3,setEmpr3]=useState("")
const [empr4,setEmpr4]=useState("")
const [empr5,setEmpr5]=useState("")
const [empr6,setEmpr6]=useState("")
const [totwage,seTotwage]=useState("")
const [totEsi,setTotEsi]=useState("")
const [totEmpr,setTotEmpr]=useState("")
const [disp,setDisp]=useState("")





useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);
  const form7=await getRequest(ServerConfig.url,FORM7)
    setForm7(form7.data)
}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  pnEmployeeId: pnEmployeeId,
  employeeCode: employeeCode,
  empName: employeeName,
  esino: esino,
  m1: m1,
  m2: m2,
  m3: m3,
  m4: m4,
  m5: m5,
  m6: m6,
  d1: d1,
  d2: d2,
  d3: d3,
  d4: d4,
  d5: d5,
  d6: d6,
  w1: w1,
  w2: w2,
  w3: w3,
  w4: w4,
  w5: w5,
  w6: w6,
  esi1: esi1,
  esi2: esi2,
  esi3: esi3,
  esi4: esi4,
  esi5: esi5,
  esi6: esi6,
  empr1: empr1,
  empr2: empr2,
  empr3: empr3,
  empr4: empr4,
  empr5:empr5,
  empr6: empr6,
  totwage: totwage,
  totEsi: totEsi,
  totEmpr: totEmpr,
  disp:  disp
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>Form7</Typography>
      <form>
     
      <Grid container spacing={2} inputlabelprops={{shrink:true}}>
          <Grid item xs={12} sm={6} >
            <FormControl fullWidth>
           
            <InputLabel shrink>Company</InputLabel>
               <select name = "pnCompanyId" 
               onChange={(e)=>{
                setCompany(e.target.value)
                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      employee.map((e)=><option>{e.pnCompanyId}</option>)
                      
                   }
               </select>
            </FormControl >
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth >
                  <InputLabel shrink>BranchId</InputLabel>
               <select 
               name="pnBranchId"
               onChange={(e)=>{
                setBranch(e.target.value)
              
               }}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
               >
                <option value="">Select</option>
                   {
                     
                        employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                   }
               </select>
               </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="pnEmployeeId"
                  label="pnEmployeeId"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmployeeId(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                
                <Grid xs={12} sm={6} item>
               
                  <FormControl fullWidth>
                  <InputLabel shrink>empCode</InputLabel>
               <select 
               name = "empCode"
               onChange={(e)=>{
                  
                   var v=e.currentTarget.value
                var empname=employee.filter((e)=>e.employeeCode==v)
                setEmployeeCode(v)
                setEmployeeName(empname[0].employeeFullName)
             
               }}
               style={{ height: '50px' }}
               >
                      <option value="">Select</option>
               
                   {
                      
                      employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.employeeCode}</option>)
                    
                   }
               </select>
               </FormControl>
                </Grid>

          
                 <Grid xs={12} sm={6} item  >
                
                 <FormControl fullWidth>
                <TextField 
                name= "empName"
                value={employeeName}
                label="employeename"
                variant="outlined"
                fullWidth
                required  /> 
                </FormControl>
                </Grid>
         
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esino"
                  label="esino"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEsiNo(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="m1"
                 
                  label="m1"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setM1(e.target.value)} 

                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="m2"
                  label="m2"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setM2(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="m3"
                 
                  label="m3"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setM3(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="m4"
                  label="m4"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setM4(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="m5"
                 
                  label="m5"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setM5(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="m6"
                  label="m6"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setM6(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="d1"
                 
                  label="d1"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setD1(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="d2"
                  label="d2"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setD2(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="d3"
                 
                  label="d3"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setD3(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="d4"
                  label="d4"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setD4(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="d5"
                 
                  label="d5"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setD5(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="d6"
                  label="d6"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setD6(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="w1"
                 
                  label="w1"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setW1(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="w2"
                  label="w2"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setW2(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="w3"
                 
                  label="w3"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setW3(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="w4"
                  label="w4"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setW4(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="w5"
                 
                  label="w5"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setW5(e.target.value)} 

                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="w6"
                  label="w6"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setW6(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esi1"
                 
                  label="esi1"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setEsi1(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esi2"
                  label="esi2"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEsi2(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esi3"
                 
                  label="esi3"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setEsi3(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esi4"
                  label="esi4"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEsi4(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esi5"
                 
                  label="esi5"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setEsi5(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="esi6"
                  label="esi6"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEsi6(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="empr1"
                 
                  label="empr1"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setEmpr1(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="empr2"
                  label="empr2"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmpr2(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="empr3"
                 
                  label="empr3"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setEmpr3(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="empr4"
                  label="empr4"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmpr4(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="empr5"
                 
                  label="empr5"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setEmpr5(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="empr6"
                  label="empr6"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmpr6(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="totwage"
                 
                  label="totwage"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => seTotwage(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="totEsi"
                  label="totEsi"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setTotEsi(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="totEmpr"
                 
                  label="totEmpr"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setTotEmpr(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="disp"
                  label="disp"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setDisp(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


             


              

        </Grid>
        <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  pnEmployeeId: pnEmployeeId,
  employeeCode: employeeCode,
  empName: employeeName,
  esino: esino,
  m1: m1,
  m2: m2,
  m3: m3,
  m4: m4,
  m5: m5,
  m6: m6,
  d1: d1,
  d2: d2,
  d3: d3,
  d4: d4,
  d5: d5,
  d6: d6,
  w1: w1,
  w2: w2,
  w3: w3,
  w4: w4,
  w5: w5,
  w6: w6,
  esi1: esi1,
  esi2: esi2,
  esi3: esi3,
  esi4: esi4,
  esi5: esi5,
  esi6: esi6,
  empr1: empr1,
  empr2: empr2,
  empr3: empr3,
  empr4: empr4,
  empr5:empr5,
  empr6: empr6,
  totwage: totwage,
  totEsi: totEsi,
  totEmpr: totEmpr,
  disp:  disp
};
console.log(formData)
postRequest(ServerConfig.url,FORM7  ,formData).then((e)=>{
console.log(e)
navigate('/Form7table')
}).catch((e)=>console.log(e));

                
              }}  
      variant='contained' color='primary' >SAVE</Button>
            </Grid>
            </Grid>

      </form>
      </CardContent>
      </Card>
      </Grid>
    </div>
  );
}


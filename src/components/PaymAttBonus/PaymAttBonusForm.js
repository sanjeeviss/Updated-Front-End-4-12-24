import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMATTBONUS } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';



export default function PaymattbonusForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [categoryId,setCategoryId]=useState("")
const [categoryName,setCategoryName]=useState("")
const [fullatt,setFullAtt]=useState([])
const [halfatt,setHalfAtt]=useState("")
const [oneatt,setOneAtt]=useState("")





useEffect(() => {
async function getData() {
  const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  setEmployee(data.data);

}
getData();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
const formData = {
  pnCompanyId: company,
  pnBranchId: branch,
  empcode: employeeCode,
  empName: employeeName,
  categoryId: categoryId ,
  categoryName:categoryName ,
  fullatt:fullatt,
   halfatt:halfatt ,
  oneatt:oneatt 
 
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>PaymattbonusForm</Typography>
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
              name="categoryId"
              
                  label="categoryId"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setCategoryId(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="categoryName"
                 
                  label=" categoryName"
                  variant="outlined"
                
                  fullWidth
                  required
                  onChange={(e) =>  setCategoryName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="fullatt"
                 
                  label="fullatt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setFullAtt(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="halfatt"
                 
                  label="halfatt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setHalfAtt(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="oneatt"
                 
                  label="oneatt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setOneAtt(e.target.value)} 

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
  empcode: employeeCode,
  empName: employeeName,
  categoryId: categoryId ,
  categoryName:categoryName ,
  fullatt:fullatt,
   halfatt:halfatt ,
  oneatt:oneatt 
};
console.log(formData)
postRequest(ServerConfig.url,PAYMATTBONUS,formData).then((e)=>{
console.log(e)
navigate('/PaymAttBonusTable')
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


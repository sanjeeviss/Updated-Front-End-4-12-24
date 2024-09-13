import {TextField, Button, Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';
import {useState,useEffect} from 'react'
import  {getRequest,postRequest} from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { Label } from '@mui/icons-material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import {  PAYMEMPLOYEE  } from '../../serverconfiguration/controllers';
import { useNavigate } from 'react-router-dom';
  import {inputpaymEmployeeLeaveForm} from './paymEmployeeLeave';
import { PAYMEMPLOYEELEAVE } from '../../serverconfiguration/controllers';

  

export default function PaymEmpLeaveForm() {
  const navigate = useNavigate();
    const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setPnEmployeeID]=useState("")
const [fromDate, setFromDate] = useState(""); // Declare status state
const [toDate, setToDate] = useState(""); // Declare status state
const [fromStatus, setFromStatus] = useState(""); // Declare status state
const [toStatus, setToStatus] = useState(""); // Declare status state
const [leaveCount, setLeaveCount] = useState(""); // Declare status state
const [pnLeaveId, setPnLeaveID] = useState(""); 

useEffect(()=>{
  async function getData()
  {
    const data=await getRequest(ServerConfig.url,PAYMEMPLOYEE)
    setEmployee(data.data)
   
}
  getData()

},[])


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    "pnCompanyId":company,
    pnBranchId:branch,
    pnEmployeeId:pnEmployeeId,
    fromDate:fromDate,
    toDate:toDate,
    fromStatus:fromStatus,
    toStatus:toStatus,
    leaveCount:leaveCount,
    pnLeaveId:pnLeaveId,
  
  };
console.log(formData)
};
    const margin={margin:"0 5px"}
    return (
      <div className="App">
          <Card style ={{ maxWidth: 600, margin: "0 auto" ,font:'initial'}}>
        <CardContent>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">Paym Employee Leave</Typography>
   
             <form>
             <Grid container spacing={2} columns={12} >
     
        <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>CompanyID</InputLabel>
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
                //  setShiftDetails(shiftdetails.filter((e)=>(e.pnBranchid==1 && e.pnCompanyid==1)))
                //  console.log(shiftdetails)
               
                
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
                    <InputLabel shrink>empId</InputLabel>
                 <select 
                 name = "pnEmployeeId"
                 onChange={(e)=>{
                    
                     var v=e.currentTarget.value
                  var empname=employee.filter((e)=>e.employeeCode==v)
                  setPnEmployeeID(v)
                  // setEmployeeName(empname[0].employeeFullName)
                  // setCardNo(empname[0].cardNo)
               
                 }}
                 style={{ height: '50px' }}
                 >
                        <option value="">Select</option>
                 
                     {
                        
                        employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.pnEmployeeId}</option>)
                      
                     }
                 </select>
                 </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="pnLeaveId"
                   
                    label="pnLeaveId"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setPnLeaveID(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="fromDate"
                   
                    label="fromDate"
                    variant="outlined"
                    fullWidth
                    required
                    type='datetime-local'

                    onChange={(e) => setFromDate(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="toDate"
                   
                    label="toDate"
                    variant="outlined"
                    fullWidth
                    required
                    type='datetime-local'
                    onChange={(e) => setToDate(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="fromStatus"
                   
                    label="fromStatus"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setFromStatus(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="toStatus"
                   
                    label="toStatus"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setToStatus(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="leaveCount"
                   
                    label="leaveCount"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setLeaveCount(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

      
      
            {
            inputpaymEmployeeLeaveForm.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                              {/* <TextField {...input}  InputLabelProps={{shrink:true}}/> */}
              </Grid>)
            }
            
             <Grid item xs={12} align="right">
              <Button type="reset" variant="contained" color="primary"style={{paddingRight:'3'}} >Reset</Button>
              <Button onClick={()=>{
  const formData = {
    "pnCompanyId":company,
    pnBranchId:branch,
    pnEmployeeId:pnEmployeeId,
    fromDate:fromDate,
    toDate:toDate,
    fromStatus:fromStatus,
    toStatus:toStatus,
    leaveCount:leaveCount,
    pnLeaveId:pnLeaveId,
 
  };
console.log(formData)
postRequest(ServerConfig.url,PAYMEMPLOYEELEAVE,formData).then((e)=>{
  console.log(e)
  navigate('/PaymEmpLeaveTable')
}).catch((e)=>console.log(e));

                  
                }}  
        variant='contained' color='primary' >SAVE</Button>              </Grid>
            </Grid>
           
       
       </form>
       </CardContent>
       </Card>
       </div>
    ) 
  }
  

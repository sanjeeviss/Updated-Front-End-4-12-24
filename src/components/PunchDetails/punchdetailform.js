import {TextField, Button, Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';
import { inputFormElements18} from './punchdetail'
import {useState,useEffect} from 'react'
import { OTSLAB, PAYMEMPLOYEE, PUNCHDETAILS, SHIFTDETAILS } from '../../serverconfiguration/controllers';
import  {getRequest,postRequest} from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { Label } from '@mui/icons-material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
export default function Sample18() {
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [shiftdetails,setShiftDetails]=useState([])
const [otslab,setOTSLab]=useState([])
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
const [shiftCode,setShiftCode]=useState("")
const[cardNo,setCardNo]=useState("")
const[otHrs,setOTHrs]=useState("")
const [days, setDays] = useState(""); // Declare days state
const [machineNum, setMachineNum] = useState(""); // Declare machineNum state
const [inOutMode, setInOutMode] = useState(""); // Declare inOutMode state      
const [dates, setDates] = useState(""); // Declare dates state
const [times, setTimes] = useState(""); // Declare times state
const[verifyMode,setVerifyMode]= useState("")
const [status, setStatus] = useState(""); // Declare status state
const decimalToTime = (decimalHours) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
};



useEffect(()=>{
    async function getData()
    {
      const data=await getRequest(ServerConfig.url,PAYMEMPLOYEE)
      setEmployee(data.data)
      const shiftdata=await getRequest(ServerConfig.url,SHIFTDETAILS)
      setShiftDetails(shiftdata.data)
      const OTSdata=await getRequest(ServerConfig.url,OTSLAB)
      const otslabData = OTSdata.data.map(item => ({
        ...item,
        otHrs: decimalToTime(item.otHrs)
    }));
    setOTSLab(otslabData);
}
    getData()
  
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      "pnCompanyid":company,
      pnBranchid:branch,
      empCode:employeeCode,
      shiftCode:shiftCode,
      otHrs:otHrs,
      cardNo:cardNo,
      verifyMode:verifyMode,
      empName:employeeName,
      inout:inOutMode,
      date:dates,
      time:times,
      day:days,
      status:status,
        // Add other form data here
    };
console.log(formData)
    // try {
    //     const response = await postRequest(ServerConfig.url, PUNCHDETAILS, formData);
    //     console.log(response)
    //     // Handle successful response here
    // } catch (error) {
    //   console.log(PUNCHDETAILS)
    // }
};




    const margin={margin:"0 5px"}
    return (
        <div>
          <Grid style={{padding: "80px 5px 0 5px"}}>
            <Card style = {{maxWidth: 600, margin: "0 auto"}}>
              <CardContent>
                <Typography variant='h5' color='S- Light' align='center'>
                Punch Details
                </Typography>
                <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
                  Fill all the Mandatory fields 
                </Typography>
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
                 setShiftDetails(shiftdetails.filter((e)=>(e.pnBranchid==1 && e.pnCompanyid==1)))
                 console.log(shiftdetails)
               
                
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
                  setCardNo(empname[0].cardNo)
               
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

                  <Grid xs={12} sm={6} item  >
                 
                   <FormControl fullWidth>
                 
                  <TextField 
                  name = "cardNo"
                  value={cardNo}  
                  label="cardno"
                  variant="outlined"
                  fullWidth
                  required /> 
                  </FormControl>
                  </Grid>

                  
                   <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>shiftCode</InputLabel>
                    <select 
                    name = "shiftCode"
                    onChange={(e)=>{
                    
                    var s=e.currentTarget.value
                  var shcode=shiftdetails.filter((e)=>e.shiftCode==s)
                  setShiftCode(shcode[0].shiftCode)
                    

                }}
                style={{height:'50px'}}>
                 <option value="">Select</option>
                     {
                        
                         shiftdetails.map((e)=><option>{e.shiftCode}</option>)
                      

                     }
                   
                    </select>
                 </FormControl>
                  </Grid>
                  
             
                  
                  <Grid xs={12} sm={6} item  >
                 
                   <FormControl fullWidth>
                   <InputLabel shrink>shiftCode</InputLabel>
                  <TextField value={shiftCode}
                    label="shiftcode"
                    variant="outlined"
                    fullWidth
                    required /> 
                  
                  </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>OTHRS</InputLabel>
                    
                    <select 
                    name = "otHrs"
                    onChange={(e)=>{
                    
                    var s=e.currentTarget.value
                  var othrs=otslab.filter((e)=>e.otHrs==s)
                  setOTHrs(othrs[0].otHrs)
                  setOTSLab(otslab.filter((e)=>(e.pnBranchid==branch && e.pnCompanyid==company)))

                }}
                style={{height:'50px'}}>
                 <option value="">Select</option>
                     {
                        
                        otslab.map((e)=><option>{e.otHrs}</option>)
                     }
                   
                    </select>
                 </FormControl>
                  </Grid>
                  
             
                  
                  <Grid xs={12} sm={6} item  >
                 
                   <FormControl fullWidth>
                  
                  <TextField value={otHrs} 
                      label="othrs"
                      variant="outlined"
                      fullWidth
                      required   /> 
                  
                  
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="verifyMode"
                   
                    label="VerifyMode"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setVerifyMode(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="machineNum"
                        label= "MachineNum"
                        variant= "outlined"
                        fullWidth
                        required
                        onChange={(e) => setMachineNum(e.target.value)} 
                      />
                       
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="inOutMode"
                                             label= "InOutMode"
                       variant= "outlined"
                       fullWidth
                       required 
                       onChange={(e) => setInOutMode(e.target.value)} 
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="dates"
                      label= "dates" 
                      variant= "outlined"
                      fullWidth
                      required
                      type="datetime-local" 
                      onChange={(e) => setDates(e.target.value)}  
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="days"
                        label= "Days"
                        variant= "outlined"
                        fullWidth 
                        required 
                        onChange={(e) => setDays(e.target.value)} 

                      
                      />
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="times"
                       label= "Times" 
                       variant= "outlined" 
                       fullWidth 
                       required
                       onChange={(e) => setTimes(e.target.value)} 
                      />
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <FormControl fullWidth>
                      <TextField
                      name="status"
                       label= "Status" 
                       variant= "outlined" 
                       fullWidth 
                       required
                       onChange={(e) => setStatus(e.target.value)} 
                      />
                    </FormControl>
                  </Grid>
                  
                  
              {
                inputFormElements18.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                  {/* <TextField {...input}  />  */}
                  </Grid>)
              }
               </Grid>
               <Grid container spacing={1} paddingTop={'20px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{
  const formData = {
    "pnCompanyid":company,
    pnBranchid:branch,
    empCode:employeeCode,
    shiftCode:shiftCode,
    otHrs:otHrs,
    cardNo:cardNo,
    verifyMode:verifyMode,
    inOutMode:inOutMode,
    dates:dates,
    times:times,
    status:status,
    days:days,
    machineNum:machineNum,
    empName:employeeName,





   
   // Add other form data here
  };
console.log(formData)
postRequest(ServerConfig.url,PUNCHDETAILS,formData).then((e)=>{
  console.log(e)
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
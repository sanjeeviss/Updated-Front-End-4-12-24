  import {TextField, Button, Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';
  import {useState,useEffect} from 'react'
  import  {getRequest,postRequest} from '../../serverconfiguration/requestcomp';
  import {InputLabel} from '@mui/material';
  import { Label } from '@mui/icons-material';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import {  PAYMEMPLOYEE, PAYMENCASHMENTDETAILS  } from '../../serverconfiguration/controllers';
  import { useNavigate } from 'react-router-dom';
  import { PAYMEMPLOYEELEAVE } from '../../serverconfiguration/controllers';
  import {inputpaymEncashmentDetailsForm} from './paymEncashmentDetails';
  
  export default function EncashmentDetailsForm() {
    const navigate = useNavigate();
      const [employee,setEmployee]=useState([])
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [leave,setLeave]=useState([])
  const [pnEmployeeId,setPnEmployeeID]=useState("")
  const [pnLeaveId, setPnLeaveID] = useState(""); // Declare status state
  const [allowDays, setAllowdays] = useState(""); // Declare status state
  const [takenDays, setTakendyas] = useState(""); // Declare status state
  const [maxDays, setMaxdys] = useState(""); // Declare status state
  const [balDays, setBaldays] = useState(""); // Declare status state
  const [basicPerDay, setBasicperday] = useState(""); 
  const [totalAmt, setTotalamt] = useState(""); 
  const [date, setDate] = useState(""); 
  const [yearEnd, setYearend] = useState(""); 

  
  useEffect(()=>{
    async function getData()
    {
      const data=await getRequest(ServerConfig.url,PAYMEMPLOYEE)
      setEmployee(data.data)
      const data1=await getRequest(ServerConfig.url,PAYMEMPLOYEELEAVE)
      setLeave(data1.data)
     
  }
    getData()
  
  },[])
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      "pnCompanyId":company,
      pnBranchId:branch,
      pnEmployeeId:pnEmployeeId,
      pnLeaveId:pnLeaveId,
      allowDays:allowDays,
      takenDays:takenDays,
      maxDays:maxDays,
      balDays:balDays,
      basicPerDay:basicPerDay,
      totalAmt:totalAmt,
      date:date,
      yearEnd:yearEnd,

    
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
                    <Grid xs={12} sm={6} item>
                 
                 <FormControl fullWidth>
                 <InputLabel shrink>EMPID</InputLabel>
                 
                 <select 
                 name = "pnLeaveId"
                 onChange={(e)=>{
                 
                 var s=e.currentTarget.value
               var leaveid=leave.filter((e)=>e.pnLeaveId==s)
               setPnLeaveID(s)
              //  setBasicSalary(parseFloat(empid[0].basicSalary))
              //  setEmployee(employee.filter((e)=>(e.pnBranchid==branch && e.pnCompanyid==company)))
                    
             }}
             style={{height:'50px'}}>
              <option value="">Select</option>
                  {
                     
                     leave.map((e)=><option>{e.pnLeaveId}</option>)
                  }
                
                 </select>
              </FormControl>
               </Grid>
                  
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="allowDays"
                     
                      label="allowDays"
                      variant="outlined"
                      fullWidth
                      required
                    
                      onChange={(e) => setAllowdays(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="takenDays"
                     
                      label="takenDays"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setTakendyas(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="maxDays"
                     
                      label="maxDays"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMaxdys(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="balDays"
                     
                      label="balDays"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBaldays(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="basicPerDay"
                     
                      label="basicPerDay"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBasicperday(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>

                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="totalAmt"
                     
                      label="totalAmt"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setTotalamt(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="date"
                     
                      label="date"
                      variant="outlined"
                      fullWidth
                      required
                      type='datetime-local'
                      onChange={(e) => setDate(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
                    <Grid  xs={12}  sm={6} item>
                      <FormControl fullWidth> 
                    <TextField
                  name="yearEnd"
                     
                      label="yearEnd"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setYearend(e.target.value)} 
                    />
                    </FormControl>
                    </Grid>
  
        
        
              {
              inputpaymEncashmentDetailsForm.map(input=> <Grid xs={input.xs} sm={input.sm} item>
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
      pnLeaveId:pnLeaveId,
      allowDays:allowDays,
      takenDays:takenDays,
      maxDays:maxDays,
      balDays:balDays,
      basicPerDay:basicPerDay,
      totalAmt:totalAmt,
      date:date,
      yearEnd:yearEnd,

   
    };
  console.log(formData)
  postRequest(ServerConfig.url,PAYMENCASHMENTDETAILS,formData).then((e)=>{
    console.log(e)
    navigate('/PaymEncashmentDetailsTables')
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
    
  
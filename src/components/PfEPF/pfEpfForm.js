import {TextField, Button, Card,  Typography, Box, Grid, CardContent,FormControl,InputLabel} from '@mui/material';
import { inputFormElements19} from './pfEpf'
import { PFEPF } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/lab'; 

import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Sample19() {
  
  const [company,setCompany]=useState([])
  const [branch,setBranch]=useState([])
  const [employee, setEmployee] = useState([]);
  const [pnCompanyId, setCompanyid]=useState("")
  const [pnBranchId, setBranchid]= useState("")
  const[pnEmployeeId,setEmpoyeeID]=useState("")
  const[dateofbirth,setDataofBirth]=useState("")
  const [nomineeName,setNomineename]=useState("");
  const [gender,setGender]=useState("");

  const [dob,setDob]=useState("");
  const [pfShare,setPfshare]=useState("");
  const [relationship,setRelationship]=useState("");
  const [address1,setAdress1]=useState("");
  const [state,setState]=useState("");
  const [district,setDistrict]=useState("");
  const [city,setCity]=useState("");
  const [pinNo,setPino]=useState("");


  const navigate = useNavigate();

  
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
      pnCompanyId: pnCompanyId,
    pnBranchid: pnBranchId,
    pnEmployeeId:pnEmployeeId,
    nomineeName:nomineeName ,
    gender: gender,
    dob: dob,
    pfShare: pfShare,
    relationship:relationship,
    address1:address1,
    state:state,
    district:district,
    city:city,
    pinNo:pinNo,
  };
  console.log(formData)
  };
    const margin={margin:"0 5px"}
    return (
        <div>
          <Grid style={{padding: "80px 5px 0 5px"}}>
            <Card style = {{maxWidth: 600, margin: "0 auto"}}>
              <CardContent>
                <Typography variant='h5' color='S- Light' align='center'>
                   PfEpf
                </Typography>
                <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
                  Fill all the Mandatory fields 
                </Typography>
           <form>
            <Grid container spacing ={2}>
           
            <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
             
              <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 onChange={(e)=>{
                  setCompanyid(e.target.value)
                  console.log(pnCompanyId)

                  
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
                  setBranchid(e.target.value)
                //  setShiftDetails(shiftdetails.filter((e)=>(e.pnBranchid==1 && e.pnCompanyid==1)))
                //  console.log(shiftdetails)
               
                
                 }}
                 style={{ height: '50px' }}
                 inputlabelprops={{ shrink: true }}
                 >
                  <option value="">Select</option>
                     {
                       
                          employee.filter((e)=>(e.pnCompanyId==pnCompanyId)).map((e)=><option>{e.pnBranchId}</option>)
                     }
                 </select>
                 </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                 
                    <FormControl fullWidth>
                    <InputLabel shrink>pnEmployeeId</InputLabel>
                 <select 
                 name = "pnEmployeeId"
                 onChange={(e)=>{
                    
                     var v=e.target.value
                  var empid=employee.filter((e)=>e.pnEmployeeId==v)
                  setEmpoyeeID(v)
                  setGender(empid[0].gender)
                
                  setDob(empid[0].dateofBirth)
                  console.log(dob)
             
                 }}
                 style={{ height: '50px' }}
                 >
                        <option value="">Select</option>
                 
                     {
                        
                        employee.filter((e)=>(e.pnCompanyId==pnCompanyId && e.pnBranchId==pnBranchId)).map((e)=><option>{e.pnEmployeeId}</option>)
                      
                     }
                 </select>
                 </FormControl>
                  </Grid>

            
                   <Grid xs={12} sm={6} item  >
                  
                   <FormControl fullWidth>
                  <TextField 
                  name= "gender"
                  value={gender}
                  label="gender"
                  variant="outlined"
                  fullWidth
                  required  /> 
                  </FormControl>
                  </Grid>

                  <Grid xs={12} sm={6} item  >
                        <FormControl fullWidth>
                        <InputLabel shrink>dob</InputLabel>
                       
               <TextField 
                     name= "dob"
                         label= "dob" 
                         variant= "outlined"
                         fullWidth
                         required 
                   value={dob}
                   onChange={(e) => setDob(e.target.value)}
                />             
               
               </FormControl>
               </Grid>
 
               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "nomineeName"
                         label= "nomineeName" 
                         variant= "outlined"
                         fullWidth
                         required 
                       
                       
                       
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setNomineename(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>

               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "pfShare"
                         label= "pfShare" 
                         variant= "outlined"
                         fullWidth
                         required 
                       
                   
                       
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setPfshare(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>

               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "relationship"
                         label= "relationship" 
                         variant= "outlined"
                         fullWidth
                         required 
                       
                       
                        
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setRelationship(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>

               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "address1"
                         label= "address1" 
                         variant= "outlined"
                         fullWidth
                         required 
                        
                       
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setAdress1(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>

               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "state"
                         label= "state" 
                         variant= "outlined"
                         fullWidth
                         required 
                      
                       
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setState(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>

                 <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "district"
                         label= "district" 
                         variant= "outlined"
                         fullWidth
                         required 
               
                       
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setDistrict(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>

               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "city"
                         label= "city" 
                         variant= "outlined"
                         fullWidth
                         required 
               
                    
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setCity(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>
              

               <Grid xs={12} sm={6} item  >
                <FormControl fullWidth>
               <TextField 
                     name= "pinNo"
                         label= "pinNo" 
                         variant= "outlined"
                         fullWidth
                         required 
               
                         InputLabelProps={{ shrink: true }}
                         onChange={(e) => setPino(e.target.value)} 

                          /> 
               
               </FormControl>
               </Grid>
              

              

              {
                inputFormElements19.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                  {/* <TextField {...input}  InputLabelProps={{shrink:true}}/>  */}
                  </Grid>)
              }
               </Grid>
               <Grid container spacing={1} paddingTop={'20px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button onClick={()=>{
  const formData = {
    pnCompanyId: pnCompanyId,
    pnBranchid: pnBranchId,
    pnEmployeeId:pnEmployeeId,
    nomineeName:nomineeName ,
    gender: gender,
    dob: dob,
    pfShare: pfShare,
    relationship:relationship,
    address1:address1,
    state:state,
    district:district,
    city:city,
    pinNo:pinNo,

  };
console.log(formData)
postRequest(ServerConfig.url,PFEPF,formData).then((e)=>{
  console.log(e)
  navigate('/PfepfTable')
}).catch((e)=>console.log(e));           
                }}  
        variant='contained' color='primary' >SAVE</Button>              </Grid>
              </Grid>
    
    
           
           </form>
           </CardContent>
           </Card>
           </Grid>
        </div>
    );
} 
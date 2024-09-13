import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent ,FormControl,InputLabel
  } from '@mui/material';

  import {inputpaymbranchForm} from './PaymBranch';
  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { getRequest ,postRequest} from '../../serverconfiguration/requestcomp';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { PAYMBRANCHES, PAYMCOMPANIES, PAYMEARNING, PAYMEMPEARNING } from '../../serverconfiguration/controllers';
  
    
  

  export default function PayBranchForm() {
    

    const navigate = useNavigate();

    const[company,setCompany]=useState([])
    const [branch,setBranch]=useState([])
    const[earnings,setEarnings]=useState([])
    const[pnCompanyId,setPnCompanyId]=useState("")
    const[branchCode,setBranchCode]=useState("")
    const[branchName,setBranchName]=useState("")
    const[addressLine1,setAddressLine1]=useState("")
    const[addressLine2,setAddressLine2]=useState("")
    const[city,setCity]=useState("")
    const[zipCode,setZipCode]=useState("")
    const[country,setCountry]=useState("")
    const[state,setState]=useState("")
    const[phoneNo,setPhoneNo]=useState("")
    const[faxNo,setFaxNo]=useState("")
    const[emailId,setEmailId]=useState("")
    const[alternateEmailId,setAlternateEmailId]=useState("")
    const[branchUserId,setBranchUserId]=useState("")
    const[branchPassword,setBranchPassword]=useState("")
    const[status,setStatus]=useState("")
    const[pfno,setPfno]=useState("")
    const[esino,setEsino]=useState("")
    const[startDate,setStartDate]=useState("")
    const[endDate,setEndDate]=useState("")



    useEffect(()=>{
      async function getData(){
        const data = await getRequest(ServerConfig.url,PAYMCOMPANIES);
        setCompany(data.data);
      }
      getData();
    },[]);



    const margin={margin:"0 5px"}
    return (
      <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style = {{maxWidth: 600, margin: "0 auto"}}>
        <CardContent>
        <Typography variant='h5' color='S- Light' align='center'>PAYM BRANCHES</Typography>
        <form>
       
        <Grid container spacing={2} inputlabelprops={{shrink:true}}>
        <Grid item xs={12} sm={6} >
              <FormControl fullWidth>
           <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 onChange={(e)=>{
                  setPnCompanyId(e.target.value)
                  
                 }}
                 style={{ height: '50px' }}

                 >
                  <option value="">Select</option>
                     {

                        company.map((e)=><option>{e.pnCompanyId}</option>)
                     }
                 </select>
              </FormControl >
                  </Grid>

                                  <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="branchCode"
                  label="branchCode"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setBranchCode(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="branchName"
                  label="branchName"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setBranchName(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="addressLine1"
                  label="addressLine1"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setAddressLine1(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="addressLine2"
                  label="addressLine2"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setAddressLine2(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="city"
                  label="city"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCity(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="zipCode"
                  label="zipCode"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setZipCode(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="country"
                  label="country"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setCountry(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

               

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="state"
                  label="state"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setStatus(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="phoneNo"
                  label="phoneNo"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPhoneNo(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="faxNo"
                  label="faxNo"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setFaxNo(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="emailId"
                  label="emailId"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setEmailId(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="alternateEmailId"
                  label="alternateEmailId"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setAlternateEmailId(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>  
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="branchPassword"
                  label="branchPassword"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setBranchPassword(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="status"
                  label="status"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setStatus(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="pfno"
                  label="pfno"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setPfno(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
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
                  onChange={(e) => setEsino(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="startDate"
                  label="startDate"
                  variant="outlined"
                  fullWidth
                  required
                  type='datetime-local'
                  onChange={(e) => setStartDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="endDate"
                  label="endDate"
                  variant="outlined"
                  fullWidth
                  required
                  type='datetime-local'
                  onChange={(e) => setEndDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={'10px'}>
            
            <Grid item xs ={12} align="right" >
              <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
              <Button onClick={()=>{
const formData = {
  pnCompanyId: pnCompanyId,
  branchCode:branchCode,
  branchName:branchName,
  addressLine1:addressLine1,
  addressLine2:addressLine2,
  city:city,
  zipCode:zipCode,
  country:country,
  state:state,
  phoneNo:phoneNo,
  faxNo:faxNo,
  emailId: emailId,
  alternateEmailId:alternateEmailId,
  branchUserId: branchUserId,
  branchPassword:branchPassword,
  status:status,
  pfno:pfno,
  esino: esino,
  startDate:startDate,
  endDate: endDate,
  pnCompany:{
    "pnCompanyId":pnCompanyId 
  }
};
console.log(formData)
postRequest(ServerConfig.url,PAYMBRANCHES, formData).then((e)=>{
console.log(e)
navigate('/PaymBranchtable')
}).catch((e)=>console.log(e));

                
              }}  
      variant='contained' color='primary' >SAVE</Button>
            </Grid>
            </Grid>
                </Grid>
                </form>
                </CardContent>
                </Card>
                </Grid>
                </div>
    )   
    
}
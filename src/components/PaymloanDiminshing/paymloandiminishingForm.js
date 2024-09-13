import {TextField, Button, Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';
import {useState,useEffect} from 'react'
import  {getRequest,postRequest} from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { Label } from '@mui/icons-material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import {  PAYMEMPLOYEE, PAYMLOANDIMINISHING  } from '../../serverconfiguration/controllers';
import { useNavigate } from 'react-router-dom';
import { PAYMEMPLOYEELEAVE } from '../../serverconfiguration/controllers';
import {inputFormElements27} from './paymloandiminishing';

export default function EmployeeWorkDetailsForm() {
  const navigate = useNavigate();
    const [loandiminishing,setLoanDiminishing]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnCompanyid,setPnCompanyid]=useState("")
const [pnBranchid, setPnBranchid] = useState(""); // Declare status state
const [pnEmployeeid, setPnEmployeeid] = useState(""); // Declare status state
const [fnLoanId, setFnLoanId] = useState(""); // Declare status state
const [loanAppid, setLoanAppid] = useState(""); // Declare status state
const [loanAmount, setLoanAmount] = useState(""); // Declare status state
const [balanceAmt, setBalanceAmt] = useState(""); 
const [installementCount, setInstallementCount] = useState(""); 
const [effDate, setEffDate] = useState(""); 
const [fromDate, setFromDate] = useState(""); 

const [toDate, setToDate] = useState(""); 

const [instalAmt, setInstalAmt] = useState(""); 
const [months, setMonths] = useState(""); 
const [loanStatus, setLoanStatus] = useState(""); 



useEffect(()=>{
  async function getData()
  {
    const data=await getRequest(ServerConfig.url,PAYMLOANDIMINISHING)
    setLoanDiminishing(data.data)
   
}
  getData()

},[])


const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = {
    pnCompanyid:pnCompanyid,
    pnBranchid:pnBranchid,
    pnEmployeeid:pnEmployeeid,
    fnLoanId:fnLoanId,
    loanAppid:loanAppid,
    loanAmount:loanAmount,
    balanceAmt:balanceAmt,
    installementCount:installementCount,
    effDate:effDate,
    fromDate:fromDate,
    toDate:toDate,
    instalAmt:instalAmt,
    months:months,
    loanStatus:loanStatus

  };
console.log(formData)
};
    const margin={margin:"0 5px"}
    return (
      <div className="App">
          <Card style ={{ maxWidth: 600, margin: "0 auto" ,font:'initial'}}>
        <CardContent>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">Paym Employee Work Details</Typography>
   
             <form>
             <Grid container spacing={2} columns={12} >
             <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="pnCompanyid"
                   
                    label="pnCompanyid"
                    variant="outlined"
                    fullWidth
                    required
                
                    onChange={(e) => setPnCompanyid(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="pnBranchid"
                   
                    label="pnBranchid"
                    variant="outlined"
                    fullWidth
                    required
                
                    onChange={(e) => setPnBranchid(e.target.value)} 
                  />
                  </FormControl>
                  </Grid> <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="pnEmployeeid"
                   
                    label="pnEmployeeid"
                    variant="outlined"
                    fullWidth
                    required
                
                    onChange={(e) => setPnEmployeeid(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="fnLoanId"
                   
                    label="fnLoanId"
                    variant="outlined"
                    fullWidth
                    required
                
                    onChange={(e) => setFnLoanId(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>    
        
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="loanAppid"
                   
                    label="loanAppid"
                    variant="outlined"
                    fullWidth
                    required
                 
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setLoanAppid(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="loanAmount"
                   
                    label="loanAmount"
                    variant="outlined"
                    fullWidth
                    required
                 
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setLoanAmount(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="balanceAmt"
                   
                    label="balanceAmt"
                    variant="outlined"
                    fullWidth
                    required
                    
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setBalanceAmt(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="installementCount"
                   
                    label="installementCount"
                    variant="outlined"
                    fullWidth
                    required
                 
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setInstallementCount(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="effDate"
                   
                    label="effDate"
                    variant="outlined"
                    fullWidth
                    required
                    type='datetime-local'
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setEffDate(e.target.value)} 
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
                    InputLabelProps={{ shrink: true }}

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
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setToDate(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="instalAmt"
                   
                    label="instalAmt"
                    variant="outlined"
                    fullWidth
                    required
                  
                    InputLabelProps={{ shrink: true }}

                    onChange={(e) => setInstalAmt(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="months"
                   
                    label="months"
                    variant="outlined"
                    fullWidth
                    required
                
                    onChange={(e) => setMonths(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>

                  <Grid  xs={12}  sm={6} item>
                    <FormControl fullWidth> 
                  <TextField
                name="loanStatus"
                   
                    label="loanStatus"
                    variant="outlined"
                    fullWidth
                    required
                
                    onChange={(e) => setLoanStatus(e.target.value)} 
                  />
                  </FormControl>
                  </Grid>
                
      
            {
              inputFormElements27.map(input=> <Grid xs={input.xs} sm={input.sm} item>                                {/* <TextField {...input}  InputLabelProps={{shrink:true}}/> */}
              </Grid>)
            }
            
             <Grid item xs={12} align="right">
              <Button type="reset" variant="contained" color="primary"style={{paddingRight:'3'}} >Reset</Button>
              <Button onClick={()=>{
  const formData = {
    pnCompanyid:pnCompanyid,
    pnBranchid:pnBranchid,
    pnEmployeeid:pnEmployeeid,
    fnLoanId:fnLoanId,
    loanAppid:loanAppid,
    loanAmount:loanAmount,
    balanceAmt:balanceAmt,
    installementCount:installementCount,
    effDate:effDate,
    fromDate:fromDate,
    toDate:toDate,
    instalAmt:instalAmt,
    months:months,
    loanStatus:loanStatus
 
  };
console.log(formData)
postRequest(ServerConfig.url,PAYMLOANDIMINISHING,formData).then((e)=>{
  console.log(e)
  navigate('/PaymLoanDiminishingTable')
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
  

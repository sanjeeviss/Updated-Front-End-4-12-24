import { Grid,Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl
} from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYINPUT, PAYROLLFINALSETTLEMENT } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import {InputLabel} from '@mui/material';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import PayrollFinalSettlemetTable from '../Payrollfinalsettlement/payrollfinalsettlementTables';



export default function PayinputForm() {
const navigate= useNavigate();
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [pnEmployeeId,setEmployeeId]=useState("")
const [dDate,setDdate]=useState([])
const [dFromDate,setDfromDate]=useState("")
const [dToDate,setDtoDate]=useState("")
const [calcDays,setCalcDays]=useState("")
const [paidDays,setPaidDays]=useState("")
const [presentDays,setPresentDays]=useState("")
const[holidays, setHolidays] = useState("")
const [absentDays,setAbsentDays]=useState("")
const [totLeaveDays,setTotLeaveDays]=useState("")
const [weekOffDays,setWeekOffDays]=useState("")
const [attBonusAmount,setAttBonusAmount]=useState("")
const [onDutyDays,setOnDutyDays]=useState("")
const [compoffDays,setCompOffDays]=useState("")
const [otHrs,setOtHrs]=useState("")
const [earnArrears,setEarnArrears]=useState("")
const [attBonus,setAttBonus]=useState("")
const [dedArrears,setDedArrears]=useState("")
const [otValue,setOtValue]=useState("")
const [otAmt,setOtAmt]=useState("")
const [actBasic,setActBasic]=useState("")
const [earnBasic,setEarnBasic]=useState("")
const [mode,setMode]=useState("")
const [flag,setFlag]=useState("")
const [ptGross,setPtGross]=useState("")
const[tourDays, setTourDays] = useState("")
const [paymBranch,setPaymBranch]=useState("")


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
        pnEmployeeId: pnEmployeeId,
        dDate: dDate,
        dFromDate: dFromDate,
        dToDate: dToDate,
        calcDays: calcDays,
        paidDays: paidDays,
        presentDays: presentDays,
        absentDays: absentDays,
        totLeaveDays: totLeaveDays,
        weekOffDays:  weekOffDays,
        holidays: holidays,
        onDutyDays: onDutyDays,
        compoffDays: compoffDays,
        tourDays: tourDays,
        attBonus: attBonus,
        attBonusAmount: attBonusAmount,
        otHrs: otHrs,
        earnArrears: earnArrears,
        dedArrears: dedArrears,
        otValue: otValue,
        otAmt: otAmt,
        actBasic: actBasic,
        earnBasic: earnBasic,
        mode: mode,
        flag: flag,
        ptGross: ptGross,
        paymBranch:{
          "pnbranchId":branch 
        },
        pnCompany:{
          "pnCompanyId":company
        }
};
console.log(formData)
};

  const margin={margin:"0 5px"}
  return (
    <div>
      <Grid style ={{ padding: "80px 5px0 5px" }}>
      <Card style = {{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
      <Typography variant='h5' color='S- Light' align='center'>PayinputForm</Typography>
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
                  <FormControl fullWidth >
                  <InputLabel shrink>EmployeeId</InputLabel>
               <select 
               name="pnEmployeeId"
               onChange={(e)=>{
                setEmployeeId(e.target.value)
              
               }}
               style={{ height: '50px' }}
               inputlabelprops={{ shrink: true }}
               >
                <option value="">Select</option>
                   {
                     
                        employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==  branch)).map((e)=><option>{e.pnEmployeeId}</option>)
                   }
               </select>
               </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dDate"
                 
                  label="dDate"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) => setDdate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


<Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dFromDate"
              type= "datetime-local"
                  label="dFromDate"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setDfromDate(e.target.value)} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="dToDate"
                 
                  label=" dToDate"
                  variant="outlined"
                  type= "datetime-local"
                  fullWidth
                  required
                  onChange={(e) =>  {
                    setDtoDate(e.target.value)
                   console.log(dToDate)

                  }} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="calcDays"
                 
                  label="calcDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setCalcDays(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="paidDays"
                 
                  label="paidDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) => setPaidDays(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="presentDays"
                 
                  label="presentDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setPresentDays(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name="absentDays"
                 
                  label="absentDays"
                  variant="outlined"
                 
                  fullWidth
                  required
                  onChange={(e) => setAbsentDays(e.target.value)} 
                  
                />
                </FormControl>
                </Grid>
               
                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "totLeaveDays"
                 
                  label="totLeaveDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setTotLeaveDays(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "weekOffDays"
                 
                  label="weekOffDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setWeekOffDays(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "holidays"
                 
                  label="holidays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setHolidays(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "onDutyDays"
                 
                  label="onDutyDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setOnDutyDays(e.target.value)} 

                />
                </FormControl>
                </Grid>



                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "compoffDays"
                 
                  label="compoffDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setCompOffDays(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "tourDays"
                 
                  label="tourDays"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setTourDays(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "attBonus"
                 
                  label=" attBonus"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setAttBonus(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "attBonusAmount"
                 
                  label="attBonusAmount"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setAttBonusAmount(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "otHrs"
                 
                  label="otHrs"
                  variant="outlined"
                  type='time'
                  fullWidth
                  required
                  onChange={(e) =>setOtHrs(e.target.value + ':00.000')} 
                  InputLabelProps={{ shrink: true }} 
                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "earnArrears"
                 
                  label="earnArrears"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setEarnArrears(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "dedArrears"
                 
                  label="dedArrears"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setDedArrears(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "otValue"
                 
                  label="otValue"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setOtValue(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "otAmt"
                 
                  label="otAmt"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setOtAmt(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "actBasic"
                 
                  label="actBasic"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setActBasic(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "earnBasic"
                 
                  label="earnBasic"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setEarnBasic(e.target.value)} 

                />
                </FormControl>
                </Grid>

                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "mode"
                 
                  label="mode"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setMode(e.target.value)} 

                />
                </FormControl>
                </Grid>

               


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "flag"
                 
                  label="flag"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setFlag(e.target.value)} 

                />
                </FormControl>
                </Grid>


                <Grid  xs={12}  sm={6} item>
                  <FormControl fullWidth> 
                <TextField
              name= "ptGross"
                 
                  label="ptGross"
                  variant="outlined"
                  
                  fullWidth
                  required
                  onChange={(e) =>setPtGross(e.target.value)} 

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
  dDate: dDate.toString().split("T").join(" ")+":00",
  dFromDate: dFromDate.split("T").join(" ")+":00",
  dToDate: dToDate.split("T").join(" ")+":00",
  calcDays: calcDays,
  paidDays: paidDays,
  presentDays: presentDays,
  absentDays: absentDays,
  totLeaveDays: totLeaveDays,
  weekOffDays:  weekOffDays,
  holidays: holidays,
  onDutyDays: onDutyDays,
  compoffDays: compoffDays,
  tourDays: tourDays,
  attBonus: attBonus,
  attBonusAmount: attBonusAmount,
  otHrs: otHrs,
  earnArrears: earnArrears,
  dedArrears: dedArrears,
  otValue: otValue,
  otAmt: otAmt,
  actBasic: actBasic,
  earnBasic: earnBasic,
  mode: mode,
  flag: flag,
  ptGross: ptGross,
  paymBranch:{
    pnCompany:{
      "pnCompanyId": company
    }
  }   
 
  
};
console.log(formData)
postRequest(ServerConfig.url,PAYINPUT,formData).then((e)=>{
console.log(e)
navigate('/PayInputTable')
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


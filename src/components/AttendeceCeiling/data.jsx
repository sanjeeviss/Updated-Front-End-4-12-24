import {TextField, Button, Card,  Typography, Box, Grid, CardContent, FormControl} from '@mui/material';
import { inputFormElements18} from './punchdetail'
import {useState,useEffect} from 'react'
import { PAYMEMPLOYEE, PUNCHDETAILS } from '../../serverconfiguration/controllers';
import  {getRequest} from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
export default function Sample18() {
const [employee,setEmployee]=useState([])
const [company,setCompany]=useState([])
const [branch,setBranch]=useState([])
const [employeeCode,setEmployeeCode]=useState("")
const [employeeName,setEmployeeName]=useState("")
useEffect(()=>{
    async function getData()
    {
      const data=await getRequest(ServerConfig.url,PAYMEMPLOYEE)
      setEmployee(data.data)
    }
    getData()
        
   })


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
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6} width={200}>
              
                 <select onChange={(e)=>{
                  setCompany(e.currentTarget.value)
                  
                 }}>
                     {
                        employee.map((e)=><option>{e.pnCompanyId}</option>)
                        
                     }
                 </select>
              
                  </Grid>
                  <Grid xs={12} sm={6} item>
                 <select onChange={(e)=>{
                  setBranch(e.currentTarget.value)
                 }}>
                     {
                       
                          employee.filter((e)=>(e.pnCompanyId==company)).map((e)=><option>{e.pnBranchId}</option>)
                     }
                 </select>
                  </Grid>

                  <Grid xs={12} sm={6} item>
                 <select onChange={(e)=>{
                    
                     var v=e.currentTarget.value
                  var empname=employee.filter((e)=>e.employeeCode==v)
                  setEmployeeName(empname[0].employeeFullName)
                     

                 }}>
                 
                     {
                        
                        employee.filter((e)=>(e.pnCompanyId==company && e.pnBranchId==branch)).map((e)=><option>{e.employeeCode}</option>)
                     }
                 </select>
                  </Grid>
                  
            
                   <Grid xs={12} sm={6} item>
                  <TextField value={employeeName} disabled='true'/> 
                  </Grid>
            
                  
              {
                inputFormElements18.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                  <TextField {...input}  InputLabelProps={{shrink:true}}/> 
                  </Grid>)
              }
               </Grid>
               <Grid container spacing={1} paddingTop={'20px'}>
              
              <Grid item xs ={12} align="right" >
                <Button style={margin} type="reset" variant='outlined' color='primary' >RESET</Button>
                <Button type = "submit" variant='contained' color='primary' >SAVE</Button>
              </Grid>
              </Grid>
    
    
           
           </form>
           </CardContent>
           </Card>
           </Grid>
        </div>
    );
}
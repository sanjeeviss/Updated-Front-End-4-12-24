import React, { useState,useEffect } from 'react'
import { Typography, Table, TableBody, Container, TableCell, TableContainer, TableRow, Paper, Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import {REPORTS} from '../../serverconfiguration/controllers'
function Masterroll() {

    const [rolldata,setRolldata]=useState([])
    useEffect(()=>{
        async function getData()
         {
        return await postRequest(ServerConfig.url,REPORTS,{
          "query": "SELECT emp_code,emp_name,(select dateofbirth from paym_employee where employeecode=emp_code)as dob,(select father_name from paym_employee_profile1 where pn_employeeid=(select pn_employeeid from paym_employee where employeecode=emp_code)) as father_name,(select v_DesignationName from paym_designation where pn_designationid=(select pn_DesingnationId from paym_employee_profile1 where pn_employeeid=(select pn_employeeid from paym_employee where employeecode=emp_code))) as designation, (SELECT   CONCAT(Address_Line1, ', ', Address_Line2, ', ', City)  from paym_branch where pn_branchid = (select pn_branchid from paym_employee where employeecode=emp_code )) as FullAddress,COUNT(CASE WHEN status = 'P' THEN 1 END) AS total_P,COUNT(CASE WHEN status = 'A' THEN 1 END) AS total_A, COUNT(CASE WHEN status = 'L' THEN 1 END) AS total_L, COUNT (CASE WHEN status='H' THEN 1 END) AS total_H,MAX(CASE WHEN DAY(dates) = 1 THEN status END) AS day_1,MAX(CASE WHEN DAY(dates) = 2 THEN status END) AS day_2,MAX(CASE WHEN DAY(dates) = 3 THEN status END) AS day_3,MAX(CASE WHEN DAY(dates) = 4 THEN status END) AS day_4, MAX(CASE WHEN DAY(dates) = 5 THEN status END) AS day_5, MAX(CASE WHEN DAY(dates) = 6 THEN status END) AS day_6,MAX(CASE WHEN DAY(dates) = 7 THEN status END) AS day_7,MAX(CASE WHEN DAY(dates) = 8 THEN status END) AS day_8,  MAX(CASE WHEN DAY(dates) = 9 THEN status END) AS day_9,MAX(CASE WHEN DAY(dates) = 10 THEN status END) AS day_10,MAX(CASE WHEN DAY(dates) = 11 THEN status END) AS day_11,MAX(CASE WHEN DAY(dates) = 12 THEN status END) AS day_12,MAX(CASE WHEN DAY(dates) = 13 THEN status END) AS day_13,MAX(CASE WHEN DAY(dates) = 14 THEN status END) AS day_14, MAX(CASE WHEN DAY(dates) = 15 THEN status END) AS day_15,MAX(CASE WHEN DAY(dates) = 16 THEN status END) AS day_16,MAX(CASE WHEN DAY(dates) = 17 THEN status END) AS day_17,MAX(CASE WHEN DAY(dates) = 18 THEN status END) AS day_18,MAX(CASE WHEN DAY(dates) = 19 THEN status END) AS day_19, MAX(CASE WHEN DAY(dates) = 20 THEN status END) AS day_20, MAX(CASE WHEN DAY(dates) = 21 THEN status END) AS day_21, MAX(CASE WHEN DAY(dates) = 22 THEN status END) AS day_22, MAX(CASE WHEN DAY(dates) = 23 THEN status END) AS day_23,MAX(CASE WHEN DAY(dates) = 24 THEN status END) AS day_24,MAX(CASE WHEN DAY(dates) = 25 THEN status END) AS day_25,MAX(CASE WHEN DAY(dates) = 26 THEN status END) AS day_26,MAX(CASE WHEN DAY(dates) = 27 THEN status END) AS day_27,MAX(CASE WHEN DAY(dates) = 28 THEN status END) AS day_28,MAX(CASE WHEN DAY(dates) = 29 THEN status END) AS day_29,MAX(CASE WHEN DAY(dates) = 30 THEN status END) AS day_30 FROM time_card where MONTH(dates)=MONTH(GetDate()) GROUP BY emp_code,emp_name"})
         }
         

         getData().then((e)=>setRolldata(e.data))

    },[])
    console.log(rolldata)


    const renderStatus = (status) => {
      switch (status) {
        case 'P':
          return 'X';
        case 'A':
          return 'A';
        case 'H':
          return 'H';
        case 'W':
          return 'W';
        case 'C':
          return 'C';
        case 'O':
          return 'O';
        case 'T':
          return 'T';
          case 'H':
            return 'HF';
        case 'C':
          return 'C';
        case 'E':
          return 'E';
          default:
            return 'A';
      }
    };
   
  return (
    
   
<div style={{ textAlign: 'center', margin: '20px' ,fontSize:"5px" }}>
{
      console.log(rolldata)
    }
<Container maxWidth="lg">
      <Grid container direction="column" spacing={2}>
    <Typography  variant="h4"  gutterBottom   style={{textAlign:'center',fontSize:8 }}>
      Master Roll
    </Typography>
  </Grid>

 <Grid  display="inline-flex">
      <Grid item xs={3}>
      <Typography style={{ textAlign: 'left', paddingLeft: '10px' }}>
          name & address<br />
          of the factory
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography style={{ textAlign: 'left'}}>
          Hesperus Automation Pvt Ltd <br/>
          16, chakrabani Road guindy,<br/>
          chennai-600 042
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography style={{ textAlign: 'center'}}>
         Form No: 25 <br/>
         (Prescribed under rule 103 of the Madras Factory Rules 1950 & under G. O. No. 2759 of 1959)<br/>
          chennai-600 042
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography style={{ textAlign: 'right', paddingRight: '100px' }}>
        Register Number:
        </Typography>
      </Grid>
    </Grid>
<Grid>
  <Typography variant='h6'>
  Register of Muster Roll for the month of February 2010
  </Typography>
</Grid>

<Grid item xs={12} fullWidth>
            <Table>
              <TableBody>
                <TableRow sx={{ border: 1, borderColor: 'black.300',textAlign:'center',fontSize:8,width:'1700px' }}>
                  <TableCell sx={{ border: 1, borderColor: 'black.300',  padding: '5px',fontSize:8 }}>s.no</TableCell>
                  <TableCell sx={{ border: 1,textAlign:'center', borderColor: 'black.300',fontSize:8 }}>name of the worker</TableCell>
                  <TableCell sx={{ border: 1,textAlign:'center' , borderColor: 'black.300',fontSize:8 }}>Father name</TableCell>
                  <TableCell sx={{ border: 1,textAlign:'center' , borderColor: 'black.300', padding: '5px',fontSize:8  }}>Designation<br></br>nature of worker</TableCell>
                  <TableCell sx={{ border: 1, textAlign:'center' ,borderColor: 'black.300', padding: '5px' ,fontSize:8  }}>date of birth to be supported by extra from birth register</TableCell>
                  <TableCell sx={{ border: 1,textAlign:'center' , borderColor: 'black.300', padding: '5px' ,fontSize:8 }}>place of employeement</TableCell>
                  <TableCell sx={{ border: 1,textAlign:'center' , borderColor: 'black.300', padding: '5px',fontSize:8 }}>Grp N</TableCell>
                  <TableCell sx={{ border: 1,textAlign:'center' , borderColor: 'black.300',  padding: '5px',fontSize:8  }}>Grp N</TableCell>
                  
                  <TableCell sx={{ border: 1, borderColor: 'black.300',  padding: '1px',fontSize:8 }}>Relay no.</TableCell>
                  <TableCell colSpan={31} sx={{   textAlign:'center', borderColor: 'black.300',fontSize:8 }}>
                    <Table><tr><td>For the Period Ending Days</td></tr><tr><td> 
                      {[...Array(31).keys()].map((day) => (
                  
                  <TableCell key={day + 1} sx={{ border: 1, borderColor: 'black.300', padding: '5px',fontSize:8 }}>{day + 1}</TableCell>
                ))}</td></tr></Table></TableCell>

                  <TableCell sx={{ border: 1, borderColor: 'black.300',  padding: '1px',fontSize:8 }}>Dwrkd</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '0'  ,fontSize:8 }}>Nlgw</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'black.300', padding: '0' ,fontSize:8  }}>ndabs</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'black.300',  padding: '0' ,fontSize:8 }}>Ndcw</TableCell>
                  <TableCell sx={{ border: 1, borderColor: 'black.300',  padding: '1px',fontSize:8 }}>remarks</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ border: 1,textAlign:'center', borderColor: 'black.300', padding: '5px',}}>
                  {
  rolldata.map((e, index) =>  <TableRow key={index}> <TableCell key={index}>{1}</TableCell> </TableRow>)
}
                </TableCell>
             <TableCell sx={{ border: 1,textAlign:'center', borderColor: 'black.300', padding: '5px',}}>
               
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell>{e.emp_name}</TableCell></TableRow>)
                } 
            
                </TableCell>
                <TableCell sx={{ border: 1, borderColor: 'black.300', fontSize:5}}>
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell>{JSON.stringify(e.father_name).replace(/"/g,'')}</TableCell></TableRow>)
                }
                  </TableCell>  
                  <TableCell sx={{ border: 1, borderColor: 'black.300',fontSize:5}}>
               
               {
               rolldata.map((e)=><TableRow><TableCell >{JSON.stringify(e.designation).replace(/"/g,'')}</TableCell></TableRow>)
               }
               
               </TableCell>
               <TableCell sx={{ border: 1, borderColor: 'black.300', }}>
              
               {
               rolldata.map((e)=><TableRow><TableCell >{JSON.stringify(e.dob).replace(/"/g,'')}</TableCell></TableRow>)
               } 
               </TableCell>
               <TableCell sx={{ border: 1,borderTop:'2px solid black',borderBottom:'2px solid black', borderColor: 'black.600', fontSize:3 }}>
               
               {
               rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell>{JSON.stringify(e.FullAddress).replace(/"/g,'')}</TableCell></TableRow>)
               }
               </TableCell>
               <TableCell></TableCell>
               <TableCell></TableCell>
               <TableCell></TableCell>  
               <TableCell sx={{ border: 1, borderColor: 'black.300',fontSize:8 ,padding:'5px'}}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_1).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell>
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300',fontSize:8}}><TableCell >{renderStatus(JSON.stringify(e.day_2).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 1, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell >{renderStatus(JSON.stringify(e.day_3).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 1, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell >{renderStatus(JSON.stringify(e.day_4).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 1, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell >{renderStatus(JSON.stringify(e.day_5).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{  borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow sx={{ border: 1, borderColor: 'black.300', fontSize:5}}><TableCell >{renderStatus(JSON.stringify(e.day_6).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_7).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow sx={{  borderColor: 'black.300', fontSize:5}}><TableCell >{renderStatus(JSON.stringify(e.day_8).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>

             <TableCell sx={{borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow sx={{  borderColor: 'black.300', fontSize:5}}><TableCell >{renderStatus(JSON.stringify(e.day_9).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_10).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_11).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell>
                {
                rolldata.map((e)=><TableRow><TableCell sx={{ border: 1, borderColor: 'black.300',fontSize:8 }}>{renderStatus(JSON.stringify(e.day_12).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_13).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_14).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_15).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_16).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_17).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_18).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell>{renderStatus(JSON.stringify(e.day_19).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_20).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_21).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_22).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_23).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_24).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>

             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_25).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell> 
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_26).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_27).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_28).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_29).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_30).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell>
             {/* <TableCell sx={{ border: 2, borderColor: 'black.300',fontSize:8 }}>
                {
                rolldata.map((e)=><TableRow><TableCell >{renderStatus(JSON.stringify(e.day_31).replace(/"/g,''))}</TableCell></TableRow>)
              }
             </TableCell> */}
             
                </TableRow>
              
              </TableBody>
            </Table>
         
          <br></br>
</Grid>


</Container>

</div>

  )
}



export default Masterroll;




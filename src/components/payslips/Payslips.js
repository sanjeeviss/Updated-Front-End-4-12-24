import React from 'react';
import { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Button } from '@mui/material';
import {  MONTHLYSALARY, PAYSLIP } from '../../serverconfiguration/controllers';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';

import { useRef } from 'react';
import  html2pdf  from 'html2pdf.js/dist/html2pdf.min';
import ReactDOMServer from 'react-dom/server';
import generatePDF from 'react-to-pdf';


const Paycalc = () => {
  const targetRef = useRef();
  const[data, setdata] = useState(0);
  const[data1, setdata1] = useState(0);
 
  
  useEffect (() => {
    getRequest(ServerConfig.url, PAYSLIP + "/EMP001").then((e) => {
      console.log(e.data[0])
      setdata(e.data)
    })
    getRequest(ServerConfig.url, MONTHLYSALARY+"/2017,5,EMP001").then((e) => {
      console.log(e.data[0]);
     setdata1(e.data)
})
  },[]);




 
  return (
    <div style={{ textAlign: 'center', margin: '10px' }} ref={targetRef}>
      <Typography variant="h4" gutterBottom >
        PaySlip
      </Typography>
      <Grid container justifyContent="space-between"> 
        <Grid item>
          <TableContainer component={Paper} style={{ width: 'fit-content' , marginLeft:'200px', marginTop: '10px'}}> {/* Adjust width as needed */}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Employee Details</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}>Name: {data.employeeFirstName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}>Address: { data.addressLine1 }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}  >Desigination:{ data.designationName }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{  padding: '9px', width: '200px'}}>Department:{ data.departmentName }</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <TableContainer component={Paper} style={{ width: 'fit-content', marginRight:'200px', marginTop: '10px' }}> 
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>dDate:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Grade Name:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Paid Days:</TableCell>
                </TableRow>
                
                {/*  <TableCell >1234</TableCell>
                  <TableCell >5678</TableCell>
  <TableCell >9012</TableCell>*/}
                  {
                    
                      <TableRow> <TableCell>
                         {data.dDate}
                        </TableCell>
                          <TableCell>
                            {data.gradeName}
                          </TableCell>
                          <TableCell>
                            {data.paidDays}
                          </TableCell>
                        </TableRow>
                    
                  }
                
                <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Holidays:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Present Days:</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Absent Days:</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell >rrrr</TableCell> 
                  <TableCell >ddd</TableCell>   
                  <TableCell >fff</TableCell>
                </TableRow> */}
                {
                  
                    <TableRow> <TableCell>
                       {data.holidays}
                      </TableCell>
                        <TableCell>
                          {data.presentDays}
                        </TableCell>
                        <TableCell>
                          {data.absentDays}
                        </TableCell>
                      </TableRow>
                  
                }
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
        
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '600px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>EARNINGS</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>Amount</TableCell>
              </TableRow>
              {
                
                  <TableRow>
                  <TableCell >Earn Amount</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.earnAmount}</TableCell>
                  </TableRow>
                   
               }
                {
                
                  <TableRow>
                  <TableCell >Net pay</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.netPay}</TableCell>
                  </TableRow>
                  
                }
                  {
                
                  <TableRow>
                  <TableCell >Gross Salary</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.grossSalary}</TableCell>
                  </TableRow>
                  
                }
                 {
                
                  <TableRow>
                  <TableCell >Net Salary</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell ></TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.netSalary}</TableCell>
                  </TableRow>
                  
                }
                  <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }} ></TableCell> 
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }} ></TableCell>  
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '18px', width: '100px' }}></TableCell> 

                  </TableRow>

            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '900px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Allowance</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'left' }}>Name</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Value</TableCell>
              </TableRow>
              {
              
                       <TableRow> <TableCell>
                         Allowance 1
                        </TableCell>
                          <TableCell></TableCell>
                          <TableCell>{data.allowance1}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{data.value1}</TableCell>
                        </TableRow>
                    
                    }
                    {
                    
                   <TableRow>
                  <TableCell >Allowance 2</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance2}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value2}</TableCell>
                  </TableRow>
                  
                   }
                   {
                    
                   <TableRow>
                  <TableCell >Allowance 3</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance3}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value3}</TableCell>
                  </TableRow>
                  
                  }

                  {
                    
                   <TableRow>
                  <TableCell >Allowance 4</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance4}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value4}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Allowance 5</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance5}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value5}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Allowance 6</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance6}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value6}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Allowance 7</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance7}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value7}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Allowance 8</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance8}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value8}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Allowance 9</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance9}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value9}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Allowance 10</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.allowance10}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.value10}</TableCell>
                  </TableRow>
                  
                }
               
                  <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'right' }}>Total Allowance :</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>INR {    data.value1 + data.value2 + data.value3 + data.value4 + data.value5 + data.value6 + data.value7 + data.value8 + data.value9 + data.value10 }</TableCell>
              </TableRow> 
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '900px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Deduction</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}>Name</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>Value</TableCell>
              </TableRow>
              {
              
                       <TableRow> <TableCell>
                         Deduction 1
                        </TableCell>
                          <TableCell></TableCell>
                          <TableCell>{data.deduction1}</TableCell>
                          <TableCell></TableCell>
                          <TableCell>{data.valueA1}</TableCell>
                        </TableRow>
                    
                    }
                    {
                    
                   <TableRow>
                  <TableCell >Deduction 2</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction2}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA2}</TableCell>
                  </TableRow>
                  
                   }
                   {
                    
                   <TableRow>
                  <TableCell >Deduction 3</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction3}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA3}</TableCell>
                  </TableRow>
                  
                  }

                  {
                    
                   <TableRow>
                  <TableCell >Deduction 4</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction4}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA4}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Deduction 5</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction5}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA5}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Deduction 6</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction6}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA6}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Deduction 7</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction7}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA7}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Deduction 8</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction8}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA8}</TableCell>
                  </TableRow>
                  
                }
                {
                     
                   <TableRow>
                  <TableCell >Deduction 9</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction9}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA9}</TableCell>
                  </TableRow>
                  
                }
                {
                    
                   <TableRow>
                  <TableCell >Deduction 10</TableCell> 
                  <TableCell ></TableCell>   
                  <TableCell >{data.deduction10}</TableCell>
                  <TableCell ></TableCell>   
                  <TableCell >{data.valueA10}</TableCell>
                  </TableRow>
                  
                }
               
                  <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px' }}></TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: "right" }}>Total Deductions :</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '100px' }}>INR {   data.valueA1 + data.valueA2 + data.valueA3 + data.valueA4 + data.valueA5 + data.valueA6 + data.valueA7 + data.valueA8 + data.valueA9 + data.valueA10 }</TableCell>
              </TableRow> 
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ marginTop: '10px', marginLeft: '815px', maxWidth: '300px' }}>
            <Table>
              <TableRow>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'right' }}>Total Salary :</TableCell>
                  <TableCell style={{ backgroundColor: 'blue', color: 'white', padding: '10px', width: '200px', textAlign: 'left' }}>INR {data1} </TableCell>
              </TableRow>
              </Table>
          </TableContainer>
          </Grid>
          {/* <div className='receipt_action_div'>
            <div className='actions-right'>
            <button
             className='receipt_model_download-button'
             onClick={downloadPDF}
             disabled={!(loader===false)}
             >
              {loader?(
                <span>Downloading</span>
              ):(
                <span>Download</span>
              )}
             </button>
            </div>       
         </div> */}
      </Grid>
      {/* <Grid item xs={12}>
        <Button onClick={ ()=> generatePDF(targetRef, {filename: 'payslip.pdf'})}>Download Pdf</Button>
      </Grid> */}
    </div>
  );
};




export default Paycalc;
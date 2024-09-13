import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid } from '@mui/material';


function TAandDreports() {
   
  return (
   
<div style={{ textAlign: 'center', margin: '20px' }}>
<Grid>
    <Grid >
<Typography variant="h5" gutterBottom >
Total Allowance And Deduction
</Typography>
<Typography style={{ textAlign:'right',paddingRight:'100px',fontWeight:'bold', marginTop:'auto'}}>
    Date:12/08/2010

</Typography>
</Grid>


<Grid item xs={12}>
<TableContainer component={Paper} style={{ marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px' }}>
            <Table>
              <TableBody>
                <TableRow >
                  <TableCell sx={{borderBottom:'3px solid black',borderTop:'3px solid black', padding: '5px',fontWeight:'bold' ,Width:'100px'}}>Employee Code</TableCell>
                  <TableCell sx={{ borderBottom:'3px solid black' , borderTop:'3px solid black', padding: '5px' ,fontWeight:'bold',Width:'100px'}}>Emlpoyee Name</TableCell>
                  <TableCell sx={{borderBottom:'3px solid black' ,borderTop:'3px solid black', padding: '5px' ,fontWeight:'bold',Width:'200px'}}>Total Allowance</TableCell>
                  <TableCell sx={{ borderBottom:'3px solid black' , borderTop:'3px solid black', padding: '5px' ,fontWeight:'bold',Width:'200px'}}>Total Deduction</TableCell>

                 
                </TableRow>
                {[...Array(10).keys()].map((row) => (
                  <TableRow  key={row + 1} >
                    <TableCell sx={{ padding: '5px' }}>0002</TableCell>
                    <TableCell sx={{  padding: '5px' }}>Nagarajan</TableCell>
                    <TableCell sx={{  padding: '5px',textAlign:'side' }}>2,567.0</TableCell>
                    <TableCell sx={{ padding: '5px',textAlign:'left' }}>3,454.0</TableCell>

              
                   
                  </TableRow>
               ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
</Grid>


         
</Grid>
</div>
  )
}



export default TAandDreports;
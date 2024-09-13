import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid } from '@mui/material';


function AdvanceReport() {
   
  return (
   
<div style={{ textAlign: 'center', margin: '20px' }}>
<Grid>
    <Grid >
<Typography variant="h5" gutterBottom style={{textAlign:'left'}}>
Advance details report for the employee code  e002
</Typography>
<Typography style={{ textAlign:'right',paddingRight:'100px',fontWeight:'bold'}}>
    Date:12/08/2010

</Typography>
</Grid>


<Grid item xs={12}>
<TableContainer component={Paper} style={{border: '2px solid black', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1900px' }}>
            <Table>
              <TableBody>
                <TableRow sx={{ border: '2px solid black', borderColor: 'black.300' }}>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px',fontWeight:'bold' }}>App.No</TableCell>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' ,fontWeight:'bold'}}>Advance Name</TableCell>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' ,fontWeight:'bold'}}>Employee Name</TableCell>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' ,fontWeight:'bold'}}>Date</TableCell>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px', fontWeight:'bold' }}>Amount</TableCell>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px',fontWeight:'bold' }}>Balance</TableCell>

                 
                </TableRow>
               
                  <TableRow  sx={{ border: '2px solid black', borderColor: 'black.300' }}>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>1234</TableCell>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>Salary Advance</TableCell>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>sanjeevi</TableCell>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>20/02/024</TableCell>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>10000.00</TableCell>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>9,000.0</TableCell>


                   
                  </TableRow>
              
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
</Grid>


         
</Grid>
</div>
  )
}



export default AdvanceReport;
import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';
import { BoltRounded } from '@mui/icons-material';
function Mrgabs() {
   
  return (
   
<div style={{ textAlign: 'center', margin: '20px' }}>
<Grid>
    <Grid >
<Typography variant="h5" gutterBottom >
      OT Summary 
</Typography>
<Typography style={{ textAlign:'right',paddingRight:'100px'}}>
    date:15/08/2024

</Typography>
</Grid>


<Grid item xs={12}>
<TableContainer component={Paper} style={{border: '2px solid black', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto', maxWidth: '1900px' }}>
            <Table>
              <TableBody>
                <TableRow sx={{ border: '2px solid black', borderColor: 'black.300' }}>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>code</TableCell>
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>employee</TableCell>
                  {[...Array(31).keys()].map((day) => (
                    <TableCell key={day + 1} sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>{day + 1}</TableCell>
                  ))}
                  <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>tot</TableCell>
                </TableRow>
                {[...Array(1).keys()].map((row) => (
                  <TableRow key={row + 1} sx={{ border: '2px solid black', borderColor: 'black.300' }}>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>{row + 1}</TableCell>
                    <TableCell sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}>sanjeevi</TableCell>
                    {[...Array(31).keys()].map((day) => (
                      <TableCell key={day + 1} sx={{ border: '2px solid black', borderColor: 'black.300', padding: '5px' }}></TableCell>
                    ))}
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



export default Mrgabs;
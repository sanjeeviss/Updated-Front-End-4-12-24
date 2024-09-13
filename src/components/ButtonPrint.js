import React from 'react'
import Paycalc from './payslips/Payslips';
import { Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';

function ButtonPrint() {
    const targetRef = useRef();
    return (
      <div className="App">
        <div ref={targetRef}>
        <Paycalc />
        </div>
        <div>
        <Grid item xs={12}>
          <Button variant='outlined' onClick={ ()=> generatePDF(targetRef, {filename: 'payslip.pdf'})}>Download Pdf</Button>
          </Grid>
          </div>
     </div>
    );
}

export default ButtonPrint
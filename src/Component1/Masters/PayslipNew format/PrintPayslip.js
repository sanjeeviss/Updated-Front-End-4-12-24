import React from "react";
import PayslipNewFormat from "./PayslipNewFormat";
import { Grid,Button } from "@mui/material";
import generatePDF from "react-to-pdf";
import { useRef } from "react";

function PrintPayslip() {
    const targetRef = useRef()
    return (
        <div className="App">
            <div ref={targetRef}>
                <PayslipNewFormat/>
            </div>
            <div>
            <Grid item xs={12} textAlign={'center'}>
          <Button variant='outlined' onClick={ ()=> generatePDF(targetRef, {filename: 'Payslip.pdf'})}>Print</Button>
          </Grid>
            </div>
        </div>
    );
}

export default PrintPayslip
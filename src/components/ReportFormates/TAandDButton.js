import React from 'react'
import { Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';

import TAandDreports from './TAandDReports';

function ButtonEsi8() {
    const targetRef = useRef();
    return (
      <div className="App">
        <div ref={targetRef}>
        < TAandDreports/>
        </div>
        <div>
        <Grid item xs={12} textAlign={'right'} sx={{paddingRight:'140px'}}>
          <Button variant='contained' onClick={ ()=> generatePDF(targetRef, {filename: 'TAandDreports.pdf'})}>Download Pdf</Button>
          </Grid>
          </div>
     </div>
    );
}

export default ButtonEsi8
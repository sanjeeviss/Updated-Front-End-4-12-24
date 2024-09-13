import React from 'react'
import { Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';

import Mrgabs from './OTHoursReports';

function ButtonEsi2() {
    const targetRef = useRef();
    return (
      <div className="App">
        <div ref={targetRef}>
        < Mrgabs/>
        </div>
        <div>
        <Grid item xs={12} textAlign={'right'} sx={{paddingRight:'140px'}}>
          <Button variant='contained' onClick={ ()=> generatePDF(targetRef, {filename: 'Mrgabs.pdf'})}>Download Pdf</Button>
          </Grid>
          </div>
     </div>
    );
}

export default ButtonEsi2
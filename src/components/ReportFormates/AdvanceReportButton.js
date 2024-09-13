import React from 'react'
import { Grid, Button } from '@mui/material';
import generatePDF from 'react-to-pdf';
import { useRef } from 'react';

import AdvanceReport from './AdvanceReport';

function ButtonEsi7() {
    const targetRef = useRef();
    return (
      <div className="App">
        <div ref={targetRef}>
        < AdvanceReport/>
        </div>
        <div>
        <Grid item xs={12} textAlign={'right'} sx={{paddingRight:'140px'}}>
          <Button variant='contained' onClick={ ()=> generatePDF(targetRef, {filename: 'AdvanceReport.pdf'})}>Download Pdf</Button>
          </Grid>
          </div>
     </div>
    );
}

export default ButtonEsi7
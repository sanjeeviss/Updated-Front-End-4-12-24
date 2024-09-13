import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {   Modal, Box, Grid } from '@mui/material';
import { CheckBox as CheckBoxIcon } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Container from '@mui/material/Container';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

function ServiceCard({ title, icon, onClick }) {
  return (
    <Grid item >
      <Card variant="outlined" sx={{ maxWidth:"200px",p: 1, textAlign: "center",  m: 1 }}>
        <CardContent sx={{height:"90px"}}>
          <IconButton color="primary" aria-label={title} onClick={onClick}>
            {icon}
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ServiceCard
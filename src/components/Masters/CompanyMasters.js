import React from 'react';
import { TextField, Button, MenuItem, Box, Container, Typography, Tabs, Tab, Grid, Divider, Switch, Stack } from '@mui/material';
import Navbar from "../Home Page/Navbar";
import Sidenav from "../Home Page/Sidenav";

const CompanyMasters = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Container maxWidth="md" sx={{ p: 2 }}>
                <Typography variant="h8" gutterBottom>
                  Enter Company Details
                </Typography>
                
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="company-details-tabs">
                  <Tab label="General Information" />
                  <Tab label="Address Details" />
                  <Tab label="Contact Details" />
                  <Tab label="Additional Info" />
                </Tabs>

                {tabValue === 0 && (
                  <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Company Name"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Company code"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button variant="outlined">Cancel</Button>
                      <Button variant="contained" color="primary">Next</Button>
                    </Box>
                  </Box>
                )}

                {tabValue === 1 && (
                  <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Address Line 1"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Address Line 2"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="City"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="State"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Country"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Postal Code"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button variant="outlined">Cancel</Button>
                      <Button variant="contained" color="primary">Next</Button>
                    </Box>
                  </Box>
                )}

                {tabValue === 2 && (
                  <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Phone Number"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Email Address"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button variant="outlined">Cancel</Button>
                      <Button variant="contained" color="primary">Next</Button>
                    </Box>
                  </Box>
                )}

                {tabValue === 3 && (
                  <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Additional Info 1"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Additional Info 2"
                          sx={{ height: 40, '& .MuiInputBase-input': { padding: '4px 8px' } }}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button variant="outlined">Cancel</Button>
                      <Button variant="contained" color="primary">Save</Button>
                    </Box>
                  </Box>
                )}
              </Container>
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default CompanyMasters;

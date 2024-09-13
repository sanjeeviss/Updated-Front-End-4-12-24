import React, { useState } from 'react';
import WeeklyTimesheetForm from './weekly/WeeklytTmesheetForm';
import DailyTimesheetForm from './daily/DailyTimesheetForm';
import MonthlyTimesheetForm from './monthly/MonthlyTimessheetForm';
import { Paper, Typography, Select, MenuItem, Grid } from '@mui/material';
import { Navigate } from 'react-router-dom';

const TimesheetManager = () => {
  const [selectedTimesheet, setSelectedTimesheet] = useState('daily');

  const handleChange = (event) => {
    setSelectedTimesheet(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: 20, maxWidth: 1000, height: 100 }}>
        <Typography variant="h5" gutterBottom>
          Timesheet
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Select value={selectedTimesheet} onChange={handleChange} fullWidth>
              <MenuItem value="daily">Daily Timesheet</MenuItem>
              <MenuItem value="weekly">Weekly Timesheet</MenuItem>
              <MenuItem value="monthly">Monthly Timesheet</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            {selectedTimesheet === 'daily' && <DailyTimesheetForm />}
            {selectedTimesheet === 'weekly' && <WeeklyTimesheetForm />}
            {selectedTimesheet === 'monthly' && <MonthlyTimesheetForm />}
          </Grid>
        </Grid>
      </Paper>
    </div>
    
  );
};

export default TimesheetManager;

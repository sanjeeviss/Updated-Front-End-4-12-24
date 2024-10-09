import React, { useState, useEffect } from "react";
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import { postRequest } from '../../serverconfiguration/requestcomp';
import { 
  Table, 
  TableContainer,
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Stack,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NoDataImage from '../../images/NoDataImage.jpeg'; // Ensure this path is correct

const HolidaysPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [holidayType, setHolidayType] = useState('all');
  const [holidays, setHolidays] = useState([]);
  const navigate = useNavigate();

  // Function to fetch holidays data
  const fetchHolidays = async () => {
    try {
      const query = `
        SELECT From_date AS date, days AS day, pn_Holidayname AS holidayName
        FROM paym_holiday;
      `;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        console.log('Fetched holidays:', response.data);
        setHolidays(response.data || []);
      } else {
        console.error`(Unexpected response status: ${response.status})`;
      }
    } catch (error) {
      console.error('Error fetching holidays data:', error);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // Filter holidays based on search term and type
  const filteredHolidays = holidays.filter(holiday => {
    const isUpcoming = new Date(holiday.date) > new Date();
    if (holidayType === 'upcoming' && !isUpcoming) return false;
    if (holidayType === 'past' && isUpcoming) return false;

    return holiday.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
           String(holiday.day).toLowerCase().includes(searchTerm.toLowerCase()) ||
           holiday.holidayName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleAddNewHolidayClick = () => {
    navigate('/HolidayForm2');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'left' }}>
        Holidays
      </Typography>
      <Typography variant="body1" gutterBottom>
        All Holiday Lists
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={2} sx={{ justifyContent: "space-between" }}>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }} // adjust the width value as needed
        />

        <FormControl>
          <RadioGroup
            row
            value={holidayType}
            onChange={(e) => setHolidayType(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="All" />
            <FormControlLabel value="upcoming" control={<Radio />} label="Upcoming" />
            <FormControlLabel value="past" control={<Radio />} label="Past Holidays" />
          </RadioGroup>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleAddNewHolidayClick}>
          Add New Holiday
        </Button>
      </Stack>

      {filteredHolidays.length === 0 ? (
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ height: '60vh' }}>
          <Grid item>
            <img src={NoDataImage} alt="No Data" style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="h6">No Data Available</Typography>
          </Grid>
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "lightgrey" }}>
              <TableRow>
                <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Days</TableCell>
                <TableCell sx={{ fontSize: 15, fontWeight: 'bold' }}>Holiday Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHolidays.map((holiday) => (
                <TableRow key={holiday.date}>
                  <TableCell>{holiday.date}</TableCell>
                  <TableCell>{holiday.day}</TableCell>
                  <TableCell>{holiday.holidayName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default HolidaysPage;
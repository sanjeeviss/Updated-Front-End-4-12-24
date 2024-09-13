import React, { useState, useEffect } from "react";
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import { postRequest } from '../../../serverconfiguration/requestcomp';
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
  Grid,Card,CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";

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
    navigate('/HolidayForm1');
  };

  return (
    
    <Grid item xs={12}>
    <div style={{ backgroundColor: "#fff" }}>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Grid
          item
          xs={12}
          sm={10}
          md={9}
          lg={8}
          xl={7}
          style={{ marginLeft: "auto", marginRight: "auto", margin: "0 50px 50px 50px" }}  
          >
      {/* Main Content */}
      <Grid item xs={10} sx={{ padding: "60px 0 0 100px", overflowY: "auto",marginLeft:'auto',marginRight:'auto', }}>
        <Card style={{ maxWidth: 900, width: "100%" }}>
          <CardContent>
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold',  textAlign: 'left' }}>
        Holidays
      </Typography>
      <Typography variant="body10" gutterBottom>
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
    </Box>
    </CardContent>
   </Card>
   </Grid>
   </Grid>
   </Box>
   </div>
   </Grid>
  );
};

export default HolidaysPage;
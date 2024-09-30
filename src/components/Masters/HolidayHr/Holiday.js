import React, { useState, useEffect } from "react";
import { format } from "date-fns"; // Import the format function from date-fns
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { REPORTS } from "../../../serverconfiguration/controllers";
import { postRequest } from "../../../serverconfiguration/requestcomp";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,Grid,
  TextField,
  Typography,
  Box,
  Button,
  Stack,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
const HolidaysPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [holidayType, setHolidayType] = useState("all");
  const [holidays, setHolidays] = useState([]);
  const navigate = useNavigate();

  // Function to fetch holidays data
  const fetchHolidays = async () => {
    try {
      const query = `SELECT From_date AS date, days AS day, pn_Holidayname AS holidayName FROM paym_holiday WHERE Fyear = YEAR(GETDATE())`;;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        console.log("Fetched holidays:", response.data);
        setHolidays(response.data || []);
      } else {
        console.error`(Unexpected response status: ${response.status})`;
      }
    } catch (error) {
      console.error("Error fetching holidays data:", error);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // Filter holidays based on search term and type
  const filteredHolidays = holidays.filter((holiday) => {
    const holidayDate = new Date(holiday.date);
    const isUpcoming = holidayDate > new Date();
    if (holidayType === "upcoming" && !isUpcoming) return false;
    if (holidayType === "past" && isUpcoming) return false;

    return (
      holiday.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(holiday.day).toLowerCase().includes(searchTerm.toLowerCase()) ||
      holiday.holidayName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "dd-MM-yyyy"); // Format the date as 'dd-MM-yyyy'
  };

  const handleAddNewHolidayClick = () => {
    navigate("/HolidayForm1");
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
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", textAlign: "center" }}
      >
        Holidays
      </Typography>

      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        mb={2}
        sx={{ justifyContent: "space-between" }}
      >
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
            <FormControlLabel
              value="upcoming"
              control={<Radio />}
              label="Upcoming"
            />
            <FormControlLabel
              value="past"
              control={<Radio />}
              label="Past Holidays"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewHolidayClick}
        >
          Add New Holiday
        </Button>
      </Stack>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <TableContainer component={Paper} sx={{ width: 1000 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "lightgrey" }}>
              <TableRow>
                <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>
                  Days
                </TableCell>
                <TableCell sx={{ fontSize: 18, fontWeight: "bold" }}>
                  Holiday Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredHolidays.map((holiday) => (
                <TableRow key={holiday.date}>
                  <TableCell sx={{ fontSize: 15 }}>
                    {formatDate(holiday.date)}
                  </TableCell>
                  <TableCell sx={{ fontSize: 15 }}>{holiday.day}</TableCell>
                  <TableCell sx={{ fontSize: 15 }}>
                    {holiday.holidayName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
    </Grid>
    </Box>
    </div>
    </Grid>
  );
};

export default HolidaysPage;
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  Typography,
  Grid,
  Box,
  IconButton,
  Paper,
  InputAdornment,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/material/styles";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiInputBase-input": {
    padding: "10px 12px",
  },
}));

const LeaveApplyRequestHigher = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "categoryType") {
      setCategoryType(value);
    } else if (name === "categoryName") {
      setCategoryName(value);
    }
  };

  return (
    <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <Paper
      sx={{
        p: 4,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 800,
        mx: "auto",
        mt: 5,
      }}>
      <Typography variant="h5" gutterBottom>
        Leave Apply
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="category-type-label"> Type</InputLabel>
            <Select
              labelId="Type"
              id="Type"
              value={categoryType}
              onChange={handleChange}
              name="Type">
              <MenuItem value="Leave">Leave</MenuItem>
              {/* Add more category types */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            label="From date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton>
            //         <CalendarTodayIcon />
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="category-name-label">Name</InputLabel>
            <Select
              labelId="category-name-label"
              id="Name"
              value={categoryName}
              onChange={handleChange}
              name="categoryName">
              <MenuItem value="Sick Leave">Sick Leave</MenuItem>
              {/* Add more category names */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            fullWidth
            label="To Date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton>
            //         <IconButton color="primary" component="label">
                     
            //         </IconButton>
            //         <CalendarTodayIcon />
            //       </IconButton>
            //     </InputAdornment>
            //   ),
            // }}
          />
           <Typography>Attach File</Typography>
                      <AttachFileIcon sx={{ ml: 1 }} />
                      <input type="file" hidden />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Write the Key points you want to cover
          </Typography>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 1,
              p: 2,
              mt: 1,
            }}>
            <StyledTextField
              fullWidth
              placeholder="Subject"
              multiline
              rows={1}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Divider />
            <StyledTextField
              fullWidth
              placeholder="Write Description here"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
              1/1000 Characters
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center">
          <Button variant="contained" color="success" sx={{ mt: 2 }}>
            Send
            <SendIcon sx={{ ml: 1 }} />
          </Button>
        </Grid>
      </Grid>
    </Paper>
    </Grid>
    </Box>
    </div>
    </Grid>
  );
};

export default LeaveApplyRequestHigher;
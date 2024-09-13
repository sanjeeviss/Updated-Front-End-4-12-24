import React, { useState } from 'react';
    import {
      Box,
      Button,
      Checkbox,
      FormControlLabel,
      Grid,
      List,
      ListItem,
      ListItemIcon,
      ListItemText,
      Typography,
    } from '@mui/material';
    import { InfoOutlined } from '@mui/icons-material';
    import { useNavigate } from 'react-router-dom'; 

    const GraphCheckBox1 = ({ onSave,onClose  }  ) => {
      const [selectedOptions, setSelectedOptions] = useState([]);
      const [open, setOpen] = useState(false); // Add a state variable to track the open state

      const navigate = useNavigate();

      const countOptions = [
        'Total Employees',
        'Present',
        'Absent',
        'Half-Day',
        'Leave',
        'Permission',
        'OT',
        'Travel',
        'Maternity',
        'Work From Home',
      ];

      const graphOptions = [
        'Absent Monthly Wise',
        'Leave Monthly Wise',
        'Salary Monthly Wise',
      ];

      const handleCheckboxChange = (event) => {
        const value = event.target.value;
        const checked = event.target.checked;

        if (value === 'Select All Counts') {
          if (checked) {
            setSelectedOptions((prevOptions) => [...prevOptions, ...countOptions]);
          } else {
            setSelectedOptions((prevOptions) =>
              prevOptions.filter((option) => !countOptions.includes(option))
            );
          }
        } else if (value === 'Select All Graphs') {
          if (checked) {
            setSelectedOptions((prevOptions) => [...prevOptions, ...graphOptions]);
          } else {
            setSelectedOptions((prevOptions) =>
              prevOptions.filter((option) => !graphOptions.includes(option))
            );
          }
        } else {
          if (checked) {
            setSelectedOptions((prevOptions) => [...prevOptions, value]);
          } else {
            setSelectedOptions((prevOptions) =>
              prevOptions.filter((option) => option !== value)
            );
          }
        }
      };


      const handleSave = () => {
        const filteredSelectedOptions = selectedOptions.filter((option) => {
          return option !== 'Select All Counts' && option !== 'Select All Graphs';
        });
        navigate('/DBoards', { state: { selectedOptions: filteredSelectedOptions } });
        onSave();
        onClose(); // Call the onClose function to close the IconButton

      };
      
      

      

      return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h6" mb={2} mt={-10}>
            <InfoOutlined /> Choose the Headers that you want to display in the dashboard
          </Typography>
         
          <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 4 }}>
            <Typography variant="h6" mb={2}>
              Custom
            </Typography>
            <Typography variant="subtitle1" mb={2}>
              Select Graph Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={0}>
                  <Grid item xs={6} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="Select All Graphs"
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Select All Graphs"
                    />
                  </Grid>
                  {graphOptions.map((option) => (
                    <Grid item xs={6} md={6} key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option}
                            onChange={handleCheckboxChange}
                            checked={selectedOptions.includes(option)}
                          />
                        }
                        label={option}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <br></br>
            <Typography variant="subtitle1" mb={2}>
              Select Count Options
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Grid container spacing={0}>
                  <Grid item xs={6} md={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="Select All Counts"
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="Select All Counts"
                    />
                  </Grid>
                  {countOptions.map((option) => (
                    <Grid item xs={6} md={6} key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={option}
                            onChange={handleCheckboxChange}
                            checked={selectedOptions.includes(option)}
                          />
                        }
                        label={option}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Button variant="contained" type="submit" onClick={handleSave}>
              Display
            </Button>
          </Box>
        </Box>
      );
    };

    export default GraphCheckBox1;
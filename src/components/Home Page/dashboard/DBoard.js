import React, { useState, useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import { createMuiTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { Popover } from '@material-ui/core';
import EventIcon from '@mui/icons-material/Event';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
import DashboardIcon from '@mui/icons-material/Dashboard'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  InputAdornment,
  SvgIcon,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  AttachMoney as AttachMoneyIcon,
  CalendarToday as CalendarTodayIcon,
  LocalOffer as LocalOfferIcon,
  ExitToApp as ExitToAppIcon,
  AccessTime as AccessTimeIcon,
  Speed as SpeedIcon,
  SignalCellularConnectedNoInternet0Bar as SignalCellularConnectedNoInternet0BarIcon,
  SignalCellularNull as SignalCellularNullIcon,
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  BarChart as BarChartIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  AssignmentInd as AssignmentIndIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { getRequest, postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import { useLocation, useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GraphCheckBox1 from './Checkbox';
import Masonry from '@mui/lab/Masonry';

const theme = createMuiTheme({
  typography: {
    fontSize: 10,
    // Set the font size to 12px
  },
});

const DBoards = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [absentData, setAbsentData] = React.useState({ Absent: 0 });
  const [leaveData, setLeaveData] = React.useState({ Leave: 0 });
  const [halfDayData, setHalfDayData] = React.useState({ HalfDay: 0 });
  const [presentData, setPresentData] = React.useState({ Present: 0 });
  const [totalEmployeesData, setTotalEmployeesData] = React.useState({ TotalEmployees: 0 });

  const [openDialog, setOpenDialog] = React.useState(false);

  

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };



  useEffect(() => {
    async function getAbsentData() {
      try {
        const query = `SELECT COUNT(*) as Absent FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'A'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setAbsentData({ Absent: response.data[0].Absent });
        } else {
          console.error('No absent count found in API response');
        }
      } catch (error) {
        console.error('Error fetching absent data:', error);
      }
    }
    getAbsentData();
  }, []);

  useEffect(() => {
    async function getLeaveData() {
      try {
        const query = `SELECT COUNT(*) as Leave FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'L'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setLeaveData({ Leave: response.data[0].Leave });
        } else {
          console.error('No leave count found in API response');
        }
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    }
    getLeaveData();
  }, []);

  useEffect(() => {
    async function getHalfDayData() {
      try {
        const query = `SELECT COUNT(*) as HalfDay FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'H'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setHalfDayData({ HalfDay: response.data[0].HalfDay });
        } else {
          console.error('No half-day count found in API response');
        }
      } catch (error) {
        console.error('Error fetching half-day data:', error);
      }
    }
    getHalfDayData();
  }, []);

  useEffect(() => {
    async function getPresentData() {
      try {
        const query =  `SELECT COUNT(*) as Present FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'P'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setPresentData({ Present: response.data[0].Present });
        } else {
          console.error('No present count found in API response');
        }
      } catch (error) {
        console.error('Error fetching present data:', error);
      }
    }
    getPresentData();
  }, []);

  useEffect(() => {
    async function getTotalEmployeesData() {
      try {
        const query = `SELECT COUNT(*) AS TotalEmployees FROM [dbo].[paym_Employee]`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response); // Log the API response
        if (response.data) {
          console.log(response.data[0])
          setTotalEmployeesData({ TotalEmployees: response.data[0].TotalEmployees });
        } else {
          console.error('No total employees count found in API response');
        }
      } catch (error) {
        console.error('Error fetching total employees data:', error);
      }
    }
    getTotalEmployeesData();
  }, []);


  const [permissionData, setPermissionData] = useState({ Permission: 0 });

  useEffect(() => {
    async function getPermissionData() {
      try {
        const query = `SELECT COUNT(*) as Permission FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'PER'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setPermissionData({ Permission: response.data[0].Permission });
        } else {
          console.error('No permission count found in API response');
        }
      } catch (error) {
        console.error('Error fetching permission data:', error);
      }
    }
    getPermissionData();
  }, []);



  const [maternityData, setMaternityData] = useState({ Maternity: 0 });

  useEffect(() => {
    async function getMaternityData() {
      try {
        const query = `SELECT COUNT(*) as Maternity FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'M'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setMaternityData({ Maternity: response.data[0].Maternity });
        } else {
          console.error('No maternity count found in API response');
        }
      } catch (error) {
        console.error('Error fetching maternity data:', error);
      }
    }
    getMaternityData();
  }, []);


  const [travelData, setTravelData] = useState({ Travel: 0 });

  useEffect(() => {
    async function getTravelData() {
      try {
        const query = `SELECT COUNT(*) as Travel FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'T'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setTravelData({ Travel: response.data[0].Travel });
        } else {
          console.error('No travel count found in API response');
        }
      } catch (error) {
        console.error('Error fetching travel data:', error);
      }
    }
    getTravelData();
  }, []);


  const [workFromHomeData, setWorkFromHomeData] = useState({ WorkFromHome: 0 });

  useEffect(() => {
    async function getWorkFromHomeData() {
      try {
        const query = `SELECT COUNT(*) as WorkFromHome FROM [dbo].[time_card] WHERE CAST([dates] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'W'`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setWorkFromHomeData({ WorkFromHome: response.data[0].WorkFromHome });
        } else {
          console.error('No work from home count found in API response');
        }
      } catch (error) {
        console.error('Error fetching work from home data:', error);
      }
    }
    getWorkFromHomeData();
  }, []);


  const [otData, setOtData] = useState({ OT_Count: 0 });

  useEffect(() => {
    async function getOtData() {
      try {
        const query = `SELECT COUNT(CASE WHEN ot_hrs IS NOT NULL AND CONVERT(DATE, dates) = CONVERT(DATE, GETDATE()) THEN 1 END) AS OT_Count FROM [dbo].[time_card]`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          setOtData({ OT_Count: response.data[0].OT_Count });
        } else {
          console.error('No OT count found in API response');
        }
      } catch (error) {
        console.error('Error fetching OT data:', error);
      }
    }
    getOtData();
  }, []);





  const [absentMonthlyWiseData, setAbsentMonthlyWiseData] = useState({});

  useEffect(() => {
    async function getAbsentMonthlyWiseData() {
      try {
        const query = `SELECT MONTH(dates) AS [Month], COUNT(CASE WHEN status = 'A' THEN 1 END) AS AbsentDays FROM [dbo].[time_card] WHERE YEAR(dates) = YEAR(GETDATE()) GROUP BY MONTH(dates)`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);
  
        if (response.data && response.data.length > 0) {
          const absentDataObj = {};
          response.data.forEach((item) => {
            absentDataObj[item.Month] = item.AbsentDays;
          });
          setAbsentMonthlyWiseData(absentDataObj);
        } else {
          console.error('No absent days data found in API response');
        }
      } catch (error) {
        console.error('Error fetching absent days data:', error);
      }
    }
    getAbsentMonthlyWiseData();
  }, []);



  const [leaveMonthlyWiseData, setLeaveMonthlyWiseData] = useState({}); // Define leaveMonthlyWiseData state variable

  useEffect(() => {
    async function getLeaveMonthlyWiseData() {
      try {
        const query = `SELECT MONTH(dates) AS [Month], COUNT(CASE WHEN status = 'L' THEN 1 END) AS LeaveDays FROM [dbo].[time_card] WHERE YEAR(dates) = YEAR(GETDATE()) GROUP BY MONTH(dates)`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          const leaveDataObj = {};
          response.data.forEach((item) => {
            leaveDataObj[item.Month] = item.LeaveDays;
          });
          setLeaveMonthlyWiseData(leaveDataObj);
        } else {
          console.error('No leave days data found in API response');
        }
      } catch (error) {
        console.error('Error fetching leave days data:', error);
      }
    }
    getLeaveMonthlyWiseData();
  }, []);



  const [salaryMonthlyWiseData, setSalaryMonthlyWiseData] = useState({});

  useEffect(() => {
    async function getSalaryMonthlyWiseData() {
      try {
        const query = `SELECT MONTH(d_date) AS Month, SUM(NetPay) AS TotalNetPay FROM [dbo].[paym_paybill] GROUP BY MONTH(d_date)`;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        console.log('API Response:', response);

        if (response.data && response.data.length > 0) {
          const salaryDataObj = {};
          response.data.forEach((item) => {
            salaryDataObj[item.Month] = item.TotalNetPay;
          });
          setSalaryMonthlyWiseData(salaryDataObj);
        } else {
          console.error('No salary data found in API response');
        }
      } catch (error) {
        console.error('Error fetching salary data:', error);
      }
    }
    getSalaryMonthlyWiseData();
  }, []);



  console.log('Total Employees Data:', totalEmployeesData); // Log the total employees data state

 
  const location = useLocation();



  const filteredData = [
    // Counts
    {
      title: 'Total Emp',
      icon: <GroupIcon sx={{ fontSize: '40px', color: 'black' }} />,
      value: totalEmployeesData.TotalEmployees,
    },
    {
      title: 'Present',
      icon: <CheckCircleIcon sx={{ fontSize: '40px', color: 'green' }} />,
      value: presentData.Present,
    },
    {
      title: 'Absent',
      icon: <CancelIcon sx={{ fontSize: '40px', color: 'red' }} />,
      value: absentData.Absent,
    },
    {
      title: 'Half-Day',
      icon: <ScheduleIcon sx={{ fontSize: '40px', color: 'orange' }} />,
      value: halfDayData.HalfDay,
    },
    {
      title: 'Leave',
      icon: <EventIcon sx={{ fontSize: '40px', color: 'blue' }} />,
      value: leaveData.Leave,
    },
    {
      title: 'Permission',
      icon: <AssignmentIndIcon sx={{ fontSize: '40px', color: 'salmon' }} />,
      value: permissionData.Permission,
    },
    {
      title: 'OT',
      icon: <TimerIcon sx={{
        fontSize: '40px',
        color: 'gold',
        width: '50px',
        height: '50px'
      }} />,
      value: otData.OT_Count,
    },
    {
      title: 'WFH',
      icon: <ComputerIcon sx={{ fontSize: '40px', color: 'aqua' }} />,
      value: workFromHomeData.WorkFromHome,
    },
    {
      title: 'Travel',
      icon: <LocalOfferIcon sx={{ fontSize: '40px', color: 'maroon' }} />,
      value: travelData.Travel,
    },
    {
      title: 'Maternity',
      icon: <PregnantWomanIcon sx={{ fontSize: '40px', color: 'violet' }} />,
      value: maternityData.Maternity,
    },

    // Graphs
    {
      title: 'Absent Monthly Wise',
      icon: <BarChartIcon sx={{ fontSize: '40px', color: 'black' }} />,
      data: Object.entries(absentMonthlyWiseData).map(([month, absentDays]) => ({
        month,
        absentDays,
      })),
    },
    {
      title: 'Leave Monthly Wise',
      icon: <BarChartIcon sx={{ fontSize: '40px', color: 'blue' }} />,
      data: Object.entries(leaveMonthlyWiseData).map(([month, leaveDays]) => ({
        month,
        leaveDays,
      })),
    },
    {
      title: 'Salary Monthly Wise',
      icon: <BarChartIcon sx={{ fontSize: '40px', color: 'green' }} />,
      data: Object.entries(salaryMonthlyWiseData).map(([month, salary]) => ({
        month,
        salary,
      })),
    },
  ];
  useEffect(() => {
    if (location.state && location.state.selectedOptions) {
      setSelectedOptions(location.state.selectedOptions);
      setShowDefault(false); // If selected options are present, don't show default dashboard

    }
  }, [location.state]);

  const onSave = () => {
    console.log('Selections saved!');
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDefault, setShowDefault] = useState(true); // Add a new state to track whether to show default dashboard

  
  const handleSave = (options) => {
    setSelectedOptions(options);
    setShowDefault(false); // When user selects options, don't show default dashboard

    // Perform other actions based on the selected options
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
          style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px" }}  
          >

    <div className="header-head">
      
 
      <Grid container>
        <ThemeProvider theme={theme}>
          <Grid container maxWidth="lg" margin="auto">
            <Grid container justifyContent="space-between" alignItems="center">
            <IconButton aria-label="more" sx={{ position: 'absolute', top: 10, right: 10 }} onClick={handleClick} open={open}>
  <MoreVertIcon />
</IconButton>
      <Popover
        id="checkbox-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: '500px',
            height: '500px',
          },
        }}
      >
        <GraphCheckBox1 onSave={handleSave}  onClose={handleClose}/>
      </Popover>
              <Grid item>
                {/* Your dashboard title or logo */}
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>

        {/* Render Count fields */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card sx={{ width: '72%', height: '300px', bgcolor: 'rgb(236, 237, 240)', display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 'auto', my: 'auto' }}>
              <Grid container spacing={2} sx={{ padding: "5px", width: '100%', height: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
              {showDefault ? (
  // Show default dashboard data
  filteredData.filter((item) => item.title !== 'Absent Monthly Wise' && item.title !== 'Leave Monthly Wise' && item.title !== 'Salary Monthly Wise').map((item, index) => (
    <Grid item xs={12} sm={6} md={2} lg={2} key={index}>
      <Card sx={{ maxWidth: 120, maxHeight: 115, }}>
        <CardContent>
          <Grid container alignItems="flex-start">
            <Typography gutterTop variant="h7" padding={'0'} component="div" textAlign='left' >
              {item.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {item.icon}
              <Box sx={{ ml: 1}}>
                <Typography variant="h8" color="text.primary">
                  {item.value}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
    
  ))
) : (
  // Show filtered data based on selected options
  filteredData
    .filter((item) => item.title !== 'Absent Monthly Wise' && item.title !== 'Leave Monthly Wise' && item.title !== 'Salary Monthly Wise')
    .filter((item) => selectedOptions && selectedOptions.includes(item.title))
    .map((item, index) => (
      <Grid item xs={12} sm={6} md={2} lg={2} key={index}>
        <Card sx={{ maxWidth: 120, maxHeight: 115, }}>
          <CardContent>
            <Grid container alignItems="flex-start">
              <Typography gutterTop variant="h7" padding={'0'} component="div" textAlign='left' >
                {item.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {item.icon}
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h8" color="text.primary">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ))
)}
      </Grid>
      </Card>


        {/* Render Graphs */}
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
          {showDefault ? (
            // Render graphs only if showDefault is true OR
            // if selectedOptions include any of the graphs
            filteredData
              .filter(
                (item) =>
                  item.title === 'Absent Monthly Wise' ||
                  item.title === 'Leave Monthly Wise' ||
                  item.title === 'Salary Monthly Wise'
              )
              .map((item, index) => (
                <Grid item xs={4} key={index}>
                  <Card sx={{ height: '90%', bgcolor: 'rgb(236, 237, 240)' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                        <Typography variant="body2" color="text.secondary">
                          Jan - Dec
                        </Typography>
                      </Box>
                      {item.data.length > 0 ? ( // Check if data exists
                        <BarChart
                          width={250}
                          height={180}
                          data={item.data}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          barSize={30}
                        >
                          <CartesianGrid strokeDasharray="2 2" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey={item.title === 'Absent Monthly Wise' ? 'absentDays' : item.title === 'Leave Monthly Wise' ? 'leaveDays' : 'salary'} fill={item.title === 'Absent Monthly Wise' ? '#FF0000' : item.title === 'Leave Monthly Wise' ? 'blue' : '#008000'} />
                        </BarChart>
                      ) : (
                        // Display a message if no data
                        <Typography variant="body2" color="text.secondary" align="center">
                          No data available
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
          ) : (
            // Show filtered graph data based on selected options
            filteredData
              .filter(
                (item) =>
                  item.title === 'Absent Monthly Wise' ||
                  item.title === 'Leave Monthly Wise' ||
                  item.title === 'Salary Monthly Wise'
              )
              .filter((item) => selectedOptions && selectedOptions.includes(item.title))
              .map((item, index) => (
                <Grid item xs={4} key={index}>
                  <Card sx={{ height: '90%', bgcolor: 'rgb(236, 237, 240)' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                        <Typography variant="body2" color="text.secondary">
                          Jan - Dec
                        </Typography>
                      </Box>
                      {item.data.length > 0 ? (
                        <BarChart
                          width={250}
                          height={180}
                          data={item.data}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                          barSize={30}
                        >
                          <CartesianGrid strokeDasharray="2 2" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey={item.title === 'Absent Monthly Wise' ? 'absentDays' : item.title === 'Leave Monthly Wise' ? 'leaveDays' : 'salary'} fill={item.title === 'Absent Monthly Wise' ? '#FF0000' : item.title === 'Leave Monthly Wise' ? 'blue' : '#008000'} />
                        </BarChart>
                      ) : (
                        <Typography variant="body2" color="text.secondary" align="center">
                          No data available
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))
          )}
        </Grid>
        </Grid>
      </Grid>
      </Grid>
    </div>
   </Grid>
   </Box>
   </div>
   </Grid>
  );
};
export default DBoards;
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "./appStore";
import { useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { useState, useEffect } from 'react';
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from "@mui/icons-material/Receipt";

const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "black",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "black",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      overflowY: "auto", // Allow scrolling when the drawer is open
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      overflowY: "auto", // Allow scrolling when the drawer is closed
    },
  }),
}));

export default function Sidenav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = useAppStore((state) => state.dopen);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const [openLeave, setOpenLeave] = React.useState(false);
  const [openSalary, setOpenSalary] = React.useState(false);
  const isLoggedIn = sessionStorage.getItem("user") !== null;
  const [openAttendance, setOpenAttendance] = React.useState(false);
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const handleAttendanceClick = () => {
    setOpenAttendance(!openAttendance);
  };

  const handleDrawerToggle = () => {
    if (location.pathname === "/Masters") {
      navigate("/"); // Navigate to the home page if already on the DBoards page
    } else {
      updateOpen(!open);
      navigate("/Masters"); // Navigate to the DBoards page when the dashboard button is clicked
    }
  };

  const handleLeaveClick = () => {
    setOpenLeave(!openLeave);
  };

  const location = useLocation();

  const handleSalaryClick = () => {
    setOpenSalary(!openSalary);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      
      {/* Permanent Drawer for Large Screens */}
      <Drawer variant="permanent" open={open} sx={{ display: { xs: 'none', sm: 'block' } }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {/* <ListItem disablePadding sx={{ display: "block" }}>
            <Box sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}>
              <Avatar>{sessionStorage.getItem("user").charAt(0)}</Avatar>
              <Typography color={"white"} sx={{ margin: 2 }}>
                {sessionStorage.getItem("user")}
              </Typography>
            </Box>
          </ListItem> */}

        <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/EmployeeDashBoard2")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/BasicDateCalendar2")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" sx={{ opacity: open ? 1 : 0, color: "white" }} />
              {open && (
                <Collapse in={openAttendance} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                   
                  </List>
                </Collapse>
              )}
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/HomePage2")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>
        
{/* 
          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/App001")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary=" Attendance" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>
        

          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/LeaveapplyHr")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/LeaveRequestTable")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves History" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>

  <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/HolidaysHrPage")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Holiday" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem> */}
                    <ListItem disablePadding sx={{ display: "block" }} onClick={handleSalaryClick}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Leave" sx={{ opacity: open ? 1 : 0, color: "white" }} />
              {open && (openSalary ? <ExpandLessIcon sx={{ color: "white" }} /> : <ExpandMoreIcon sx={{ color: "white" }} />)}
            </ListItemButton>
          </ListItem>

          {open && (
            <Collapse in={openSalary} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/LeaveapplyHr2")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ml:6,
                      transition: "transform 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#7f7f7f",
                        transform: "scale(1.10)",
                      },
                    }}
                  >
                    <ListItemText primary="Apply" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>
                
                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/LeaveRequestTable2")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ml:6,
                      transition: "transform 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#7f7f7f",
                        transform: "scale(1.10)",
                      },
                    }}
                  >
                    <ListItemText primary="Leave Status" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/LeaveBalances2")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ml:6,
                      transition: "transform 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#7f7f7f",
                        transform: "scale(1.10)",
                      },
                    }}
                  >
                    <ListItemText primary="Leave Balance" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/LeaveCalendar2")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ml:6,
                      transition: "transform 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#7f7f7f",
                        transform: "scale(1.10)",
                      },
                    }}
                  >
                    <ListItemText primary="Leave Calendar" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/HolidaysempPage2")}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ml:6,
                      transition: "transform 0.4s ease-in-out",
                      "&:hover": {
                        backgroundColor: "#7f7f7f",
                        transform: "scale(1.10)",
                      },
                    }}
                  >
                    <ListItemText primary="Holiday Calendar" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>

              </List>  
            </Collapse>
          )} 
          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/ReimbursementForm2")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <CurrencyExchangeIcon/>
              </ListItemIcon>
              <ListItemText primary="Reimbursement" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/payslipgenerator")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <ReceiptIcon/>
              </ListItemIcon>
              <ListItemText primary="Payslip" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/Masters")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>


            <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/info")}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                
                transition: "transform 0.4s ease-in-out",
                "&:hover": {
                  backgroundColor: "#7f7f7f",
                  transform: "scale(1.10)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Info" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* Temporary Drawer for Small Screens */}
      <Drawer variant="temporary" open={open} onClose={handleDrawerToggle} sx={{ display: { xs: 'block', sm: 'none' } }}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Same list items as in the permanent drawer */}
        </List>
      </Drawer>
    </Box>
  );
}

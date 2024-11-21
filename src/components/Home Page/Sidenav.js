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
import { useNavigate,NavLink } from "react-router-dom";
import { useAppStore } from "./appStore";
import { useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React, { useState, useEffect } from 'react';
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import payroll from "../../images/Payroll-icon.png"
import PaidIcon from '@mui/icons-material/Paid';
import AssignmentIcon from "@mui/icons-material/Assignment";
import DeckIcon from '@mui/icons-material/Deck';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';
import { Icon } from "@material-ui/core";
import  desig from"../../images/paym-desiganation-icon.png"
import Groups3Icon from '@mui/icons-material/Groups3';
import '../../App.css'
const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#FFF",
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
  backgroundColor: "#fff"
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
  const [activeRoute, setActiveRoute] = useState(null); // Track active route
  const handleAttendanceClick = () => {
    setOpenAttendance(!openAttendance);
  };


  const handleNavigation = (route) => {
    setActiveRoute(route); // Set the active route
    // navigate(route);
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

  // const handleClick = () => {
  //   setIsActive(true);
  //   navigate("/DBoards");
  // };
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
        <ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/DBoards"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
    <DashboardIcon
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Dashboard </span>
  </NavLink>
</ListItem>


<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/HomePage"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <HomeIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Home </span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/DepartmentHome"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <Groups3Icon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Department </span>
  </NavLink>
</ListItem>


<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/DesignationHome"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <BadgeIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Designation </span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/EmployeeHome"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <PeopleIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>All Employee </span>
  </NavLink>
</ListItem>
       
          {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/EmployeeHome")}>
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
                  color: "black",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="All Employees" sx={{ opacity: open ? 1 : 0, color: "black" }} />
            </ListItemButton>
          </ListItem> */}

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/Attendance01"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <TodayIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Attendance </span>
  </NavLink>
</ListItem>
          {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/Attendance01")}>
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
                  color: "black",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TodayIcon />
              </ListItemIcon>
              <ListItemText primary=" Attendance" sx={{ opacity: open ? 1 : 0, color: "black" }} />
            </ListItemButton>
          </ListItem> */}

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/Masters"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <PaidIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Payroll </span>
  </NavLink>
</ListItem>
          {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/Masters")}>
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
                  color: "black",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PaidIcon />
              </ListItemIcon>
              <ListItemText primary="Payroll" sx={{ opacity: open ? 1 : 0, color: "black" }} />
            </ListItemButton>
          </ListItem> */}
<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/LeaveRequestHr"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <AssignmentIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Leaves </span>
  </NavLink>
</ListItem>
          {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/LeaveRequestHr")}>
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
                  color: "black",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Leaves" sx={{ opacity: open ? 1 : 0, color: "black" }} />
            </ListItemButton>
          </ListItem> */}
<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/HolidaysPage"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <DeckIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Holiday </span>
  </NavLink>
</ListItem>
  {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/HolidaysPage")}>
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
                  color: "black",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DeckIcon />
              </ListItemIcon>
              <ListItemText primary="Holiday" sx={{ opacity: open ? 1 : 0, color: "black" }} />
            </ListItemButton>
          </ListItem> */}

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/EmployeeReimbursement"
    className={({ isActive, isPending }) =>
      isPending ? "pending" : isActive ? "active" : ""
    }
    style={({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      backgroundColor: isActive ? "#d0f0c0" : "transparent",
      // borderLeft: isActive ? "4px solid #90ee90" : "none",
      padding: "8px 20px",
    })}
  >
     <CurrencyExchangeIcon 
      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}>Reimburesment </span>
  </NavLink>
</ListItem>
          {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/EmployeeReimbursement")}>
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
                  color: "black",
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                < CurrencyExchangeIcon/>
              </ListItemIcon>
              <ListItemText primary="Reimburesemnt" sx={{ opacity: open ? 1 : 0, color: "black" }} />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/Masters")}>
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
          </ListItem> */}
{/* 
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
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Salary" sx={{ opacity: open ? 1 : 0, color: "white" }} />
              {open && (openSalary ? <ExpandLessIcon sx={{ color: "white" }} /> : <ExpandMoreIcon sx={{ color: "white" }} />)}
            </ListItemButton>
          </ListItem>

          {open && (
            <Collapse in={openSalary} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/salary/view")}>
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
                    <ListItemText primary="View Salary" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/salary/history")}>
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
                    <ListItemText primary="Salary History" sx={{ opacity: open ? 1 : 0, color: "white" }} />
                  </ListItemButton>
                </ListItem>
              </List>  
            </Collapse>
          )} */}
            {/* <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/info")}>
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
          </ListItem> */}
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

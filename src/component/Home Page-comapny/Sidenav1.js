import * as React from "react";
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
import  { useState, useEffect } from 'react';

import { Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppStore } from "./appStore";
import { useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarHalfIcon from '@mui/icons-material/StarHalf';
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
  backgroundColor: "#FFF",
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

{/* 
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/Attendancewise1")}>
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
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance" sx={{ opacity: open ? 1 : 0, color: "white" }} />
              {open && (
                <Collapse in={openAttendance} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                   
                  </List>
                </Collapse>
              )}
            </ListItemButton>
          </ListItem> */}


<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/HomePage1"
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

          {/* <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/HomePage1")}>
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
          </ListItem> */}
   <ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/EmployeeHomeH1"
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
    <span style={{ color: "black" }}>Employee Master</span>
  </NavLink>
</ListItem>
          {/* <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/EmployeeHomeH1")}>
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
              <ListItemText primary="Employee Master" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem> */}
   <ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/GradeSlab"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Grade Slab</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/CTCSlabTable"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Loan Slab</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/LoanMaster"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Loan Master</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/AllowanceMaster"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Allowance Master</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/AllowanceValues"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Allowance Values</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/DeductionMaster"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Deduction Master</span>
  </NavLink>
</ListItem>
<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/PFvalues"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> PF Settings</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/ESIsettings"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> ESI Settings</span>
  </NavLink>
</ListItem>

<ListItem disablePadding sx={{ display: "block" }}>
  <NavLink
    to="/AllowanceSettings"
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
    <StarHalfIcon 

      style={{
        color: "black",
        marginRight: "20px",
      }}
    />
    <span style={{ color: "black" }}> Allowance Settings</span>
  </NavLink>
</ListItem>


          {/* <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/GradeSlab")}>
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
                <StarHalfIcon />
              </ListItemIcon>
              <ListItemText primary="Grade Slab" sx={{ opacity: open ? 1 : 0, color: "white" }} />
            </ListItemButton>
          </ListItem> */}
  {/* <ListItem disablePadding sx={{ display: "block" }}  onClick={() => navigate("/MastersTemplate")}>
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
              <ListItemText primary="Master" sx={{ opacity: open ? 1 : 0, color: "white" }} />
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

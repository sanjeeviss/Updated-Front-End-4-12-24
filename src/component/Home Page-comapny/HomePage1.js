import React, { useEffect } from "react";
import Sidenav from "./Sidenav1";
import Navbar from "./Navbar1";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Search, Settings } from "@mui/icons-material";
import WorkIcon from "@mui/icons-material/Work";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from '@mui/icons-material/School';
import BookIcon from '@mui/icons-material/Book';
import { keyframes } from '@mui/system';
import { Navigate, useNavigate } from "react-router-dom";
import company from "../../images/paym-company-icon.png"
import Branch from "../../images/paym-branch-icon.png"
import Department from "../../images/paym-department-icon.png"

import Division from "../../images/paym-division-icon.png"
import Grade from "../../images/paym-grade-icon.png"
import Shift from "../../images/paym-shift-icon.png"
import Category from "../../images/Paym-category-icon.png"
import Jobstatus from "../../images/job-status-icon.png"
import Level from "../../images/paym-level-icon.png"
import Leave from "../../images/paym-leave-icon.png"
import Designation from "../../images/paym-desiganation-icon.png"
import Group from "../../images/group-icons.png"
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS


const bounce = keyframes({
  '0%, 20%, 50%, 80%, 100%': {
    transform: 'translateY(0)',
  },
  '40%': {
    transform: 'translateY(-15px)',
  },
  '60%': {
    transform: 'translateY(-10px)',
  },
});


export default function HomePage1() {
    const navigate = useNavigate();

    const cardItems = [
        { text: "Company", icon: <img src={company} width={40} height={40}  /> ,onclick : () => navigate('/CompanyMasterss1')  },
        { text: "Branch", icon: <img src={Branch} width={40} height={40}  />, onclick : () => navigate('/BranchMaster1')   },
        { text: "Division", icon: <img src={Division} width={40} height={40}  />, onclick : () => navigate('/DivisionMaster1') },
        { text: "Department", icon: <img src={Department} width={40} height={40}  /> , onclick : () => navigate('/DepartmentFormMaster1')  },
        { text: "Designation", icon: <img src={Designation} width={40} height={40}  />  , onclick : () => navigate('/DesignationMasterForm1') },
        { text: "Grade", icon: <img src={Grade} width={40} height={40}  />  , onclick : () => navigate('/GradeForm1')  },
        { text: "Shift", icon: <img src={Shift} width={40} height={40}  />, onclick : () => navigate('/ShiftFormMaster1') }, 
        { text: "Category", icon: <img src={Category} width={40} height={40}  />  , onclick : () => navigate('/CategoryFormMaster1')  },
        { text: "Jobstatus", icon: <img src={Jobstatus} width={40} height={40}  />  , onclick : () => navigate('/JobStatusFormMaster1')  },
        { text: "Level", icon: <img src={Level} width={40} height={40}  /> , onclick : () => navigate('/LevelFormMaster1')   },
        { text: "Leave", icon: <img src={Leave} width={50} height={40}  />  , onclick : () => navigate('/PaymLeaveMaster1')  },
        { text: "Earn Deduct", icon:  <CastForEducationIcon style={{ width: 40, height: 40 }}/>,  onclick : () => navigate('/EarnDeductCompanyMasters')  },
      ];
      
      useEffect(() => {
        AOS.init({
            duration: 1000, // Set to 1 second for quick animation
            easing: 'ease-in-out', // Optional: Choose an easing function
        });
    }, []);
  return (
    <Grid container>
      {/* Navbar and Sidebar */}
      <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            {/* Main Content */}
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "50px 50px 50px 50px" ,textAlign: 'left' }}>
            <div data-aos="fade-right">
              <Typography variant="h5" gutterBottom sx={{ color: "black" }}>
                HR Management System
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search Integration..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3, bgcolor: "#ffffff", width: "400px" }} // Ensure the input field has a white background for readability
              />
              </div>
              <div data-aos="zoom-in-down">
              <Card sx={{ height: "80%", p: 2 }}>
                <Box
                  sx={{
                    border: "2px solid #1976d2",
                    borderRadius: "8px",
                    p: 3,
                    height: "100%",
                    bgcolor: "#9E9EDE",
                  }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Grid container spacing={3}>
                      {cardItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Card
                            sx={{
                              height: '100%',
                              transition: 'transform 0.4s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.1) translateY(-10px)',
                                '& .icon-button, & .text': {
                                  animation: `${bounce} 2s infinite`,
                                },
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                height: '100%',
                              }}
                            >
                              <IconButton className="icon-button" sx={{ mb: 2, color: 'black' }} onClick={item.onclick}>{item.icon}</IconButton>
                              <Typography className="text" variant="h6" sx={{color:'black'}}>{item.text}</Typography>
                            </Box>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Box>
              </Card>
              </div>
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}
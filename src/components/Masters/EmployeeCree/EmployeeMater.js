import React, { useState, useEffect } from "react";
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import axios from 'axios';

import { postRequest } from '../../../serverconfiguration/requestcomp';
import nodata from '../../../images/NoDataImage.jpeg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Button,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CssBaseline,
  IconButton,
  Grid,
  Box,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  // },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   backgroundColor: "#ffffff",
  //   color: "#000000",
  // },
  // drawer: {
  //   width: 200,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: 200,
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0),
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: theme.spacing(0),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    maxWidth: 250,
  },
  inputBase: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(0.5),
  },
  table: {
    minWidth: 700,
  },
  profilePic: {
    marginRight: theme.spacing(1),
  },
  tableCell: {
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#4a47a3",
    color: "white",
    "&:hover": {
      backgroundColor: "#3a3789",
    },
  },
  importButton: {
    marginRight: theme.spacing(0.4),
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  headerTitle: {
    flexGrow: 1,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f1f1f1",
  },
  searchBox: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  actionCell: {
    display: "flex",
    justifyContent: "space-around",
  },
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 50,
  // },
}));

function EmployeeHome() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();
  const [isLoggedin, setLoggedin] = useState(sessionStorage.getItem("user"));
  const [loggedBranch, setLoggedBranch] = useState([]);
  const [employeeImages, setEmployeeImages] = useState({}); // State to store images
  // const loggedInBranchId = "your_logged_in_branch_id"; // Replace with actual branch ID
  // Function to fetch employee data
  const fetchEmployeeImages = async (employees) => {
    const employeeIds = employees.map(employee => employee["Employee ID"]).join(',');
    try {
      const query = `
        SELECT pn_EmployeeID, image_data 
        FROM Paym_employee_profile1 
        WHERE pn_EmployeeID IN (${employeeIds});
      `;
      
      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        const images = {};
        response.data.forEach(item => {
          images[item.pn_EmployeeID] = item.image_data; // Map employee ID to image data
        });
        setEmployeeImages(images);
      }
    } catch (error) {
      console.error('Error fetching employee images:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered employees based on search query
  const filteredEmployees = employees.filter((employee) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      (typeof employee["Employee Name"] === "string" && employee["Employee Name"].toLowerCase().includes(searchValue)) ||
      (typeof employee["Employee ID"] === "string" && employee["Employee ID"].toLowerCase().includes(searchValue)) ||
      (typeof employee["Branch Name"] === "string" && employee["Branch Name"].toLowerCase().includes(searchValue)) ||
      (typeof employee["Company Name"] === "string" && employee["Company Name"].toLowerCase().includes(searchValue)) ||
      (typeof employee["Department"] === "string" && employee["Department"].toLowerCase().includes(searchValue)) ||
      (typeof employee["Designation"] === "string" && employee["Designation"].toLowerCase().includes(searchValue))
    );
  });

  // Handler functions for View, Edit, and Delete action

  const handleEditClick = (employeeId) => {
    navigate(`/EditEmployee/${employeeId}`); // Use the ID in the URL
  };
  

    // Handler functions for View, Edit, and Delete actions
    const handleViewClick = (employeeId) => {
      navigate(`/Editprofile/${employeeId}`);
    };

  const handleDeleteClick = (employeeId) => {
    setEmployees(employees.filter((employee) => employee["Employee ID"] !== employeeId));
  };

  function handleclick01() {
    navigate("/PaymEmployeeFormm")
  }

  
  const getImageSrc = (imageData) => {
    return imageData ?` data:image/jpeg;base64,${imageData}` : nodata; // Use nodata image if no imageData
  };

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Branch WHERE Branch_User_Id = '${isLoggedin}'`,
        });

        if (loggedBranchData.data) {
          setLoggedBranch(loggedBranchData.data);
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }

    if (isLoggedin) {
      fetchInitialData();
    }
  }, [isLoggedin]);

  // Define the fetchEmployees function
  const fetchEmployees = async () => {
    if (loggedBranch.length > 0) {
      setIsLoading(true);
      const branchId = loggedBranch[0].pn_BranchID; // Get the branch ID
      try {
        const query = `
          SELECT paym_Employee.Employee_Full_Name AS [Employee Name],
                 paym_Employee.pn_EmployeeID AS [Employee ID],
                 paym_Branch.BranchName AS [Branch Name],
                 paym_Company.CompanyName AS [Company Name],
                 paym_Department.v_DepartmentName AS [Department],
                 paym_Designation.v_DesignationName AS [Designation]
          FROM paym_employee_profile1
          LEFT JOIN paym_Employee ON paym_employee_profile1.pn_EmployeeID = paym_Employee.pn_EmployeeID
          LEFT JOIN paym_Branch ON paym_employee_profile1.pn_BranchID = paym_Branch.pn_BranchID
          LEFT JOIN paym_Company ON paym_employee_profile1.pn_CompanyID = paym_Company.pn_CompanyID
          LEFT JOIN paym_Department ON paym_employee_profile1.pn_DepartmentId = paym_Department.pn_DepartmentId
          LEFT JOIN paym_Designation ON paym_employee_profile1.pn_DesingnationId = paym_Designation.pn_DesignationID
          WHERE paym_employee_profile1.pn_BranchID = ${branchId};
        `;

        const response = await postRequest(ServerConfig.url, REPORTS, { query });

        if (response.status === 200) {
          console.log('Fetched employees:', response.data);
          setEmployees(response.data || []);
          await fetchEmployeeImages(response.data); // Fetch images after getting employee data
        } else {
          console.error`(Unexpected response status: ${response.status})`;
        }
      } catch (error) {
        console.error('Error fetching employees data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  }
  // Fetch employees data whenever the loggedBranch changes
  useEffect(() => {
    fetchEmployees(); // Call the fetchEmployees function here
  }, [loggedBranch]);

  return (
    <Grid  item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={40} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Grid item  xs={12}  style={{margin:'0 auto'}}>
        

          <div  className="background1" >
          <Grid  container >
<Card  style={{ maxWidth: 1100, width: "100%" ,margin:'20px' ,padding:'20px'}}>  

            <div className={classes.root}>
              <CssBaseline />
              <main className={classes.content}>
                {/* <div className={classes.toolbar} /> */}
                <div className={classes.header}>
                <Typography variant="h4"style={{fontWeight:"500"}}>
                      Employees
                    </Typography>
                  <div className={classes.buttonContainer}>
                  <Button
                        variant="contained"
                        color="primary"
                        style={{borderRadius:"20PX"}}
                        className={classes.importButton}
                        onClick={handleclick01}
                      >
                        <AddIcon/>
                        Add Employee
                        </Button>
                  </div>
                </div>
                <Paper className={classes.searchBox}>
                  <div className={classes.searchContainer}>
                    <InputBase
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      classes={{
                        root: classes.inputBase,
                      }}
                    />
                    <IconButton className={classes.searchIcon}>
                      <SearchIcon />
                    </IconButton>
                  </div>
                </Paper>
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeader}>Employee Name</TableCell>
                        <TableCell className={classes.tableHeader}>Employee ID</TableCell>
                        <TableCell className={classes.tableHeader}>Branch Name</TableCell>
                        <TableCell className={classes.tableHeader}>Company Name</TableCell>
                        <TableCell className={classes.tableHeader}>Department</TableCell>
                        <TableCell className={classes.tableHeader}>Designation</TableCell>
                        <TableCell className={classes.tableHeader}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : filteredEmployees.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <IconButton aria-label="no data">
                              <img src={nodata} alt="No data" width={150} />
                            </IconButton>
                            <Typography>No Data</Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredEmployees.map((employee, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  src={getImageSrc(employeeImages[employee["Employee ID"]])}
                                  alt="Employee Avatar"
                                  className={classes.profilePic}
                                />
                                {employee["Employee Name"]}
                              </div>
                            </TableCell>
                            <TableCell>
                              {typeof employee["Employee ID"] === "object"
                                ? JSON.stringify(employee["Employee ID"])
                                : employee["Employee ID"]}
                            </TableCell>
                            <TableCell>
                              {typeof employee["Branch Name"] === "object"
                                ? JSON.stringify(employee["Branch Name"])
                                : employee["Branch Name"]}
                            </TableCell>
                            <TableCell>
                              {typeof employee["Company Name"] === "object"
                                ? JSON.stringify(employee["Company Name"])
                                : employee["Company Name"]}
                            </TableCell>
                            <TableCell>
                              {typeof employee["Department"] === "object"
                                ? JSON.stringify(employee["Department"])
                                : employee["Department"]}
                            </TableCell>
                            <TableCell>
                              {typeof employee["Designation"] === "object"
                                ? JSON.stringify(employee["Designation"])
                                : employee["Designation"]}
                            </TableCell>
                            <TableCell className={classes.actionCell}>
                              <IconButton
                                aria-label="view"
                                onClick={() => handleViewClick(employee["Employee ID"])}
                                style={{ color: 'darkblue' }} // Dark blue for view icon
                              >
                                <VisibilityIcon />
                              </IconButton>
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEditClick(employee["Employee ID"])}
                                style={{ color: '#007BFF' }} // Light blue for edit icon
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteClick(employee["Employee ID"])}
                                style={{ color: 'red' }} // Same red color as in your image
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </main>
            </div>
          
           
            </Card>
       </Grid>
            </div>
            </Grid>
         
        </Box>
      </div>
    </Grid>
  );
}

export default EmployeeHome;
import React, { useState, useEffect } from "react";
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import axios from 'axios';
import { postRequest } from '../../serverconfiguration/requestcomp';
import nodata from'../../images/No Data icon png.jpeg';
import { useNavigate } from "react-router-dom";

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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Sidenav from "../Home Page-comapny/Sidenav";
import Navbar from "../Home Page-comapny/Navbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    marginLeft: theme.spacing(-11),
  },
  toolbar: theme.mixins.toolbar,
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    maxWidth: 400,
  },
  inputBase: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(0.5),
  },
  table: {
    minWidth: 800,
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
    marginRight: theme.spacing(3),
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function EmployeeHome220() {
  const classes = useStyles();
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const navigate = useNavigate();

  // Function to fetch employee data
  const fetchEmployees = async () => {
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
        LEFT JOIN paym_Designation ON paym_employee_profile1.pn_DesingnationId = paym_Designation.pn_DesignationID;
      `;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        console.log('Fetched employees:', response.data);
        setEmployees(response.data || []);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching employees data:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler functions for View, Edit, and Delete actions
  const handleViewClick = (employeeId) => {
    console.log("View clicked for employee ID:", employeeId);
  };

  const handleEditClick = (employeeId) => {
    console.log("Edit clicked for employee ID:", employeeId);
  };

  const handleDeleteClick = (employeeId) => {
    setEmployees(employees.filter((employee) => employee["Employee ID"] !== employeeId));
  };

  function handleclick02() {
    navigate("/PaymEmployeeForm001");
  }
  function handleclick03(){
    navigate("/PaymEmployeeForm0045")
  }

  return (
    <Grid container>
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
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                margin: "20px 50px 50px 50px",
              }}
            >
              <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <div className={classes.header}>
                    <Typography variant="h4" style={{ textAlign: "left" }} className={classes.headerTitle}>
                      Employee
                    </Typography>
                    <div className={classes.buttonContainer}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.importButton}
                        onClick={handleclick03}
                      >
                        Add Empployee 
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.importButton}
                        onClick={handleclick02}
                      >
                        Add emp Profile
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.saveButton}
                      >
                        Filter
                      </Button>
                    </div>
                  </div>
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
                          <TableCell className={classes.tableHeader}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isLoading ? (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              <CircularProgress />
                            </TableCell>
                          </TableRow>
                        ) : employees.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} align="center">
                              <span aria-label="no data" color="white">
                                <img src={nodata} alt="No data" width={150} color="white" />
                              </span>
                              <Typography>No Data</Typography>
                            </TableCell>
                          </TableRow>
                        ) : (
                          employees.map((employee, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <Avatar src={employee.avatar} alt="" className={classes.profilePic} />
                                  {typeof employee["Employee Name"] === 'object' ? "N/A" : employee["Employee Name"] || "N/A"}
                                </div>
                              </TableCell>
                              <TableCell>
                                {typeof employee["Employee ID"] === 'object' ? "N/A" : employee["Employee ID"] || "N/A"}
                              </TableCell>
                              <TableCell>
                                {typeof employee["Branch Name"] === 'object' ? "N/A" : employee["Branch Name"] || "N/A"}
                              </TableCell>
                              <TableCell>
                                {typeof employee["Company Name"] === 'object' ? "N/A" : employee["Company Name"] || "N/A"}
                              </TableCell>
                              <TableCell>
                                {typeof employee["Department"] === 'object' ? "N/A" : employee["Department"] || "N/A"}
                              </TableCell>
                              <TableCell>
                                {typeof employee["Designation"] === 'object' ? "N/A" : employee["Designation"] || "N/A"}
                              </TableCell>
                              <TableCell className={classes.actionCell}>
                                <IconButton
                                  aria-label="view"
                                  onClick={() => handleViewClick(employee["Employee ID"])}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => handleEditClick(employee["Employee ID"])}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDeleteClick(employee["Employee ID"])}
                                >
                                  <DeleteIcon />
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
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default EmployeeHome220;

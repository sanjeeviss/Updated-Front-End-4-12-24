import React, { useState, useEffect } from "react";
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../../serverconfiguration/requestcomp';
import nodata from '../../../images/NoDataImage.jpeg';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
  Grid,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  InputBase,
  Card
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from '@mui/icons-material/Add';
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  //   backgroundColor: "#ffffff",
  //   color: "#000000",
  // },
  // drawer: {
  //   width: 300,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: 300,
  // },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(1),
    // marginLeft: theme.spacing(0),
  },
  toolbar: theme.mixins.toolbar,
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    maxWidth: 250,
  },
  // inputBase: {
  //   marginLeft: theme.spacing(1),
  //   flex: 1,
  // },
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
  // importButton: {
  //   marginRight: theme.spacing(0.4),
  // },
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
  
  },
  // formControl: {
  //   // margin: theme.spacing(2),
  //   minWidth: 120,
  // },
}));

function DepartmentHome() {
  const classes = useStyles();
  const [departments, setDepartments] = useState([]); // State for storing department data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [isLoggedin, setLoggedin] = useState(sessionStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");
  
  const [loggedBranch, setLoggedBranch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBranchData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Branch WHERE Branch_User_Id = '${isLoggedin}'`, // Query to fetch branches for the logged-in user
        });

        if (loggedBranchData.data && loggedBranchData.data.length > 0) {
          setLoggedBranch(loggedBranchData.data); // Set the fetched branch data
        } else {
          console.log("No branch found for the logged-in user");
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }

    if (isLoggedin) {
      fetchBranchData(); // Fetch branch data on login
    }
  }, [isLoggedin]);

  // Fetch department data based on the logged-in branch
  const fetchDepartments = async () => {
    if (loggedBranch.length > 0) {
      const branchId = loggedBranch[0].pn_BranchID; // Extract the branch ID from fetched branch data
      setIsLoading(true);

      try {
        const departmentsData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Department WHERE pn_BranchID = ${branchId};`, // Fetch departments for the specific branch
        });

        if (departmentsData.data) {
          setDepartments(departmentsData.data); // Set department data
        } else {
          console.log("No departments found for the selected branch");
        }
      } catch (error) {
        console.error("Error fetching department data:", error);
      } finally {
        setIsLoading(false); // Stop the loading spinner
      }
    }
  };

  // Fetch departments when loggedBranch is available
  useEffect(() => {
    if (loggedBranch.length > 0) {
      fetchDepartments();
    }
  }, [loggedBranch]);
  // Handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler functions for View, Edit, and Delete actions
  const handleEditClick = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleViewClick = (id) => {
    navigate(`/view/${id}`);
  };

  const handleDeleteClick = (id) => {
    // Implement delete logic
    console.log("Delete department with ID:", id);
  };


    // Filter departments based on search query
    const filteredDepartments = departments.filter((department, index) => {
        const departmentName = department.v_DepartmentName.toLowerCase();
        const status = department.status === 'A' ? 'active' : 'inactive';
        const sNo = (index + 1).toString();
    
        return (
          departmentName.includes(searchQuery) ||
          status.includes(searchQuery) ||
          sNo.includes(searchQuery)
        );
      });
    

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
                  <Typography variant="h4" style={{ fontWeight: "500" }}>
                    Department
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "20PX" }}
                      className={classes.importButton}
                      onClick={() => navigate("/DepartmentMaster")}
                    >
                      <AddIcon />
                      Add Department
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
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeader}>S.No</TableCell>
                        <TableCell className={classes.tableHeader}>Name</TableCell>
                        <TableCell className={classes.tableHeader}>Status</TableCell>
                        <TableCell className={classes.tableHeader}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : filteredDepartments.length > 0 ? (
                        filteredDepartments.map((department, index) => (
                          <TableRow key={department.id || index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{department.v_DepartmentName}</TableCell>
                            <TableCell>
                              {department.status === 'A' ? 'Active' : 'Inactive'}
                            </TableCell>
                            <TableCell className={classes.actionCell}>
                              <IconButton
                                aria-label="edit"
                                style={{ color: '#007BFF' }}
                                onClick={() => handleEditClick(department.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                style={{ color: 'red' }}
                                onClick={() => handleDeleteClick(department.id)}
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} align="center">
                            <img src={nodata} alt="No data" width={150} />
                            <Typography>No Data</Typography>
                          </TableCell>
                        </TableRow>
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

export default DepartmentHome;

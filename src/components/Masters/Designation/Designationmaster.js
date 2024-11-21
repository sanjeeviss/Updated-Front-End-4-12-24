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
  Snackbar,
  Card,
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  // drawer: {
  //   width: 300,
  //   flexShrink: 0,
  // },
  // drawerPaper: {
  //   width: 300,
  // },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(0),
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
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

function DesignationHome() {
  const classes = useStyles();
  const [designations, setDesignations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setLoggedin] = useState(sessionStorage.getItem("user"));
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedBranch, setLoggedBranch] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBranchData() {
      try {
        const loggedBranchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Branch WHERE Branch_User_Id = '${isLoggedin}'`,
        });

        if (loggedBranchData.data && loggedBranchData.data.length > 0) {
          setLoggedBranch(loggedBranchData.data);
        } else {
          console.log("No branch found for the logged-in user");
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    }

    if (isLoggedin) {
      fetchBranchData();
    }
  }, [isLoggedin]);

  const fetchDesignations = async () => {
    if (loggedBranch.length > 0) {
      const branchId = loggedBranch[0].pn_BranchID; // Get the branch ID
      setIsLoading(true);
  
      try {
        const DesignationsData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Designation WHERE BranchID = '${branchId}'`, // Filter designations by branch ID
        });
  
        if (DesignationsData.data) {
          setDesignations(DesignationsData.data);
        } else {
          console.log("No Designations found for the selected branch");
        }
      } catch (error) {
        console.error("Error fetching Designations data:", error);
        setSnackbarMessage("Failed to load designations. Please try again.");
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  useEffect(() => {
    if (loggedBranch.length > 0) {
      fetchDesignations();
    }
  }, [loggedBranch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (id) => {
    navigate(`/DesignationMaster`);
    setSnackbarMessage("Redirecting to edit designation");
    setSnackbarOpen(true);
  };

  const handleViewClick = (id) => {
    navigate(`/DesignationMaster`);
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this designation?");
    if (confirmDelete) {
      // Perform delete operation
      setSnackbarMessage("Designation deleted successfully."); // Replace with Snackbar for better UX
      setSnackbarOpen(true);
      fetchDesignations(); // Refresh the list after deletion
    }
  };

  // Filter designations based on search query
// Filter designations based on search query
const filteredDesignations = designations.filter((designation, index) => {
  const designationName = designation.vDesignationName ? designation.vDesignationName.toLowerCase() : "";
  const status = designation.status === 'A' ? 'active' : 'inactive';
  const sNo = (index + 1).toString();
  
  return designationName.includes(searchQuery.toLowerCase()) || 
         status.includes(searchQuery.toLowerCase()) || 
         sNo.includes(searchQuery);
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
                <div className={classes.header}>
                  <Typography variant="h4" style={{ fontWeight: "500" }}>
                    Designation
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: "20PX" }}
                      className={classes.importButton}
                      onClick={() => navigate("/DesignationMaster")}
                    >
                      <AddIcon />
                      Add Designation
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
                        <TableCell className={classes.tableHeader}>Authority</TableCell>
                        <TableCell className={classes.tableHeader}>Status</TableCell>
                        <TableCell className={classes.tableHeader}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : filteredDesignations.length > 0 ? (
                        filteredDesignations.map((designation, index) => (
                          <TableRow key={designation.id || index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{designation.v_DesignationName}</TableCell>
<TableCell>{designation.Authority}</TableCell>

                            <TableCell>{designation.status === 'A' ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell className={classes.actionCell}>
                              <IconButton
                                aria-label="view designation"
                                onClick={() => handleViewClick(designation.id)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                              <IconButton
                                aria-label="edit designation"
                                onClick={() => handleEditClick(designation.id)}
                                style={{ color: '#007BFF' }}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete designation"
                                onClick={() => handleDeleteClick(designation.id)}
                                style={{ color: 'red' }}
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} align="center">
                            <img src={nodata} alt="No Data" />
                            <Typography variant="h6">No Designations Found</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Snackbar
                  open={snackbarOpen}
                  autoHideDuration={3000}
                  onClose={() => setSnackbarOpen(false)}
                  message={snackbarMessage}
                />
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

export default DesignationHome;

import React from "react";
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

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#ffffff", // Adjust the color to match the image
    color: "#000000", // Adjust the color to match the image
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
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
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
    minWidth: 650,
  },
  profilePic: {
    marginRight: theme.spacing(1),
  },
  tableCell: {
    display: "flex",
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
    marginRight: theme.spacing(2),
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
    backgroundColor: "#f1f1f1", // Set the background color to grey
  },
  searchBox: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const employeeData = [
  {
    name: "Sanjeevi",
    code: "EMP001",
    date: "26-08-2002",
    role: "EMPLOYEE",
    avatar: "profile-picture-url-1",
  },
  {
    name: "John Doe",
    code: "EMP002",
    date: "15-07-2001",
    role: "EMPLOYEE",
    avatar: "profile-picture-url-2",
  },
  {
    name: "Jane Smith",
    code: "EMP003",
    date: "22-11-1999",
    role: "EMPLOYEE",
    avatar: "profile-picture-url-3",
  },
  {
    name: "Chris Evans",
    code: "EMP004",
    date: "05-06-2010",
    role: "EMPLOYEE",
    avatar: "profile-picture-url-4",
  },
  {
    name: "Emily Davis",
    code: "EMP005",
    date: "30-01-2015",
    role: "EMPLOYEE",
    avatar: "profile-picture-url-5",
  },
];

function AttendanceHome() {
  const classes = useStyles();

  return (
    <Grid container>
    {/* Navbar and Sidebar */}
    <Grid item xs={12}>
      <div style={{ backgroundColor: "#fff" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            HRM SYSTEM
          </Typography>
        </Toolbar>
      </AppBar> */}
      {/* <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}> */}
        {/* <Sidebar /> */}
      {/* </Drawer> */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.header}>
          <Typography variant="h4" className={classes.headerTitle}>
            Attendance
          </Typography>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.importButton}>
              Import
            </Button>
            <Button variant="contained" className={classes.saveButton}>
              Save
            </Button>
          </div>
        </div>
        <Paper className={classes.searchBox}>
          <div className={classes.searchContainer}>
            <InputBase
              placeholder="Search..."
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
                <TableCell className={classes.tableHeader}>Name</TableCell>
                <TableCell className={classes.tableHeader}>
                  Employee Code
                </TableCell>
                <TableCell className={classes.tableHeader}>Date</TableCell>
                <TableCell className={classes.tableHeader}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeData.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableCell}>
                    <Avatar
                      src={employee.avatar}
                      alt=""
                      className={classes.profilePic}
                    />
                    {employee.name}
                  </TableCell>
                  <TableCell>{employee.code}</TableCell>
                  <TableCell>{employee.date}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                </TableRow>
              ))}
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

export default AttendanceHome;
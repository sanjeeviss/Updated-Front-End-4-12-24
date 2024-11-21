import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  CardContent,
  FormControl,
  Tabs,
  Tab, Box,
  InputLabel,
  MenuItem,
  Select,
  Divider,
  Paper,
  IconButton,
  Checkbox,
  Menu,
  ListItemText,
  ListItemIcon,
  FormHelperText,
  TableHead,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  CircularProgress,
  TableRow,
  Avatar,
  InputBase,
} from "@mui/material";
import { useState, useEffect } from "react";
import { PAYMCOMPANIES, PAYMBRANCHES, REPORTS } from "../../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { SAVE } from "../../../serverconfiguration/controllers";
//   import Employeeprofile0909090 from "./EmployeePrfile1Org"
import Sidenav from "../../Home Page-comapny/Sidenav1";
import Navbar from "../../Home Page-comapny/Navbar1";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import AddIcon from '@mui/icons-material/Add';
import nodata from '../../../images/NoDataImage.jpeg';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { style } from "@mui/system";
const useStyles = makeStyles((theme) => ({
 

  profilePic: {
    marginRight: theme.spacing(1),
  },
  inputBase: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchIcon: {
    padding: theme.spacing(0.5),
  },

}));
export default function EmployeeHomeH1() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [branch, setBranch] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [errors, setErrors] = useState({});
  const [profileTabValue, setProfileTabValue] = useState(0);
  const [employeeImages, setEmployeeImages] = useState({});
  const [selectedBranch, setSelectedBranch] = useState("");
  const [profileData, setProfileData] = useState({});
  const [isloggedin, setIsloggedin] = useState(sessionStorage.getItem('user'));
  const [companyName, setCompanyName] = useState(''); // Initialize company name as an empty string
  const [loggedBranch, setloggedBranch] = useState([])
  const [loggedCompany, setloggedCompany] = useState([])
  const [searchQuery, setSearchQuery] = useState("");
  const [Gradebybranch , setGradebybranch] = useState([])
  const [Gradebydivision, setGradebydivision] = useState([])
  const [gradeData, setGradeData] = useState([]);
const [labelHeader, setLabelHeader] = useState("Grade"); 
const [GradebyDivision, setGradebyDivision] = useState([]);
const [selectedBranchIds, setSelectedBranchIds] = useState([]);
const [anchorEl, setAnchorEl] = useState(null);
const [touched, setTouched] = useState({});
const [isLoading, setIsLoading] = useState(true);
const [selectAll, setSelectAll] = useState(false);
const [result, setResult] = useState({});
const [error, setError] = useState(null);
const [pnCompanyId, setPnCompanyId] = useState('');
const [values, setValues] = useState({
  pnCompanyId: '', // Initialize with appropriate value
});
  // Fetch companies based on user session
  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Company WHERE company_user_id = '${isloggedin}'`,
        });
        console.log('Company Data:', companyData.data); // Log the company data
        setCompany(companyData.data);
        if (companyData.data.length > 0) {
          setPnCompanyId(companyData.data[0].pn_CompanyID); // Set the company ID
          setCompanyName(companyData.data[0].CompanyName); // Set the company name
        }
      } catch (error) {
        setError('Error fetching company data');
      }
    }
    getData();
  }, [isloggedin]);

  useEffect(() => {
    async function getData() {
      try {
        if (pnCompanyId) {
          const branchData = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT * FROM paym_branch WHERE pn_CompanyID = '${pnCompanyId}'`,
          });
          setBranch(branchData.data);
        }
      } catch (error) {
        setError('Error fetching branch data');
      }
    }
    getData();
  }, [pnCompanyId]);

  // Fetch employees based on selected branch
  const fetchEmployees = async () => {
    if (selectedBranch) {
      setIsLoading(true);
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
          WHERE paym_employee_profile1.pn_BranchID = ${selectedBranch};
        `;
        const response = await postRequest(ServerConfig.url, REPORTS, { query });
        if (response.status === 200) {
          setEmployees(response.data || []);
          await fetchEmployeeImages(response.data);
        }
      } catch (error) {
        console.error('Error fetching employees data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Fetch employee images function
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
          images[item.pn_EmployeeID] = item.image_data;
        });
        setEmployeeImages(images);
      }
    } catch (error) {
      console.error('Error fetching employee images:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [selectedBranch]);

  const getImageSrc = (imageData) => {
    return imageData ?` data:image/jpeg;base64,${imageData}` : nodata; // Use nodata image if no imageData
  };

  return (
    <div className="background1">

    <Grid >
      {/* Navbar */}
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      {/* Sidebar and Main Content */}
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row" }}>
        {/* Sidebar */}
        <Grid item xs={2}>
          <Sidenav />
        </Grid>

        {/* Main Content */}
     
        <Grid item xs={10} sx={{ padding: "60px 0 0 0", overflowY: "auto",margin:'0 auto' }}>

       
        <div className="background1">

          <Card style={{ maxWidth: 1100, width: "100%", padding:"50px"    
          }}>
            <CardContent>
            <Grid elevation={3} style={{ padding: 2, width: '970px'}}>
              <div spacing={2}  style={{justifyContent:'space-between',display:'flex'}}>
            <Typography variant="h5" align="center" fontWeight={'425'} gutterBottom textAlign={'left'}>
            Employees 
          </Typography>
          <div >
                           <Button
                            variant="contained"
                            color="primary"
                            style={{ borderRadius: "20PX" }}
                         
                            onClick={() => navigate("/PaymEmployeeFormmh1")}
                          >
                            <AddIcon />
                            Add Employee
                          </Button>
                        </div>
                        </div>

                        <Grid container spacing={2} mr={'20px'}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            label="Company"
                            value={companyName} // Use the companyName state for the value
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          {/* <FormControl fullWidth variant="outlined" margin="normal"> */}
                            <TextField
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              select
                              label="Select Branch"
                              value={selectedBranch}
                              onChange={(e) => {
                                setSelectedBranch(e.target.value);
                                fetchEmployees(); // Fetch employees when the branch changes
                              }}
                            >
                            {branch.map((branchItem) => (
      <MenuItem
        key={branchItem.pn_BranchID}
        value={branchItem.pn_BranchID}
        disabled={branchItem.BranchType !== 'Main Branch'} // Disable non-main branches
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: branchItem.BranchType === 'Main Branch' ? '#e0f7fa' : 'transparent', // Highlight main branch
          padding: '8px', // Add padding for better spacing
        }}
      >
        <span style={{ fontWeight: branchItem.BranchType === 'Main Branch' ? 'normal' : 'normal' }}>
          {branchItem.BranchName}
        </span>
        {branchItem.BranchType === 'Main Branch' && (
          <span style={{ fontSize: '0.8em', color: 'gray', marginLeft: '10px' }}>
           - Main Branch
          </span>
        )}
         {branchItem.BranchType !== 'Main Branch' && (
          <span style={{ fontSize: '0.8em', color: 'gray' }}>- Sub Branch</span> // Sub branch label
        )}
        
      </MenuItem>
    ))}
                            </TextField>
                          {/* </FormControl> */}
                        </Grid>
                        <Grid item xs={4} alignContent={'center'} >
                      <Paper style={{
                           padding:20,
                           marginBottom:1
                      }}>
                        <div  style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#f1f1f1",
                            maxWidth: 250,
                        }}>
                          <InputBase
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                          
                          />
                          <IconButton >
                            <SearchIcon />
                          </IconButton>
                        </div>
                      </Paper>
                      </Grid>

                      </Grid>

                      <TableContainer component={Paper}style={{marginTop:'20px'}}>
                        <Table>
                          <TableHead style={{backgroundColor:'#EAF9F9'}}>
                            <TableRow>
                              {/* <TableCell>Image</TableCell> */}
                              <TableCell>Employee Name</TableCell>
                              <TableCell>Employee ID</TableCell>
                              <TableCell>Branch</TableCell>
                              <TableCell>Company</TableCell>
                              <TableCell>Department</TableCell>
                              <TableCell>Designation</TableCell>
                              <TableCell>Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {isLoading ? (
                              <TableRow>
                                <TableCell colSpan={8} align="center">
                                  <CircularProgress />
                                </TableCell>
                              </TableRow>
                            ) : (
                              employees.filter(employee => 
                                employee["Employee Name"].toLowerCase().includes(searchQuery.toLowerCase())
                              ).map((employee) => (
                                <TableRow key={employee["Employee ID"]}>
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
                                  {/* <TableCell>{employee["Employee Name"]}</TableCell> */}
                                  <TableCell>{employee["Employee ID"]}</TableCell>
                                  <TableCell>{employee["Branch Name"]}</TableCell>
                                  <TableCell>{employee["Company Name"]}</TableCell>
                                  <TableCell>{employee["Department"]}</TableCell>
                                  <TableCell>{employee["Designation"]}</TableCell>
                                  <TableCell>
                                    <IconButton onClick={() => navigate(`/EditEmployeeh1/${employee["Employee ID"]}`)}>
                                      <EditIcon />
                                    </IconButton>
                                    {/* <IconButton onClick={() => handleDelete(employee["Employee ID"])}>
                                      <DeleteIcon />
                                    </IconButton> */}
                                    <IconButton onClick={() => navigate(`/Editprofileh1/${employee["Employee ID"]}`)}>
                                      <VisibilityIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>

              </Grid>
            </CardContent>
          </Card>
          </div>
        </Grid>
       

      </Grid>
    </Grid>

</div>
  );
}



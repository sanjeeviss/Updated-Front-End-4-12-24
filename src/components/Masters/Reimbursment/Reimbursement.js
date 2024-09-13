import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  Card,CardContent,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {blue, green, purple, red} from '@mui/material/colors';
import Sidenav from "../../Home Page/Sidenav";
import Navbar from "../../Home Page/Navbar";
const EmployeeReimbursement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [employees, setEmployees] = useState([
    {
      employeeName: 'Robert',
      date: '2024-10-15',
      reimbursecategoryName: 'Food Allowance',
      employeeReimburseAmount: 200,
      attachments: 'https://expensesreceipt.com/assets/img/fast-food-restaurant-template-with-itemized-food-and-tax.png?ver=1.231',
      description: 'Reimbursement for meals during business trip',
      totalAmountApproved: 0,
      status: 'Pending',
    },
    {
      employeeName: 'John',
      date: '2024-12-20',
      reimbursecategoryName: 'Travel Allowance',
      employeeReimburseAmount: 500,
      attachments: 'https://freeinvoicebuilder.com/wp-content/uploads/2022/01/TRAVEL-AGENCY-1-564x804.jpg',
      description: 'Reimbursement for travel expenses to client site',
      totalAmountApproved: 0,
      status: 'Pending',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchString = searchTerm.toLowerCase();
    return (
      employee.employeeName.toLowerCase().includes(searchString) ||
      employee.reimbursecategoryName.toLowerCase().includes(searchString) ||
      employee.employeeReimburseAmount.toString().includes(searchString) ||
      employee.status.toLowerCase().includes(searchString) ||
      employee.totalAmountApproved.toString().includes(searchString)
    );
  });

  const handleOpenDialog = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleOpenEditDialog = (employee) => {
    setEditedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditedEmployee(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeName === editedEmployee.employeeName
          ? editedEmployee
          : emp
      )
    );
    handleCloseEditDialog();
  };

  const handleEdit = (employee) => {
    handleOpenEditDialog(employee);
  };

  const handleDelete = (employee) => {
    setEmployees((prev) =>
      prev.filter((emp) => emp.employeeName !== employee.employeeName)
    );
    console.log('Delete employee:', employee);
  };

  const handleApprove = (employee) => {
    const totalAmountApproved = employee.employeeReimburseAmount;
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeName === employee.employeeName
          ? {
              ...emp,
              totalAmountApproved: totalAmountApproved,
              status: totalAmountApproved === employee.employeeReimburseAmount ? 'Approved' : 'Pending',
            }
          : emp
      )
    );
    console.log('Approve employee:', employee);
  };

  const getApproveButtonColor = (employee) => {
    return employee.totalAmountApproved === employee.employeeReimburseAmount ? green[600] : '#FFC107';
  };

  return (

    
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
          style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px" }}  
          >
    <div>
      <Typography variant="h4" gutterBottom sx={{ mb: 2, mt: 2 }}>
        Employee Reimbursement For Approvel
      </Typography>
      <Box sx={{ mb: 2, ml: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper} sx={{ width: '95%', margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reimburse Category</TableCell>
              <TableCell>Employee Reimburse Amount</TableCell>
              <TableCell>Total Amount Approved</TableCell>
              <TableCell>Status</TableCell> {/* Added Status Column */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.employeeName}>
                  <TableCell>{employee.employeeName}</TableCell>
                  <TableCell>{employee.date}</TableCell>
                  <TableCell>{employee.reimbursecategoryName}</TableCell>
                  <TableCell>{employee.employeeReimburseAmount}</TableCell>
                  <TableCell>{employee.totalAmountApproved}</TableCell>
                  <TableCell>{employee.status}</TableCell> {/* Display Status */}
                  <TableCell>
                    <Tooltip title="View">
                      <IconButton
                        onClick={() => handleOpenDialog(employee)}
                        sx={{ color: blue[400] }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleEdit(employee)}
                        sx={{ color: purple[400] }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Approve">
                      <IconButton
                        onClick={() => handleApprove(employee)}
                        sx={{ color: getApproveButtonColor(employee) }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(employee)}
                        sx={{ color: red[400] }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center"> {/* Updated colspan */}
                  {loading ? <CircularProgress /> : 'No records found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Employee Reimbursement Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedEmployee && (
              <Box>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Category Name</TableCell>
                        <TableCell>{selectedEmployee.reimbursecategoryName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Employee Reimburse Amount</TableCell>
                        <TableCell>{selectedEmployee.employeeReimburseAmount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>{selectedEmployee.date}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{selectedEmployee.description}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Amount Approved</TableCell>
                        <TableCell>{selectedEmployee.totalAmountApproved}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>{selectedEmployee.status}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box mt={2}>
                  <Typography variant="h6">Attachment</Typography>
                  <img
                    src={selectedEmployee.attachments}
                    alt="Attachment"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
              </Box>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Employee Reimbursement</DialogTitle>
        <DialogContent>
          {editedEmployee && (
            <Box>
              <TextField
                margin="dense"
                label="Employee Name"
                name="employeeName"
                value={editedEmployee.employeeName}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Date"
                name="date"
                type="date"
                value={editedEmployee.date}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                margin="dense"
                label="Reimburse Category"
                name="reimbursecategoryName"
                value={editedEmployee.reimbursecategoryName}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Employee Reimburse Amount"
                name="employeeReimburseAmount"
                type="number"
                value={editedEmployee.employeeReimburseAmount}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Description"
                name="description"
                value={editedEmployee.description}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Total Amount Approved"
                name="totalAmountApproved"
                type="number"
                value={editedEmployee.totalAmountApproved}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                label="Status"
                name="status"
                value={editedEmployee.status}
                onChange={handleEditChange}
                fullWidth
                variant="outlined"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  
  </Grid>
  </Box>
  </div>
  </Grid>

  );
};

export default EmployeeReimbursement;
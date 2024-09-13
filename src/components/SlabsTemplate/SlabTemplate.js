import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Container, Button, Box, TextField, ToggleButton, ToggleButtonGroup, TableHead, Table, TableBody, TableRow, Paper, TableCell, TableContainer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../Home Page/Sidenav';
import Navbar from '../Home Page/Navbar';
import SpreadGrid from 'react-spread-grid';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@material-ui/core';


const RootContainer = styled(Container)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
}));

const CustomButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: 'none',
    color: 'white',
}));

const ToggleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    width: '100%', // Ensure container takes full width
}));

const TextFieldGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const AddButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
}));

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.Mui-selected': {
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
    },
    flex: 1, // Make each button take equal space
    textAlign: 'center', // Center the text
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: 'flex',
    flex: 1, // Make sure the group takes full space of the container
    justifyContent: 'space-between', // Space out the buttons
}));

const initialRows = [
  { id: 1, monthlyIncome: '', annualBasis: '', halfYearlyBasis: '' },
]; 

const ApplySection = () => {
  const [rows, setRows] = useState(initialRows);
  const [editCell, setEditCell] = useState({ id: null, column: '' });
  const [isEditable, setIsEditable] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const checkIfAllRowsFilled = () => {
    return rows.every(row => row.monthlyIncome && row.annualBasis && row.halfYearlyBasis);
  };

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, monthlyIncome: '', annualBasis: '', halfYearlyBasis: '' }]);
    setIsEditEnabled(true); // Enable the edit button when a new row is added
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
    if (rows.length <= 1) { // Disable the edit button if there's only one row left
      setIsEditEnabled(false);
    }
  };

  const handleChange = (id, column, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [column]: value } : row));
    // Update the edit button status
    setIsEditEnabled(checkIfAllRowsFilled());
  };

  const handleClick = (id, column) => {
    if (isEditable) {
      setEditCell({ id, column });
    }
  };

  const handleBlur = () => {
    setEditCell({ id: null, column: '' });
  };

  const handleKeyPress = (e, id, column) => {
    if (e.key === 'Enter') {
      handleChange(id, column, e.target.innerText);
      handleBlur();
    }
  };

  const handleSave = () => {
    setIsEditable(false);
    setIsEditEnabled(true); // Enable the edit button after saving
  };

  const handleEdit = () => {
    setIsEditable(true);
    setIsEditEnabled(false); // Disable the edit button while editing
  };

  return (
    <div>
      <TableContainer component={Paper} style={{ maxWidth: '80%', overflowX: 'auto', margin: '0 auto' }}>
        <Table style={{ borderCollapse: 'collapse', border: '2px solid black', fontSize: '0.875rem' }}>
          <TableHead>
            <TableRow>
              <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', height: '48px', width: 'auto' }}
              >
                <strong>Average Monthly Income</strong>
              </TableCell>
              <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', height: '48px', width: 'auto' }}
              >
                <strong>Annual Basis</strong>
              </TableCell>
              <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', height: '48px', width: 'auto' }}
              >
                <strong>Half-Yearly Basis</strong>
              </TableCell>
              <TableCell
                style={{ border: '2px solid black', padding: '4px', height: '48px', width: 'auto' }}
              >
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell
                  style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', height: '48px' }}
                  onClick={() => handleClick(row.id, 'monthlyIncome')}
                  contentEditable={isEditable && editCell.id === row.id && editCell.column === 'monthlyIncome'}
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, row.id, 'monthlyIncome')}
                >
                  {row.monthlyIncome || ' '}
                </TableCell>
                <TableCell
                  style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', height: '48px' }}
                  onClick={() => handleClick(row.id, 'annualBasis')}
                  contentEditable={isEditable && editCell.id === row.id && editCell.column === 'annualBasis'}
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, row.id, 'annualBasis')}
                >
                  {row.annualBasis || ' '}
                </TableCell>
                <TableCell
                  style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', height: '48px' }}
                  onClick={() => handleClick(row.id, 'halfYearlyBasis')}
                  contentEditable={isEditable && editCell.id === row.id && editCell.column === 'halfYearlyBasis'}
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, row.id, 'halfYearlyBasis')}
                >
                  {row.halfYearlyBasis || ' '}
                </TableCell>
                <TableCell
                  style={{ border: '2px solid black', padding: '4px', height: '48px' }}
                >
                  <IconButton onClick={() => handleDeleteRow(row.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: 20, textAlign: 'right' }}>
        {isEditable ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="secondary" disabled>
            Saved
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleAddRow} style={{ marginLeft: 10 }}>
          Add Row
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEdit}
          disabled={!isEditEnabled || isEditable}
          style={{ marginLeft: 10 }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
const Overtime = () => {
    const [rows, setRows] = useState(initialRows);
  const [editCell, setEditCell] = useState({ id: null, column: '' });
  const [isEditable, setIsEditable] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const checkIfAllRowsFilled = () => {
    return rows.every(row => row.monthlyIncome && row.annualBasis && row.halfYearlyBasis);
  };

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, monthlyIncome: '', annualBasis: '', halfYearlyBasis: '' }]);
    setIsEditEnabled(true); // Enable the edit button when a new row is added
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
    if (rows.length <= 1) { // Disable the edit button if there's only one row left
      setIsEditEnabled(false);
    }
  };

  const handleChange = (id, column, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [column]: value } : row));
    // Update the edit button status
    setIsEditEnabled(checkIfAllRowsFilled());
  };

  const handleClick = (id, column) => {
    if (isEditable) {
      setEditCell({ id, column });
    }
  };

  const handleBlur = () => {
    setEditCell({ id: null, column: '' });
  };

  const handleKeyPress = (e, id, column) => {
    if (e.key === 'Enter') {
      handleChange(id, column, e.target.innerText);
      handleBlur();
    }
  };

  const handleSave = () => {
    setIsEditable(false);
    setIsEditEnabled(true); // Enable the edit button after saving
  };

  const handleEdit = () => {
    setIsEditable(true);
    setIsEditEnabled(false); // Disable the edit button while editing
  };



   
    return (
        <div>
        <TableContainer component={Paper} style={{ maxWidth: '80%', overflowX: 'auto', margin: '0 auto' }}>
          <Table style={{ borderCollapse: 'collapse', border: '2px solid black', fontSize: '0.875rem' }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}><strong>Average Monthly Income</strong></TableCell>
                <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}><strong>Annual Basis</strong></TableCell>
                <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}><strong>Half-Yearly Basis</strong></TableCell>
                <TableCell style={{ border: '2px solid black', padding: '8px' }}><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}
                    onClick={() => handleClick(row.id, 'monthlyIncome')}
                    contentEditable={isEditable && editCell.id === row.id && editCell.column === 'monthlyIncome'}
                    suppressContentEditableWarning
                    onBlur={handleBlur}
                    onKeyPress={(e) => handleKeyPress(e, row.id, 'monthlyIncome')}
                  >
                    {row.monthlyIncome || ' '}
                  </TableCell>
                  <TableCell
                    style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}
                    onClick={() => handleClick(row.id, 'annualBasis')}
                    contentEditable={isEditable && editCell.id === row.id && editCell.column === 'annualBasis'}
                    suppressContentEditableWarning
                    onBlur={handleBlur}
                    onKeyPress={(e) => handleKeyPress(e, row.id, 'annualBasis')}
                  >
                    {row.annualBasis || ' '}
                  </TableCell>
                  <TableCell
                    style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}
                    onClick={() => handleClick(row.id, 'halfYearlyBasis')}
                    contentEditable={isEditable && editCell.id === row.id && editCell.column === 'halfYearlyBasis'}
                    suppressContentEditableWarning
                    onBlur={handleBlur}
                    onKeyPress={(e) => handleKeyPress(e, row.id, 'halfYearlyBasis')}
                  >
                    {row.halfYearlyBasis || ' '}
                  </TableCell>
                  <TableCell style={{ border: '2px solid black', padding: '8px' }}>
                    <IconButton onClick={() => handleDeleteRow(row.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          {isEditable ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="secondary" disabled>
              Saved
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={handleAddRow} style={{ marginLeft: 10 }}>
            Add Row
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEdit}
            disabled={!isEditEnabled || isEditable}
            style={{ marginLeft: 10 }}
          >
            Edit
          </Button>
        </div>
      </div>
    );
};

const sampleTables = {
    apply: <ApplySection />,
    pending: <Overtime/>,
    history: (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>History ID</TableCell>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>Date</TableCell>
                        <TableCell align='center'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" align='center'>
                            1
                        </TableCell>
                        <TableCell align='center'>Bob Johnson</TableCell>
                        <TableCell align='center'>2024-07-29</TableCell>
                        <TableCell align='center'>Rejected</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    ),
    AttBonus: (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>History ID</TableCell>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>Date</TableCell>
                        <TableCell align='center'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" align='center'>
                            1
                        </TableCell>
                        <TableCell align='center'>Bob Johnson</TableCell>
                        <TableCell align='center'>2024-07-29</TableCell>
                        <TableCell align='center'>Rejected</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    ),
};

const SlabTemplate = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('pending');

    const handleToggle = (event, newSelected) => {
        if (newSelected !== null) {
            setSelected(newSelected);
        }
    };

    return (
        <Grid container>
            {/* Navbar and Sidebar */}
            <Grid item xs={12}>
                <div style={{ backgroundColor: '#fff' }}>
                    <Navbar />
                    <Box height={30} />
                    <Box sx={{ display: 'flex' }}>
                        <Sidenav />
                        <Grid item xs={12} sm={10} md={9} lg={8} xl={7} sx={{ marginLeft: 'auto', marginRight: 'auto', margin: '100px 50px 50px 50px' }}>
                            <RootContainer maxWidth="lg">
                                <TitleTypography variant="h4" gutterBottom>
                                    We've got it sorted for you!
                                </TitleTypography>
                                <Typography variant="body1" gutterBottom>   
                                    This is a Slab Section.. Here you can predefine some of the details and use it later in the setup section..
                                </Typography>
                                <ToggleContainer>
    <StyledToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleToggle}
        aria-label="text alignment"
    >
        <CustomToggleButton value="apply" aria-label="apply">
            Professional Tax
        </CustomToggleButton>
        <CustomToggleButton value="pending" aria-label="pending">
            OverTime
        </CustomToggleButton>
        <CustomToggleButton value="history" aria-label="history">
            Income Tax
        </CustomToggleButton>
        <CustomToggleButton value="AttBonus" aria-label="AttBonus">
            Attendance Bonus
        </CustomToggleButton>
    </StyledToggleButtonGroup>
</ToggleContainer>
                                {sampleTables[selected]}
                            </RootContainer>
                        </Grid>
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
};

export default SlabTemplate;

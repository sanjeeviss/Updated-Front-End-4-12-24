import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Paper, Typography, Grid, Box, TextField, Button, Select, InputLabel, FormControl, MenuItem, Snackbar, Alert, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import {  postRequest } from '../../../serverconfiguration/requestcomp';
import { REPORTS, SAVE } from '../../../serverconfiguration/controllers';


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  
  '& .MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #ddd',
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#D3D3D3',
    color: '#000000',
  },
  '& .MuiTablePagination-selectLabel': {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
    flexShrink: 0,
  },
  '& p': {
    marginTop: 0,
    marginBottom: '0rem',
  },
  '& .MuiDataGrid-main': {
    position: 'relative', // Ensures internal elements can be positioned relatively
  },
  '& .MuiDataGrid-scrollArea--left': {
    width: '150px', // Adjust to your preference to show on the left
  },
  '& .MuiDataGrid-scrollbar--horizontal': {
    backgroundColor: '#f0f0f0', // Style the scrollbar
    '& .MuiDataGrid-scrollbarContent': {
      backgroundColor: '#aaa', // Thumb color
    },
    left: 0, // Align scrollbar to the left
    width: '150px', // Restrict width to keep it on the left side
  },
  '& .MuiDataGrid-virtualScroller': {
    overflowX: 'scroll', // Ensures the horizontal scrollbar appears when needed
  },
  
}));

function EarnDeductValueMasters() {

  const[branch, setBranch] = useState([])
  const[employee, setEmployee] = useState([])
  const[isloggedin, setisloggedin]= useState(sessionStorage.getItem("user"))
  const [Earndeduct, setEarndeduct] = useState([])
  const [allowanceValues, setAllowanceValues] = useState({});
  const [deductionValues, setDeductionValues] = useState({});
  const [selectedCTC, setSelectedCTC] = useState('');
  const [selectedValueType, setSelectedValueType] = useState('Percentage');
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [fetcheddata, setfetcheddata] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0
  });
  const [hasStartedTyping, setHasStartedTyping] = useState(false);


  const SnackbarWrapper = styled('div')({
    position: 'fixed',
    top: -7, // Adjust the value to move it further up
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    zIndex: 1300,
  });
  
 
  useEffect(() => {
    async function fetchData() {
        try {
            // Fetch Branch Data
            const BranchData = await postRequest(ServerConfig.url, REPORTS, {
                query: `select * from paym_Branch where Branch_User_Id = '${isloggedin}'`
            });
            console.log("Branch data", BranchData.data);
            setBranch(BranchData.data);

            if (BranchData.data.length > 0) {
                const branchID = BranchData.data[0].pn_BranchID;

                // Fetch Employee Data
                const EmployeeData = await postRequest(ServerConfig.url, REPORTS, {
                    query: `select * from paym_employee where pn_BranchID = '${branchID}'`
                });
                console.log("Employee data", EmployeeData.data);
                setEmployee(EmployeeData.data);

                // Fetch EarnDeduct Data
                const EarnDeductData = await postRequest(ServerConfig.url, REPORTS, {
                    query: `select * from EarnDeductMasters where pn_BranchID = '${branchID}'`
                });
                console.log("EarnDeduct data", EarnDeductData.data);
                setEarndeduct(EarnDeductData.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchData();
}, [isloggedin]); 

const getUniqueCTCValues = (employees) => {
  const uniqueCTCs = new Set();
  return employees.filter(e => {
    if (uniqueCTCs.has(e.CTC)) {
      return false;
    }
    uniqueCTCs.add(e.CTC);
    return true;
  });
};



const uniqueEmployees = getUniqueCTCValues(employee);

const columnOrder = ['Employee_Full_Name', 'CTC', 'Allowance1', 'value1', 'Allowance2', 'value2',  'Allowance3', 'value3',  'Allowance4', 'value4', , 'Allowance5', 'value5',  'Allowance6', 'value6', , 'Allowance7', 'value7', , 'Allowance8', 'value8', , 'Allowance9', 'value9', 'Allowance10', 'value10', 
'Deduction1','valueA1','Deduction2','valueA2','Deduction3','valueA3','Deduction4','valueA4','Deduction5','valueA5',
'Deduction6','valueA6','Deduction7','valueA7','Deduction8','valueA8','Deduction9','valueA9','Deduction10','valueA10'

];


const generateColumnsFromFilteredData = (filteredData) => {
  if (filteredData.length === 0) return [];

  const firstRow = filteredData[0];
  const extraColumns = Object.keys(firstRow).filter(key => !columnOrder.includes(key));

  const columns = [
    ...columnOrder.filter((key) => key in firstRow).map((key) => ({
      field: key,
      headerName: key,
      minWidth: 150, headerAlign: 'center', align: 'center',
    })),
    // ...extraColumns.map((key) => ({
    //   field: key,
    //   headerName: key,
    //   minWidth: 150, headerAlign: 'center', align: 'center',
    // }))
  ];

  return columns;
};


const fetch_Ed_data = async () => {
  if (!selectedCTC) return;

  try {
    const data = await postRequest(ServerConfig.url, REPORTS, {
      query: `SELECT ED.*, EDV.*, PE.Employee_Full_Name
FROM EarnDeductMasters ED
INNER JOIN EarnDeductValuesMasters EDV
    ON ED.pn_BranchID = EDV.pn_BranchID
    AND ED.pn_CompanyID = EDV.pn_CompanyID
INNER JOIN paym_Employee PE
    ON EDV.pn_EmployeeID = PE.pn_EmployeeID
WHERE EDV.CTC = ${selectedCTC}
    AND ED.pn_CompanyID = ${branch[0].pn_CompanyID}
    AND ED.pn_BranchID = ${branch[0].pn_BranchID}
`,
    });

    const filteredData = data.data.map((row) => {
      return Object.fromEntries(
        Object.entries(row).filter(([key, value]) => value !== "null" && JSON.stringify(value) !== "{}")
      );
    });

    const dynamicColumns = generateColumnsFromFilteredData(filteredData);

    setfetcheddata(filteredData);
    setColumns(dynamicColumns);
    
  } catch (error) {
    console.error('Error fetching EarnDeduct data:', error);
    setfetcheddata([]); // Ensure no data is set
  }
};


// Ensure columns are set in state
const [columns, setColumns] = useState([]);

// For rows, add 'id' to each row for DataGrid usage
const rowsWithId = fetcheddata.map((row, index) => ({
  ...row,
  id: index, // or use a unique field like pn_EmployeeID
}));




const handlesave = () => {
  console.log("Selected Value Type:", selectedValueType);
  console.log("Selected CTC:", selectedCTC);
  console.log("Allowances:", allowanceValues);
  console.log("Deductions:", deductionValues);

  // Function to map values or return 'NULL' if not available
  const getValue = (obj, key) => obj[key] || 'NULL';

  // Prepare allowance values (value1 to value10)
  const allowanceInsertValues = [];
  for (let i = 1; i <= 10; i++) {
      allowanceInsertValues.push(getValue(allowanceValues, `Allowance${i}`));
  }

  // Prepare deduction values (valueA1 to valueA10)
  const deductionInsertValues = [];
  for (let i = 1; i <= 10; i++) {
      deductionInsertValues.push(getValue(deductionValues, `Deduction${i}`));
  }

  // Combine allowance and deduction values for the query
  const allValues = [...allowanceInsertValues, ...deductionInsertValues].join(",");

  postRequest(ServerConfig.url, SAVE, {
      query: `INSERT INTO [dbo].[EarnDeductValuesMasters]
      ([pn_CompanyID], [pn_BranchID], [pn_EmployeeID], [ValueType], [CTC], 
      [value1], [value2], [value3], [value4], [value5], [value6], [value7], [value8], [value9], [value10], 
      [valueA1], [valueA2], [valueA3], [valueA4], [valueA5], [valueA6], [valueA7], [valueA8], [valueA9], [valueA10])
      SELECT ${branch[0].pn_CompanyID}, ${branch[0].pn_BranchID},  pn_EmployeeID, '${selectedValueType}', ${selectedCTC}, ${allValues} FROM paym_employee
      WHERE ctc = ${selectedCTC}` 
  })
  .then((response) => {
      // If the post request is successful
      setSnackbarMessage(`Values saved successfully for ${selectedCTC} CTC!`);
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      fetch_Ed_data();
  })
  .catch((error) => {
      // Handle the error
      setSnackbarMessage('Failed to save values.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
  });
};

useEffect(() => {
fetch_Ed_data();
}, [selectedCTC]);


return (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Paper elevation={3} style={{ width: '1000px', padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Earndeduct Values Master
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
       

        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <InputLabel htmlFor="CTC" style={{ position: 'relative', top: '3px', left: '0px' }}>
              Choose Employee CTC
            </InputLabel>
          </Grid>
          <Grid item>
            <FormControl fullWidth style={{ width: '200px' }}>
              <Select
                native
                id="CTC"
                name="CTC"
                style={{ height: '50px', width: '100%', padding: '10px' }}
                value={selectedCTC}
                onChange={(e) => {
                  setSelectedCTC(e.target.value);
                }}
              >
                <option value="">Select</option>
                {uniqueEmployees.map((e) => (
                  <option key={e.CTC} value={e.CTC}>
                    {e.CTC} CTC
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {hasStartedTyping && !selectedCTC && (
  <Typography variant="body1" color="error" sx={{textAlign: 'left', marginTop: '5px'}}>
    Please select a CTC values.
  </Typography>
)}

        {fetcheddata.length > 0 ? (
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h6' marginTop="20px" sx={{ textAlign: 'left' }} gutterBottom>
                Data Grid with Fetched Values
              </Typography>
              <Typography marginTop="20px" sx={{ textAlign: 'left' }} gutterBottom>
  Values are in {fetcheddata[0].ValueType === 'Percentage' ? 'percentage (%)' : 'fixed amount (₹)'}
</Typography>

              <div style={{ height: 500, width: '100%', overflowY: 'auto' }}>
  <StyledDataGrid
    autoHeight
    rows={rowsWithId}
    columns={columns}
    paginationModel={paginationModel}
    onPaginationModelChange={setPaginationModel}
    pageSizeOptions={[10, 50, 100]}
    sx={{marginTop: "10px"}}
 
  />
</div>
            </Grid>
          </Grid>
        ) : (
          <div style={{ marginTop: '20px' }}>
            {/* <Typography variant="body1">No data available for the selected CTC. Please enter values.</Typography> */}
            <Grid container alignItems="center" spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item>
            <FormLabel id="demo-row-radio-buttons-group-label">Choose Value Type:</FormLabel>
          </Grid>
          <Grid item>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedValueType}
                onChange={(e) => setSelectedValueType(e.target.value)}
              >
                <FormControlLabel value="Percentage" control={<Radio />} label="In Percentage %" />
                <FormControlLabel value="Amount" control={<Radio />} label="In Amount" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
            <Grid container alignItems="center" spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={6} display="flex" flexDirection="column" alignItems="center">
  
  {Earndeduct && Earndeduct[0] ? (
    Object.keys(Earndeduct[0])
      .filter(key => key.startsWith('Allowance') && !key.endsWith('PRB') && Earndeduct[0][key] !== "null")
      .map((key, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <Box width="150px" mr={2}>
            <Typography variant="body1">
              {Earndeduct[0][key]}
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            size="small"
            type='number'
            placeholder="Enter value"
            onChange={(e) => {
              setHasStartedTyping(true); // Track that user has started typing
              const { value } = e.target;
              setAllowanceValues(prev => ({
                ...prev,
                [key]: value
              }));
            }}
          />
        </Box>
      ))
  ) : (
    <Typography variant="body1">No allowances available</Typography>
  )}
</Grid>


              <Grid item xs={6} display="flex" flexDirection="column" alignItems="flex-start">
                {Earndeduct && Earndeduct[0] ? (
                  Object.keys(Earndeduct[0])
                    .filter(key => key.startsWith('Deduction') && !key.endsWith('PRB') && Earndeduct[0][key] !== "null")
                    .map((key, index) => (
                      <Box key={index} display="flex" alignItems="center" mb={1}>
                        <Box width="150px" mr={2}>
                          <Typography variant="body1">
                            {Earndeduct[0][key]}
                          </Typography>
                        </Box>
                        <TextField
                          variant="outlined"
                          size="small"
                          type='number'
                          placeholder="Enter value"
                          onChange={(e) => {
                            const { value } = e.target;
                            setDeductionValues(prev => ({
                              ...prev,
                              [key]: value
                            }));
                          }}
                        />
                      </Box>
                    ))
                ) : (
                  <Typography variant="body1">No deductions available</Typography>
                )}
              </Grid>
            </Grid>
            <Grid container display="flex" justifyContent="center">
              <Button variant='contained' size='small' sx={{ marginTop: "10px" }} onClick={handlesave}>
                Save
              </Button>
            </Grid>
          </div>
        )}
      </div>
    </Paper>
    <SnackbarWrapper aria-hidden="false">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        action={
          <Button color="inherit" onClick={() => setOpenSnackbar(false)}>
            Close
          </Button>
        }
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert  onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarWrapper>
  </div>
);

}

export default EarnDeductValueMasters
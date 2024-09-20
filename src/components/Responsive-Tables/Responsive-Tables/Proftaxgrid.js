import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { postRequest, getRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { useEffect, useState } from 'react';
import { PAYMCATEGORY, SAVE, REPORTS } from '../../../serverconfiguration/controllers';
import {Grid} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; 
import EditableCell from './EditableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



// Styled DataGrid component
const StyledDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#D3D3D3',
    color: '#000000',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none', // Remove the default focus outline
  },
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none', // Remove the default focus outline for column headers
  },
  '& .MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
    '&:focus': {
      outline: 'none',
    }
  },
  '& .MuiDataGrid-cell:focus-within': {
    outline: 'none',
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
  }
});



// Initial rows
const initialRows = [
  { id: 1, LowerLimit: '0.00', UpperLimit: '', AnnualBasis: '', HalfYearly: '', MonthlyAmount: '' },
];


// Main PtGrid component
export default function PtGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0
  });
  const [isEditable, setIsEditable] = React.useState(true);
  const [Category, setcategory] = useState([])
  const [State, setState] = useState("")
  const [retrievedRows, setRetrievedRows] = useState([]);
  const [showFirstGrid, setShowFirstGrid] = useState(true);
  const [Branch, setbranch] = useState([])
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRows, setEditedRows] = useState({});
  const [editableRetrievedRowId, setEditableRetrievedRowId] = useState(null);
  const [isRetrievedGridEditable, setIsRetrievedGridEditable] = useState(false);



  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCATEGORY);
      setcategory(data.data);
      const data1 = await postRequest(ServerConfig.url, REPORTS, {
        "query" : `select * from paym_Branch where Branch_User_Id = '${isloggedin}'`
      })
      setbranch(data1.data)
      console.log("data", data1)
      if (data1.data.length > 0) {
        const defaultCategory = data1.data[0].State;
        setState(defaultCategory);
        fetchdata(defaultCategory);
      }
    } 
    getData();
    console.log("Branch", Branch)
  }, []);

  // Custom cell renderer for the UpperLimit column
  const CustomCell = React.forwardRef((params, ref) => {
    const [textValue, setTextValue] = React.useState(params.value || '');
    const [dropdownValue, setDropdownValue] = React.useState('');
    const inputRef = React.useRef(null);  
  const cursorPositionRef = React.useRef(null); 
  
    // Function to handle text changes
    const handleTextChange = React.useCallback((event) => {  
      if (isEditable) {  
       const input = event.target;  
       const newValue = input.value;  
       const cursorPosition = input.selectionStart;  
     
       // Add .00 logic if applicable  
       let updatedValue = newValue;  
       if (!isNaN(newValue) && newValue.indexOf('.') === -1) {  
         updatedValue = `${newValue}.00`;  
       }  
     
       // Update the value state without losing the cursor position  
       setTextValue(updatedValue);  
     
       // Store the cursor position  
       cursorPositionRef.current = cursorPosition;  
     
       // Restore cursor position after re-render  
       setTimeout(() => {  
        if (inputRef.current) {  
         inputRef.current.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);  
        }  
      }, 0);
     
       // Use debounce to reduce unnecessary updates  
       debounceUpdateCell(params, updatedValue);  
      }  
     }, [isEditable, params, inputRef]);
  
    // Function to handle dropdown changes
    const handleDropdownChange = (event) => {
      if (isEditable) {
        const selectedValue = event.target.value;
        const newValue = selectedValue === 'Upwards' ? 'Upwards' : '';
        setDropdownValue(newValue);
        params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
        handleProcessRowUpdate({ ...params.row, [params.field]: newValue });
      }
    };
  
    
    const debounceUpdateCell = React.useCallback(
      debounce((params, value) => {
        params.api.setEditCellValue({ id: params.id, field: params.field, value });
        handleProcessRowUpdate({ ...params.row, [params.field]: value });
      }, 1500), // Adjust the debounce time as needed
      []
    );
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <TextField
          value={textValue}
          onChange={handleTextChange}
          variant="outlined"
          size="small"
          style={{ flex: 1, marginRight: 8 }}
          inputRef={inputRef} // Attach the ref to the input
          disabled={!isEditable}
          onFocus={(e) => e.stopPropagation()} // Prevent losing focus by stopping event bubbling
        />
        <Select
          value={dropdownValue}
          onChange={handleDropdownChange}
          size="small"
          style={{ width: 30, height: 30 }}
          disabled={!isEditable}
        >
          <MenuItem value="Upwards">Upwards</MenuItem>
        </Select>
      </div>
    );
  });
  

// Utility function to debounce updates (can be placed in a utility file)
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

  
const AnnualBasisCell = React.forwardRef((params, ref) => {
  const [textValue, setTextValue] = React.useState(params.value || '');
  const inputRef = React.useRef(null); // Ref to manage input focus

  // Debounce function to handle updates without too many renders
  const debounceUpdateCell = React.useCallback(
    debounce((params, value) => {
      params.api.setEditCellValue({ id: params.id, field: params.field, value });
      handleProcessRowUpdate({ ...params.row, AnnualBasis: value });
    }, 1500),
    []
  );

  // Handle text changes
  const handleTextChange = (event) => {
    if (isEditable) {
      const input = event.target;
      let newValue = input.value;
      const cursorPosition = input.selectionStart; // Save the cursor position

      // Add .00 logic if applicable
      if (!isNaN(newValue) && newValue.indexOf('.') === -1) {
        newValue = `${newValue}.00`;
      }

      setTextValue(newValue); // Update the text field value

      // Use debounce to delay cell update
      debounceUpdateCell(params, newValue);

      // Restore cursor position after state update
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
    }
  };

  React.useEffect(() => {
    // Only set focus when manually triggered, not automatically
    if (inputRef.current && document.activeElement === inputRef.current) {
      inputRef.current.focus(); // Ensure input is focused
      inputRef.current.setSelectionRange(inputRef.current.selectionStart, inputRef.current.selectionEnd);
    }
  }, [textValue]);

  return (
    <TextField
      value={textValue}
      onChange={handleTextChange}
      variant="outlined"
      size="small"
      style={{ width: '100%' }}
      inputRef={inputRef} // Attach the ref to the TextField
      disabled={!isEditable}
      onFocus={(e) => e.stopPropagation()} // Prevent losing focus by stopping event bubbling
    />
  );
});


// Utility function to debounce updates (can be placed in a utility file)
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}


  const calculateAndSetBasisValues = (newRow) => {
    const annualBasisValue = parseFloat(newRow.AnnualBasis);
    if (!isNaN(annualBasisValue)) {
      newRow.HalfYearly = (annualBasisValue / 2).toFixed(2);
      newRow.MonthlyAmount = (annualBasisValue / 12).toFixed(2);
    } else {
      // Reset if AnnualBasis is not valid
      newRow.HalfYearly = '';
      newRow.MonthlyAmount = '';
    }
    return newRow;
  };

  // Handle row updates
  const handleProcessRowUpdate = React.useCallback((newRow) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === newRow.id) {
          // Calculate and update based on new values
          const updatedRow = calculateAndSetBasisValues(newRow);
          return { ...row, ...updatedRow };
        }
        return row;
      });
  
      console.log('Updated Rows:', updatedRows);
      return updatedRows;
    });
  
    return newRow;
  }, [setRows]);
  
  
  

 
  const addRow = () => {
    // Check if there are no rows and set it to initialRows
    if (rows.length === 0) {
      setRows(initialRows);
      return;
    }
  
    // Find the previous row
    const previousRow = rows[rows.length - 1];
  
    // Calculate the new LowerLimit
    let newLowerLimit = '';
    if (previousRow && previousRow.UpperLimit) {
      // Convert UpperLimit to a number and add 1
      const upperLimitValue = parseFloat(previousRow.UpperLimit);
      if (!isNaN(upperLimitValue)) {
        newLowerLimit = (upperLimitValue + 1).toFixed(2);
      }
    }
  
    // Log the previous row details
    console.log('Previous Row:', previousRow);
  
    // Create the new row
    const newRow = {
      id: rows.length + 1,
      LowerLimit: newLowerLimit,
      UpperLimit: '',
      AnnualBasis: '',
      HalfYearly: '',
      MonthlyAmount: ''
    };
  
    // Add the new row to the rows array
    setRows((prevRows) => [...prevRows, newRow]);
  };
  
  const handleDelete = (id) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== id);
      console.log('Rows after deletion:', updatedRows);
      return updatedRows;
    });
  };
  
  
  
  const handleSave = async () => {
    try {
      // Prepare the formatted rows
      const formattedRows = rows.map(row => 
        `(${Branch[0].pn_CompanyID}, ${Branch[0].pn_BranchID}, '${State}', ${row.id}, ${row.LowerLimit}, '${row.UpperLimit}', ${row.AnnualBasis}, ${row.HalfYearly}, ${row.MonthlyAmount})`
      ).join(',');
  
      // Construct the SQL query
      const query = `INSERT INTO [dbo].[Professional_Tax] ([pn_companyid],[pn_branchid],[State],[SlabID],[Lower_limit],[Upper_limit],[Annual_basis],[Half_yearly],[Monthly_Amount]) VALUES ${formattedRows}`;
  
      // Log the query for debugging
      console.log("Query:", JSON.stringify({ query }));
  
      // Set the table to non-editable
      setIsEditable(false);
  
      // Execute the post request
      const response = await postRequest(ServerConfig.url, SAVE, { query });
  
      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        confirmAlert({
          title: `Data Saved Successfully for ${State}`,
          message: 'Your data has been saved successfully.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                setShowFirstGrid(false); 
                fetchdata(State);
                setRows(initialRows)
                setIsEditable(true)
              }
            }
          ]
        });
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      // Handle errors
      console.error('Error saving data:', error);
      alert('An error occurred while saving data');
    }
  };

  const fetchdata = (selectedCategory) => {
    postRequest(ServerConfig.url, REPORTS, {
      "query": `select SlabID, State, Lower_limit, Upper_limit, Annual_basis, Half_yearly, Monthly_Amount from Professional_Tax where State = '${selectedCategory}'`
    })
    .then(response => {
      console.log("Fetched data for selected category:", response.data);
      const formattedData = response.data.map(row => ({
        id: row.SlabID,
        State: row.State,
        LowerLimit: row.Lower_limit, 
        UpperLimit: row.Upper_limit, 
        AnnualBasis: row.Annual_basis,
        HalfYearly: row.Half_yearly,
        MonthlyAmount: row.Monthly_Amount
      }));
      setRetrievedRows(formattedData);
      setShowFirstGrid(formattedData.length === 0); // Show the first grid if no data is found
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setRetrievedRows([]);
      setShowFirstGrid(true); // Ensure the first grid is shown on error
    });
  };

  const handleEdit = () => {
    setIsEditable(true);
  }
  
  

  const handleDeleteRetrievedRow = (id) => {
    const deletedRow = retrievedRows.find((row) => row.id === id);
    const query = `DELETE FROM Professional_Tax WHERE SlabID = ${id} and State = '${deletedRow.State}'`;
    postRequest(ServerConfig.url, SAVE, { query })
      .then((response) => {
        if (response.status === 200) {
          console.log("Row deleted successfully");
          const updatedRetrievedRows = retrievedRows.filter((row) => row.id !== id);
          setRetrievedRows(updatedRetrievedRows);
          if (updatedRetrievedRows.length === 0) {
            setShowFirstGrid(true);
          }
        } else {
          console.error("Error deleting row");
        }
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  const handleEditRetrievedRow = (id) => {
    console.log(`Editing row with ID: ${id}`);
    setEditableRetrievedRowId(id);
    setIsRetrievedGridEditable(true);
};

const handlesaveretrievedrow = () => {
  setEditableRetrievedRowId(null);
  setIsRetrievedGridEditable(false);
};

const fieldToColumnMap = {
  State: 'State',
  LowerLimit: 'Lower_limit',
  UpperLimit: 'Upper_limit',
  AnnualBasis: 'Annual_basis', // Ensure this matches the exact field name
  HalfYearly: 'Half_yearly',
  MonthlyAmount: 'Monthly_Amount'
};

const handleRowUpdateForRetrievedGrid = (id, field, value) => {
  // Debugging log to see what field is being passed
  console.log("Updating field:", field);

  // Update local state
  setEditedRows(prevEditedRows => ({
    ...prevEditedRows,
    [id]: {
      ...prevEditedRows[id],
      [field]: value,
    },
  }));

  // Fetch the specific row data to prepare for the update query
  const updatedRow = retrievedRows.find(row => row.id === id);
  if (updatedRow) {
    // Use the mapping to get the correct database column name
    const columnName = fieldToColumnMap[field];

    // Debugging log to check the column name mapping
    console.log("Mapped column name:", columnName);

    // Check if columnName is undefined
    if (!columnName) {
      console.error(`No matching column name found for field: ${field}`);
      return;
    }

    // Build the update query
    const query = `
      UPDATE Professional_Tax
      SET ${columnName} = '${value}'
      WHERE SlabID = ${id}
      AND State = '${updatedRow.State}'`;

    // Execute the update query
    postRequest(ServerConfig.url, SAVE, { query })
      .then(response => {
        if (response.status === 200) {
          console.log("Cell updated successfully");
          // Optionally, fetch the updated data if you want to ensure consistency
          fetchdata(updatedRow.State); // Refresh data for the category
        } else {
          console.error("Error updating cell");
        }
      })
      .catch(error => {
        console.error("Error updating cell:", error);
      });
  }
};
  
  
  const columns = [
    { field: 'LowerLimit', headerName: 'Lower Limit (Rs.)',  flex: 1, minWidth: 150, editable: isEditable, headerAlign: 'center', align: 'center', renderCell: (params) => { const formattedValue = parseFloat(params.value).toFixed(2); return <div>{formattedValue}</div>; } },
    { field: 'UpperLimit', headerName: 'Upper Limit (Rs.)', flex: 1, minWidth: 150, editable: false, headerAlign: 'center', align: 'center',renderCell: (params) => <CustomCell {...params} />,},
    { field: 'AnnualBasis', headerName: 'Annual Basis', flex: 1, minWidth: 150, editable: false, headerAlign: 'center', align: 'center',renderCell: (params) => <AnnualBasisCell {...params} />,},
    { field: 'HalfYearly', headerName: 'Half Yearly', flex: 1, minWidth: 120, editable: isEditable, headerAlign: 'center', align: 'center' },
    { field: 'MonthlyAmount', headerName: 'Monthly Amount', flex: 1, minWidth: 120, editable: isEditable, headerAlign: 'center', align: 'center' },
    {field: 'actions',headerName: '',flex: 0.2,minWidth: 40,renderCell: (params) => (<IconButton variant="outlined" color="error" size="small" onClick={() => handleDelete(params.id)}> <DeleteOutlinedIcon /> </IconButton> ), headerAlign: 'center', align: 'center',}];

    const retrievedColumns = [
      { field: 'State', headerName: 'State', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center', },
      { field: 'LowerLimit', headerName: 'Lower Limit (Rs.)', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="LowerLimit" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),   },
      { field: 'UpperLimit', headerName: 'Upper Limit (Rs.)', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="UpperLimit" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),    },
      { field: 'AnnualBasis', headerName: 'Annual Basis', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="AnnualBasis" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),  },
      { field: 'HalfYearly', headerName: 'Half Yearly', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="HalfYearly" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),   },
      { field: 'MonthlyAmount', headerName: 'Monthly Amount', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="MonthlyAmount" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),    },
      { field: 'actions', headerName: '', flex: 0.2, minWidth: 80, headerAlign: 'center', align: 'center', renderCell: (params) => ( <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <IconButton variant="outlined" color="primary" size="small" onClick={() => handleEditRetrievedRow(params.id)}  style={{ marginRight: 8 }}> <EditIcon /> </IconButton> <IconButton variant="outlined" color="error" size="small" onClick={() => handleDeleteRetrievedRow(params.id)} > <DeleteOutlinedIcon /> </IconButton> </div> ), }, 
    ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 200, width: '100%' }}>
  <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }} >
    <div style={{ width: "200px", position: "relative" }}>
      <label htmlFor='State' style={{ position: "absolute", top: "-10px", left: "10px", backgroundColor: "white", padding: "0 4px", zIndex: 1 }}>
        State
      </label>
      <TextField
        id='State'
        name='State'
        value={Branch.length > 0 ? Branch[0].State : ''} // Display the mapped value from Branch
        style={{ height: "50px", width: "100%", padding: "10px" }}
        variant="outlined"
        InputProps={{
          readOnly: true, // Make the field read-only so it can't be edited
        }}
      />
    </div>
  </Grid>


    
    {showFirstGrid && (
      <div style={{ flex: 1 }}>
          <StyledDataGrid
          rows={rows}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          autoHeight
          processRowUpdate={handleProcessRowUpdate} // Update rows when edited
        />
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" size="small" onClick={addRow} style={{ marginRight: 8 }}>
            Add Row
          </Button>
          <Button variant="outlined" color="primary" size="small" onClick={handleSave} style={{ marginRight: 8 }}>
            Save
          </Button>
          {/* <Button variant="contained" color="success" size="small" onClick={handleEdit}>
            Edit
          </Button> */}
        </div>
      </div>
    )}

{!showFirstGrid && retrievedRows.length > 0 && (
      <div style={{ flex: 1, marginTop: '20px' }}>
        <StyledDataGrid rows={retrievedRows} columns={retrievedColumns} autoHeight paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} pageSizeOptions={[5, 10, 25]}/>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
     <Button variant="contained" color="primary" size="small" onClick={handlesaveretrievedrow}>
            Save
      </Button>
     </div>
      </div>     
    )}    
    </div>
  );
}  

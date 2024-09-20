import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { TextField } from '@mui/material';
import { format, addMinutes } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { PAYMCATEGORY, REPORTS, SAVE } from '../../../serverconfiguration/controllers';
import { useEffect } from 'react';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { getRequest, postRequest } from '../../../serverconfiguration/requestcomp';
import {Grid, Select} from '@mui/material';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import parse from 'date-fns/parse';
import EditIcon from '@mui/icons-material/Edit';
import EditableCell from './EditableCell';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



// Utility function to create a Date object with specific time
const createDateWithTime = (hours, minutes) => {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// TimePicker cell component
const TimePickerCell = ({ value, onChange, disabled }) => {
  const [internalValue, setInternalValue] = useState(value || createDateWithTime(0, 0));

  const handleChange = (newValue) => {
    setInternalValue(newValue);
    onChange(newValue); // Notify parent of the change
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={internalValue}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} variant="standard" />}
        ampm={false}
        views={['hours', 'minutes']}
        inputFormat="HH:mm"
        mask="__:__"
        timeSteps={{minutes: 1}}
        sx={{ width: '100%' }}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

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
  },
});

const initialRows = [
  { id: 1, otFromDuration: createDateWithTime(0, 0), otToDuration: createDateWithTime(0, 0), otHours: "", otRate: "" },
];

export default function OverTimeGrid() {
  const [rows, setRows] = useState(initialRows);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0
  });
  const [isEditable, setIsEditable] = useState(true);
  const[Category, setcategory] = useState([])
  const[vCategoryName, setvCategoryName] = useState("")
  const [retrievedRows, setRetrievedRows] = useState([]);
  const [showFirstGrid, setShowFirstGrid] = useState(true);
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRows, setEditedRows] = useState({});
  const [editableRetrievedRowId, setEditableRetrievedRowId] = useState(null);
  const [isRetrievedGridEditable, setIsRetrievedGridEditable] = useState(false);
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const[Branch, setbranch] = useState([])



  
  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCATEGORY);
      setcategory(data.data);
      const data1 = await postRequest(ServerConfig.url, REPORTS, {
        "query" : `select * from paym_Branch where Branch_User_Id = '${isloggedin}'`
      })
      setbranch(data1.data)
      console.log("data", data1)
      if (data.data.length > 0) {
        const defaultCategory = data.data[0].vCategoryName;
        setvCategoryName(defaultCategory);
        fetchdata(defaultCategory);
      }
    }
    getData();
    console.log("Branch", Branch)
  }, []);

  // Handler for updating a row's value
  const handleRowUpdate = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
    console.log('Updated Rows:', rows); // Ensure rows state is updated
  };
  

  // Handler to add a new row
  const addRow = () => {
    // Ensure there is at least one row before accessing lastRow
    const lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
    
    // If lastRow is null (no rows), set otFromDuration to a default value
    const newOtFromDuration = lastRow ? addMinutes(lastRow.otToDuration, 1) : createDateWithTime(0, 0);
  
    const newRow = {
      id: rows.length + 1,
      otFromDuration: newOtFromDuration,
      otToDuration: createDateWithTime(0, 0),
      otHours: "",
      otRate: ""
    };
  
    setRows([...rows, newRow]);
  };

 
  
  const saveData = async () => {
    try {
      // Prepare the formatted rows
      const formattedRows = rows.map(row => 
        `(${Branch[0].pn_CompanyID}, ${Branch[0].pn_BranchID}, '${vCategoryName}', ${row.id}, '${format(row.otFromDuration, 'HH:mm:ss')}', '${format(row.otToDuration, 'HH:mm:ss')}', '${format(row.otHours,'HH:mm:ss')}', ${row.otRate})`
      ).join(',');
  
      // Construct the SQL query
      const query = `INSERT INTO [dbo].[OtslabNew]([pn_companyid], [pn_branchid], [Category_Name], [SlabID], [Ot_From_Duration], [Ot_To_Duration], [Ot_Hrs], [Ot_Rate]) VALUES ${formattedRows}`;
  
      // Log the query for debugging
      console.log("Query:", JSON.stringify({ query }));
  
      // Set the table to non-editable
      setIsEditable(false);
  
      // Execute the post request
      const response = await postRequest(ServerConfig.url, SAVE, { query });
  
      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        confirmAlert({
          title: `Data Saved Successfully for ${vCategoryName}`,
          message: 'Your data has been saved successfully.',
          buttons: [
            {
              label: 'OK',
              onClick: () => {
                setShowFirstGrid(false); 
                fetchdata(vCategoryName);
                setRows(initialRows)
                setIsEditable(true)
                // You can add further actions here if needed
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
      "query": `select SlabID, Category_Name, Ot_From_Duration, Ot_To_Duration, oT_Hrs, Ot_Rate from OtslabNew where Category_Name = '${selectedCategory}'`
    })
    .then(response => {
      console.log("Fetched data for selected category:", response.data);
      const formattedData = response.data.map(row => ({
        id: row.SlabID,
        categoryName: row.Category_Name,
        otFromDuration: format(parse(row.Ot_From_Duration, 'HH:mm:ss', new Date()), 'HH : mm'),
        otToDuration: format(parse(row.Ot_To_Duration, 'HH:mm:ss', new Date()), 'HH : mm'),
        otHours: (parseInt(row.oT_Hrs.split(':')[0], 10) + parseInt(row.oT_Hrs.split(':')[1], 10) / 60).toFixed(1),
        otRate: row.Ot_Rate,
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
  };

  const handleDeleteRow = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    const updatedRowsWithNewDurations = updatedRows.map((row, index) => {
      if (index > 0) {
        const prevRow = updatedRows[index - 1];
        return {
          ...row,
          otFromDuration: addMinutes(prevRow.otToDuration, 1),
        };
      }
      return row;
    });
    
    setRows(updatedRowsWithNewDurations);
  };

  const handleDeleteRetrievedRow = (id) => {
    const deletedRow = retrievedRows.find((row) => row.id === id);
    const query = `DELETE FROM OtslabNew WHERE SlabID = ${id} and Category_Name = '${deletedRow.categoryName}'`;
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
  categoryName: 'Category_Name',
  otFromDuration: 'Ot_From_Duration',
  otToDuration: 'Ot_To_Duration',
  otHours: 'oT_Hrs',
  otRate: 'Ot_Rate',
};

const formatTime = (decimalHours) => {
  // Convert the decimal hour value to hours, minutes, and seconds
  const hours = Math.floor(decimalHours);
  const minutes = Math.floor((decimalHours - hours) * 60);
  const seconds = Math.round((((decimalHours - hours) * 60) - minutes) * 60);

  // Format the result as HH:MM:SS
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const handleRowUpdateForRetrievedGrid = (id, field, value) => {
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

    // Check if the field is `otHours` to format it as TIME
    const formattedValue = field === 'otHours' ? formatTime(parseFloat(value)) : value;

    // Build the update query
    const query = `UPDATE OtslabNew SET ${columnName} = '${formattedValue}' WHERE SlabID = ${id} AND Category_Name = '${updatedRow.categoryName}'`;

    // Execute the update query
    postRequest(ServerConfig.url, SAVE, { query })
      .then(response => {
        if (response.status === 200) {
          console.log("Cell updated successfully");
          // Optionally, fetch the updated data if you want to ensure consistency
          fetchdata(updatedRow.categoryName); // Refresh data for the category
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
    { field: 'otFromDuration',headerName: 'OT From Duration', flex: 1, minWidth: 150, renderCell: (params) => ( <TimePickerCell value={params.value} onChange={(newValue) => { handleRowUpdate(params.id, 'otFromDuration', newValue); }} disabled={!isEditable} />), headerAlign: 'center', align: 'center', editable: false },
    { field: 'otToDuration', headerName: 'OT To Duration', flex: 1, minWidth: 150, renderCell: (params) => ( <TimePickerCell value={params.value} onChange={(newValue) => { handleRowUpdate(params.id, 'otToDuration', newValue); }} disabled={!isEditable} /> ), headerAlign: 'center', align: 'center', editable: false},
    { field: 'otHours', headerName: 'OT Hours', flex: 1, minWidth: 120, renderCell: (params) => ( <TimePickerCell value={params.value} onChange={(newValue) => { handleRowUpdate(params.id, 'otHours', newValue); }} disabled={!isEditable} /> ), headerAlign: 'center', align: 'center', editable: false },
    { field: 'otRate', headerName: 'OT Rate', flex: 1, type: 'singleSelect', valueOptions: ["1.0", "1.5", "2.0", "2.5", "3.0", "3.5"], minWidth: 120, editable: false, headerAlign: 'center', align: 'center', renderCell: (params) => ( <TextField select value={params.value || ''} onChange={(event) => { handleRowUpdate(params.id, 'otRate', event.target.value); }} disabled={!isEditable} SelectProps={{ native: true,}}> <option value="" disabled>Select rate</option>  {["1.0", "1.5", "2.0", "2.5", "3.0", "3.5"].map((option) => ( <option key={option} value={option}> {option} </option> ))} </TextField> ), },
    { field: 'actions', headerName: '', flex: 0.2, minWidth: 40, renderCell: (params) => ( <IconButton variant="outlined" color="error" size="small" onClick={() => handleDeleteRow(params.id)}> <DeleteOutlinedIcon /> </IconButton> ), headerAlign: 'center', align: 'center', }
     ];

  const retrievedColumns = [
    { field: 'categoryName', headerName: 'Category Name', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center', },
    { field: 'otFromDuration', headerName: 'OT From Duration', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="otFromDuration" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),  },
    { field: 'otToDuration', headerName: 'OT To Duration', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',   renderCell: (params) => ( <EditableCell id={params.id} field="otToDuration" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable}  /> ),   },
    { field: 'otHours', headerName: 'OT Hours', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="otHours" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable}  /> ), },
    { field: 'otRate', headerName: 'OT Rate', flex: 1, minWidth: 120, headerAlign: 'center', align: 'center',   renderCell: (params) => ( <EditableCell id={params.id} field="otRate" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable}  />), },
    { field: 'actions', headerName: '', flex: 0.2, minWidth: 80, headerAlign: 'center', align: 'center', renderCell: (params) => ( <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <IconButton variant="outlined" color="primary" size="small" onClick={() => handleEditRetrievedRow(params.id)} style={{ marginRight: 8 }}> <EditIcon /> </IconButton> <IconButton variant="outlined" color="error" size="small" onClick={() => handleDeleteRetrievedRow(params.id)}> <DeleteOutlinedIcon /> </IconButton> </div> ), }, 
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 200, width: '100%' }}>
    <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }} >
      <div style={{width: "200px", position: "relative"}}>
        <label htmlFor='vCategoryName' style={{ position: "absolute", top:"-10px", left:"10px", backgroundColor:"white", padding:"0 4px", zIndex: 1 }}>
          Choose Category
          </label>
          <select id='vCategoryName' name='vCategoryName' onChange={(e) => {   const selectedCategory = e.target.value; setvCategoryName(selectedCategory);  fetchdata(selectedCategory);  }} style={{ height: "50px", width: "100%", padding: "10px" }}>
  {/* <option value="">Select</option> */}
  {Category.map((e) => (
    <option key={e.vCategoryName} value={e.vCategoryName}>
      {e.vCategoryName}
    </option>
  ))}
</select>
      </div>

    </Grid>
    {showFirstGrid && (
      <div style={{ flex: 1 }}>
        <StyledDataGrid rows={rows} columns={columns} paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} pageSizeOptions={[5, 10, 25]} autoHeight processRowUpdate={(newRow) => { handleRowUpdate(newRow.id, newRow.field, newRow.value); return newRow;}} onCellEditCommit={(params) => { console.log('Cell edited:', params.row.id, params.field, params.value);}}/>
        
        {/* Buttons for the first grid */}
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" size="small" onClick={addRow} style={{ marginRight: 8 }}>
            Add Row
          </Button>
          <Button variant="outlined" color="primary" size="small" onClick={saveData} style={{ marginRight: 8 }}>
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
 
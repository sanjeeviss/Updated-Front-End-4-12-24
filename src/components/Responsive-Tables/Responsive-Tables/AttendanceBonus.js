import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PAYMCATEGORY, SAVE, REPORTS } from '../../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { confirmAlert } from 'react-confirm-alert'; 
import EditableCell from './EditableCell';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


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
  }));
  
  const initialRows = [
    { id: 1, AttBonusType: '', AttBonusValue: '' },
  ];


  
  
const AttendanceBonusSetup = () => {
 
  const [category, setCategory] = useState([]);
  const [rows, setRows] = React.useState(initialRows);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0
  });
  const [retrievedRows, setRetrievedRows] = useState([]);
  const [vCategoryName, setvCategoryName] = useState("");
  const [isEditable, setIsEditable] = useState(true);
  const[Branch, setbranch] = useState([])
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const [showFirstGrid, setShowFirstGrid] = useState(true);
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRows, setEditedRows] = useState({});
  const [editableRetrievedRowId, setEditableRetrievedRowId] = useState(null);
  const [isRetrievedGridEditable, setIsRetrievedGridEditable] = useState(false);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, AttBonusType: '', AttBonusValue: '' };
    setRows([...rows, newRow]);
  };
  

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleSave = async () => {
    try {
      // Prepare the formatted rows
      const formattedRows = rows.map(row => 
        `(${Branch[0].pn_CompanyID}, ${Branch[0].pn_BranchID}, '${vCategoryName}', ${row.id}, '${row.AttBonusType}', ${row.AttBonusValue})`
      ).join(',');
  
      // Construct the SQL query
      const query = `INSERT INTO [dbo].[Attendance_Bonus]([pn_companyid],[pn_branchid],[Category_Name],[SlabID],[Attendance_Bonus_Type],[Attendance_Bonus_Value]) VALUES ${formattedRows}`;
  
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


  const handleEdit = () => {
    setIsEditable(true);
  }

  const fetchdata = (selectedCategory) => {
    postRequest(ServerConfig.url, REPORTS, {
      "query": `select SlabID, Category_Name, Attendance_Bonus_Type, Attendance_Bonus_Value from Attendance_Bonus where Category_Name = '${selectedCategory}'`
    })
    .then(response => {
      console.log("Fetched data for selected category:", response.data);
      const formattedData = response.data.map(row => ({
        id: row.SlabID,
        categoryName: row.Category_Name,
        AttBonusType: row.Attendance_Bonus_Type, 
        AttBonusValue: row.Attendance_Bonus_Value 
      
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

  const handlesaveretrievedrow = () => {
    setEditableRetrievedRowId(null);
    setIsRetrievedGridEditable(false);
  };

  const handleEditRetrievedRow = (id) => {
    console.log(`Editing row with ID: ${id}`);
    setEditableRetrievedRowId(id);
    setIsRetrievedGridEditable(true);
};

const handleDeleteRetrievedRow = (id) => {
  const deletedRow = retrievedRows.find((row) => row.id === id);
  const query = `DELETE FROM Attendance_Bonus WHERE SlabID = ${id} and Category_Name = '${deletedRow.categoryName}'`;
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

const fieldToColumnMap = {
  categoryName: 'Category_Name',
  AttBonusType: 'Attendance_Bonus_Type',
  AttBonusValue: 'Attendance_Bonus_Value'
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
      UPDATE Attendance_Bonus
      SET ${columnName} = '${value}'
      WHERE SlabID = ${id}
      AND Category_Name = '${updatedRow.categoryName}'`;

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


  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCATEGORY);
      setCategory(data.data);
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


  const columns = [
    { field: 'AttBonusType', headerName: 'Number of days',type:'number', flex: 0.1, minWidth: 40, editable: isEditable, headerAlign: 'center', align: 'center' },
    { field: 'AttBonusValue', headerName: 'AttBonusValue', flex: 0.1, minWidth: 40, editable: isEditable, headerAlign: 'center', align: 'center' }, // Further reduced width
    { field: 'actions', headerName: '', flex: 0.03, minWidth: 15, renderCell: (params) => (<IconButton variant="outlined" color="error" size="small" onClick={() => handleDeleteRow(params.id)}><DeleteOutlinedIcon /></IconButton>), headerAlign: 'center', align: 'center' }, // Reduced width for actions column
  ];

  const retrievedColumns = [
    { field: 'categoryName', headerName: 'Category Name', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center', },
    { field: 'AttBonusType', headerName: 'Number of days', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="AttBonusType" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),   },
    { field: 'AttBonusValue', headerName: 'AttBonusValue', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',  renderCell: (params) => ( <EditableCell id={params.id} field="AttBonusValue" value={params.value} onChange={handleRowUpdateForRetrievedGrid} editable={editableRetrievedRowId === params.id && isRetrievedGridEditable} /> ),    },
    { field: 'actions', headerName: '', flex: 0.2, minWidth: 80, headerAlign: 'center', align: 'center', renderCell: (params) => ( <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <IconButton variant="outlined" color="primary" size="small" onClick={() => handleEditRetrievedRow(params.id)}  style={{ marginRight: 8 }}> <EditIcon /> </IconButton> <IconButton variant="outlined" color="error" size="small" onClick={() => handleDeleteRetrievedRow(params.id)} > <DeleteOutlinedIcon /> </IconButton> </div> ), }, 
  ];
  
  
  const handleProcessRowUpdate = (newRow)  => {
    const updatedRows = rows.map((row) => 
      row.id === newRow.id ? { ...row, ...newRow } : row
    );
    setRows(updatedRows);
    return newRow;
  };
  

  return (
   
      <Grid container spacing={4}>
      <Grid item xs={12} sm={12} style={{ display: 'flex', justifyContent: 'left', marginBottom: '20px' }} >
      <div style={{width: "200px", position: "relative"}}>
  <label htmlFor='vCategoryName' style={{ position: "absolute", top:"-10px", left:"10px", backgroundColor:"white", padding:"0 4px", zIndex: 1 }}>
    Choose Category
  </label>
  <select id='vCategoryName' name='vCategoryName' 
    value={vCategoryName} // set the value to the state variable
    onChange={(e) => { 
      const selectedCategory = e.target.value; 
      setvCategoryName(selectedCategory);  
      fetchdata(selectedCategory);  
    }} 
    style={{ height: "50px", width: "100%", padding: "10px" }}
  >
    {category.map((e, index) => (
      <option key={e.vCategoryName} value={e.vCategoryName}>
        {e.vCategoryName}
      </option>
    ))}
  </select>
</div>
    </Grid>
    {showFirstGrid && (
    <div style={{ flex: 1, maxWidth: '600px', margin: '0 auto' }}>
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
          <Button variant="contained" color="primary" size="small" onClick={handleAddRow} style={{ marginRight: 8 }}>
            Add Row
          </Button>
          <Button variant="outlined" color="primary" size="small" onClick={handleSave} style={{ marginRight: 8 }}>
            Save
          </Button>
          {/* <Button variant="contained" color="success"  size="small" onClick={handleEdit} >
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
</Grid>

   
  );
}

export default AttendanceBonusSetup;
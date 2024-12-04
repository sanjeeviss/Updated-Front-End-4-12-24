
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Typography } from '@mui/material';
import { postRequest, getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useEffect, useState, useCallback } from 'react';
import { PAYMCATEGORY, SAVE, REPORTS } from '../../serverconfiguration/controllers';
import {Grid,Box} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useRef } from 'react';
import ReactSelect from 'react-select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Switch from '@mui/material/Switch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidenav from "../Home Page-comapny/Sidenav1";
import Navbar from "../Home Page-comapny/Navbar1"

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


const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));



// Initial rows
const initialRows = [
    { id: 1, Grade: '', ExperienceFrom: '', ExperienceTo: '', CTC: '' },
];




// Main PtGrid component
export default function Grade_Slab  () {
  const [rows, setRows] = React.useState(initialRows);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0
  });
  const [isEditable, setIsEditable] = React.useState(true);
  const[Division, setDivision] = useState([])
  const[v_DivisionName, setv_DivisionName] = useState("")
  const [retrievedRows, setRetrievedRows] = useState([]);
  const [showFirstGrid, setShowFirstGrid] = useState(true);
  const[Company, setCompany] = useState([])
  const[Branch, setBranch] = useState([])
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const [Grade, setGrade] = useState([])
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [pn_BranchID, setpn_BranchID] = useState([])
  const [selectedOption, setSelectedOption] = useState('Branch');
  const [Level, setLevel] = useState([])
  const [isLevelSelected, setIsLevelSelected] = useState(false);
  const [savedDivisions, setSavedDivisions] = useState([]);
  const allBranchIDs = Branch.map((e) => e.pn_BranchID);
const [selectedBranches, setSelectedBranches] = useState(["all", ...allBranchIDs]);
const [savedBranches, setSavedBranches] = useState([]);
  
const notify = () => toast("Wow so easy !");

  const handleSwitchChange = (event) => {
    setIsLevelSelected(event.target.checked);
  };
  

  const handleGradeChange = (id, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, Grade: value } : row
      )
    );
  };

  useEffect(() => {
    if (selectedOption === 'Branch' && selectedBranches.length > 0) {
      async function fetchBranchData() {
        try {
          const data1 = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_Company where Company_User_Id = '${isloggedin}'`,
          });

          setCompany(data1.data);
          console.log("Company data", data1.data);

          if (data1.data.length > 0 && data1.data[0].pn_CompanyID) {
            const CompanyID = data1.data[0].pn_CompanyID;

            let branchIDs = [];
            if (selectedBranches.includes("all")) {
              const branchData = await postRequest(ServerConfig.url, REPORTS, {
                query: `select * from paym_branch where pn_CompanyID = ${CompanyID}`,
              });
              branchIDs = branchData.data.map(branch => branch.pn_BranchID);
              setBranch(branchData.data);
              console.log("Branch data", branchData.data);
            } else {
              branchIDs = selectedBranches;
            }

            let allGrades = [];
            for (const branchID of branchIDs) {
              const gradeData = await postRequest(ServerConfig.url, REPORTS, {
                query: `select * from paym_grade where pn_CompanyID = ${CompanyID} and BranchID = ${branchID}`,
              });
              allGrades.push(...gradeData.data);
            }

            const uniqueGrades = allGrades.filter((grade, index, self) =>
              index === self.findIndex(g => g.v_GradeName === grade.v_GradeName)
            );

            setGrade(uniqueGrades);
            console.log("Unique Grade data", uniqueGrades);

            let allLevels = [];
            for (const branchID of branchIDs) {
              const levelData = await postRequest(ServerConfig.url, REPORTS, {
                query: `select * from paym_level where pn_CompanyID = ${CompanyID} and BranchID = ${branchID}`,
              });
              allLevels.push(...levelData.data);
            }

            const uniqueLevels = allLevels.filter((level, index, self) =>
              index === self.findIndex(l => l.v_LevelName === level.v_LevelName)
            );

            setLevel(uniqueLevels);
            console.log("Unique Level data", uniqueLevels);
          } else {
            console.log("No valid Company data found.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchBranchData();
    }
  }, [isloggedin, selectedOption, selectedBranches]);
  

  useEffect(() => {
    if (selectedOption === 'Division' && pn_BranchID.length > 0) {
      async function fetchDivisionData() {
        try {
          const data1 = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_Company where Company_User_Id = '${isloggedin}'`,
          });

          setCompany(data1.data);
          console.log("Company data", data1.data);

          if (data1.data.length > 0 && data1.data[0].pn_CompanyID) {
            const CompanyID = data1.data[0].pn_CompanyID;

            const divisionData = await postRequest(ServerConfig.url, REPORTS, {
              query: `select * from paym_division where pn_CompanyID = ${CompanyID}`,
            });

            setDivision(divisionData.data);
            console.log("Division data", divisionData.data);

            const gradeData = await postRequest(ServerConfig.url, REPORTS, {
              query: `select * from paym_grade where pn_CompanyID = ${CompanyID} and BranchID = ${pn_BranchID}`,
            });

            

            setGrade(gradeData.data);
            console.log("Unique Grade data", gradeData.data);

            const levelData = await postRequest(ServerConfig.url, REPORTS, {
              query: `select * from paym_level where pn_CompanyID = ${CompanyID} and BranchID = ${pn_BranchID}`,
            });

           

            setLevel(levelData.data);
            console.log("Unique Level data", levelData.data);
          } else {
            console.log("No valid Company data found.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchDivisionData();
    }
  }, [isloggedin, selectedOption, pn_BranchID]);

 


   const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const branchOptions = Branch
  .filter((branch) => !savedBranches.includes(branch.pn_BranchID)) // Filter saved branches
  .map((branch) => ({
    value: branch.pn_BranchID,
    label: branch.BranchName,
  }));

if (branchOptions.length > 0) {
  branchOptions.unshift({ value: 'all', label: 'All branches' });
}
  

const DivisionOptions = Division.filter((e) => e.BranchID == pn_BranchID && !savedDivisions.includes(e.pn_DivisionID)).map((e) => ({ 
  value: e.pn_DivisionID,
  label: e.v_DivisionName,
}));
  const handleBranchChange = (selectedOptions) => {
    if (selectedOptions.some((option) => option.value === 'all')) {
      setSelectedBranches(['all', ...allBranchIDs]);
    } else {
      setSelectedBranches(selectedOptions.map((option) => option.value));
    }
  };
  
  

  const handleDivisionChange = (selectedOptions) => {
    setSelectedDivisions(selectedOptions.map((option) => option.value));
  };
  
  // Custom cell renderer for the UpperLimit column
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }
  
 
  

  const CustomCellYear = React.forwardRef((params, ref) => {
    const [textValue, setTextValue] = useState(params.value || '');
    const [dropdownValue, setDropdownValue] = useState('');
    const inputRef = useRef(null);
    const cursorPositionRef = useRef(null); // Store cursor position
  
    // Debounced update function to avoid frequent updates
    const debounceUpdateCell = useCallback(
      debounce((params, value) => {
        params.api.setEditCellValue({ id: params.id, field: params.field, value });
        handleProcessRowUpdate({ ...params.row, [params.field]: value });
      }, 1500), // Adjust the debounce time as needed
      []
    );
  
    // Function to handle text changes
    const handleTextChange = useCallback(
      (event) => {
        if (isEditable) {
          const input = event.target;
          const newValue = input.value;
          const cursorPosition = input.selectionStart; // Capture the cursor position
  
          // Add .00 logic if applicable
          let updatedValue = newValue;
          if (!isNaN(newValue) && newValue.indexOf('.') === -1) {
            updatedValue = `${newValue}`;
          }
  
          // Update the text value without losing the cursor position
          setTextValue(updatedValue);
          cursorPositionRef.current = cursorPosition; // Store the cursor position
  
          // Restore cursor position after re-render
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
            }
          }, 0);
  
          // Use debounce to reduce unnecessary updates
          debounceUpdateCell(params, updatedValue);
        }
      },
      [isEditable, params, inputRef]
    );
  
    // Function to handle dropdown changes
    const handleDropdownChange = (event) => {
      if (isEditable) {
        const selectedValue = event.target.value;
        const newValue = selectedValue === 'Upwards' ? 'Upwards' : '';
        setDropdownValue(newValue);
  
        // Update the cell value in the grid and handle row update
        params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue });
        handleProcessRowUpdate({ ...params.row, [params.field]: newValue });
      }
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <TextField
          value={textValue}
          onChange={handleTextChange}
          variant="outlined"
          size="small"
          style={{ flex: 1, marginRight: 8 }}
          inputRef={inputRef} // Attach the ref to the input for cursor control
          disabled={!isEditable}
          onFocus={(e) => e.stopPropagation()} // Prevent losing focus when clicking inside the input
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

  
  const AnnualBasisCell = React.forwardRef((params, ref) => {
    const [textValue, setTextValue] = React.useState(params.value || '');
    const inputRef = React.useRef(null); // Ref to manage input focus
  
    // Debounce function to handle updates without too many renders
    const debounceUpdateCell = React.useCallback(
      debounce((params, value) => {
        params.api.setEditCellValue({ id: params.id, field: params.field, value });
        // Update the rows state with the debounced value
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === params.id ? { ...row, [params.field]: value } : row
          )
        );
      }, 1500),
      []
    );
  
    // Handle text changes
    const handleTextChange = (event) => {
      if (isEditable) { // Check if the grid is editable
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
  
  // Utility function to debounce updates
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  const AnnualBasisCellYear = React.forwardRef((params, ref) => {
    const [textValue, setTextValue] = React.useState(params.value || '');
    const inputRef = React.useRef(null); // Ref to manage input focus
  
    // Debounce function to handle updates without too many renders
    const debounceUpdateCell = React.useCallback(
      debounce((params, value) => {
        params.api.setEditCellValue({ id: params.id, field: params.field, value });
        // Update the rows state with the debounced value
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === params.id ? { ...row, [params.field]: value } : row
          )
        );
      }, 1500),
      []
    );
  
    // Handle text changes
    const handleTextChange = (event) => {
      if (isEditable) { // Check if the grid is editable
        const input = event.target;
        let newValue = input.value;
        const cursorPosition = input.selectionStart; // Save the cursor position
  
        // Add .00 logic if applicable
        if (!isNaN(newValue) && newValue.indexOf('.') === -1) {
          newValue = `${newValue}`;
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
  
  // Utility function to debounce updates
  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  const handleProcessRowUpdate = React.useCallback((newRow) => {
    // Ensure only the row being updated is changed
    const updatedRows = rows.map((row) => {
      if (row.id === newRow.id) {
        return { ...row, ...newRow }; // Update the entire row object
      }
      return row;
    });
  
    setRows(updatedRows); // Update the state with the modified row
    return newRow;
  }, [rows]);
 
  const addRow = () => {
    // Check if there are no rows and set it to initialRows
    if (rows.length === 0) {
      setRows(initialRows);
      return;
    }
  
    // Create a new row using the `initialRows` structure or default values
    const newRow = {
      id: rows.length + 1,
      Grade: '', // Keep blank for new rows if needed
      ExperienceFrom: '', 
      ExperienceTo: '',
      CTC: '', 
      CTCTo: ''
    };
  
    // Add the new row to the rows array without modifying the previous rows
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
      if (selectedOption === "Branch") {
        const branchesToInsert = selectedBranches.includes('all') ? allBranchIDs : selectedBranches;
  
        await Promise.all(branchesToInsert.map(async (branchID) => {
          await Promise.all(rows.map(async (row) => {
            const slabType = isLevelSelected ? 'Level' : 'Grade';
            const gradeName = isLevelSelected ? 'NULL' : `'${row.Grade}'`;
            const levelName = isLevelSelected ? `'${row.Grade}'` : 'NULL';
  
            const query = `
              INSERT INTO [dbo].[GradeSlab_Branch] 
              ([pn_companyid], [pn_branchid], [Slab_Type], [Grade_Name], [Level_Name], [Experience_From], [Experience_To], [CTC]) 
              VALUES (
                ${Company[0].pn_CompanyID}, ${branchID}, '${slabType}', ${gradeName}, ${levelName}, ${row.ExperienceFrom}, '${row.ExperienceTo}', ${row.CTC}
              )`;
  
            console.log('Query:', query);
  
            const response = await postRequest(ServerConfig.url, SAVE, { query });
  
            // Check if the response code is 200
            if (response.status === 200) {
              // Optionally, you could log or handle the response data
            } else {
              throw new Error(`Failed to save branch with ID ${selectedBranches}: ${response.statusText}`);
            }
          }));
  
          // Update the saved branches list
          setSavedBranches((prevSaved) => [...prevSaved, branchID]);
        }));
  
        toast.success(`Data saved for Selected Branch  successfully!`, {
          position: "top-center"
        });
  
      } else if (selectedOption === "Division") {
        await Promise.all(selectedDivisions.map(async (divisionID) => {
          await Promise.all(rows.map(async (row) => {
            const slabType = isLevelSelected ? 'Level' : 'Grade';
            const gradeName = isLevelSelected ? 'NULL' : `'${row.Grade}'`;
            const levelName = isLevelSelected ? `'${row.Grade}'` : 'NULL';
  
            const query = `
              INSERT INTO [dbo].[GradeSlab_Division] 
              ([pn_companyid], [pn_branchid], [pn_Divisionid], [Slab_Type], [Grade_Name], [Level_Name], [Experience_From], [Experience_To], [CTC])
              VALUES (
                ${Company[0].pn_CompanyID}, ${pn_BranchID}, ${divisionID}, '${slabType}', ${gradeName}, ${levelName}, ${row.ExperienceFrom}, '${row.ExperienceTo}', ${row.CTC}
              )`;
  
            console.log('Query:', query);
  
            const response = await postRequest(ServerConfig.url, SAVE, { query });
  
            // Check if the response code is 200
            if (response.status === 200) {
              // Optionally, you could log or handle the response data
            } else {
              throw new Error(`Failed to save division with ID ${divisionID}: ${response.statusText}`);
            }
          }));
  
          // Update the saved divisions list
          setSavedDivisions((prevSaved) => [...prevSaved, divisionID]);
        }));
  
        // Clear selected divisions after saving
        setSelectedDivisions([]);
        toast.success('Data saved for selected divisions successfully!', {
          position: "top-center"
        });
      }
  
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(`Error: ${'Failed to save data' || 'Something went wrong!'}`, {
        position: "top-center"
      });
    }
  };
  
  
const columns = [
  {
    field: 'Grade',
    headerName: isLevelSelected ? 'Level' : 'Grade', // Update header dynamically
    flex: 1,
    minWidth: 150,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Select
        value={params.value || ''}
        onChange={(event) => handleGradeChange(params.id, event.target.value)}
        displayEmpty
        variant="outlined"
        fullWidth
      >
        <MenuItem value="">
          {isLevelSelected ? 'Select Level' : 'Select Grade'}
        </MenuItem>
        {isLevelSelected
          ? Level.map((level) => (
              <MenuItem key={level.v_LevelID} value={level.v_LevelName}>
                {level.v_LevelName}
              </MenuItem>
            ))
          : Grade.map((grade) => (
              <MenuItem key={grade.v_GradeID} value={grade.v_GradeName}>
                {grade.v_GradeName}
              </MenuItem>
            ))}
      </Select>
    ),
  },
    {
      field: 'ExperienceFrom',
      headerName: 'Experience From',
      flex: 1,
      minWidth: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <AnnualBasisCellYear {...params} />, // Assuming you already have this component
    },
    {
      field: 'ExperienceTo',
      headerName: 'Experience To',
      flex: 1,
      minWidth: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <CustomCellYear {...params} />, // Assuming you already have this component
    },
    {
      field: 'CTC',
      headerName: 'CTC',
      flex: 1,
      minWidth: 150,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <AnnualBasisCell {...params} />,
    },
   
    {
      field: 'actions',
      headerName: '',
      flex: 0.2,
      minWidth: 40,
      renderCell: (params) => (
        <IconButton
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.id)}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      ),
      headerAlign: 'center',
      align: 'center',
    },
  ];

  

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

    <div style={{ display: 'flex', flexDirection: 'column', height: 200, width: '100%' }}>
        <Typography variant="h5" style={{textAlign:'left', fontWeight:'bold'}}>Grade Slab</Typography>
     <ToastContainer autoClose={1500} />
      <Grid item xs={12} sm={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', marginBottom: '20px' }} >
    
      <div style={{ textAlign: 'left' }}>
  <FormControl>
    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={selectedOption} onChange={handleRadioChange}>
      <FormControlLabel value="Branch" control={<Radio />} label="Branch-Based" />
      <FormControlLabel value="Division" control={<Radio />} label="Division-Based" />
    </RadioGroup>
  </FormControl>
</div>

<div style={{ textAlign: 'left' }}>
  <FormControlLabel
    control={
      <Android12Switch
        checked={isLevelSelected}
        onChange={handleSwitchChange}
      />
    }
    label="Level"
  />
</div>



      {/* Conditionally render the divs based on selectedOption */}
      {selectedOption === 'Branch' && (
  <div style={{ width: "200px", position: "relative", marginTop: '10px' }}>
    
    {/* Conditionally render the label only when branch options are available */}
    {branchOptions.length > 0 && (
      <label 
        htmlFor="Branch" 
        style={{ position: "absolute", top: "-10px", left: "10px", backgroundColor: "white", padding: "0 4px", zIndex: 1 }}>
        Branch
      </label>
    )}
    
    <ReactSelect
      id="Branch"
      name="Branch"
      options={branchOptions}
      isMulti
      onChange={handleBranchChange}
      value={branchOptions.filter(opt => selectedBranches.includes(opt.value))} // Retain selected values
      noOptionsMessage={() => "No more branches available to create slab"} // Custom message
      styles={{
        control: (base, state) => ({
          ...base,
          minHeight: state.hasValue ? "auto" : "40px",
          padding: "10px",
          width: "145%",
          flexWrap: "wrap",
        }),
        valueContainer: (base) => ({
          ...base,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          textAlign: "left",
        }),
        multiValue: (base) => ({
          ...base,
          margin: "2px",
          textAlign: "left",
        }),
        option: (base, state) => ({
          ...base,
          textAlign: "left",
        }),
        noOptionsMessage: (base) => ({
          ...base,
          color: 'red', // Setting the color of the no options message to red
          textAlign: 'center', // Optionally center-aligning the message
        }),
      }}
    />
  </div>
)}



{selectedOption === 'Division' && (
  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
    <div style={{ position: "relative", width: "45%" }}>
      <label htmlFor='Branch' style={{ position: "absolute", top: "0px", left: "10px", backgroundColor: "white", padding: "0 4px", zIndex: 10, fontSize: "15px" }}>
        Branch
      </label>
      <select
        id='Branch'
        name='Branch'
        onClick={(e) => { setpn_BranchID(e.target.value) }}
        style={{
          height: "58px",
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          position: "relative",
          zIndex: 1
        }}
      >
        <option>Select...</option>
        {Branch.map((e) => (
          <option key={e.BranchName} value={e.pn_BranchID}>
            {e.BranchName}
          </option>
        ))}
      </select>
    </div>

    <div style={{ width: "45%", position: "relative", marginTop: '10px' }}>
      <label htmlFor="Division" style={{ position: "absolute", top: "-10px", left: "10px", backgroundColor: "white", padding: "0 4px", zIndex: 1 }}>
        Division
      </label>
      <ReactSelect
        id="Division"
        name="Division"
        options={DivisionOptions}
        isMulti
        onChange={handleDivisionChange}
        value={DivisionOptions.filter(opt => selectedDivisions.includes(opt.value))} // Retain selected values and clear after saving
        noOptionsMessage={() => "No more divisions available to create slab"} // Custom message
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: state.hasValue ? "auto" : "40px",
            padding: "10px",
            width: "70%",
            flexWrap: "wrap",
          }),
          valueContainer: (base) => ({
            ...base,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "flex-start", // Aligns selected values to the left
          }),
          multiValue: (base) => ({
            ...base,
            margin: "2px",
          }),
          option: (base, state) => ({
            ...base,
            textAlign: "left", // Align dropdown values to the left
          }),
          noOptionsMessage: (base) => ({
            ...base,
            color: 'red', // Custom color for no options message
            textAlign: 'center',
          }),
        }}
      />
    </div>
  </div>
)}

  
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
          
        
         
        </div>
      </div>
    )}

{!showFirstGrid && retrievedRows.length > 0 && (
      <div style={{ flex: 1, marginTop: '20px' }}>
        <StyledDataGrid rows={retrievedRows}  autoHeight paginationModel={paginationModel} onPaginationModelChange={setPaginationModel} pageSizeOptions={[5, 10, 25]}/>
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
     <Button variant="contained" color="primary" size="small" >
            Save
      </Button>
      
     </div>
      </div>     
    )}    
    </div>
    </Grid>
    </Box>
    </div>
    </Grid>
    </Grid>
  );
}  





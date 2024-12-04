import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { Button ,Card,Grid,CardContent,Typography} from '@mui/material';
import ReactSelect from 'react-select';
import { ServerConfig } from '../../../../serverconfiguration/serverconfig';
import { postRequest } from '../../../../serverconfiguration/requestcomp';
import { REPORTS, SAVE } from '../../../../serverconfiguration/controllers';
import './Gridstyle.css'
import Sidenav from "../../../Home Page-comapny/Sidenav1";
import Navbar from "../../../Home Page-comapny/Navbar1";
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function DeductionMaster() { 
  const [selectedBranches, setSelectedBranches] = useState(["all"]);
  const [selectedOption, setSelectedOption] = useState('Branch');
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"));
  const [Branch, setBranch] = useState([]);
  const [savedBranches, setSavedBranches] = useState([]);
  const [Company, setCompany] = useState([]);
  
  const allBranchIDs = Branch.map((e) => e.pn_BranchID);

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


  const branchNameMap = useMemo(() => {
    // Create a map of BranchID to BranchName for easy access
    return Branch.reduce((map, branch) => {
      map[branch.pn_BranchID] = branch.BranchName;
      return map;
    }, {});
  }, [Branch]);

  // Dynamically generate column definitions based on selected branches
  const columnDefs = useMemo(() => {
    const baseColumnDef = {
      editable: true,
      flex: 1,
      headerClass: 'ag-header-cell-label',
    };
  
    const columns = [];
  
    if (selectedBranches.includes("all")) {
      // For "All branches", add both Deduction Name and Deduction Type columns
      columns.push({
        ...baseColumnDef,
        field: "deduction_all",
        headerName: "Deduction Name for All Branches",
      });
  
      columns.push({
        ...baseColumnDef,
        field: "deduction_type_all",
        headerName: "Deduction Type for All Branches",
        cellEditor: 'agSelectCellEditor', // Add a dropdown editor
        cellEditorParams: {
          values: ['Standard', 'Miscellaneous'], // Deduction types for all branches
        },
      });
    } else {
      selectedBranches.forEach(branchID => {
        columns.push({
          ...baseColumnDef,
          field: `deduction_${branchID}`,
          headerName: `${branchNameMap[branchID] || branchID} Deduction Name`,
        });
  
        columns.push({
          ...baseColumnDef,
          field: `deduction_type_${branchID}`,
          headerName: `${branchNameMap[branchID] || branchID} Deduction Type`,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['Standard', 'Miscellaneous'],
          },
        });
      });
    }
  
    return columns;
  }, [selectedBranches, branchNameMap]);
  
  
  
    
 

  const initialEmptyRows = Array.from({ length: 5 }, () =>
    selectedBranches.includes("all")
      ? { deduction_all: "", deduction_type_all: "" } // Add deductionType for "all"
      : selectedBranches.reduce((acc, branchID) => {
          acc[`deduction_${branchID}`] = "";
          acc[`deduction_type_${branchID}`] = ""; // Add deductionType for each branch
          return acc;
      }, {})
  );
  
  

  useEffect(() => {
    const fetchDeductionData = async () => {
      const newData = [...rowData]; // Start with existing rowData to preserve manually added rows
      
      if (selectedBranches.includes("all")) {
        // Skip fetching data if "All branches" is selected
        return; 
      }
  
      // Fetch data for selected branches (excluding "all")
      for (let branchID of selectedBranches) {
        try {
          const response = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT * FROM DeductionMaster WHERE pn_CompanyID = ${Company[0].pn_CompanyID} AND pn_BranchID = ${branchID}`,
          });
  
          const branchData = response.data;
          branchData.forEach((data, index) => {
            // Update or add new rows based on fetched data
            if (index < newData.length) {
              newData[index][`deduction_${branchID}`] = data.v_DeductionName || "";
              newData[index][`deduction_type_${branchID}`] = data.v_DeductionType || "";
            } else {
              // Add new rows if the fetched data has more rows than existing
              const newRow = {
                [`deduction_${branchID}`]: data.v_DeductionName || "",
                [`deduction_type_${branchID}`]: data.v_DeductionType || "",
              };
              selectedBranches.forEach((id) => {
                if (id !== branchID) {
                  newRow[`deduction_${id}`] = ""; // Initialize other branch fields
                  newRow[`deduction_type_${id}`] = ""; // Initialize Deduction Type for other branches
                }
              });
              newData.push(newRow);
            }
          });
        } catch (error) {
          console.error("Error fetching deduction data:", error);
        }
      }
  
      setRowData(newData); // Update rowData to reflect fetched data
    };
  
    fetchDeductionData();
  }, [selectedBranches, Company]);
  
  
  

  const [rowData, setRowData] = useState(initialEmptyRows);
  
  const branchOptions = useMemo(() => {
    // Create an array with individual branch options only if "All branches" is not selected
    const options = Branch
      .filter((branch) => !savedBranches.includes(branch.pn_BranchID))
      .map((branch) => ({
        value: branch.pn_BranchID,
        label: branch.BranchName,
      }));
    
    // Conditionally add "All branches" only once at the start of the options array
    if (!options.find(option => option.value === 'all')) {
      options.unshift({ value: 'all', label: 'All branches' });
    }
    
    return options;
  }, [Branch, savedBranches]);

  const handleBranchChange = (selectedOptions) => {
    if (selectedOptions.some((option) => option.value === 'all')) {
      // If "All branches" is selected, set all branch IDs as selected and hide individual branches
      setSelectedBranches(['all', ...allBranchIDs]);
    } else {
      // Otherwise, show only selected individual branches
      setSelectedBranches(selectedOptions.map((option) => option.value));
      fetchDeductionData()
    }
  };

  const displayedOptions = useMemo(() => {
    // Display only "All branches" if selected, otherwise show individual branches
    if (selectedBranches.includes('all')) {
      return [{ value: 'all', label: 'All branches' }];
    } else {
      return branchOptions.filter(opt => selectedBranches.includes(opt.value));
    }
  }, [selectedBranches, branchOptions]);

  const paginationPageSizeSelector = useMemo(() => {
    return [5, 10, 25];
  }, []);

  const addRow = () => {
    const newRow = selectedBranches.includes("all")
      ? { deduction_all: "" }
      : selectedBranches.reduce((acc, branchID) => {
          acc[`deduction_${branchID}`] = "";

          return acc;
        }, {});
    setRowData(prevRowData => [...prevRowData, newRow]);
  };
  

  const onCellValueChanged = useCallback((event) => {
    console.log("Updated Row:", event.data);
  
    // Retrieve all row data
    const allRowData = [];
    event.api.forEachNode((node) => {
      allRowData.push(node.data);
    });
  
    // Log the entire grid's data, showing data for each branch
    console.log("All Row Data:", allRowData);
  }, []);

  const fetchDeductionData = async () => {
    try {
      // Always use allBranchIDs to fetch data for every branch
      for (let branchID of allBranchIDs) {
        const response = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM DeductionMaster WHERE pn_CompanyID = ${Company[0].pn_CompanyID} AND pn_BranchID = ${branchID}`
        });
        console.log(`Data for Branch ID ${branchID}:`, response.data);
      }
    } catch (error) {
      console.error("Error fetching deduction data:", error);
    }
  };
  

  // Function to fetch existing data for the given company and branch
const fetchExistingData = async () => {
  const branchIDs = selectedBranches.includes("all") ? allBranchIDs : selectedBranches;
  const conditions = branchIDs.map(branchID => `(pn_CompanyID = ${Company[0].pn_CompanyID} AND pn_BranchID = ${branchID})`).join(" OR ");
  const query = `SELECT pn_BranchID, d_order, v_DeductionName FROM [dbo].[DeductionMaster] WHERE ${conditions}`;

  try {
    const response = await postRequest(ServerConfig.url, REPORTS, { query });
    return response.data; // Assuming response.data contains the fetched rows
  } catch (error) {
    console.error("Error fetching existing data:", error);
    return [];
  }
};

const handlesave = async () => {
  const filledRows = rowData.filter(row =>
    Object.values(row).some(value => value.trim() !== "")
  );

  if (filledRows.length === 0) {
    console.log("No filled rows to save.");
    return;
  }

  // Fetch existing rows to determine which rows should be updated
  const existingRowData = await fetchExistingData();

  const allRowData = [];
  const branchIDs = selectedBranches.includes("all") ? allBranchIDs : selectedBranches;

  for (let branchID of branchIDs) {
    const branchFilledRows = filledRows.filter(row => {
      return selectedBranches.includes("all")
        ? row.deduction_all !== undefined
        : row[`deduction_${branchID}`] !== undefined;
    });

    branchFilledRows.forEach((row, index) => {
      allRowData.push({
        pn_CompanyID: Company[0].pn_CompanyID,
        pn_BranchID: branchID,
        v_DeductionName: selectedBranches.includes("all")
          ? row.deduction_all
          : row[`deduction_${branchID}`] || '',
        c_Regular: null,
        status: null,
        d_order: row.d_order || index + 1,
        v_DeductionType: selectedBranches.includes("all")
          ? row.deduction_type_all
          : row[`deduction_type_${branchID}`] || '', // Add deduction type here
      });
    });
  }

  // Filter out any rows where `v_DeductionName` or other required fields are empty
  const filteredRowData = allRowData.filter(data => data.v_DeductionName.trim() !== '');

  const insertValues = [];
  const updateQueries = [];

  filteredRowData.forEach((data) => {
    if (data.d_order && existingRowData.some(row => row.pn_BranchID === data.pn_BranchID && row.d_order === data.d_order)) {
      // Update existing row
      updateQueries.push(`UPDATE [dbo].[DeductionMaster]
        SET v_DeductionName = '${data.v_DeductionName}',
            v_DeductionType = '${data.v_DeductionType}',
            c_Regular = ${data.c_Regular},
            status = ${data.status}
        WHERE pn_CompanyID = ${data.pn_CompanyID} 
          AND pn_BranchID = ${data.pn_BranchID} 
          AND d_order = ${data.d_order}`);
    } else {
      // Insert new row
      insertValues.push(`(${data.pn_CompanyID}, ${data.pn_BranchID}, '${data.v_DeductionName}', '${data.v_DeductionType}', ${data.c_Regular}, ${data.status}, ${data.d_order})`);
    }
  });

  // Execute INSERT query only if there are values to insert
  if (insertValues.length > 0) {
    const insertQuery = `INSERT INTO [dbo].[DeductionMaster]
      ([pn_CompanyID], [pn_BranchID], [v_DeductionName], [v_DeductionType], [c_Regular], [status], [d_order])
      VALUES ${insertValues.join(', ')}`;

    try {
      await postRequest(ServerConfig.url, SAVE, { query: insertQuery });
      console.log("New rows inserted successfully.");
    } catch (error) {
      console.error("Error inserting new rows:", error);
    }
  }

  // Execute UPDATE queries if there are updates
  if (updateQueries.length > 0) {
    for (const query of updateQueries) {
      try {
        await postRequest(ServerConfig.url, SAVE, { query });
        console.log("Existing rows updated successfully.");
      } catch (error) {
        console.error("Error updating existing rows:", error);
      }
    }
  }

  // Re-fetch deduction data after save
  fetchDeductionData();
};



  const onGridReady = (params) => {
    params.api.sizeColumnsToFit();
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
             
            <Typography variant="h5" align="center" fontWeight={'425'} gutterBottom textAlign={'center'}>
          Deduction Master
          </Typography>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginBottom: '10px' }}>

      <div style={{ width: "200px", position: "relative", marginBottom: '10px'}}>
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
  value={displayedOptions}
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
  }}
/>


      </div>

      <div className="ag-theme-quartz" style={{flex: 0.1, width: 800 }}>
      <AgGridReact
  rowData={rowData}
  columnDefs={columnDefs}
  onCellValueChanged={onCellValueChanged}
  rowDragManaged={true}
  rowDragMultiRow={true}
  domLayout="autoHeight"
  pagination={true}
  paginationPageSize={10}
  paginationPageSizeSelector={paginationPageSizeSelector}
  onGridReady={onGridReady} // Add this line
/>
<div style={{  display: 'flex', justifyContent: 'flex-end' }}>
<Button variant="outlined" color="primary" onClick={addRow}>
          Add 
        </Button>
        <Button variant="outlined" color="primary" onClick={handlesave}>
          Save
        </Button>
       </div>
      </div>
      
    </div>
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

export default DeductionMaster;

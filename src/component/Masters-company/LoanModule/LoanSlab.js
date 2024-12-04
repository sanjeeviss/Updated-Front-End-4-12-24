import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Navbar from "../../Home Page-comapny/Navbar1";
import Sidenav from "../../Home Page-comapny/Sidenav1";
import { Grid, TextField, Typography, useMediaQuery, useTheme, Card, Box, MenuItem, Divider } from "@mui/material";
import { postRequest } from '../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../serverconfiguration/serverconfig';
import { REPORTS, SAVE } from '../../../serverconfiguration/controllers';
import { useNavigate } from "react-router-dom";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Padding } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
const CTCSlabTable = () => {
  const [rows, setRows] = useState([]);
  const [companyID, setCompanyID] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loans, setLoans] = useState([]);
  const [loanName, setLoanName] = useState("");
  const [branchID, setBranchID] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);


  const user = sessionStorage.getItem('user');
  const navigate = useNavigate();
  

  const columns = [
    { field: "CTCSlabID", headerName: "CTC Slab ID", width: 140 },
    { field: "MinCTC", headerName: "Min CTC", width: 170, editable: true },
    { field: "MaxCTC", headerName: "Max CTC", width: 170, editable: true },
    { field: "MaxLoanAmount", headerName: "Max Loan Amount", width: 170, editable: true },
    { field: "InterestRate", headerName: "Interest Rate (%)", width: 130, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <div>
          <IconButton
            color="secondary"
            onClick={() => setEditingRowId(params.row.CTCSlabID)}
            style={{ marginLeft: "35px" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
  onClick={() => handleDeleteRow(params.row.CTCSlabID)}
  style={{ marginLeft: "5px" }}
> 
<DeleteOutlinedIcon sx={{ color: 'red' }}/>
</IconButton>
          
        </div>
      ),
    },
  ];
  
  
  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          query: `select pn_CompanyID, CompanyName from paym_Company where company_user_id = '${user}'`,
        });
        if (companyData.data.length > 0) {
          setCompanyID(companyData.data[0].pn_CompanyID);
          setCompanyName(companyData.data[0].CompanyName);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    }
    fetchCompanyData();
  }, [user]);

  useEffect(() => {
    async function fetchBranchData() {
      if (companyID) {
        try {
          const branchData = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_branch where pn_CompanyID = '${companyID}'`,
          });
          setBranches(branchData.data);
          if (branchData.data.length > 0) {
            setBranchID(branchData.data[0].pn_BranchID);
          }
        } catch (error) {
          console.error('Error fetching branch data:', error);
        }
      }
    }
    fetchBranchData();
  }, [companyID]);
  useEffect(() => {
    async function fetchLoanData() {
      if (companyID && branchID) {
        try {
          const loanData = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT * FROM paym_Loan 
                    WHERE pn_CompanyID = '${companyID}' 
                    AND Pn_BranchID = '${branchID}'`,
          });
          setLoans(loanData.data);
          if (loanData.data.length > 0) {
            setLoanName(loanData.data[0].v_LoanName);  // Set v_LoanName instead of pn_LoanID
          }
        } catch (error) {
          console.error('Error fetching loan data:', error);
        }
      }
    }
    fetchLoanData();
  }, [companyID, branchID]);
  

  useEffect(() => {
    async function fetchCTCSlabData() {
      setLoading(true);
      try {
        const ctcSlabData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT CTCSlabID, MinCTC, MaxCTC, MaxLoanAmount, InterestRate 
                  FROM [dbo].[CTCSlab] 
                  WHERE pn_CompanyID = '${companyID}' 
                  AND pn_BranchID = '${branchID}' 
                  AND LoanType = '${loanName}'`
        });
  
        const formattedRows = ctcSlabData.data.map((row, index) => ({
          id: row.CTCSlabID || index + 1, // Using CTCSlabID as the unique identifier
          CTCSlabID: row.CTCSlabID,       // Adding CTCSlabID to row data
          MinCTC: row.MinCTC,
          MaxCTC: row.MaxCTC,
          MaxLoanAmount: row.MaxLoanAmount,
          InterestRate: row.InterestRate,
        }));
  
        setRows(formattedRows);
      } catch (error) {
        console.error('Error fetching CTC slab data:', error);
      } finally {
        setLoading(false);
      }
    }
  
    if (companyID && branchID && loanName) {
      fetchCTCSlabData();
    }
  }, [companyID, branchID, loanName]);
  

  const handleAddRow = () => {
  const newId = rows.length > 0 ? Math.max(...rows.map(row => row.CTCSlabID)) + 1 : 1;

  // Get the MaxCTC of the last row or set it to 0 if there are no rows
  const lastMaxCTC = rows.length > 0 ? rows[rows.length - 1].MaxCTC : 0;
  const newRow = {
    id: newId,
    CTCSlabID: newId,              // Auto-generated CTCSlabID
    MinCTC: lastMaxCTC + 1,         // MinCTC is set to the last MaxCTC + 1
    MaxCTC: '',                     // Initial empty MaxCTC, to be filled by user
    MaxLoanAmount: '',              // Initial empty MaxLoanAmount, to be filled by user
    InterestRate: '',               // Initial empty InterestRate, to be filled by user
    isNew: true,                    // Flag to mark the row as new
  };
  setRows([...rows, newRow]);
};

  
 

const handleSubmit = async () => {
  let saveSuccessful = true;
  try {
    setLoading(true);
    for (const row of rows) {
      // Check if the row is new or edited
      if (row.isNew || row.id === editingRowId) {
        if (!row.MinCTC || !row.MaxCTC || !row.MaxLoanAmount || !row.InterestRate) {
          alert("Please fill all fields before saving.");
          saveSuccessful = false;
          break;
        }
        const query = row.isNew
          ? `INSERT INTO [dbo].[CTCSlab] (
                pn_CompanyID, pn_BranchID, LoanType, MinCTC, MaxCTC, MaxLoanAmount, InterestRate
             ) VALUES (
                '${companyID}', '${branchID}', '${loanName}', '${row.MinCTC}', '${row.MaxCTC}', '${row.MaxLoanAmount}', '${row.InterestRate}'
             )`
          : `UPDATE [dbo].[CTCSlab] SET
                MinCTC='${row.MinCTC}', MaxCTC='${row.MaxCTC}',
                MaxLoanAmount='${row.MaxLoanAmount}', InterestRate='${row.InterestRate}'
             WHERE CTCSlabID=${row.CTCSlabID}`;

        const response = await postRequest(ServerConfig.url, SAVE, { query });

        if (response.status !== 200) {
          console.error("Error response:", response);
          saveSuccessful = false;
        }
      }
    }
    if (saveSuccessful) {
      alert("Data saved successfully");
      setRows([]); // Clear or reload rows after save
      setEditingRowId(null); // Reset editing row
      navigate("/CTCSlabTable");
    } else {
      alert("Some rows could not be saved. Check console for details.");
    }
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Failed to save data");
  } finally {
    setLoading(false);
  }
};


  const handleSaveAllRows = async () => {
    await handleSubmit();  // Save data
    alert('Data saved successfully');  // Notify user of success
    // Refresh the page to show the updated data
    window.location.reload();
  };
  
  const handleDeleteRow = async (CTCSlabID) => {
    // Optionally, show a confirmation dialog before deletion
    if (window.confirm('Are you sure you want to delete this row?')) {
      try {
        // Send the DELETE request to the server
        const response = await postRequest(ServerConfig.url, SAVE, {
          query: `
            DELETE FROM [dbo].[CTCSlab] 
            WHERE [CTCSlabID] = ${CTCSlabID}
          `,
        });
  
        if (response.status === 200) {
          // Remove the row from the UI if the deletion was successful
          const updatedRows = rows.filter((row) => row.CTCSlabID !== CTCSlabID);
          setRows(updatedRows);
        } else {
          console.error('Failed to delete row from the database');
        }
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    }
  };
  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container justifyContent="center">
      <div style={{ backgroundColor: "#fff", width: '100%' }}>
        <Navbar />
        <Box height={40} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Grid item xs={12} md={10} style={{ margin: '0 auto' }}>
            <div className="background1">
              <Grid container justifyContent="center">
                <Card style={{ maxWidth: 1100, width: "100%", margin: '20px', paddingBottom: '20px' }}>
                  <Typography variant="h5" align="center" style={{ margin: '20px 0' }}>
                    Loan Slab
                  </Typography>
                  <Grid container spacing={2} style={{ padding: '20px' }}>
                    <Grid item xs={4}>
                      <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        value={companyName}
                        InputProps={{ readOnly: true }}
                      />
                    </Grid>
                 
                    <Grid item xs={4}>
                      <TextField
                        select
                        label="Branch"
                        variant="outlined"
                        fullWidth
                        value={branchID}
                        onChange={(e) => setBranchID(e.target.value)}
                      >
                        {branches.map((branch) => (
                          <MenuItem key={branch.pn_BranchID} value={branch.pn_BranchID}>
                            {branch.BranchName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
    <TextField
      select
      label="Loan Type"
      variant="outlined"
      fullWidth
      value={loanName}
      onChange={(e) => setLoanName(e.target.value)}
    >
      {loans.map((loan) => (
        <MenuItem key={loan.pn_LoanID} value={loan.v_LoanName}>
          {loan.v_LoanName}
        </MenuItem>
      ))}
    </TextField>
  </Grid>                  </Grid>
                  <Grid item xs={12} >
                  <Divider style={{ borderBottom: '2px solid #000', margin: '0 0' }} />
  </Grid>
                  <Box style={{ height: "auto", width: "1000px", padding: '30px', display: "flex", justifyContent: "center" }}>
  <Grid container justifyContent="center" style={{ width: '100%' }}>
  <DataGrid
  rows={rows}
  columns={columns}
  processRowUpdate={handleProcessRowUpdate}
  editMode="cell"
/>
  </Grid>
</Box>


<Grid item container justifyContent="flex-end" style={{ marginTop: 5 ,paddingBottom:"20px"}}>
<Button variant="contained" color="primary" onClick={handleAddRow} >
                      Add Row
                    </Button>
                    <Grid style={{paddingRight:"30px"}}>
                    <Button variant="contained" color="secondary" onClick={handleSaveAllRows} style={{ marginLeft: 10 }} disabled={loading}>
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </div>
          </Grid>
        </Box>
      </div>
    </Grid>
  );
};

export default CTCSlabTable;
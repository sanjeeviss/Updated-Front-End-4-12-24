import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Switch, IconButton, Button ,Grid,Card,CardContent,Typography} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styled from 'styled-components'; // Import styled-components as styled
import { styled as muiStyled } from '@mui/material/styles'; // Alias MUI styled to muiStyled
import { ServerConfig } from '../../../../serverconfiguration/serverconfig';
import { postRequest } from '../../../../serverconfiguration/requestcomp';
import { REPORTS, SAVE } from '../../../../serverconfiguration/controllers';
import { FormControlLabel } from '@mui/material'; 
import './Gridstyle.css'
import Sidenav from "../../../Home Page-comapny/Sidenav1";
import Navbar from "../../../Home Page-comapny/Navbar1";
// ... existing styled components and other imports ...

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: auto;
  background: #ffffff;
  
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15);
`;

const Header = styled.h3`
  text-align: center;
  color: #007acc;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const SettingsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const Select = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const PreferenceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #555;
  font-size: 16px;
  font-weight: 500;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;


const CheckboxLabel = styled.label`
  font-size: 15px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 8px
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
  gap: 20px; /* Add spacing between the grid and the button */
  height: 100%; /* Ensure the container takes up available space */
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top : 2%;
  .ag-theme-alpine {
    width: 90%;
    max-width: 620px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* Ensure the button container spans full width */
  margin-top: 10px; /* Add spacing above the button */
`;


const Android12Switch = muiStyled(Switch)(({ theme }) => ({
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

const AllowanceSettings = () => {
  const [rowData, setRowData] = useState([]);
  const [company, setCompany] = useState([]);
  const [Branch, setBranch] = useState([]);
  const [Branchid, setBranchid] = useState("");
  const [Allowancedata, setAllowancedata] = useState([]);
  const [deductiondata, setdeductiondata] = useState([]);
  const [showDeductions, setShowDeductions] = useState(false);
  const [deductionPreferences, setDeductionPreferences] = useState({});

  const SwitchRenderer = (props) => {
    const { data, colDef, value } = props;
  
    const handleChange = (event) => {
      const newChecked = event.target.checked;
      // Update the grid cell value
      props.setValue(newChecked ? 'Yes' : 'No');
  
      // Call the function passed from the parent to update rowData
      if (props.onToggle) {
        props.onToggle(data, colDef.field, newChecked);
      }
    };
  
    return (
      <FormControlLabel
        control={<Android12Switch />}
        checked={value === 'Yes'} // Ensure this reflects the correct state
        onChange={handleChange}
        color="primary"
        size="small"
      />
    );
  };
  
  

  const onSwitchToggle = (row, field, value) => {
    console.log(`Toggling ${field} for ${row.allowanceName} to ${value ? 'Yes' : 'No'}`);
    
    setAllowancedata((prevAllowancedata) =>
      prevAllowancedata.map((r) =>
        r.allowanceName === row.allowanceName ? { ...r, [field]: value ? 'Yes' : 'No' } : r
      )
    );
  
    setRowData((prevRowData) =>
      prevRowData.map((r) =>
        r.allowanceName === row.allowanceName ? { ...r, [field]: value ? 'Yes' : 'No' } : r
      )
    );
  };
  

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Allowance Name',
      field: 'allowanceName',
      resizable: true,
      headerClass: 'wrap-header',
    },
    {
      headerName: 'Allowance Computed for Proratabasis',
      field: 'allowanceComputed',
      cellRenderer: (props) => (
        <SwitchRenderer {...props} onToggle={onSwitchToggle} />
      ),
      resizable: true,
      headerClass: 'wrap-header',
    },
    {
      headerName: 'Include for OT Calculation',
      field: 'otCalc',
      cellRenderer: (props) => (
        <SwitchRenderer {...props} onToggle={onSwitchToggle} />
      ),
      resizable: true,
      headerClass: 'wrap-header',
    },
  ]);
  

 

  useEffect(() => {
    async function getData() {
      try {
        const Company = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from paym_Company where Company_User_Id = '${sessionStorage.getItem("user")}'`,
        });
        setCompany(Company.data);
  
        if (Company.data && Company.data.length > 0) {
          const Branchdata = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from paym_branch where pn_CompanyID = ${Company.data[0].pn_CompanyID}`,
          });
          setBranch(Branchdata.data);
  
          const allowancedata = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from AllowanceMaster where pn_CompanyID = ${Company.data[0].pn_CompanyID} and pn_BranchID = ${Branchid}`,
          });
          
          // Sort the data based on the `d_order` column
          const sortedAllowanceData = allowancedata.data.sort((a, b) => a.d_order - b.d_order);
          setAllowancedata(sortedAllowanceData);
  
          const deductiondata = await postRequest(ServerConfig.url, REPORTS, {
            query: `select * from DeductionMaster where pn_CompanyID = ${Company.data[0].pn_CompanyID} and pn_BranchID = ${Branchid}`,
          });
          setdeductiondata(deductiondata.data);
  
          // Extract deductions for this branch
          const branchSpecificDeductions = deductiondata.data.map(
            (deduction) => deduction.v_DeductionName
          );
  
          const schemaData = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Allowancesettings'`,
          });
  
          const savedSettings = await postRequest(ServerConfig.url, REPORTS, {
            query: `SELECT * FROM Allowancesettings WHERE pn_CompanyID = ${Company.data[0].pn_CompanyID} AND pn_BranchID = ${Branchid}`,
          });
  
          // Extract deduction-related columns dynamically
          const deductionColumns = schemaData.data
            .map((col) => col.COLUMN_NAME)
            .filter(
              (col) =>
                ![
                  "pn_CompanyID",
                  "pn_BranchID",
                  "v_EarningsName",
                  "c_OT",
                  "Prorata_basis",
                  "d_order",
                ].includes(col)
            )
            .map((col) => ({
              columnName: col,
              isEnabled: branchSpecificDeductions.includes(
                col.replace(/_/g, " ")
              ), // Enable only if deduction exists in the branch
            }));
  
          // Initialize deduction preferences
          const updatedPreferences = deductionColumns.reduce((acc, col) => {
            const deductionName = col.columnName.replace(/_/g, " ");
            return { ...acc, [deductionName]: col.isEnabled };
          }, {});
          setDeductionPreferences(updatedPreferences);
  
          // Update column definitions
          const newColumnDefs = [
            { headerName: "Allowance Name", field: "allowanceName", resizable: true },
            {
              headerName: "Allowance Computed for Proratabasis",
              field: "allowanceComputed",
              cellRenderer: SwitchRenderer,
              resizable: true,
            },
            {
              headerName: "Include for OT Calculation",
              field: "otCalc",
              cellRenderer: SwitchRenderer,
              resizable: true,
            },
            ...deductionColumns.map((col) => ({
              headerName: col.columnName.replace(/_/g, " "),
              field: col.columnName,
              cellRenderer: SwitchRenderer,
              resizable: true,
              editable: col.isEnabled,
              cellStyle: () => ({
                backgroundColor: col.isEnabled ? "white" : "#f0f0f0",
                pointerEvents: col.isEnabled ? "auto" : "none",
              }),
            })),
          ];
          setColumnDefs(newColumnDefs);
  
          // Format rowData to include deductions
          const formattedData = sortedAllowanceData.map((item) => {
            const savedSetting =
              savedSettings.data.find(
                (setting) => setting.v_EarningsName === item.v_EarningsName
              ) || {};
            const deductions = deductionColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnName]: savedSetting[col.columnName] === "Y" ? "Yes" : "No",
              }),
              {}
            );
          
            return {
              allowanceName: item.v_EarningsName,
              allowanceComputed: savedSetting.Prorata_basis === "Y" ? "Yes" : "No",
              otCalc: savedSetting.c_OT === "Y" ? "Yes" : "No",
              ...deductions,
            };
          });
          setRowData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [Branchid]);
  


  const handleSave = async () => {
    try {
      // Loop through the rowData to prepare the queries
      const queries = rowData.map(async (row, index) => {
        const d_order = index + 1; // Assign d_order based on row index
        const existingData = await postRequest(ServerConfig.url, REPORTS, {
          query: `
            SELECT * FROM Allowancesettings 
            WHERE pn_CompanyID = ${company[0].pn_CompanyID} 
              AND pn_BranchID = ${Branchid} 
              AND v_EarningsName = '${row.allowanceName}'
          `,
        });
  
        // Prepare static columns
        const staticColumns = `
          pn_CompanyID = ${company[0].pn_CompanyID},
          pn_BranchID = ${Branchid},
          v_EarningsName = '${row.allowanceName}',
          c_OT = '${row.otCalc === "Yes" ? "Y" : "N"}',
          Prorata_basis = '${row.allowanceComputed === "Yes" ? "Y" : "N"}',
          d_order = ${d_order}
        `;
  
        // Prepare dynamic columns based on deductions
        const dynamicColumns = Object.keys(deductionPreferences)
          .map((deductionName) => {
            const columnName = deductionName.replace(/\s+/g, '_');
            const value = deductionPreferences[deductionName] 
              ? (row[columnName] === "Yes" ? "Y" : "N") 
              : null; // Set to null if disabled
            return `${columnName} = ${value !== null ? `'${value}'` : 'NULL'}`;
          })
          .join(", ");
  
        if (existingData.data && existingData.data.length > 0) {
          // Update query if record exists
          return postRequest(ServerConfig.url, REPORTS, {
            query: `
              UPDATE Allowancesettings
              SET ${staticColumns}, ${dynamicColumns}
              WHERE pn_CompanyID = ${company[0].pn_CompanyID} 
                AND pn_BranchID = ${Branchid} 
                AND v_EarningsName = '${row.allowanceName}'
            `,
          });
        } else {
          // Insert query if record does not exist
          const dynamicValues = Object.keys(deductionPreferences)
            .map((deductionName) => {
              const columnName = deductionName.replace(/\s+/g, '_');
              return deductionPreferences[deductionName] 
                ? `'${row[columnName] === "Yes" ? "Y" : "N"}'` 
                : 'NULL'; // Set to NULL if disabled
            })
            .join(", ");
  
          return postRequest(ServerConfig.url, REPORTS, {
            query: `
              INSERT INTO Allowancesettings 
                (pn_CompanyID, pn_BranchID, v_EarningsName, c_OT, Prorata_basis, d_order, 
                ${Object.keys(deductionPreferences).map((deductionName) =>
                  deductionName.replace(/\s+/g, '_')
                ).join(", ")})
              VALUES 
                (${company[0].pn_CompanyID}, ${Branchid}, '${row.allowanceName}', 
                '${row.otCalc === "Yes" ? "Y" : "N"}', '${row.allowanceComputed === "Yes" ? "Y" : "N"}', 
                ${d_order}, ${dynamicValues})
            `,
          });
        }
      });
  
      // Execute all queries
      await Promise.all(queries);
      alert("Allowance settings saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save allowance settings.");
    }
  };


  
  
  const toggleDeduction = async (deduction) => {
    const deductionName = deduction.v_DeductionName;
    const columnName = deductionName.replace(/\s+/g, '_'); // Ensure column name is DB-safe
  
    try {
      if (!deductionPreferences[deductionName]) {
        // Add column in the database
        await postRequest(ServerConfig.url, REPORTS, {
          query: `
            ALTER TABLE Allowancesettings ADD  ${columnName} CHAR(1) null
          `,
        });
  
        // Update rowData with the new column set to 'N'
        setRowData((prev) =>
          prev.map((row) => ({
            ...row,
            [columnName]: 'N',
          }))
        );
      } else {
        // Remove column from the database
        await postRequest(ServerConfig.url, REPORTS, {
          query: `
            ALTER TABLE Allowancesettings DROP COLUMN ${columnName}
          `,
        });
  
        // Remove column from rowData
        setRowData((prev) =>
          prev.map((row) => {
            const { [columnName]: _, ...rest } = row;
            return rest;
          })
        );
      }
  
      // Update deduction preferences state
      setDeductionPreferences((prev) => ({
        ...prev,
        [deductionName]: !prev[deductionName],
      }));
  
      // Update column definitions
      updateColumnDefs({
        ...deductionPreferences,
        [deductionName]: !deductionPreferences[deductionName],
      });
    } catch (error) {
      console.error(`Error updating column for ${deductionName}:`, error);
      alert(`Failed to update column for ${deductionName}.`);
    }
  };
  

  const updateColumnDefs = (updatedPreferences) => {
    const selectedDeductions = deductiondata.filter((d) => updatedPreferences[d.v_DeductionName]);
  
    const newColumnDefs = [
      { headerName: 'Allowance Name', field: 'allowanceName', resizable: true },
      { headerName: 'Allowance Computed for proratabasis', field: 'allowanceComputed', cellRenderer: SwitchRenderer, resizable: true },
      { headerName: 'Include for OT Calc.', field: 'otCalc', cellRenderer: SwitchRenderer, resizable: true },
      ...selectedDeductions.map((deduction) => ({
        headerName: deduction.v_DeductionName,
        field: deduction.v_DeductionName.replace(/\s+/g, '_'),
        cellRenderer: SwitchRenderer,
        resizable: true,
      })),
    ];
  
    setColumnDefs(newColumnDefs);
  
    // Ensure rowData includes the new fields with default values
    const updatedRowData = rowData.map((row) => ({
      ...row,
      ...selectedDeductions.reduce((acc, d) => {
        const columnName = d.v_DeductionName.replace(/\s+/g, '_');
        return { ...acc, [columnName]: row[columnName] || 'N' };
      }, {}),
    }));
  
    setRowData(updatedRowData);
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
           Allowance Settings
          </Typography>
    <Container>
      <Header>Allowance Settings</Header>
      <SettingsContainer>
        <FieldContainer>
          <Label>Choose Branch</Label>
          <Select 
            value={Branchid} 
            onChange={(e) => setBranchid(e.target.value)}
          >
            <option value="">Select</option>
            {Branch.map((e) => (
              <option key={e.pn_BranchID} value={e.pn_BranchID}>
                {e.BranchName}
              </option>
            ))}
          </Select>
        </FieldContainer>
        
        <PreferenceContainer>
          <Label>Deduction Preferences</Label>
          <IconButton onClick={() => setShowDeductions((prev) => !prev)}>
            <MenuIcon />
          </IconButton>
        </PreferenceContainer>
      </SettingsContainer>

      {showDeductions && (
        <CheckboxContainer >
          {deductiondata.map((deduction) => (
            <CheckboxLabel key={deduction.pn_DeductionID}>
              <input 
                type="checkbox" 
                checked={deductionPreferences[deduction.v_DeductionName] || false} 
                onChange={() => toggleDeduction(deduction)} 
              />
              {deduction.v_DeductionName}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
      )}
      <ContentContainer>
      <GridContainer >
        <div className="ag-theme-alpine" >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
          />
        </div>
      </GridContainer>
      <ButtonContainer>

      <Button variant="contained" color="primary"  onClick={handleSave}>
        Save 
      </Button>
      </ButtonContainer>
      </ContentContainer>
    </Container>
    </Grid>
    </CardContent>
    </Card>
    </div>
    </Grid>
    </Grid>
    </Grid>
    </div>
  );
};

export default AllowanceSettings;
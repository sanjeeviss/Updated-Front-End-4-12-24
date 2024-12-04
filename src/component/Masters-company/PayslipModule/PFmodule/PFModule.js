import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Box, Paper, CircularProgress, CardContent } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { postRequest } from '../../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../../serverconfiguration/serverconfig';
import { REPORTS } from '../../../../serverconfiguration/controllers'
import Sidenav from "../../../Home Page-comapny/Sidenav1";
import Navbar from "../../../Home Page-comapny/Navbar1";
import { Card } from 'react-bootstrap';
const PFvalues = () => {
  const [isloggedin, setIsLoggedIn] = useState(sessionStorage.getItem('user'));
  const [company, setCompany] = useState([]);
  const [rowData, setRowData] = useState([
    { id: 1, label: 'Effective Month From', value: '' },
    { id: 2, label: 'Effective From Year', value: '' },
    { id: 3, label: 'PF Contribution (%)', value: '' },
    { id: 4, label: 'Max Ceiling', value: '' },
    { id: 5, label: 'Inc Earnings for PF value below ceiling', value: '' },
    { id: 6, label: 'EPF Contribution (%)', value: '' },
    { id: 7, label: 'Upper Limit', value: '' },
    { id: 8, label: 'FPF Contribution (%)', value: '' },
    { id: 9, label: 'Eligibility Amount', value: '' },
    { id: 10, label: 'Admin Charges (%)', value: '' },
    { id: 11, label: 'Rounding Options', value: '' },
  ]);
  const [originalRowData] = useState(JSON.parse(JSON.stringify(rowData))); // Deep clone for reset functionality
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const handleCellValueChange = (params) => {
  console.log('Updated row data:', params.data);
  setRowData((prevData) =>
    prevData.map((row) => (row.id === params.data.id ? { ...row, value: params.data.value } : row))
  );
};

const columns = [
  {
    headerName: 'Field',
    field: 'label',
    width: 200,
    sortable: true,
    cellStyle: { textAlign: 'left' },
  },
  {
    headerName: 'Value',
    field: 'value',
    editable: true,
    width: 200,

    valueFormatter: (params) => {
      if (!params || !params.data || !params.value) return ''; // Return empty string if value is invalid or empty

      // Handle percentage formatting
      if (params.data.label.includes('%')) {
        const value = parseFloat(params.value);
        return isNaN(value) ? '' : `${(value)}%`; // Format percentage with two decimal places
      }

      // For "Effective From Year", no decimal formatting, just an integer
      if (params.data.label === 'Effective From Year') {
        return parseInt(params.value, 10); // Ensure it's an integer with no decimal places
      }

      // For other numeric fields, format to two decimal places
      const value = parseFloat(params.value);
      return !isNaN(value) ? value.toFixed(2) : params.value; // Convert to 2 decimal points for other values
    },

    valueParser: (params) => {
      if (!params || !params.newValue || !params.data) return null;
      const numericValue = parseFloat(params.newValue);
      return isNaN(numericValue) ? 0 : numericValue;
    },

    cellStyle: (params) => {
      if (typeof params.value === 'number') {
        return { textAlign: 'left' }; // Right-align numbers
      }
      return { textAlign: 'left' }; // Left-align percentages and text
    },

    cellEditorSelector: (params) => {
      if (params.data.label === 'Effective From Year') {
        // Dropdown for "Effective From Year"
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 20 }, (_, i) => currentYear - i); // Last 10 years
        return { component: 'agSelectCellEditor', params: { values: years } };
      }
      if (params.data.label === 'Effective Month From') {
        return { component: 'agSelectCellEditor', params: { values: months } };
      }
      if (params.data.label === 'Max Ceiling' || params.data.label === 'Inc Earnings for PF value below ceiling') {
        return { component: 'agSelectCellEditor', params: { values: ['yes', 'No'] } };
      }
      if (params.data.label === 'Rounding Options') {
        return { component: 'agSelectCellEditor', params: { values: ['Rounded to Next Rupee', 'Round to Nearest Rupee'] } };
      }
      return null;
    },

    headerClass: 'ag-left-header', // Aligns header text to center
  },
];


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const companyResponse = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT * FROM paym_Company WHERE Company_User_Id = '${isloggedin}'`,
        });

        const companyData = companyResponse.data || [];
        setCompany(companyData);

        if (companyData.length > 0) {
          const pfSettingsQuery = `
            SELECT * FROM [dbo].[PF_Settings] 
            WHERE pn_CompanyID = ${companyData[0].pn_CompanyID}
          `;
          const pfResponse = await postRequest(ServerConfig.url, REPORTS, { query: pfSettingsQuery });
          const pfData = pfResponse.data || [];

          if (pfData.length > 0) {
            const updatedRowData = rowData.map((row) => {
              const columnMapping = {
                'Effective Month From': 'Effective_Month_From',
                'Effective From Year': 'Effective_From_Year',
                'PF Contribution (%)': 'PF_Contribution(%)',
                'Max Ceiling': 'Max_Ceiling',
                'Inc Earnings for PF value below ceiling': 'PF_below_ceiling',
                'EPF Contribution (%)': 'EPF_Contribution(%)',
                'Upper Limit': 'Upper_Limit',
                'FPF Contribution (%)': 'FPF_Contribution(%)',
                'Eligibility Amount': 'Eligibility_Amount',
                'Admin Charges (%)': 'Admin_Charges(%)',
                'Rounding Options': 'Rounding_Options',
              };

              const dbColumn = columnMapping[row.label] || '';
              return {
                ...row,
                value: pfData[0][dbColumn] || '',
              };
            });
            setRowData(updatedRowData);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isloggedin) fetchData();
  }, [isloggedin]);

  const handleReset = () => {
    setRowData([...originalRowData]);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = rowData.reduce((acc, row) => {
        acc[row.label] = row.value;
        return acc;
      }, {});

      const checkQuery = `
        SELECT COUNT(*) as count FROM [dbo].[PF_Settings] 
        WHERE pn_CompanyID = ${company[0].pn_CompanyID}
      `;
      const checkResponse = await postRequest(ServerConfig.url, REPORTS, { query: checkQuery });
      const existingDataCount = checkResponse.data[0]?.count || 0;

      let query;
      if (existingDataCount > 0) {
        query = `
          UPDATE [dbo].[PF_Settings]
          SET
            Effective_Month_From = '${data['Effective Month From'] || ''}',
            Effective_From_Year = ${parseInt(data['Effective From Year'], 10) || 'NULL'},
            [PF_Contribution(%)] = ${parseFloat(data['PF Contribution (%)']) || 'NULL'},
            Max_Ceiling = '${data['Max Ceiling'] || ''}',
            PF_below_ceiling = '${data['Inc Earnings for PF value below ceiling'] || ''}',
            [EPF_Contribution(%)] = ${parseFloat(data['EPF Contribution (%)']) || 'NULL'},
            Upper_Limit = ${parseInt(data['Upper Limit'], 10) || 'NULL'},
            [FPF_Contribution(%)] = ${parseFloat(data['FPF Contribution (%)']) || 'NULL'},
            Eligibility_Amount = ${parseInt(data['Eligibility Amount'], 10) || 'NULL'},
            [Admin_Charges(%)] = ${parseFloat(data['Admin Charges (%)']) || 'NULL'},
            Rounding_Options = '${data['Rounding Options'] || ''}'
          WHERE pn_CompanyID = ${company[0].pn_CompanyID}
        `;
      } else {
        query = `
          INSERT INTO [dbo].[PF_Settings] 
          (
            pn_CompanyID, Effective_Month_From, Effective_From_Year, [PF_Contribution(%)], 
            Max_Ceiling, PF_below_ceiling, [EPF_Contribution(%)], Upper_Limit, [FPF_Contribution(%)], 
            Eligibility_Amount, [Admin_Charges(%)], Rounding_Options
          ) 
          VALUES 
          (
            ${company[0].pn_CompanyID}, 
            '${data['Effective Month From'] || ''}', 
            ${parseInt(data['Effective From Year'], 10) || 'NULL'}, 
            ${parseFloat(data['PF Contribution (%)']) || 'NULL'}, 
            '${data['Max Ceiling'] || ''}', 
            '${data['Inc Earnings for PF value below ceiling'] || ''}', 
            ${parseFloat(data['EPF Contribution (%)']) || 'NULL'}, 
            ${parseInt(data['Upper Limit'], 10) || 'NULL'}, 
            ${parseFloat(data['FPF Contribution (%)']) || 'NULL'}, 
            ${parseInt(data['Eligibility Amount'], 10) || 'NULL'}, 
            ${parseFloat(data['Admin Charges (%)']) || 'NULL'}, 
            '${data['Rounding Options'] || ''}'
          )
        `;
      }

      await postRequest(ServerConfig.url, REPORTS, { query });
      alert(existingDataCount > 0 ? 'Data updated successfully!' : 'Data saved successfully!');
    } catch (error) {
      console.error('Error saving or updating data:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setIsSaving(false);
    }
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
            PF Settings
            </Typography>
          
  
    <Paper
      elevation={5}
      sx={{
        maxWidth: 450,
        margin: 'auto',
        padding: 3,
        borderRadius: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: 'bold', paddingBottom: 2, textAlign: 'center' }}
      >
        Provident Fund
      </Typography>

      {/* <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontWeight: 'bold', paddingBottom: 2, textAlign: 'center' }}
      >
        PF Settings
      </Typography> */}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%', marginBottom: 20 }}>
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            domLayout="autoHeight"
           
            onCellValueChanged={handleCellValueChange}
          />
        </div>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained"  color="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
       
      </Box>
    </Paper>
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

export default PFvalues;
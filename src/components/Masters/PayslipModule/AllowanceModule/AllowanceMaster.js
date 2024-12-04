import {AgGridReact} from 'ag-grid-react'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useState } from 'react';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { useCallback } from 'react';
import { useMemo } from 'react';
import { REPORTS, SAVE } from '../../../../serverconfiguration/controllers';
import { postRequest } from '../../../../serverconfiguration/requestcomp';
import { useEffect } from 'react';
import { ServerConfig } from '../../../../serverconfiguration/serverconfig';
import { Button, CardContent, Grid, Typography } from '@mui/material';
import Sidenav from "../../../Home Page/Sidenav";
import Navbar from "../../../Home Page/Navbar";
import './Gridstyle.css'
import { Card } from 'react-bootstrap';
// import './App.css';
ModuleRegistry.registerModules([ClientSideRowModelModule]);





function AllowanceMasterBranch() {
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState([]);
    const [Branch, setBranch] = useState([]);
    const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"));
    const [Allowance, setAllowance] = useState([]);
    const [CompanyID, setCompanyID] = useState('')
    
    console.log("isloggedin", isloggedin);
    
    useEffect(() => {
        async function getData() {
          try {
            const Branchdata = await postRequest(ServerConfig.url, REPORTS, {
              query: `select * from paym_Branch where Branch_User_Id = '${isloggedin}'`,
            });
            setBranch(Branchdata.data);
            
            const Companyid = await postRequest(ServerConfig.url, REPORTS, {
              query: `select pn_CompanyID from paym_Branch where Branch_User_Id = '${isloggedin}'`
            });
            setCompanyID(Companyid.data)
      
            if (Branchdata.data && Branchdata.data.length > 0 ) {

              const Allowancedata = await postRequest(ServerConfig.url, REPORTS, {
                query: `select * from AllowanceMaster where pn_BranchID = '${Branchdata.data[0].pn_BranchID}' order by d_order`,
              });
              
              // Sort the Allowance data by d_order
              const sortedAllowanceData = Allowancedata.data.sort((a, b) => a.d_order - b.d_order);
              setAllowance(sortedAllowanceData);
      
              setRowData(
                sortedAllowanceData.map((item, index) => ({
                  v_EarningsName: item.v_EarningsName,
                  d_order: item.d_order, // Include d_order for tracking
                  position: index + 1, // Set initial position
                }))
              );
            }
          } catch (error) {
            console.error("Error fetching data", error);
          }
        }

      
        getData();
      }, [isloggedin]);
    useEffect(() => {
      console.log("Branch", Branch);
      console.log("Allowance", Allowance);
      console.log('Companyid', CompanyID)
    }, [Branch, Allowance, CompanyID]);

    const handleSave = async () => {
      try {
          // Fetch the existing allowances for the branch from the database
          const existingAllowancesResponse = await postRequest(ServerConfig.url, REPORTS, {
              query: `SELECT * FROM AllowanceMaster WHERE pn_BranchID = ${Branch[0].pn_BranchID} and pn_CompanyID = ${CompanyID[0].pn_CompanyID}`,
          });
  
          const existingAllowances = existingAllowancesResponse.data;
          const existingOrders = new Set(existingAllowances.map((allowance) => allowance.d_order));
  
          const pn_CompanyID = CompanyID[0].pn_CompanyID; // Replace with the actual company ID if dynamic
          const pn_BranchID = Branch[0].pn_BranchID;  // Replace with the actual branch ID if dynamic
  
          // Iterate over each row in rowData to decide whether to update or insert
          for (const row of rowData) {
              const { position: d_order, v_EarningsName } = row;
  
              if (existingOrders.has(d_order)) {
                  // Update if d_order exists
                  await postRequest(ServerConfig.url, SAVE, {
                      query: `UPDATE AllowanceMaster SET v_EarningsName = '${v_EarningsName}', d_order = ${d_order} WHERE pn_BranchID = ${pn_BranchID} AND d_order = ${d_order} and pn_CompanyID = ${CompanyID[0].pn_CompanyID}`,
                  });
                  console.log(`Updated ${v_EarningsName} to position ${d_order}`);
  
                  // Update d_order in Allowancesettings if exists
                  await postRequest(ServerConfig.url, SAVE, {
                      query: `UPDATE Allowancesettings SET d_order = ${d_order} WHERE pn_BranchID = ${pn_BranchID} AND v_EarningsName = '${v_EarningsName}' and pn_CompanyID = ${CompanyID[0].pn_CompanyID}`,
                  });
  
                  // Update d_order in AllowanceValues if exists
                  await postRequest(ServerConfig.url, SAVE, {
                      query: `UPDATE AllowanceValues SET d_order = ${d_order} WHERE pn_branchid = ${pn_BranchID} AND v_EarningsName = '${v_EarningsName}' and pn_CompanyID = ${CompanyID[0].pn_CompanyID}`,
                  });
  
              } else {
                  // Insert if d_order does not exist
                  await postRequest(ServerConfig.url, SAVE, {
                      query: `
                          INSERT INTO AllowanceMaster (
                              pn_CompanyID, pn_BranchID, v_EarningsName, d_order, c_Regular, c_PF, c_ESI, 
                              c_OT, c_LOP, c_PT,payslip, status
                          ) VALUES (
                              ${pn_CompanyID}, ${pn_BranchID}, '${v_EarningsName}', 
                              ${d_order}, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)`,
                  });
                  console.log(`Inserted new row with ${v_EarningsName} at position ${d_order}`);
              }
          }
      } catch (error) {
          console.error("Error saving data", error);
      }
  };
      
    
    const [columnDefs, setColumnDefs] = useState([
      { field: "v_EarningsName", headerName: "Earnings Name", rowDrag: true, editable: true, flex: 1, headerClass: "ag-header-cell-label" },
    ]);
    
    const defaultColDef = useMemo(() => {
      return {
        width: 250,
      };
    }, []);
    
    const rowSelection = useMemo(() => {
      return { mode: "multiRow", headerCheckbox: false };
    }, []);
  
    const onRowDragEnd = (event) => {
        const updatedRowData = [];
      
        for (let i = 0; i < event.api.getDisplayedRowCount(); i++) {
          const rowNode = event.api.getDisplayedRowAtIndex(i);
          updatedRowData.push({
            ...rowNode.data,
            position: i + 1, // Track the new position based on current order
          });
        }
      
        setRowData(updatedRowData);
      
        console.log("Updated Allowance Order:");
        updatedRowData.forEach((row) => {
          console.log(`Position: ${row.position}, Name: ${row.v_EarningsName}`);
        });
      };

      const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
      };

      const handleAdd = () => {
        const newRow = {
          v_EarningsName: ``, // Default name
          d_order: rowData.length + 1, // Set d_order as the next in sequence
          position: rowData.length + 1,
        };
    
        setRowData((prevRowData) => [...prevRowData, newRow]);
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
               Allowance Master
              </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', marginBottom: '10px' }}>
        <div className="ag-theme-quartz" style={{flex: 0.1, width: 400 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowDragManaged={true}
            domLayout="autoHeight"
            rowDragMultiRow={true}
            rowSelection={rowSelection}
            onRowDragEnd={onRowDragEnd}
            onGridReady={onGridReady}
          />
          <div style={{  display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" color="primary" size="small" onClick={handleAdd}>
          Add
        </Button>

        <Button variant="outlined" color="primary" size='small' onClick={handleSave}>
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
export default AllowanceMasterBranch;

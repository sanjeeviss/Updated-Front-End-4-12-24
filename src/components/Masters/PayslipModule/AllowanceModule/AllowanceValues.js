import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { postRequest } from '../../../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../../../serverconfiguration/serverconfig';
import { REPORTS, SAVE } from '../../../../serverconfiguration/controllers';
import { Button, FormControlLabel, Switch ,Grid,Card,CardContent,Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidenav from "../../../Home Page/Sidenav";
import Navbar from "../../../Home Page/Navbar";


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

  
  const AllowanceValuesBranch = () => {
    const [Gradeslabdata, setGradeSlabData] = useState([])
    const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
    const [companyid, setCompanyid] = useState('');
    const [Branch, setBranch] = useState([])
    const [Branchid, setBranchid] = useState("")
    const [Grade, setGrade] = useState("")
    const [Allowancedata, setAllowancedata] = useState([])
    const [gridData, setGridData] = useState([]);
    const [percentageType, setPercentageType] = useState(""); // New state for CTC or Basic Pay selection
    const [originalGridData, setOriginalGridData] = useState([]);
    const [isOriginalData, setIsOriginalData] = useState(true);
    const [formattedData, setFormattedData] = useState([]);

    const SwitchRenderer = (props) => {
        const [checked, setChecked] = useState(props.value === 'Yes' || props.value === true);
    
        const handleChange = (event) => {
            const newChecked = event.target.checked;
            setChecked(newChecked);
            
            // Update the cell's value
            props.setValue(newChecked ? 'Yes' : 'No');
            
            // Update PayMonth only if the field being toggled is "Regular"
            if (props.colDef.field === 'Regular') {
                if (newChecked) {
                    props.node.setDataValue('PayMonth', 'All Months');
                } else {
                    props.node.setDataValue('PayMonth', ''); // Clear PayMonth when unchecked
                }
            }
        };
    
        return (
            <FormControlLabel
                control={<Android12Switch />}
                checked={checked}
                onChange={handleChange}
                color="primary"
                size='small'
            />
        );
    };
    

    const [columnDefs, setColumnDefs] = useState([
        { headerName: "Allowance", field: "allowance", editable: false, flex: 1 },
        { headerName: "Values", field: "values", editable: true, flex: 1 },
        {headerName: "Regular", field: "Regular", cellRenderer: SwitchRenderer, flex: 1},
        {headerName: "Include for payslip", field: "IncludeforPayslip", cellRenderer: SwitchRenderer, flex: 1, hide: true },
        { headerName: "PayMonth", field: "PayMonth", editable: true, flex: 1, cellEditor: 'agSelectCellEditor', cellEditorParams: { values: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] },
            valueGetter: (params) => params.data.PayMonth || "January" // Sets default value to "January" if PayMonth is not defined
        }
    ]);
    



    useEffect(() => {
        async function getData() {
            try {
                const Branchdata = await postRequest(ServerConfig.url, REPORTS, {
                    "query" : `select * from paym_Branch where Branch_User_Id  = '${isloggedin}'`
                  })
                  setBranch(Branchdata.data)
 
                  const CompanyID = await postRequest(ServerConfig.url, REPORTS, {
                    "query" : `select pn_CompanyID from paym_Branch where Branch_User_Id = '${isloggedin}' `
                  })
                  setCompanyid(CompanyID.data)

            // console.log(Company.data)
            if (CompanyID.data && CompanyID.data.length > 0) {
         

          const GradeSlabdata = await postRequest(ServerConfig.url, REPORTS, {
            "query" : `select * from GradeSlab_Branch where pn_companyid = ${CompanyID.data[0].pn_CompanyID} and pn_branchid = ${Branchid}`
          });
          setGradeSlabData(GradeSlabdata.data);

          const allowancedata = await postRequest(ServerConfig.url, REPORTS, {
            "query" : `select * from AllowanceMaster where pn_CompanyID = ${CompanyID.data[0].pn_CompanyID} and pn_BranchID = ${Branchid}`
          })
          setAllowancedata(allowancedata.data);

          const sortedData = allowancedata.data.sort((a, b) => a.d_order - b.d_order);
          const formattedData = sortedData.map((item) => ({
            allowance: item.v_EarningsName,
            values: '',
            Regular: 'Yes', // Set default value for Regular to 'Yes'
            PayMonth: 'All Months', // Default to 'All' when Regular is checked
            IncludeforPayslip: 'Yes' 
        }));
        
   setGridData(formattedData);
        }
        } catch(error) {
            console.error("Error Fetching Data", error);
        }
        }
        getData();
      
       
      }, [isloggedin, Branchid]);

      

      useEffect(()=> {
        console.log("Company", companyid);
        console.log("Gradeslab", Gradeslabdata);
        console.log("Branch", Branch)
      },[companyid, Gradeslabdata, Branch])

      useEffect(() => {
        const handleKeyDown = (e) => {
            if ( e.shiftKey && e.key === 'O') {
                setColumnDefs((prevDefs) =>
                    prevDefs.map((col) =>
                        col.field === "IncludeforPayslip"
                            ? { ...col, hide: !col.hide }
                            : col
                    )
                );
            }
        };
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (Branchid && Grade) {
            // Both Branchid and Grade are selected, now fetch the allowance values.
            fetchAllowanceValues();
        }
    }, [Branchid, Grade]);
    
    

      // Determine the dropdown label and options based on the Slab_Type of the first matching item in Gradeslabdata
const selectedGradeData = Gradeslabdata.filter(item => item.pn_branchid === parseInt(Branchid, 10));
const dropdownLabel = selectedGradeData.some(item => item.Slab_Type === "Level") ? "Choose Level" : "Choose Grade";
const dropdownOptions = selectedGradeData.map(item => ({
    value: item.Slab_Type === "Level" ? item.Level_Name : item.Grade_Name,
    label: item.Slab_Type === "Level" ? item.Level_Name : item.Grade_Name
}));

    const [amountType, setAmountType] = useState("fixed");

    const onCellValueChanged = (params) => {
        if (params.colDef.field === 'values') {
            const newValue = params.data.values;
            const parsedValue = parseFloat(newValue);
            if (isNaN(parsedValue)) {
                params.data.values = ''; // Reset invalid input to empty string
            } else if (amountType === 'percentage') {
                params.data.values = `${parsedValue}%`;
            } else if (amountType === 'fixed') {
                params.data.values = parsedValue.toFixed(2);
            }
        }
    
        // Handle other fields
        if (params.colDef.field === 'Regular') {
            params.data.PayMonth = params.data.Regular === 'Yes' ? 'All Months' : '';
        }
    
        setGridData([...gridData]);
    };
    
    

    const handleSave = async () => {
        try {
            // Step 1: Fetch existing AllowanceValues data for the selected Branch and Grade/Level
            const selectedGradeData = Gradeslabdata.find(
                item => item.pn_branchid === parseInt(Branchid, 10) && (item.Slab_Type === 'Level' || item.Slab_Type === 'Grade')
            );
            const gradeField = selectedGradeData?.Slab_Type === 'Level' ? 'Level_Name' : 'Grade_Name';
            const gradeValue = Grade;
    
            const checkQuery = 
                `SELECT * FROM [dbo].[AllowanceValues]
                WHERE pn_branchid = ${Branchid} AND ${gradeField} = '${gradeValue}'`;
            ;
    
            // Fetch existing records
            const response = await postRequest(ServerConfig.url, REPORTS, { "query": checkQuery });
            const existingData = response.data || [];
    
            // Step 2: Separate data for update and insert
            const updateQueries = [];
            const insertQueries = [];
            
            gridData.forEach((row, index) => {
                // Check if the row exists in existingData
                const existingRow = existingData.find(item => item.v_EarningsName === row.allowance);
                
                if (existingRow) {
                    // Prepare an UPDATE query for existing records
                    const updateQuery = 
                        `UPDATE [dbo].[AllowanceValues]
                        SET Allowancetype = '${amountType}',
                            Cal_Based_on = ${amountType === 'percentage' ? `'${percentageType}'` : 'NULL'},
                            value = ${parseFloat(row.values)},
                            c_Regular = '${row.Regular === 'Yes' ? 'Y' : 'N'}',
                            payslip = '${row.IncludeforPayslip === 'Yes' ? 'Y' : 'N'}',
                            PayMonth = '${row.PayMonth}',
                            d_order = ${index + 1}
                        WHERE pn_branchid = ${Branchid} AND ${gradeField} = '${gradeValue}' AND v_EarningsName = '${row.allowance}'`;
                    ;
                    updateQueries.push(updateQuery);
                } else {
                    // Prepare an INSERT query for new records
                    const insertQuery = 
                        `INSERT INTO [dbo].[AllowanceValues]
                        (pn_companyid, pn_branchid, Grade_Name, Level_Name, v_EarningsName, Allowancetype, Cal_Based_on, value, c_Regular, payslip, PayMonth, d_order)
                        VALUES
                        (${companyid[0].pn_CompanyID}, ${Branchid}, ${gradeField === 'Grade_Name' ? `'${gradeValue}'` : 'NULL'},
                            ${gradeField === 'Level_Name' ? `'${gradeValue}'` : 'NULL'},
                            '${row.allowance}', '${amountType}', ${amountType === 'percentage' ? `'${percentageType}'` : 'NULL'},
                            ${parseFloat(row.values)}, '${row.Regular === 'Yes' ? 'Y' : 'N'}', 
                            '${row.IncludeforPayslip === 'Yes' ? 'Y' : 'N'}', 
                            '${row.PayMonth}', ${index + 1}
                        );`
                    ;
                    insertQueries.push(insertQuery);
                }
            });
    
            // Step 3: Execute update and insert queries
            const allQueries = [...updateQueries, ...insertQueries].join("\n");
            await postRequest(ServerConfig.url, SAVE, { "query": allQueries });
    
            // Fetch updated data and update grid display
            fetchAllowanceValues();
        } catch (error) {
            console.error("Error in handleSave:", error);
        }
    };
    
    
    
    const fetchAllowanceValues = async () => {
        try {
            // Determine grade/level field based on Gradeslabdata
            const selectedGradeData = Gradeslabdata.find(
                item => item.pn_branchid === parseInt(Branchid, 10) && (item.Slab_Type === 'Level' || item.Slab_Type === 'Grade')
            );
            const gradeField = selectedGradeData?.Slab_Type === 'Level' ? 'Level_Name' : 'Grade_Name';
            const gradeValue = Grade;
    
            // Fetch data from AllowanceValues table
            const allowanceValuesQuery = `
                SELECT * FROM [dbo].[AllowanceValues] 
                WHERE pn_branchid = ${Branchid} and pn_companyid = ${companyid[0].pn_CompanyID}
                AND (${gradeField} = '${gradeValue}') order by d_order;
            `;
            const allowanceValuesResponse = await postRequest(ServerConfig.url, REPORTS, { "query": allowanceValuesQuery });
            const allowanceValuesData = allowanceValuesResponse.data || [];
    
            // Fetch all allowances from AllowanceMaster for the selected branch
            const allowanceMasterQuery = `
                SELECT * FROM [dbo].[AllowanceMaster] 
                WHERE pn_CompanyID = ${companyid[0]?.pn_CompanyID} AND pn_BranchID = ${Branchid} order by d_order;
            `;
            const allowanceMasterResponse = await postRequest(ServerConfig.url, REPORTS, { "query": allowanceMasterQuery });
            const allowanceMasterData = allowanceMasterResponse.data || [];
    
            // Identify newly added allowances in AllowanceMaster
            const existingAllowanceNames = allowanceValuesData.map(item => item.v_EarningsName);
            const newAllowances = allowanceMasterData.filter(item => !existingAllowanceNames.includes(item.v_EarningsName));
    
            // Format newly added allowances with default values
            const newFormattedData = newAllowances.map(item => ({
                allowance: item.v_EarningsName,
                values: '',
                Regular: 'Yes', // Default to "Yes"
                PayMonth: 'All Months', // Default to "All Months"
                IncludeforPayslip: 'Yes' // Default to "Yes"
            }));
    
            // Combine existing and new allowances
            const combinedData = [
                ...allowanceValuesData.map(item => ({
                    allowance: item.v_EarningsName,
                   values: item.value ? parseFloat(item.value).toFixed(2) : '', 
                    Regular: item.c_Regular === 'Y' ? 'Yes' : 'No',
                    PayMonth: item.PayMonth || 'All Months',
                    IncludeforPayslip: item.payslip === 'Y' ? 'Yes' : 'No'
                })),
                ...newFormattedData
            ];

            const formattedData = [
                ...allowanceValuesData .filter(item => !(item.c_Regular === 'N' && item.payslip === 'N'))
                .map(item => ({
                    allowance: item.v_EarningsName,
                   values: item.value ? parseFloat(item.value).toFixed(2) : '', 
                    Regular: item.c_Regular === 'Y' ? 'Yes' : 'No',
                    PayMonth: item.PayMonth || 'All Months',
                    IncludeforPayslip: item.payslip === 'Y' ? 'Yes' : 'No'
                })),
                ...newFormattedData
            ];

            const firstItem = allowanceValuesData[0];
            if (firstItem) {
                setAmountType(firstItem.Allowancetype || "fixed"); // Default to "fixed" if no type is found
                setPercentageType(firstItem.Cal_Based_on || "ctc"); // Default to "ctc" if no type is found
            }
    
            // Update the grid and states
            setOriginalGridData(formattedData)
            setFormattedData(combinedData);
            setGridData(formattedData);
        } catch (error) {
            console.error("Error fetching AllowanceValues data:", error);
        }
    };



    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.shiftKey && e.key === 'R') {
                setIsOriginalData(prev => !prev); // Toggle the state
                setGridData(isOriginalData ? formattedData : originalGridData);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOriginalData, formattedData, originalGridData]);
    
    

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
               Allowance Values
              </Typography>
        <div style={{  maxWidth: '1000px', 
            margin: '0 auto', 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            flexDirection: 'column', 
            height: '100vh' // Make the container take full view height
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Allowance Values</h3>

            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                <label style={{ marginRight: '20px' }}>
                <input  type="radio" name="amountType" value="fixed" checked={amountType === "fixed"} onChange={() => setAmountType("fixed")}
                    />
                    <span style={{ marginLeft: '8px' }}>Fixed Amount</span>
                </label>
                <label>
                <input  type="radio"  name="amountType"  value="percentage" checked={amountType === "percentage"} onChange={() => setAmountType("percentage")}/>
                <span style={{ marginLeft: '8px' }}>Percentage</span>
                </label>
            </div>

            {amountType === "percentage" && (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <label style={{ marginRight: '20px' }}>
            <input type="radio" name="percentageType" value="ctc" checked={percentageType === "ctc"} onChange={() => setPercentageType("ctc")} />
            <span style={{ marginLeft: '8px' }}>CTC</span>
        </label>
        <label>
            <input type="radio" name="percentageType" value="basicPay" checked={percentageType === "basicPay"} onChange={() => setPercentageType("basicPay")} />
            <span style={{ marginLeft: '8px' }}>Basic Pay</span>
        </label>
    </div>
)}


            {/* Branch and Grade Dropdowns */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Choose Branch</label>
                    <select 
    style={{ width: '100%', padding: '8px' }}
    value={Branchid} 
    onChange={(e) => setBranchid(e.target.value)}
>
    <option value="">Select</option>
    {Branch.map((e) => (
        <option key={e.pn_BranchID} value={e.pn_BranchID}>
            {e.BranchName}
        </option>
    ))}
</select>
                </div>                                           
                <div style={{ flex: 1 }}>
    <label style={{ display: 'block', marginBottom: '5px' }}>{dropdownLabel}</label>
    <select 
        style={{ width: '100%', padding: '8px' }}
        value={Grade} 
        onChange={(e) => setGrade(e.target.value)}
    >
        <option value="">Select</option>
        {dropdownOptions.map((option, index) => (
            <option key={index} value={option.value}>{option.label}</option>
        ))}
    </select>
</div>


            </div>

            {/* ag-Grid Table */}
            <div style={{ flex: 1, marginBottom: '20px', overflow: 'auto' }}>
            <div className="ag-theme-alpine" style={{ height: '100%' }}>
                <AgGridReact
                    rowData={gridData}
                    columnDefs={columnDefs}
                    domLayout="autoHeight"
                    onCellValueChanged={onCellValueChanged}
                />
            </div>
        </div>

        {/* Save Button */}
        <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '20px' }}>
            <Button variant="outlined" color="primary" onClick={handleSave}>
                Save
            </Button>
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
};

export default AllowanceValuesBranch;

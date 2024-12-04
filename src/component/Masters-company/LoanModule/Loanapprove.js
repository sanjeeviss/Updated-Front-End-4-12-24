import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { REPORTS } from "../../../serverconfiguration/controllers";

const LoanApproval = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const Branch_User_Id = sessionStorage.getItem("user");

  const fetchLoanApplyData = async () => {
    if (Branch_User_Id) {
      try {
        const branchData = await postRequest(ServerConfig.url, REPORTS, {
          query: `
            SELECT pn_BranchID 
            FROM paym_branch 
            WHERE Branch_User_Id = '${Branch_User_Id}'
          `,
        });

        if (branchData.data && branchData.data.length > 0) {
          const pnBranchID = branchData.data[0].pn_BranchID;

          const loanApplyData = await postRequest(ServerConfig.url, REPORTS, {
            query: `
              SELECT * 
              FROM paym_LoanApply_employee 
              WHERE pn_BranchID = '${pnBranchID}'
            `,
          });

          const formattedRows = loanApplyData.data.map((row, index) => ({
            id: row.ApplicationID || index + 1,
            loanId: row.ApplicationID,
            employeeId: row.pn_EmployeeID,
            RequestedAmount: row.RequestedAmount,
            RepaymentPeriod: row.RepaymentPeriod,
            ApplicationDate: row.ApplicationDate
            ? new Intl.DateTimeFormat("en-GB").format(new Date(row.ApplicationDate))
            : "N/A", // Format date to DD-MM-YYYY or set N/A if empty
            InterestRate: row.InterestRate,
            EmployeeComments: row.EmployeeComments || "N/A", // Set "N/A" for empty comments
            ApplicationStatus: row.ApplicationStatus,
            loantype: row.loantype,
            MaxLoanAmount: row.MaxLoanAmount,
          }));

          console.log("Fetched Pending Loan Applications:", formattedRows);

          setLoanRequests(formattedRows);
        } else {
          console.error("Branch not found for the provided Branch_User_Id");
        }
      } catch (error) {
        console.error("Error fetching loan apply data:", error);
      }
    }
  };

  useEffect(() => {
    fetchLoanApplyData();
  }, [Branch_User_Id]);

  const approveLoan = async (ApplicationID) => {
    try {
      console.log("Attempting to approve loan with ID:", ApplicationID);
  
      // Update the ApplicationStatus to 'Approved' in the paym_LoanApply_employee table
      const result = await postRequest(ServerConfig.url, REPORTS, {
        query: `
          UPDATE paym_LoanApply_employee
          SET ApplicationStatus = 'Approved'
          WHERE ApplicationID = '${ApplicationID}'
        `,
      });
  
      console.log("Loan approval result:", result);
  
      // Show success message and refresh data
      alert("Loan approved successfully!");
      fetchLoanApplyData(); // Fetch the updated data
    } catch (error) {
      console.error("Error approving loan:", error);
      alert("Error approving loan. Please check the console for details.");
    }
  };
  
  
  const rejectLoan = async (ApplicationID) => {
    try {
      console.log("Attempting to reject loan with ID:", ApplicationID);
  
      // Update the ApplicationStatus to 'Rejected' in the paym_LoanApply_employee table
      const result = await postRequest(ServerConfig.url, REPORTS, {
        query: `
          UPDATE paym_LoanApply_employee
          SET ApplicationStatus = 'Rejected'
          WHERE ApplicationID = '${ApplicationID}'
        `,
      });
  
      console.log("Loan rejection result:", result);
  
      // Show success message and refresh data
      alert("Loan rejected successfully!");
      fetchLoanApplyData(); // Fetch the updated data
    } catch (error) {
      console.error("Error rejecting loan:", error);
      alert("Error rejecting loan. Please check the console for details.");
    }
  };
  

  const columns = [
    { field: "loanId", headerName: "Loan ID", width: 120 },
    { field: "employeeId", headerName: "Employee ID", width: 120 },
    { field: "RequestedAmount", headerName: "Requested Amount", width: 150 },
    { field: "RepaymentPeriod", headerName: "Repayment Period", width: 150 },
    { field: "ApplicationDate", headerName: "Application Date", width: 150 },
    { field: "InterestRate", headerName: "Interest Rate (%)", width: 120 },
    { field: "EmployeeComments", headerName: "Employee Comments", width: 200 },
    { field: "ApplicationStatus", headerName: "Application Status", width: 150 },
    { field: "loantype", headerName: "Loan Type", width: 120 },
    { field: "MaxLoanAmount", headerName: "Max Loan Amount", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="success"
            onClick={() => approveLoan(params.row.loanId)}
            style={{ marginRight: "10px" }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => rejectLoan(params.row.loanId)}
          >
            Reject
          </Button>
        </>
      ),
    },
  ];

  return (
    <Paper style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
    <Typography variant="h5" gutterBottom>
      Loan Approval
    </Typography>
    {loading ? (
      <Typography>Loading loan requests...</Typography>
    ) : loanRequests.length === 0 ? (
      <Typography>No loan requests found for this branch.</Typography>
    ) : (
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={loanRequests}
          columns={columns}
          pageSize={25} // Set the number of rows per page to 25
          rowsPerPageOptions={[25, 50, 100]} // Provide options for different page sizes
          pagination // Enable pagination
        />
      </div>
    )}
  </Paper>
  
  );
};

export default LoanApproval;
import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { PAYMEMPLOYEE, SAVE } from "../../serverconfiguration/controllers";
import { useLocation } from "react-router-dom";

const Medical = ({ employeeDetails }) => {
  const [bills, setBills] = useState([
    { dateofservice: "", hospital: "", amount: "", base64File: "" },
  ]);
  const [employee, setEmployee] = useState([]);

  const handleFileSelect = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      setBills(
        bills.map((bill, i) =>
          i === index ? { ...bill, base64File: base64String } : bill
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const location = useLocation();
  const { pnEmployeeId, employeeCode, pnCompanyId, pnBranchId } =
    location.state || {};

  useEffect(() => {
    async function getData() {
      const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employee.data);
    }
    getData();
  }, [pnEmployeeId, employeeCode, pnCompanyId, pnBranchId]);

  const employeecode1 = employeeCode;
  const employeedetails = employee.find(
    (emp) => emp.employeeCode === employeecode1
  );

  const handlesubmit = (index) => {
    const bill = bills[index];
    postRequest(ServerConfig.url, SAVE, {
      query: `INSERT INTO [dbo].[medicalslip]([Date_of_service],[Hospital_Name],[Amount],[Medicalbills],[pn_EmployeeID],[EmployeeCode],[Employee_Full_Name]) VALUES('${bill.dateofservice}', '${bill.hospital}', ${bill.amount}, '${bill.base64File}', ${employeedetails.pnEmployeeId}, '${employeecode1}', '${employeedetails.employeeFullName}')`,
    })
      .then((response) => {
        alert("Records inserted successfully");
      })
      .catch((error) => {
        console.error("Error inserting records:", error);
        alert("Failed to insert records");
      });
  };

  const addNewBillRow = () => {
    setBills([
      ...bills,
      { dateofservice: "", hospital: "", amount: "", base64File: "" },
    ]);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Medical Expenses
      </Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <TableContainer
            component={Paper}
            style={{
              width: "fit-content",
              marginRight: "40px",
              marginTop: "10px",
            }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: "blue",
                      textAlign: "center",
                      color: "white",
                      padding: "10px",
                      width: "400px",
                    }}>
                    Employee Details
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: "8px", width: "200px" }}>
                    Name:{" "}
                    {employeedetails
                      ? employeedetails.employeeFullName
                      : "No Name Available"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: "8px", width: "200px" }}>
                    Employee Code:{" "}
                    {employeedetails
                      ? employeedetails.employeeCode
                      : "No Name Available"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: "8px", width: "200px" }}>
                    Email:{" "}
                    {employeedetails
                      ? employeedetails.reportingEmail
                      : "No Name Available"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ padding: "8px", width: "200px" }}>
                    PanNo:{" "}
                    {employeedetails
                      ? employeedetails.panNo
                      : "No Name Available"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1100px",
          }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}>
                  MEDICAL EXPENSES
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}></TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}>
                  Date of Service
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}>
                  Physician or other Hospital
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}>
                  Amount
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}></TableCell>
                <TableCell
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "10px",
                    width: "200px",
                  }}>
                  Uploadbill
                </TableCell>
              </TableRow>
              {bills.map((bill, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormControl fullWidth>
                      <TextField
                        name="DateofService"
                        label="Enter Date"
                        variant="outlined"
                        fullWidth
                        required
                        value={bill.dateofservice}
                        onChange={(e) =>
                          setBills(
                            bills.map((b, i) =>
                              i === index
                                ? { ...b, dateofservice: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <TextField
                        name="Hospital"
                        label="Enter Hospital"
                        variant="outlined"
                        fullWidth
                        required
                        value={bill.hospital}
                        onChange={(e) =>
                          setBills(
                            bills.map((b, i) =>
                              i === index
                                ? { ...b, hospital: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <TextField
                        name="Amount"
                        label="Enter Amount"
                        variant="outlined"
                        fullWidth
                        required
                        value={bill.amount}
                        onChange={(e) =>
                          setBills(
                            bills.map((b, i) =>
                              i === index ? { ...b, amount: e.target.value } : b
                            )
                          )
                        }
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <input
                      type="file"
                      onChange={(e) => handleFileSelect(e, index)}
                    />
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlesubmit(index)}>
                        SUBMIT
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ marginLeft: "10px" }}
                        onClick={addNewBillRow}>
                        Add another bill
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
};

export default Medical;

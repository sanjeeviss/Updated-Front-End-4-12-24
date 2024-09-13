import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  Button,
} from "@mui/material";
import {
  TIMECARD,
  SHIFTMONTH,
  PAYMPAYBILL,
  PAYMEMPLOYEE,
  PAYMEMPLOYEEPROFILE1,
  REPORTS,
  PAYMEMPLOYEEWORKDETAILS,
} from "../../serverconfiguration/controllers";
import { useState, useEffect } from "react";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { useLocation } from "react-router-dom";
import generatePDF from "react-to-pdf";
import { useRef } from "react";

const OldPayslip = () => {
  const [data, setdata] = useState([]);
  const [finalsalary, setfinalsalary] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [employeeprofile, setemployeeprofile] = useState([]);
  const [totalsalary, setTotalSalary] = useState([{}]);
  const [employeework, setemployeework] = useState([]);

  const today = new Date().toLocaleDateString();

  const roundUpValue = (value, decimals = 2) => {
    const multiplier = Math.pow(10, decimals);
    return Math.ceil(value * multiplier) / multiplier;
  };

  const targetRef = useRef();

  function getMonthName(monthNumber) {
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return monthNames[monthNumber - 1];
  }

  const location = useLocation();

  const { pnEmployeeId, employeeCode, dDate, month, year } =
    location.state || {};

  console.log(getMonthName(month));

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMPAYBILL);
      setdata(data.data);
      const fs = await postRequest(ServerConfig.url, REPORTS, {
        query: `SELECT * FROM Final_Salary`,
      });
      setfinalsalary(fs.data);
      const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employee.data);
      const employeeprofile = await getRequest(
        ServerConfig.url,
        PAYMEMPLOYEEPROFILE1
      );
      setemployeeprofile(employeeprofile.data);
      const employeework = await getRequest(
        ServerConfig.url,
        PAYMEMPLOYEEWORKDETAILS
      );
      setemployeework(employeework.data);
      const totalsalary = await postRequest(ServerConfig.url, REPORTS, {
        query: `EXEC FinalSalaryCalculation2 @EmployeeCode = '${employeeCode}', @Month = ${month}, @Year = ${year}, @D_dates = '${dDate}'`,
      });
      setTotalSalary(totalsalary.data);
    }
    console.log(finalsalary);

    getData();
  }, [pnEmployeeId, employeeCode, month, year, dDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const employeeCode1 = employeeCode;
  const empId = pnEmployeeId;
  const d_date = dDate;

  const paympaybill = finalsalary.find(
    (emp) => emp.EmployeeCode == employeeCode1 && emp.d_date == d_date
  );
  const employeetable = employee.find(
    (emp) => emp.employeeCode == employeeCode1
  );
  const employeePtable = employeeprofile.find(
    (emp) => emp.pnEmployeeId == empId
  );
  const employeewtable = employeework.find((emp) => emp.pnEmployeeId == empId);

  return (
    <>
      <div ref={targetRef}>
        <Paper
          style={{
            padding: "20px",
            margin: "20px",
            border: "2px solid black",
          }}>
          <Typography variant="h4" align="center">
            {paympaybill ? paympaybill.CompanyName : "No Name Available"}
          </Typography>
          <Typography variant="subtitle1" align="center">
            {paympaybill ? paympaybill.Address_line1 : "No Name Available"},{" "}
            {paympaybill ? paympaybill.Address_Line2 : "No Name Available"},{" "}
            {paympaybill ? paympaybill.City : "No Name Available"},{" "}
            {paympaybill ? paympaybill.Zipcode : "No Name Available"}
          </Typography>
          <Typography variant="h6" align="center">
            SERVICE CARD CUM PAYSLIP FOR THE MONTH OF {getMonthName(month)}{" "}
            {year}
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="1fr auto 1fr"
            alignItems="center">
            <Box gridColumn="2">
              <Typography variant="h6" align="center">
                FORM XIX
              </Typography>
            </Box>
            <Box gridColumn="3" textAlign="right">
              <Typography variant="h6">Licence No.: CH 6934</Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "black",
              marginBottom: "20px",
            }}
          />

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={3} container direction="column" alignItems="left">
              <Typography variant="h6" align="left">
                Roll No.: 0001
              </Typography>
              <Typography variant="h6" align="left">
                Location: Adyar
              </Typography>
            </Grid>
            <Grid item xs={3} container direction="column" alignItems="center">
              <Typography variant="h6" align="center">
                Name:{" "}
                {paympaybill
                  ? paympaybill.Employee_First_Name
                  : "No Name Available"}
              </Typography>
              <Typography variant="h6" align="center">
                Designation:{" "}
                {paympaybill
                  ? paympaybill.DesignationName
                  : "No Name Available"}{" "}
              </Typography>
              <Typography variant="h6" align="center">
                F / H's Name:{" "}
                {employeePtable
                  ? employeePtable.fatherName
                  : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" align="right">
                Month of Pay: {month}
              </Typography>
              <Typography variant="h6" align="right">
                Date of Birth:{" "}
                {employeetable
                  ? formatDate(employeetable.dateofBirth)
                  : "No Date Available"}
              </Typography>
              <Typography variant="h6" align="right">
                Date of Joining:{" "}
                {employeewtable
                  ? formatDate(employeewtable.joiningDate)
                  : "No Name Available"}{" "}
              </Typography>
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "black",
              marginTop: "20px",
            }}
          />

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginTop={"20px"}>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Calc Days:{" "}
                {paympaybill ? paympaybill.Calc_Days : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Paid Days:{" "}
                {paympaybill ? paympaybill.Paid_Days : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Prs Days:{" "}
                {paympaybill ? paympaybill.Present_Days : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Abs Days:{" "}
                {paympaybill ? paympaybill.Absent_Days : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Leave Days:{" "}
                {paympaybill ? paympaybill.TotLeave_Days : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Holidays:{" "}
                {paympaybill ? paympaybill.Holidays : "No Name Available"}
              </Typography>
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "20px" }}>
                Weekoff Days:{" "}
                {paympaybill ? paympaybill.WeekOffDays : "No Name Available"}
              </Typography>
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "black",
              marginTop: "30px",
            }}
          />

          <TableContainer component={Paper} style={{ marginTop: "30px" }}>
            <Table>
              <TableHead>
                <TableRow style={{ border: "3px solid black" }}>
                  <TableCell
                    style={{ border: "3px solid black", fontSize: "18px" }}>
                    Rate of Pay
                  </TableCell>
                  <TableCell
                    style={{ border: "3px solid black", fontSize: "18px" }}>
                    Earnings
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>Deductions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ border: "3px solid black" }}>
                <TableRow>
                  <TableCell style={{ border: "3px solid black" }}>
                    <Typography style={{ fontSize: "18px" }}>
                      BASIC PAY:{" "}
                      {paympaybill
                        ? roundUpValue(paympaybill.Act_Basic)
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      HRA:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Act_Basic * (paympaybill.value1 / 100)
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      OTHER ALLOWANCE:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.value2 +
                              paympaybill.value3 +
                              paympaybill.value4 +
                              paympaybill.value5 +
                              paympaybill.value6 +
                              paympaybill.value7 +
                              paympaybill.value8 +
                              paympaybill.value9 +
                              paympaybill.value10
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ marginTop: "50px", fontSize: "18px" }}>
                      Actual Salary:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Act_Basic +
                              paympaybill.Act_Basic *
                                (paympaybill.value1 / 100) +
                              paympaybill.value2 +
                              paympaybill.value3 +
                              paympaybill.value4 +
                              paympaybill.value5 +
                              paympaybill.value6 +
                              paympaybill.value7 +
                              paympaybill.value8 +
                              paympaybill.value9 +
                              paympaybill.value10
                          )
                        : "No Name Available"}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    <Typography style={{ fontSize: "18px" }}>
                      EARNED BASIC:{" "}
                      {paympaybill
                        ? roundUpValue(paympaybill.Earned_Basic)
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      HRA:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Act_Basic * (paympaybill.value1 / 100)
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      OTHER ALLOWANCE:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.value2 +
                              paympaybill.value3 +
                              paympaybill.value4 +
                              paympaybill.value5 +
                              paympaybill.value6 +
                              paympaybill.value7 +
                              paympaybill.value8 +
                              paympaybill.value9 +
                              paympaybill.value10
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ marginTop: "50px", fontSize: "18px" }}>
                      Total Earnings:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Earned_Basic +
                              paympaybill.Act_Basic *
                                (paympaybill.value1 / 100) +
                              paympaybill.value2 +
                              paympaybill.value3 +
                              paympaybill.value4 +
                              paympaybill.value5 +
                              paympaybill.value6 +
                              paympaybill.value7 +
                              paympaybill.value8 +
                              paympaybill.value9 +
                              paympaybill.value10
                          )
                        : "No Name Available"}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontSize: "18px" }}>
                      PF:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Act_Basic * (paympaybill.EPF / 100)
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      ESI:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Gross_salary *
                              (paympaybill.valueA1 / 100)
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Other Deductions:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.valueA2 +
                              paympaybill.valueA3 +
                              paympaybill.valueA4 +
                              paympaybill.valueA5 +
                              paympaybill.valueA6 +
                              paympaybill.valueA7 +
                              paympaybill.valueA8 +
                              paympaybill.valueA9 +
                              paympaybill.valueA10
                          )
                        : "No Name Available"}
                    </Typography>
                    <Typography style={{ marginTop: "50px", fontSize: "18px" }}>
                      Total Deductions:{" "}
                      {paympaybill
                        ? roundUpValue(
                            paympaybill.Act_Basic * (paympaybill.EPF / 100) +
                              paympaybill.Gross_salary *
                                (paympaybill.valueA1 / 100) +
                              paympaybill.valueA2 +
                              paympaybill.valueA3 +
                              paympaybill.valueA4 +
                              paympaybill.valueA5 +
                              paympaybill.valueA6 +
                              paympaybill.valueA7 +
                              paympaybill.valueA8 +
                              paympaybill.valueA9 +
                              paympaybill.valueA10
                          )
                        : "No Name Available"}{" "}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow style={{ border: "3px solid black" }}>
                  <TableCell style={{ fontSize: "18px" }}>
                    GrossPay:{" "}
                    {paympaybill
                      ? paympaybill.Gross_salary
                      : "No Name Available"}{" "}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Netpay: {totalsalary[0].MonthlySalary}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginTop={"20px"}>
            <Grid item xs={4} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "18px" }}>
                Pay Date :{" "}
              </Typography>
            </Grid>
            <Grid item xs={4} container direction="column" alignItems="center">
              <Typography align="left" style={{ fontSize: "18px" }}>
                Employer Signature
              </Typography>
            </Grid>
            <Grid item xs={4} container direction="column" alignItems={"right"}>
              <Typography align="right" style={{ fontSize: "18px" }}>
                Employee Signature
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}>
        <Button
          variant="contained"
          onClick={() => generatePDF(targetRef, { filename: "Payslip.pdf" })}
          style={{ marginLeft: "770px" }}>
          Download Pdf
        </Button>
      </Box>
    </>
  );
};

export default OldPayslip;

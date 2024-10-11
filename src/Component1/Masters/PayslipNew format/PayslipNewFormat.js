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
  FormControlLabel,
  Checkbox,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  PAYMPAYBILL,
  PAYMEMPLOYEE,
  PAYMEMPLOYEEPROFILE1,
  REPORTS,
  PAYMEMPLOYEEWORKDETAILS,
} from "../../../serverconfiguration/controllers";
import { useState, useEffect } from "react";
// import { ServerConfig } from "../../../serverconfiguration/serverconfig";
// import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
// import { useLocation } from "react-router-dom";
import generatePDF from "react-to-pdf";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const PayslipNewFormat = (props) => {
  const targetRef = useRef();

  const [showName, setShowName] = useState(true);
  const [showDesignation, setShowDesignation] = useState(true);
  const [showcompanyname, setshowcompanyname] = useState(true);
  const [showaddressname, setshowaddressname] = useState(true);
  const [showmonth, setshowmonth] = useState(true);
  const [licence, setlicence] = useState(true);
  const [form, setform] = useState(true);
  const [rollNo, setRollno] = useState(true);
  const [location1, setlocation] = useState(true);
  const [monthofpay, setMonthofpay] = useState(true);
  const [dateofbirth, setDateofbirth] = useState(true);
  const [calcDays, setCalcdays] = useState(true);
  const [paidDays, setPaiddays] = useState(true);
  const [prsDays, setPrsdays] = useState(true);
  const [absentDays, setAbsentdays] = useState(true);
  const [leavedays, setLeavedays] = useState(true);
  const [Holidays, setHolidays] = useState(true);
  const [weekOffDays, setWeekoffdays] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {setDrawerOpen(!drawerOpen);};
  const handleNameChange = (event) => {setShowName(event.target.checked);};
  const handleDesignationChange = (event) => {setShowDesignation(event.target.checked);};
  const handlecompanynamechange = (event) => {setshowcompanyname(event.target.checked);};
  const handleadressname = (event) => {setshowaddressname(event.target.checked);};
  const handlemonthname = (event) => {setshowmonth(event.target.checked);};
  const handlelicence = (event) => {setlicence(event.target.checked);};
  const handleform = (event) => {setform(event.target.checked);};
  const handlerollno = (event) => {setRollno(event.target.checked);};
  const handlelocation = (event) => {setlocation(event.target.checked);};
  const handlemonthofpay = (event) => {setMonthofpay(event.target.checked);};
  const handledob = (event) => {setDateofbirth(event.target.checked);};
  const handlecalcdays = (event) => {setCalcdays(event.target.checked);};
  const handlepaiddays = (event) => {setPaiddays(event.target.checked);};
  const handleprsdays = (event) => {setPrsdays(event.target.checked);};
  const handleAbsdays = (event) => {setAbsentdays(event.target.checked);};
  const handleleavedays = (event) => {setLeavedays(event.target.checked);};
  const handleHolidays = (event) => {setHolidays(event.target.checked);};
  const handleweekoffdays = (event) => {setWeekoffdays(event.target.checked);};

  

  // const today = new Date().toLocaleDateString();

  // function getMonthName(monthNumber) {
  //   const monthNames = [
  //     "JANUARY",
  //     "FEBRUARY",
  //     "MARCH",
  //     "APRIL",
  //     "MAY",
  //     "JUNE",
  //     "JULY",
  //     "AUGUST",
  //     "SEPTEMBER",
  //     "OCTOBER",
  //     "NOVEMBER",
  //     "DECEMBER",
  //   ];
  //   return monthNames[monthNumber - 1];
  // }

  // const location = useLocation();

  // const { pnEmployeeId, employeeCode, dDate, month, year } =
  //   location.state || {};

  // useEffect(() => {
  //   async function getData() {
  //     const data = await getRequest(ServerConfig.url, PAYMPAYBILL);
  //     setdata(data.data);
  //     const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
  //     setEmployee(employee.data);
  //     const employeeprofile = await getRequest(
  //       ServerConfig.url,
  //       PAYMEMPLOYEEPROFILE1
  //     );
  //     setemployeeprofile(employeeprofile.data);
  //     const employeework = await getRequest(
  //       ServerConfig.url,
  //       PAYMEMPLOYEEWORKDETAILS
  //     );
  //     setemployeework(employeework.data);
  //     const totalsalary = await postRequest(ServerConfig.url, REPORTS, {
  //       query: `EXEC FinalSalaryCalculation2 @EmployeeCode = '${employeeCode}', @Month = ${month}, @Year = ${year}, @D_dates = '${dDate}'`,
  //     });
  //     setTotalSalary(totalsalary.data);
  //   }
  //   console.log(totalsalary);

  //   getData();
  // }, [pnEmployeeId, employeeCode, month, year, dDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // const employeeCode1 = employeeCode;
  // const empId = pnEmployeeId;
  // const d_date = dDate;

  // const paympaybill = data.find(
  //   (emp) => emp.employeeCode == employeeCode1 && emp.dDate == d_date
  // );
  // const employeetable = employee.find(
  //   (emp) => emp.employeeCode == employeeCode1
  // );
  // const employeePtable = employeeprofile.find(
  //   (emp) => emp.pnEmployeeId == empId
  // );
  // const employeewtable = employeework.find((emp) => emp.pnEmployeeId == empId);

  return (
    <>
  
  <div ref={targetRef} style={{ maxWidth: "1250px", margin: "0 auto", padding: "20px" }}>
     
  <Paper
        style={{
          padding: "20px",
          margin: "20px",
          border: "2px solid black",
          maxWidth: "1250px", // Adjust the width as needed
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
    
           <Box display="flex" justifyContent="flex-end">
      <IconButton onClick={handleDrawerToggle} color="primary">
          <Typography
            variant="subtitle1"
            color="textPrimary"
            style={{ fontSize: "18px" }}
          >
            Preferences
          </Typography>
          <MenuIcon style={{ marginLeft: "5px" }} />
        </IconButton>
         </Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          PaperProps={{
            sx: {
              width: 280,
              padding: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5f5f5", // Light background for better contrast
            },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Choose Headers
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" flexDirection="column" alignItems="flex-start">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showName}
                      onChange={handleNameChange}
                      name="showName"
                    />
                  }
                  label="Name"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showDesignation}
                      onChange={handleDesignationChange}
                      name="showDesignation"
                    />
                  }
                  label="Designation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showcompanyname}
                      onChange={handlecompanynamechange}
                      name="showCompanyName"
                    />
                  }
                  label="CompanyName"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showaddressname}
                      onChange={handleadressname}
                      name="showaddressName"
                    />
                  }
                  label="AddressName"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showmonth}
                      onChange={handlemonthname}
                      name="showMonthYearName"
                    />
                  }
                  label="MonthYear"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={licence}
                      onChange={handlelicence}
                      name="showlicence"
                    />
                  }
                  label="Licence"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form}
                      onChange={handleform}
                      name="showform"
                    />
                  }
                  label="Form"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rollNo}
                      onChange={handlerollno}
                      name="showrollno"
                    />
                  }
                  label="Rollno"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={location1}
                      onChange={handlelocation}
                      name="showlocation"
                    />
                  }
                  label="Location"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={monthofpay}
                      onChange={handlemonthofpay}
                      name="showMOP"
                    />
                  }
                  label="MonthofPay"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dateofbirth}
                      onChange={handledob}
                      name="showDOB"
                    />
                  }
                  label="DateofBirth"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={calcDays}
                      onChange={handlecalcdays}
                      name="showCalcdays"
                    />
                  }
                  label="Calculated Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={paidDays}
                      onChange={handlepaiddays}
                      name="showPaiddays"
                    />
                  }
                  label="Paid Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={prsDays}
                      onChange={handleprsdays}
                      name="showprsdays"
                    />
                  }
                  label="Present Days"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={absentDays}
                      onChange={handleAbsdays}
                      name="showabsdays"
                    />
                  }
                  label="Absent Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={leavedays}
                      onChange={handleleavedays}
                      name="showleavedays"
                    />
                  }
                  label="Leave Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Holidays}
                      onChange={handleHolidays}
                      name="showholidays"
                    />
                  }
                  label="Holidays"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekOffDays}
                      onChange={handleweekoffdays}
                      name="showWeekoffdays"
                    />
                  }
                  label="Weekoffdays"
                />
              </Box>
              <Divider sx={{ mb: 5 }} />
           
        </Drawer>

          {showcompanyname && (
            <Typography variant="h4" align="center">
              {props.companyname}
            </Typography>
          )}
          {showaddressname && (
            <Typography variant="subtitle1" align="center">
              {props.Address1},{props.Address2},{props.city},{props.zipcode}
            </Typography>
          )}
          {showmonth && (
            <Typography variant="h6" align="center">
              SERVICE CARD CUM PAYSLIP FOR THE MONTH OF {props.Month}, {props.Year}
            </Typography>
          )}
          <Box
            display="grid"
            gridTemplateColumns="1fr auto 1fr"
            alignItems="center"
          >
            <Box gridColumn="2">
              {form && (
                <Typography variant="h6" align="center">
                  FORM XIX
                </Typography>
              )}
            </Box>
            <Box gridColumn="3" textAlign="right">
              {licence && (
                <Typography variant="h6">Licence No: CH 0001</Typography>
              )}
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
            alignItems="center"
          >
            <Grid item xs={3} container direction="column" alignItems="left">
              {rollNo && (
                <Typography variant="h6" align="left">
                  Roll No.: {props.EmpNo}
                </Typography>
              )}
              {location1 && (
                <Typography variant="h6" align="left">
                  Location: {props.Location}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} container direction="column" alignItems="center">
              {showName && (
                <Typography variant="h6" align="center">
                  Name: {props.Name}
                </Typography>
              )}
              {showDesignation && (
                <Typography variant="h6" align="center">
                  Designation: {props.Designation}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              {monthofpay && (
                <Typography variant="h6" align="right">
                  Month of Pay: {props.MonthOfPay}
                </Typography>
              )}
              {dateofbirth && (
                <Typography variant="h6" align="right">
                  Date of Birth: {formatDate(props.DateOfBirth)}
                </Typography>
              )}
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
            marginTop={"20px"}
          >
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {calcDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Calc Days: {props.CalcDays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {paidDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Paid Days: {props.Paiddays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {prsDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Prs Days: {props.Presentdays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {absentDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Abs Days: {props.Absentdays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {leavedays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Leave Days: {props.Leavedays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {Holidays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Holidays: {props.Holidays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {weekOffDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Weekoff Days: {props.Weekoffdays}
                </Typography>
              )}
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
                    style={{ border: "3px solid black", fontSize: "18px" }}
                  >
                    Rate of Pay
                  </TableCell>
                  <TableCell
                    style={{ border: "3px solid black", fontSize: "18px" }}
                  >
                    Earnings
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>Deductions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ border: "3px solid black" }}>
                <TableRow>
                  <TableCell style={{ border: "3px solid black" }}>
                    {/* Allowances and Values */}
                    {[
                      { allowance: "BASIC PAY", value: props.BasicMR },
                      { allowance: props.Allowance1, value: props.Value1MR },
                      { allowance: props.Allowance2, value: props.Value2MR },
                      { allowance: props.Allowance3, value: props.Value3MR },
                      { allowance: props.Allowance4, value: props.Value4MR },
                      { allowance: props.Allowance5, value: props.Value5MR },
                      { allowance: props.Allowance6, value: props.Value6MR },
                      { allowance: props.Allowance7, value: props.Value7MR },
                      { allowance: props.Allowance8, value: props.Value8MR },
                      { allowance: props.Allowance9, value: props.Value9MR },
                      { allowance: props.Allowance10, value: props.Value10MR },
                    ].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <Typography style={{ fontSize: "18px" }}>
                          {item.allowance}
                        </Typography>
                        <Typography style={{ fontSize: "18px" }}>
                          {item.value}
                        </Typography>
                      </div>
                    ))}

                    {/* Actual Salary */}
                    <Typography
                      style={{
                        marginTop: "50px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Actual Salary: ₹ {props.GrossEarnings}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    {/* Allowances and Values */}
                    {[
                      { allowance: "EARNED BASIC", value: props.BasicCM },
                      { allowance: props.Allowance1, value: props.Value1CM },
                      { allowance: props.Allowance2, value: props.Value2CM },
                      { allowance: props.Allowance3, value: props.Value3CM },
                      { allowance: props.Allowance4, value: props.Value4CM },
                      { allowance: props.Allowance5, value: props.Value5CM },
                      { allowance: props.Allowance6, value: props.Value6CM },
                      { allowance: props.Allowance7, value: props.Value7CM },
                      { allowance: props.Allowance8, value: props.Value8MR },
                      { allowance: props.Allowance9, value: props.Value9MR },
                      { allowance: props.Allowance10, value: props.Value10MR },
                    ].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <Typography style={{ fontSize: "18px" }}>
                          {item.allowance}
                        </Typography>
                        <Typography style={{ fontSize: "18px" }}>
                          {item.value}
                        </Typography>
                      </div>
                    ))}

                    {/* Total Earnings */}
                    <Typography
                      style={{
                        marginTop: "50px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Total Earnings: ₹ {props.TotalEarnings}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    {/* PF and Deductions */}
                    {[
                      { label: "PF", value: props.PF },
                      { label: props.Deduction1, value: props.Deduction1total },
                      { label: props.Deduction2, value: props.Deduction2total },
                      { label: props.Deduction3, value: props.Deduction3total },
                      { label: props.Deduction4, value: props.Deduction4total },
                      { label: props.Deduction5, value: props.Deduction5total },
                      { label: props.Deduction6, value: props.Deduction6total },
                      { label: props.Deduction7, value: props.Deduction7total },
                      { label: props.Deduction8, value: props.Deduction8total },
                      { label: props.Deduction9, value: props.Deduction9total },
                      {
                        label: props.Deduction10,
                        value: props.Deduction10total,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "5px",
                        }}
                      >
                        <Typography style={{ fontSize: "18px" }}>
                          {item.label}
                        </Typography>
                        <Typography style={{ fontSize: "18px" }}>
                          {item.value}
                        </Typography>
                      </div>
                    ))}

                    {/* Total Deductions */}
                    <Typography
                      style={{
                        marginTop: "50px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Total Deductions: ₹ {props.TotalDeductions}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow style={{ border: "3px solid black" }}>
                  <TableCell style={{ fontSize: "18px" }}>
                    GrossPay: ₹ {props.GrossEarnings}{" "}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Netpay: ₹ {props.NetSalaryPayable}
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
            marginTop={"20px"}
          >
            <Grid item xs={4} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "18px" }}>
                Pay Date : {formatDate(props.ddate)}
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
  justifyContent="center"
  alignItems="center"
  mt={2}
>
  <Button
    variant="contained"
    color="primary"
    size="small"
  >
    Save
  </Button>
  <Button
    variant="contained"
    onClick={() => generatePDF(targetRef, { filename: "Payslip.pdf" })}
    size="small"
    style={{ marginLeft: "5px" }}
  >
    Download Pdf
  </Button>
</Box>      
    </>
  );
};

export default PayslipNewFormat;

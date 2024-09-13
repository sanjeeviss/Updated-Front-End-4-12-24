import {
  TableContainer,
  Paper,
  Box,
  Typography,
  Grid,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Checkbox,
  IconButton,
  Drawer,
  FormControlLabel,
  Divider, Button
} from "@mui/material";

import { useEffect, useState, useRef } from "react";
import generatePDF from "react-to-pdf";
import MenuIcon from "@mui/icons-material/Menu";

export default function PaySlipTemplate(props) {
  const targetRef = useRef();
  const [showName, setShowName] = useState(true);
  const [showcompanyname, setshowcompanyname] = useState(true);
  const [showmonth, setshowmonth] = useState(true);
  const [rollNo, setRollno] = useState(true);
  const [monthofpay, setMonthofpay] = useState(true);
  const [dateofbirth, setDateofbirth] = useState(true);
  const [dateofjoining, setDateofjoining] = useState(true);
  const [calcDays, setCalcdays] = useState(true);
  const [paidDays, setPaiddays] = useState(true);
  const [prsDays, setPrsdays] = useState(true);
  const [absentDays, setAbsentdays] = useState(true);
  const [leavedays, setLeavedays] = useState(true);
  const [Holidays, setHolidays] = useState(true);
  const [weekOffDays, setWeekoffdays] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDrawerToggle = () => {setDrawerOpen(!drawerOpen);};
  const handleNameChange = (event) => {setShowName(event.target.checked);};
  const handlecompanynamechange = (event) => {setshowcompanyname(event.target.checked);};
  const handlemonthname = (event) => {setshowmonth(event.target.checked);};
  const handlerollno = (event) => {setRollno(event.target.checked);};
  const handlemonthofpay = (event) => {setMonthofpay(event.target.checked);};
  const handledob = (event) => {setDateofbirth(event.target.checked);};
  const handledoj = (event) => {setDateofjoining(event.target.checked);};
  const handlecalcdays = (event) => {setCalcdays(event.target.checked);}; 
  const handlepaiddays = (event) => {setPaiddays(event.target.checked);};
  const handleprsdays = (event) => {setPrsdays(event.target.checked);};
  const handleAbsdays = (event) => {setAbsentdays(event.target.checked);};
  const handleleavedays = (event) => {setLeavedays(event.target.checked);};
  const handleHolidays = (event) => {setHolidays(event.target.checked);};
  const handleweekoffdays = (event) => {setWeekoffdays(event.target.checked);};

  const styleobj = {
    header: {
      fontSize: "30px",
      border: "2px solid black",
      width: "990px",
      align: "center",
    },
    container: { maxWidth: "1100px", margin: "auto", padding: "10px" },
    tablecontainer: {
      maxWidth: "1100px",
      margin: "auto",
      padding: "10px",
    },
    tablebox: {
      border: "4px solid black",
      borderRadius: "1px",
      padding: "10px",
    },
    tablecell: { borderRight: "4px solid black" },
    tablebox1: {
      marginTop: "20px",
      border: "4px solid black",
      borderColor: "black",
      borderRadius: "1px",
      padding: "10px",
    },
    table: {
      marginTop: "20px",
    },
    tablehead: {
      border: "4px solid black",
    },
    tablerow: {
      border: "4px solid black",
    },
    tablebody: {
      border: "4px solid black",
    },
    typo: {
      marginTop: "16px",
    },
  };

  const renderRow = (
    allowance,
    valueMR,
    valueCM,
    valueTotal,
    deduction,
    deductionTotal
  ) => {
    if (
      valueMR > 0 ||
      valueCM > 0 ||
      valueTotal > 0 ||
      deduction > 0 ||
      deductionTotal > 0
    ) {
      return (
        <TableRow>
          <TableCell style={styleobj.tablecell}>
            <strong>{allowance}</strong>
          </TableCell>
          <TableCell style={styleobj.tablecell}>
            <strong>{valueMR}</strong>
          </TableCell>
          <TableCell style={styleobj.tablecell}>
            <strong>{valueCM}</strong>
          </TableCell>
          <TableCell style={styleobj.tablecell}>
            <strong>{valueTotal}</strong>
          </TableCell>
          <TableCell style={styleobj.tablecell}>
            <strong>{deduction}</strong>
          </TableCell>
          <TableCell style={styleobj.tablecell}>
            <strong>{deductionTotal}</strong>
          </TableCell>
        </TableRow>
      );
    }
    return null;
  };

  return (
    <>   
    <div style={styleobj.container} ref={targetRef}>
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
                    checked={dateofjoining}
                    onChange={handledoj}
                    name="showDOJ"
                  />
                }
                label="DateofJoining"
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
            <Divider sx={{ mb: 2 }} />
       
      </Drawer>

      <TableContainer component={Paper} style={styleobj.container}>
        <Box style={styleobj.tablebox}>
          {showcompanyname && (
            <Typography variant="h5" align="center" gutterBottom>
              {props.companyname}
            </Typography>
          )}
          {showmonth && (
            <Typography variant="h6" align="center" gutterBottom>
              Payslip for the month of {props.Month}, 2024
            </Typography>
          )}
        </Box>
        <Box style={styleobj.tablebox1}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {rollNo && (
                <Typography variant="body1">
                  <strong>Emp No: {props.EmpNo}</strong>
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              {" "}
              {showName && (
                <Typography variant="body1">
                  <strong>Name: {props.Name}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {monthofpay && (
                <Typography variant="body1">
                  <strong>Month Of Pay: {props.MonthOfPay}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {dateofbirth && (
                <Typography variant="body1">
                  <strong>
                    {" "}
                    Date Of Birth: {formatDate(props.DateOfBirth)}
                  </strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {dateofjoining && (
                <Typography variant="body1">
                  <strong>Work From Home: {props.WorkFromHome}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {calcDays && (
                <Typography variant="body1">
                  <strong>Calc Days: {props.CalcDays}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {paidDays && (
                <Typography variant="body1">
                  <strong>Paid days: {props.Paiddays}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {prsDays && (
                <Typography variant="body1">
                  <strong>Present days: {props.Presentdays}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {absentDays && (
                <Typography variant="body1">
                  <strong>Absent days: {props.Absentdays}</strong>{" "}
                </Typography>
              )}{" "}
            </Grid>{" "}
            <Grid item xs={4}>
              {" "}
              {leavedays && (
                <Typography variant="body1">
                  <strong>Leave days: {props.Leavedays}</strong>{" "}
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              {Holidays && (
                <Typography variant="body1">
                  <strong> Holidays: {props.Holidays}</strong>
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              {weekOffDays && (
                <Typography variant="body1">
                  <strong>Weekoffdays: {props.Weekoffdays}</strong>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        <Table
          size="small"
          aria-label="earnings and deductions"
          style={styleobj.table}
        >
          <TableHead style={styleobj.tablehead}>
            <TableRow style={styleobj.tablerow}>
              <TableCell style={styleobj.tablecell}>
                <strong>Earnings</strong>
              </TableCell>
              <TableCell style={styleobj.tablecell}>
                <strong>Monthly Rate</strong>
              </TableCell>
              <TableCell style={styleobj.tablecell}>
                <strong>Current Month</strong>
              </TableCell>
              <TableCell style={styleobj.tablecell}>
                <strong>Total</strong>
              </TableCell>
              <TableCell style={styleobj.tablecell}>
                <strong>Deductions</strong>
              </TableCell>
              <TableCell style={styleobj.tablecell}>
                <strong>Total</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={styleobj.tablebody}>
            {renderRow(
              props.Allowance1,
              props.Value1MR,
              props.Value1CM,
              props.Value1total,
              props.Deduction1,
              props.Deduction1total
            )}
            {renderRow(
              props.Allowance2,
              props.Value2MR,
              props.Value2CM,
              props.Value2total,
              props.Deduction2,
              props.Deduction2total
            )}
            {renderRow(
              props.Allowance3,
              props.Value3MR,
              props.Value3CM,
              props.Value3total,
              props.Deduction3,
              props.Deduction3total
            )}
            {renderRow(
              props.Allowance4,
              props.Value4MR,
              props.Value4CM,
              props.Value4total,
              props.Deduction4,
              props.Deduction4total
            )}
            {renderRow(
              props.Allowance5,
              props.Value5MR,
              props.Value5CM,
              props.Value5total,
              props.Deduction5,
              props.Deduction5total
            )}
            {renderRow(
              props.Allowance6,
              props.Value6MR,
              props.Value6CM,
              props.Value6total,
              props.Deduction6,
              props.Deduction6total
            )}
            {renderRow(
              props.Allowance7,
              props.Value7MR,
              props.Value7CM,
              props.Value7total,
              props.Deduction7,
              props.Deduction7total
            )}
            {renderRow(
              props.Allowance8,
              props.Value8MR,
              props.Value8CM,
              props.Value8total,
              props.Deduction8,
              props.Deduction8total
            )}
            {renderRow(
              props.Allowance9,
              props.Value9MR,
              props.Value9CM,
              props.Value9total,
              props.Deduction9,
              props.Deduction9total
            )}
            {renderRow(
              props.Allowance10,
              props.Value10MR,
              props.Value10CM,
              props.Value10total,
              props.Deduction10,
              props.Deduction10total
            )}

            <TableRow style={styleobj.tablerow}>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <strong>Gross Earnings</strong>
              </TableCell>
              <TableCell>
                <strong>₹ {props.GrossEarnings}</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow style={styleobj.tablerow}>
              <TableCell colSpan={4}>
                <strong>Net Salary Payable</strong>
              </TableCell>
              <TableCell>
                <strong>₹ {props.NetSalaryPayable}</strong>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={8}>
                <strong>
                  Net Salary Payable (In words): ₹{" "}
                  {props.NetSalaryPayableInWords}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  mt={2}
>
<Button
    variant="contained"
    onClick={() => generatePDF(targetRef, { filename: "PayTabular.pdf" })}
    size="small"
    style={{ marginLeft: "5px" }}
  >
    Download Pdf
  </Button>
  </Box>
    </>

  );
}

import {
  Container,
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Grid,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableContainer,
  FormControlLabel,
  Checkbox,
  Drawer,
  IconButton,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import generatePDF from "react-to-pdf";
import { useRef, useState } from "react";

import { Fragment } from "react";

export default function PaySlipFormTemplate(props) {
  const targetRef = useRef();
  const [showName, setShowName] = useState(true);
  const [showDesignation, setShowDesignation] = useState(true);
  const [showcompanyname, setshowcompanyname] = useState(true);
  const [showaddressname, setshowaddressname] = useState(true);
  const [showmonth, setshowmonth] = useState(true);
  const [rollNo, setRollno] = useState(true);
  const [location1, setlocation] = useState(true);
  const [fathersn, setfathersname] = useState(true);
  const [Dateofjoining, setdoj] = useState(true);
  const [DateofBirth, setdob] = useState(true);
  const [payperiod, setpayperiod] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const styleobj = {
    container: {
      fontSize: "14px",
    },

    card: {
      padding: "20px",
      width: "793px", // Set the width to A4 size in pixels
      height: "1425px", // Set the height to A4 size in pixels, 1122px is approximately 297mm
      margin: "0 auto", // Center the card
      boxSizing: "border-box" // Ensure padding and border are included in the width and height
    },

    header: {
      fontSize: "16px",
    },

    body: {
      fontSize: "20px",
    },
    empnetpay: {
      fontSize: "20px",
      marginLeft: "32px",
    },

    head: {
      fontSize: "30px",
    },

    divider: {
      backgroundColor: "#2E8AB1",
      marginTop: "10px",
      height: "2px",
    },

    tablecellhead: {
      fontSize: "18px",
      border: "2px solid black",
      width: "33.33%",
    },

    emppaysummary: {
      fontSize: "26px",
    },

    netpay: {
      fontSize: "30px",
      marginLeft: "38px",
    },

    tablecell: {
      border: "2px solid black",
    },

    typo: {
      fontSize: "20px",
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  // Your existing handler functions
  const handleNameChange = (event) => setShowName(event.target.checked);
  const handleDesignationChange = (event) =>
    setShowDesignation(event.target.checked);
  const handlecompanynamechange = (event) =>
    setshowcompanyname(event.target.checked);
  const handleadressname = (event) => setshowaddressname(event.target.checked);
  const handlemonthname = (event) => setshowmonth(event.target.checked);
  const handlerollno = (event) => setRollno(event.target.checked);
  const handlelocation = (event) => setlocation(event.target.checked);
  const handledoj = (event) => setdoj(event.target.checked);
  const handledob = (event) => setdob(event.target.checked);
  const handlepayperiod = (event) => setpayperiod(event.target.checked);

  return (
    <>
    <center>
      <div style={styleobj.container} ref={targetRef}>
     
        <Container maxWidth="md" style={styleobj.container}>
          <Card style={styleobj.card}>
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
              label="Company Name"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showaddressname}
                  onChange={handleadressname}
                  name="showaddressName"
                />
              }
              label="Address"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showmonth}
                  onChange={handlemonthname}
                  name="showMonth"
                />
              }
              label="Month/Year"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rollNo}
                  onChange={handlerollno}
                  name="showRollNo"
                />
              }
              label="Employee Code"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={location1}
                  onChange={handlelocation}
                  name="showLocation"
                />
              }
              label="Location"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={Dateofjoining}
                  onChange={handledoj}
                  name="showDoj"
                />
              }
              label="Date Of Joining"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={DateofBirth}
                  onChange={handledob}
                  name="showDob"
                />
              }
              label="Date Of Birth"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={payperiod}
                  onChange={handlepayperiod}
                  name="showPayPeriod"
                />
              }
              label="Pay Period"
            />
          </Box>
          <Divider sx={{ mb: 2 }} />
        </Drawer>
            <CardContent>
              <Box textAlign="left" marginLeft={"20px"} mb={2}>
                {showcompanyname && (
                  <Typography
                    variant="h5"
                    color="primary"
                    style={styleobj.head}
                  >
                    {props.companyname}
                  </Typography>
                )}
                {showaddressname && (
                  <Typography variant="subtitle1">
                    {props.Address1}, {props.Address2}, {props.city},{" "}
                    {props.zipcode}
                  </Typography>
                )}
                <Divider style={styleobj.divider} />
              </Box>
              <Box textAlign="left" marginLeft={"20px"} mb={2}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12}>
                    {showmonth && (
                      <Typography variant="h6" gutterBottom>
                        Payslip for the month of {props.Month}, 2020
                      </Typography>
                    )}
                    <Typography
                      variant="h6"
                      color="primary"
                      align="left"
                      style={styleobj.emppaysummary}
                    >
                      EMPLOYEE PAY SUMMARY
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {showName && (
                      <Typography
                        variant="body1"
                        align="left"
                        style={styleobj.typo}
                      >
                        <strong>Employee Name:</strong> {props.Name}
                      </Typography>
                    )}
                    {rollNo && (
                      <Typography
                        variant="body1"
                        align="left"
                        style={styleobj.typo}
                      >
                        <strong>Employee Code:</strong> {props.EmpNo}
                      </Typography>
                    )}
                    {showDesignation && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong>Designation:</strong> {props.Designation}
                      </Typography>
                    )}

                    {Dateofjoining && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Date of Joining:</strong>{" "}
                        {formatDate(props.DateOfJoining)}
                      </Typography>
                    )}
                    {DateofBirth && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Date of Birth:</strong>{" "}
                        {formatDate(props.DateOfBirth)}
                      </Typography>
                    )}
                    {payperiod && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Pay Period:</strong> {formatDate(props.ddate)}
                      </Typography>
                    )}
                    {location1 && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Location:</strong> {props.Location}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" style={styleobj.empnetpay}>
                      Employee Net Pay
                    </Typography>
                    <Typography variant="h6" style={styleobj.netpay}>
                      <strong>₹{props.NetSalaryPayable}</strong>
                    </Typography>
                    <Typography variant="body1" style={styleobj.body}>
                      Paid Days: <strong>{props.Paiddays}</strong> | LOP Days:{" "}
                      <strong>{props.Absentdays}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Divider style={styleobj.divider} />
              </Box>
              <Box textAlign="left" marginLeft={"20px"} mb={2}>
                <Fragment>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Earnings</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Amount</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { name: "Basic", value: props.BasicMR },
                          { name: props.Allowance1, value: props.Value1CM },
                          { name: props.Allowance2, value: props.Value2CM },
                          { name: props.Allowance3, value: props.Value3CM },
                          { name: props.Allowance4, value: props.Value4CM },
                          { name: props.Allowance5, value: props.Value5CM },
                          { name: props.Allowance6, value: props.Value6CM },
                          { name: props.Allowance7, value: props.Value7CM },
                          { name: props.Allowance8, value: props.Value8CM },
                          { name: props.Allowance9, value: props.Value9CM },
                          { name: props.Allowance10, value: props.Value10CM },
                        ]
                          .filter(
                            (item) =>
                              item.name && item.value && item.value !== 0
                          ) // Filter out rows with empty or zero values
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell style={styleobj.tablecell}>
                                <strong>{item.name}</strong>
                              </TableCell>
                              <TableCell style={styleobj.tablecell}>
                                <strong>{item.value}</strong>
                              </TableCell>
                            </TableRow>
                          ))}
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Gross Earnings</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong> ₹{props.GrossEarnings}</strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TableContainer
                    component={Paper}
                    style={{ marginTop: "20px" }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Deductions</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Amount</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { name: "PF", value: props.PF },
                          { name: props.Deduction1, value: props.Value1total },
                          {
                            name: props.Deduction2,
                            value: props.Deduction2total,
                          },
                          {
                            name: props.Deduction3,
                            value: props.Deduction3total,
                          },
                          {
                            name: props.Deduction4,
                            value: props.Deduction4total,
                          },
                          {
                            name: props.Deduction5,
                            value: props.Deduction5total,
                          },
                          {
                            name: props.Deduction6,
                            value: props.Deduction6total,
                          },
                          {
                            name: props.Deduction7,
                            value: props.Deduction7total,
                          },
                          {
                            name: props.Deduction8,
                            value: props.Deduction8total,
                          },
                          {
                            name: props.Deduction9,
                            value: props.Deduction9total,
                          },
                          {
                            name: props.Deduction10,
                            value: props.Deduction10total,
                          },
                        ]
                          .filter(
                            (item) =>
                              item.name && item.value && item.value !== 0
                          ) // Filter out rows with empty or zero values
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell style={styleobj.tablecell}>
                                <strong>{item.name}</strong>
                              </TableCell>
                              <TableCell style={styleobj.tablecell}>
                                <strong>{item.value}</strong>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Fragment>
                <Box mt={4}>
                  <Typography variant="body1">
                    NET PAY (Gross Earnings - Total Deductions)
                  </Typography>
                  <Typography variant="h6">
                    ₹{props.NetSalaryPayable}
                  </Typography>
                  <Typography variant="body1">
                    Total Net Payable: <strong>₹{props.NetSalary}</strong> (
                    {props.NetSalaryPayableInWords} )
                  </Typography>
                </Box>
                <Divider sx={{ my: 4 }} />
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  mt={2}
>
<Button
    variant="contained"
    onClick={() => generatePDF(targetRef, { filename: "PayslipElegant.pdf", page:"A4" })}
    size="small"
    style={{ marginLeft: "5px" }}
  >
    Download Pdf
  </Button>
  </Box>
    </center>
    </>
  );
}

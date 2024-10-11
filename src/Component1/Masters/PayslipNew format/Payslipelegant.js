import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Fragment } from "react";
import smallStyle from "./smallStyle.module.css";
import largeStyle from "./largeStyle.module.css";
import { useNavigate } from "react-router-dom";

const Payslipelegant = () => {
  const [isSmall, setIsSmall] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [navigate, setnavigate] = useState(false);
  const [monthly, setmonthly] = useState(false);

  const history = useNavigate();

  const handleSmallChange = (event) => {
    setIsSmall(event.target.checked);
    if (event.target.checked) {
      setIsLarge(false);
    }
  };

  const handleLargeChange = (event) => {
    setIsLarge(event.target.checked);
    if (event.target.checked) {
      setIsSmall(false);
    }
  };

  const handlenavigatechange = (event) => {
    setnavigate(event.target.checked);
    if (event.target.checked) {
      history("/payslipgenerator/payslipnewformat");
    }
  };

  const handlemonthlychange = (event) => {
    setmonthly(event.target.checked);
    if (event.target.checked) {
      history("/payslipmonthly");
    }
  };

  const currentStyle = isSmall ? smallStyle : isLarge ? largeStyle : null;

  return (
    <Container
      maxWidth="md"
      className={currentStyle ? currentStyle.container : ""}>
      <Box textAlign="right" mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSmall}
              onChange={handleSmallChange}
              name="small"
              color="primary"
            />
          }
          label="Small"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isLarge}
              onChange={handleLargeChange}
              name="large"
              color="primary"
            />
          }
          label="Large"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={navigate}
              onChange={handlenavigatechange}
              name="navigate"
              color="primary"
            />
          }
          label="Classic"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={monthly}
              onChange={handlemonthlychange}
              name="Monthly"
              color="primary"
            />
          }
          label="format"
        />
      </Box>
      <Card className={currentStyle ? currentStyle.card : ""}>
        <CardContent>
          <Box
            textAlign="left"
            marginLeft={"20px"}
            mb={2}
            className={currentStyle ? currentStyle.header : ""}>
            <Typography
              variant="h5"
              color="primary"
              className={currentStyle ? currentStyle.head : ""}>
              Zylker Corp
            </Typography>
            <Typography variant="subtitle1">
              588, Estancia, Chennai Tamil Nadu 600021 India
            </Typography>
            <Divider
              style={{
                backgroundColor: "lightblue",
                marginTop: "10px",
                height: "2px",
              }}
            />
          </Box>
          <Box textAlign="left" marginLeft={"20px"} mb={4}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Payslip for the month of June, 2020
                </Typography>
                <Typography variant="h6" color="primary" align="left">
                  EMPLOYEE PAY SUMMARY
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="left">
                  Employee Name: <strong>Preet Setty, emp012</strong>
                </Typography>
                <Typography variant="body1">
                  Designation: <strong>Software Engineer</strong>
                </Typography>
                <Typography variant="body1">
                  Date of Joining: <strong>21-09-2014</strong>
                </Typography>
                <Typography variant="body1">
                  Pay Period:
                  <strong>June 2020</strong>
                </Typography>
                <Typography variant="body1">
                  Pay Date: <strong>30-06-2020</strong>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Employee Net Pay</Typography>
                <Typography variant="h6">
                  <strong>₹43,150.00</strong>
                </Typography>
                <Typography variant="body1">
                  Paid Days: <strong>28</strong> | LOP Days: <strong>3</strong>
                </Typography>
              </Grid>
            </Grid>
            <Divider
              style={{
                backgroundColor: "lightblue",
                marginTop: "10px",
                height: "2px",
              }}
            />
          </Box>
          <Fragment>
            <TableContainer component={Paper}>
              <Table className={currentStyle ? currentStyle.table : ""}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black", width: "33.33%" }}>
                      <strong>Earnings</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black", width: "33.33%" }}>
                      <strong> Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>Basic</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>₹25,000.00</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>House Rent Allowance</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>₹12,500.00</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>Conveyance Allowance</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong> ₹1,500.00</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong> Children Education Allowance</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong> ₹300.00</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong> Other Allowance</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>₹5,200.00</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong>Gross Earnings</strong>
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      <strong> ₹44,500.00</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table className={currentStyle ? currentStyle.table : ""}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black", width: "33.33%" }}>
                      Deductions
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black", width: "33.33%" }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      Income Tax
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      ₹850.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      EPF Contribution
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      ₹3,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      Total Deductions
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      ₹3,850.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
              <Table className={currentStyle ? currentStyle.table : ""}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black", width: "33.33%" }}>
                      Reimbursements
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black", width: "33.33%" }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      Telephone Reimbursement
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      ₹500.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      Fuel Reimbursement
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      ₹2,000.00
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      Total Reimbursement
                    </TableCell>
                    <TableCell
                      className={currentStyle ? currentStyle.tableCell : ""}
                      style={{ border: "2px solid black" }}>
                      ₹2,500.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>

          <Box mt={4}>
            <Typography variant="body1">
              NET PAY (Gross Earnings - Total Deductions) + Reimbursements
            </Typography>
            <Typography variant="h6">₹43,150.00</Typography>
            <Typography variant="body1">
              Total Net Payable: <strong>₹43,150.00</strong> (Rupees Forty-three
              thousand one hundred and fifty only)
            </Typography>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" align="center">
            - This is a system generated payslip -
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Payslipelegant;
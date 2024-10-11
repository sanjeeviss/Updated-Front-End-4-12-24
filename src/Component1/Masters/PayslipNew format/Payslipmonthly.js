import React, { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import PaySlipTemplate from "./paysliptemplate";
import PaySlipFormTemplate from "./paysliptemplateform";
import PayslipNewFormat from "./PayslipNewFormat";
import { REPORTS, SAVE } from "../../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { numberToWords } from "number-to-words";

function Elegant({ data, empprof }) {
  console.log("table ", data);
  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" }; // Options to get the full month name
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear(); // Get the full year (4 digits)
  };

  // Extract the month from dDate
  const month = getMonthFromDate(data.d_date);
  const year = getYearFromDate(data.d_date);

  // Format month for different fields
  const monthUpperCase = month.toUpperCase(); // Uppercase for Month
  const monthFirstCapital =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  const filterNonZeroValues = (value, name) =>
    value !== 0 ? { [name]: value } : {};

  // Filtering values and constructing props
  const filteredProps = {};
  for (let i = 1; i <= 10; i++) {
    const allowance = data[`Allowance${i}`];
    const valueMR = data[`value${i}`];
    const valueCM = data[`value${i}`];
    const valueTotal = data[`value${i}`];
    const deduction = data[`Deduction${i}`];
    const deductionTotal = data[`valueA${i}`];

    if (valueMR !== 0) {
      filteredProps[`Allowance${i}`] = allowance;
      filteredProps[`Value${i}MR`] = valueMR;
      filteredProps[`Value${i}CM`] = valueCM;
      filteredProps[`Value${i}total`] = valueTotal;
    }

    if (deductionTotal !== 0) {
      filteredProps[`Deduction${i}`] = deduction;
      filteredProps[`Deduction${i}total`] = deductionTotal;
    }
  }

  const netSalaryInWords = numberToWords.toWords(data.NetPay);
  const netSalaryInWordsCapitalized =
    netSalaryInWords.charAt(0).toUpperCase() +
    netSalaryInWords.slice(1) +
    " only";

  return (
    <center>
      {" "}
      <PaySlipFormTemplate
        companyname={data.CompanyName}
        Month={monthFirstCapital}
        Year={year}
        Address1={data.Address_line1}
        Address2={data.Address_Line2}
        city={data.City}
        zipcode={data.Zipcode}
        EmpNo={data.EmployeeCode}
        Name={data.Employee_First_Name}
        Designation={data.DesignationName}
        Location={data.City}
        MonthOfPay={monthFirstCapital}
        DateOfBirth={empprof.DateofBirth}
        DateOfJoining={data.JoiningDate}
        CalcDays={data.Calc_Days}
        Paiddays={data.Paid_Days}
        Presentdays={data.Present_Days}
        Absentdays={data.Absent_Days}
        Leavedays={data.TotLeave_Days}
        Holidays={data.Holidays}
        BasicMR={data.Act_Basic}
        BasicCM={data.Earned_Basic}
        BasicTotal={data.Earned_Basic}
        Weekoffdays={data.WeekOffDays}
        PF={data.EPF}
        GrossEarnings={data.Gross_salary}
        NetSalaryPayable={data.NetPay}
        NetSalaryPayableInWords={netSalaryInWordsCapitalized}
        {...filteredProps}
      />
    </center>
  );
}

function Tabular({ data, empprof }) {
  console.log("table ", data);
  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" }; // Options to get the full month name
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear(); // Get the full year (4 digits)
  };

  // Extract the month from dDate
  const month = getMonthFromDate(data.d_date);
  const year = getYearFromDate(data.d_date);

  // Format month for different fields
  const monthUpperCase = month.toUpperCase(); // Uppercase for Month
  const monthFirstCapital =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  const filterNonZeroValues = (value, name) =>
    value !== 0 ? { [name]: value } : {};

  // Filtering values and constructing props
  const filteredProps = {};
  for (let i = 1; i <= 10; i++) {
    const allowance = data[`Allowance${i}`];
    const valueMR = data[`value${i}`];
    const valueCM = data[`value${i}`];
    const valueTotal = data[`value${i}`];
    const deduction = data[`Deduction${i}`];
    const deductionTotal = data[`valueA${i}`];

    if (valueMR !== 0) {
      filteredProps[`Allowance${i}`] = allowance;
      filteredProps[`Value${i}MR`] = valueMR;
      filteredProps[`Value${i}CM`] = valueCM;
      filteredProps[`Value${i}total`] = valueTotal;
    }

    if (deductionTotal !== 0) {
      filteredProps[`Deduction${i}`] = deduction;
      filteredProps[`Deduction${i}total`] = deductionTotal;
    }
  }

  const netSalaryInWords = numberToWords.toWords(data.NetPay);
  const netSalaryInWordsCapitalized =
    netSalaryInWords.charAt(0).toUpperCase() +
    netSalaryInWords.slice(1) +
    " only";

  return (
    <PaySlipTemplate
      companyname={data.CompanyName}
      Month={monthFirstCapital}
      Year={year}
      EmpNo={data.EmployeeCode}
      Name={data.Employee_First_Name}
      MonthOfPay={monthFirstCapital}
      DateOfBirth={empprof.DateofBirth}
      DateOfJoining={data.JoiningDate}
      CalcDays={data.Calc_Days}
      Paiddays={data.Paid_Days}
      Presentdays={data.Present_Days}
      Absentdays={data.Absent_Days}
      Leavedays={data.TotLeave_Days}
      Holidays={data.Holidays}
      BasicMR={data.Act_Basic}
      BasicCM={data.Earned_Basic}
      BasicTotal={data.Earned_Basic}
      Weekoffdays={data.WeekOffDays}
      PF={data.EPF}
      GrossEarnings={data.Gross_salary}
      NetSalaryPayable={data.NetPay}
      WorkFromHome="0"
      NetSalaryPayableInWords={netSalaryInWordsCapitalized}
      {...filteredProps}
    />
  );
}

function Classic({ data, empprof }) {
  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" }; // Options to get the full month name
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear(); // Get the full year (4 digits)
  };

  // Extract the month from dDate
  const month = getMonthFromDate(data.d_date);
  const year = getYearFromDate(data.d_date);

  // Format month for different fields
  const monthUpperCase = month.toUpperCase(); // Uppercase for Month
  const monthFirstCapital =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  const filterNonZeroValues = (value, name) =>
    value !== 0 ? { [name]: value } : {};

  // Filtering values and constructing props
  const filteredProps = {};
  for (let i = 1; i <= 10; i++) {
    const allowance = data[`Allowance${i}`];
    const valueMR = data[`value${i}`];
    const valueCM = data[`value${i}`];
    const valueTotal = data[`value${i}`];
    const deduction = data[`Deduction${i}`];
    const deductionTotal = data[`valueA${i}`];

    if (valueMR !== 0) {
      filteredProps[`Allowance${i}`] = allowance;
      filteredProps[`Value${i}MR`] = valueMR;
      filteredProps[`Value${i}CM`] = valueCM;
      filteredProps[`Value${i}total`] = valueTotal;
    }

    if (deductionTotal !== 0) {
      filteredProps[`Deduction${i}`] = deduction;
      filteredProps[`Deduction${i}total`] = deductionTotal;
    }
  }

  return (
    <PayslipNewFormat
      companyname={data.CompanyName}
      Month={monthUpperCase}
      Year={year}
      Address1={data.Address_line1}
      Address2={data.Address_Line2}
      city={data.City}
      zipcode={data.Zipcode}
      EmpNo={data.EmployeeCode}
      Name={data.Employee_First_Name}
      Designation={data.DesignationName}
      Location={data.City}
      MonthOfPay={monthFirstCapital}
      DateOfBirth={empprof.DateofBirth}
      CalcDays={data.Calc_Days}
      Paiddays={data.Paid_Days}
      Presentdays={data.Present_Days}
      Absentdays={data.Absent_Days}
      Leavedays={data.TotLeave_Days}
      Holidays={data.Holidays}
      BasicMR={data.Act_Basic}
      BasicCM={data.Earned_Basic}
      BasicTotal={data.Earned_Basic}
      Weekoffdays={data.WeekOffDays}
      PF={data.EPF}
      GrossEarnings={data.Gross_salary}
      NetSalaryPayable={data.NetPay}
      ddate={data.d_date}
      TotalEarnings={
        data.Earned_Basic +
        data.value1 +
        data.value2 +
        data.value3 +
        data.value4 +
        data.value5 +
        data.value6 +
        data.value7 +
        data.value8 +
        data.value9 +
        data.value10
      }
      TotalDeductions={
        data.EPF +
        data.valueA1 +
        data.valueA2 +
        data.valueA3 +
        data.valueA4 +
        data.valueA5 +
        data.valueA6 +
        data.valueA7 +
        data.valueA8 +
        data.valueA9 +
        data.valueA10
      }
      // Spread the filtered props here
      {...filteredProps}
    />
  );
}

function Payslipmonthly({ paym, pnEmployeeId, employeeCode }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState({
    checkbox1: false,
    checkbox2: true,
    checkbox3: false,
  });
  const [Empprof, setEmpprof] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const data = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from paym_Employee where pn_EmployeeID = ${pnEmployeeId}`,
        });
        console.log("Fetched data:", data); // Log the fetched data
        setEmpprof(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (pnEmployeeId) {
      getData();
    }
  }, [pnEmployeeId]); // Only run when pnEmployeeId changes

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (event) => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };
      newChecked[event.target.name] = event.target.checked;
      if (event.target.checked) {
        Object.keys(newChecked).forEach((key) => {
          if (key !== event.target.name) {
            newChecked[key] = false;
          }
        });
      }
      return newChecked;
    });
  };

  const renderUI = () => {
    const empprofItem = Empprof[0] || {};
    if (checked.checkbox1) {
      return <Tabular data={paym} empprof={empprofItem} />;
    } else if (checked.checkbox2) {
      return <Elegant data={paym} empprof={empprofItem} />;
    } else if (checked.checkbox3) {
      return <Classic data={paym} empprof={empprofItem} />;
    } else {
      return null;
    }
  };

  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box display="flex" justifyContent="flex-end" sx={{marginRight : "20px"}}>
        <IconButton onClick={handleMenuOpen}>
          <Typography variant="body1" color="black">Choose Templates</Typography>
          <MenuIcon sx={{ marginLeft: 1, color: "blue" }} />
        </IconButton>
      </Box>
  
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Checkbox
            checked={checked.checkbox1}
            onChange={handleCheckboxChange}
            name="checkbox1"
          />
          Tabular
        </MenuItem>
        <MenuItem>
          <Checkbox
            checked={checked.checkbox2}
            onChange={handleCheckboxChange}
            name="checkbox2"
          />
          Elegant
        </MenuItem>
        <MenuItem>
          <Checkbox
            checked={checked.checkbox3}
            onChange={handleCheckboxChange}
            name="checkbox3"
          />
          Classic
        </MenuItem>
      </Menu>
    </Grid>
    <Grid item xs={12} mt={-5}>
      {renderUI()}
    </Grid>
  </Grid>
  );
}

export default Payslipmonthly;
import React from "react";
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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PaySlipTemplate from "./paysliptemplate";
import PaySlipFormTemplate from "./paysliptemplateform";
import PayslipNewFormat from "./PayslipNewFormat";
import { REPORTS, SAVE } from "../../serverconfiguration/controllers";
import { useEffect } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { numberToWords } from 'number-to-words';

//import { Checkbox, FormControlLabel } from "@material-ui/core";

const filterZeroValues = (values) => {
  return values.filter((value) => value !== 0);
};

function Elegant({ data, empprof }) {
  console.log("table ", data);
  const getMonthFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" }; // Options to get the full month name
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Extract the month from dDate
  const month = getMonthFromDate(data.dDate);

  // Format month for different fields
  const monthUpperCase = month.toUpperCase(); // Uppercase for Month
  const monthFirstCapital =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    const filterNonZeroValues = (value, name) =>
      value !== 0 ? { [name]: value } : {};
  
    // Filtering values and constructing props
    const filteredProps = {};
    for (let i = 1; i <= 10; i++) {
      const allowance = data[`allowance${i}`];
      const valueMR = data[`value${i}`];
      const valueCM = data[`value${i}`];
      const valueTotal = data[`value${i}`];
      const deduction = data[`deduction${i}`];
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

    const netSalaryInWords = numberToWords.toWords(data.netPay);
    const netSalaryInWordsCapitalized =
    netSalaryInWords.charAt(0).toUpperCase() + netSalaryInWords.slice(1) + " only";
  
  return (
    <center>
      {" "}
      <PaySlipFormTemplate
        companyname={data.companyName}
        Address1={data.addressLine1}
        Address2={data.addressLine2}
        city={data.city}
        zipcode={data.zipcode}
        Month={monthFirstCapital}
        EmpNo={data.employeeCode}
        Name={data.employeeFirstName}
        Designation={data.designationName}
        Location={data.city}
        MonthOfPay={monthFirstCapital}
        DateOfBirth={empprof.DateofBirth}
        ddate={data.dDate}
        DateOfJoining={data.joiningDate}
        CalcDays={data.calcDays}
        Paiddays={data.paidDays}
        Presentdays={data.presentDays}
        Absentdays={data.absentDays}
        Leavedays={data.totLeaveDays}
        Holidays={data.holidays}
        BasicMR={data.actBasic}
        BasicCM={data.earnedBasic}
        BasicTotal={data.earnedBasic}
        Weekoffdays={data.weekOffDays}
        PF={data.epf}
        GrossEarnings={data.grossSalary}
        NetSalaryPayable={data.netPay}
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

  // Extract the month from dDate
  const month = getMonthFromDate(data.dDate);

  // Format month for different fields
  const monthUpperCase = month.toUpperCase(); // Uppercase for Month
  const monthFirstCapital =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

    const filterNonZeroValues = (value, name) =>
      value !== 0 ? { [name]: value } : {};
  
    // Filtering values and constructing props
    const filteredProps = {};
    for (let i = 1; i <= 10; i++) {
      const allowance = data[`allowance${i}`];
      const valueMR = data[`value${i}`];
      const valueCM = data[`value${i}`];
      const valueTotal = data[`value${i}`];
      const deduction = data[`deduction${i}`];
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

    const netSalaryInWords = numberToWords.toWords(data.netPay);
    const netSalaryInWordsCapitalized =
    netSalaryInWords.charAt(0).toUpperCase() + netSalaryInWords.slice(1) + " only";

  return (
    <PaySlipTemplate
      companyname={data.companyName}
      Month={monthFirstCapital}
      EmpNo={data.employeeCode}
      Name={data.employeeFirstName}
      MonthOfPay={monthFirstCapital}
      DateOfBirth={empprof.DateofBirth}
      DateOfJoining={data.joiningDate}
      CalcDays={data.calcDays}
      Paiddays={data.paidDays}
      Presentdays={data.presentDays}
      Absentdays={data.absentDays}
      Leavedays={data.totLeaveDays}
      Holidays={data.holidays}
      BasicMR={data.actBasic}
      BasicCM={data.earnedBasic}
      BasicTotal={data.earnedBasic}
      Weekoffdays={data.weekOffDays}
      PF={data.epf}
      GrossEarnings={data.grossSalary}
      NetSalaryPayable={data.netPay}
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

  // Extract the month from dDate
  const month = getMonthFromDate(data.dDate);

  // Format month for different fields
  const monthUpperCase = month.toUpperCase(); // Uppercase for Month
  const monthFirstCapital =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  // Function to filter out zero values
  const filterNonZeroValues = (value, name) =>
    value !== 0 ? { [name]: value } : {};

  // Filtering values and constructing props
  const filteredProps = {};
  for (let i = 1; i <= 10; i++) {
    const allowance = data[`allowance${i}`];
    const valueMR = data[`value${i}`];
    const valueCM = data[`value${i}`];
    const valueTotal = data[`value${i}`];
    const deduction = data[`deduction${i}`];
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
      companyname={data.companyName}
      Month={monthUpperCase}
      Address1={data.addressLine1}
      Address2={data.addressLine2}
      city={data.city}
      zipcode={data.zipcode}
      EmpNo={data.employeeCode}
      Name={data.employeeFirstName}
      Designation={data.designationName}
      Location={data.city}
      MonthOfPay={monthFirstCapital}
      DateOfBirth={empprof.DateofBirth}
      CalcDays={data.calcDays}
      Paiddays={data.paidDays}
      Presentdays={data.presentDays}
      Absentdays={data.absentDays}
      Leavedays={data.totLeaveDays}
      Holidays={data.holidays}
      BasicMR={data.actBasic}
      BasicCM={data.earnedBasic}
      BasicTotal={data.earnedBasic}
      Weekoffdays={data.weekOffDays}
      PF={data.epf}
      GrossEarnings={data.grossSalary}
      NetSalaryPayable={data.netPay}
      ddate={data.dDate}
      TotalEarnings={
        data.earnedBasic +
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
        data.epf +
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

const Payslipmonthly = () => {
  const location = useLocation();
  console.log(location.state);
  const ddata = location.state || {};
  const paymArray = ddata.paym || [];
  const firstItem = paymArray[0] || {};
  const pnCompanyId = firstItem.pnEmployeeId;

  // Log the extracted value
  console.log("pnCom:", pnCompanyId);
  console.log("ddata", ddata.paym[0]);
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
          query: `select * from paym_Employee where pn_EmployeeID = ${firstItem.pnEmployeeId}`,
        });
        console.log("Fetched data:", data); // Log the fetched data
        setEmpprof(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (firstItem.pnEmployeeId) {
      getData();
    }
  }, [firstItem.pnEmployeeId]); // Only run when pnEmployeeId changes

  // Separate useEffect to log Empprof changes
  useEffect(() => {
    console.log("Current Empprof:", Empprof);
  }, [Empprof]); // Run when Empprof changes

  const renderUI = (data) => {
    const empprofItem = Empprof[0] || {};
    console.log("render ", data);
    if (checked.checkbox1) {
      return <Tabular data={data.paym[0]} empprof={empprofItem} />;
    } else if (checked.checkbox2) {
      return <Elegant data={data.paym[0]} empprof={empprofItem} />;
    } else if (checked.checkbox3) {
      return <Classic data={data.paym[0]} empprof={empprofItem} />;
    } else {
      return null;
    }
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
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checkbox1}
              onChange={handleCheckboxChange}
              name="checkbox1"
            />
          }
          label="Tabular"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checkbox2}
              onChange={handleCheckboxChange}
              name="checkbox2"
            />
          }
          label="Elegant"
        />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checkbox3}
              onChange={handleCheckboxChange}
              name="checkbox3"
            />
          }
          label="Classic"
        />
      </Grid>
      <Grid item xs={12}>
        {renderUI(ddata)}
      </Grid>
    </Grid>
  );
};

export default Payslipmonthly;

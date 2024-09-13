import React, { useState, useEffect, useRef } from "react";
import { useLockBodyScroll } from "react-use";

import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./chatbot.css";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import {
  REPORTS,
  TIMECARD,
  PAYMEMPLOYEE,
  SHIFTDETAILS,
  PAYMPAYBILL,
} from "../../serverconfiguration/controllers";
import { postRequest, getRequest } from "../../serverconfiguration/requestcomp";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00bcd4", // Aqua Blue
    },
    secondary: {
      main: "#ff5722", // Deep Orange
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif", // Font changed to Roboto
  },
});

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const [timeCard, setTimeCard] = useState([]);
  const [branch, setBranch] = useState("");
  const [employee, setEmployee] = useState([]);
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [shiftDetails, setShiftDetails] = useState([]);
  const [pnCompanyid, setPnCompanyId] = useState("");
  const [pnBranchid, setPnBranchId] = useState("");
  const [shfitCode, setShiftCode] = useState("");
  const [paymPaybill, setpaympaybill] = useState([]);
  const [dDate, setDdate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [employeecode1, setemployeecode1] = useState("");
  const [salary, setsalary] = useState("");

  useEffect(() => {
    async function getData() {
      const timeCardData = await getRequest(ServerConfig.url, TIMECARD);
      setTimeCard(timeCardData.data);
      const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employee.data);
      const shiftDetails = await getRequest(ServerConfig.url, SHIFTDETAILS);
      setShiftDetails(shiftDetails.data);
      const paymPaybill = await getRequest(ServerConfig.url, PAYMPAYBILL);
      setpaympaybill(paymPaybill.data);

      console.log(salary);
    }

    getData();
  }, []);

  useEffect(() => {
    async function fetchSalary() {
      if (employeecode1 && month && year && dDate) {
        const salaryData = await postRequest(ServerConfig.url, REPORTS, {
          query: `EXEC [dbo].[FinalSalaryCalculation1] @EmployeeCode = '${employeecode1}', @Month = ${month}, @Year = ${year}, @D_dates = '${dDate}'`,
        });
        setsalary(salaryData.data);

        const botResponse = `Monthly Salary: ${salaryData.data[0].MonthlySalary}`;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
        scrollToBottom();
      }
    }

    fetchSalary();
  }, [employeecode1, month, year, dDate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    let botResponse = "";
    switch (inputValue.toLowerCase()) {
      // existing cases
      case "shift details":
        executeShiftDetailsQuery(); // Call the function to execute the query
        return;
      default:
        botResponse = "Sorry, I do not understand";
    }

    setTimeout(() => {
      const replyMessage = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
      scrollToBottom();
    }, 500);
  };

  const handleButtonClick = (text) => {
    setInputValue(text);

    setMessages((prevMessages) => [...prevMessages, { text, sender: "user" }]);

    let botResponse = "";
    switch (text.toLowerCase()) {
      case "shift details":
        botResponse = (
          <div>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink>pnCompanyid</InputLabel>
                <select
                  name="pnCompanyid"
                  onChange={(e) => {
                    setPnCompanyId(e.target.value);
                  }}
                  style={{ height: "50px", width: "150px" }}
                  inputlabelprops={{ shrink: true }}>
                  <option value="">Select</option>
                  {shiftDetails.map((e) => (
                    <option key={e.pnCompanyid} value={e.pnCompanyid}>
                      {e.pnCompanyid}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink>pnBranchid</InputLabel>
                <select
                  name="pnBranchid"
                  onChange={(e) => {
                    setPnBranchId(e.target.value);
                  }}
                  style={{ height: "50px", width: "150px" }}
                  inputlabelprops={{ shrink: true }}>
                  <option value="">Select</option>
                  {shiftDetails.map((e) => (
                    <option key={e.pnBranchid} value={e.pnBranchid}>
                      {e.pnBranchid}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink>shiftCode</InputLabel>
                <select
                  name="shiftCode"
                  onChange={(e) => {
                    setShiftCode(e.target.value);
                  }}
                  style={{ height: "50px", width: "150px" }}
                  inputlabelprops={{ shrink: true }}>
                  <option value="">Select</option>
                  {shiftDetails.map((e) => (
                    <option key={e.shiftCode} value={e.shiftCode}>
                      {e.shiftCode}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Grid>
          </div>
        );
        break;

      case "leave":
        botResponse = (
          <div>
            <Button
              variant="outlined"
              onClick={() => handleBranchOption("Today")}
              sx={{ m: 0.5, color: "white" }}>
              Today
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBranchOption("Week")}
              sx={{ m: 0.5, color: "white" }}>
              Week
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBranchOption("Month")}
              sx={{ m: 0.5, color: "white" }}>
              Month
            </Button>
          </div>
        );
        break;

      case "employeeprofile":
        botResponse = (
          <div>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink>Employeecode</InputLabel>
                <select
                  name="employeeCode"
                  onChange={(e) => {
                    setEmployeeCode(e.target.value);
                    fetchEmployeeDetails(e.target.value);
                  }}
                  style={{ height: "50px", width: "150px" }}
                  inputlabelprops={{ shrink: true }}>
                  <option value="">Select</option>
                  {employee.map((e) => (
                    <option>{e.employeeCode}</option>
                  ))}
                </select>
              </FormControl>
            </Grid>
          </div>
        );
        break;
      case "salary":
        botResponse = (
          <div>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink>Employeecode</InputLabel>
                <select
                  name="employeeCode"
                  onChange={(e) => {
                    setemployeecode1(e.target.value);
                  }}
                  style={{ height: "50px", width: "150px" }}
                  inputlabelprops={{ shrink: true }}>
                  <option value="">Select</option>
                  {paymPaybill.map((e) => (
                    <option key={e.employeeCode}>{e.employeeCode}</option>
                  ))}
                </select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="month"
                label="Month"
                value={year}
                onChange={(e) => setMonth(e.target.value)}
                fullWidth
                style={{ height: "50px", width: "150px" }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="year"
                label="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
                style={{ height: "50px", width: "150px" }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel shrink>D Date</InputLabel>
                <select
                  name="dDate"
                  onChange={(e) => {
                    setDdate(e.target.value);
                  }}
                  style={{ height: "50px", width: "150px" }}
                  inputlabelprops={{ shrink: true }}>
                  <option value="">Select</option>
                  {paymPaybill.map((e) => (
                    <option>{e.dDate}</option>
                  ))}
                </select>
              </FormControl>
            </Grid>
          </div>
        );
        break;

      default:
        botResponse = "Sorry, I do not understand";
    }

    setTimeout(() => {
      const replyMessage = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
      scrollToBottom();
    }, 500);
  };

  const fetchEmployeeDetails = async (employeeCode) => {
    const query = `SELECT Employee_Full_Name, pn_BranchID, pn_EmployeeID, DateofBirth, Gender, Readerid, OT_Eligible, Pfno, Esino, OT_calc, CTC, basic_salary, Bank_code, Bank_Name, Branch_Name, Account_Type, MICR_code, IFSC_Code, Address, status,Reporting_person,Reporting_email,ReportingID,Pan_no,card_no,salary_type,TDS_Applicable,flag,role FROM paym_Employee WHERE EmployeeCode = '${employeeCode}'`;

    const employeeData = await postRequest(ServerConfig.url, REPORTS, {
      query,
    });

    if (employeeData.data && employeeData.data.length > 0) {
      const employeeDetail = employeeData.data[0];
      setEmployeeDetails(employeeDetail);
      const botResponse = (
        <div>
          <Typography>This is Your Entire Profile</Typography>
          <Typography>
            Employee Full Name: {employeeDetail.Employee_Full_Name}
          </Typography>
          <Typography>Branch ID: {employeeDetail.pn_BranchID}</Typography>
          <Typography>Employee ID: {employeeDetail.pn_EmployeeID}</Typography>
          <Typography>Date of Birth: {employeeDetail.DateofBirth}</Typography>
          <Typography>Gender: {employeeDetail.Gender}</Typography>
          <Typography>Reader ID: {employeeDetail.Readerid}</Typography>
          <Typography>OT Eligible: {employeeDetail.OT_Eligible}</Typography>
          <Typography>PF No: {employeeDetail.Pfno}</Typography>
          <Typography>ESI No: {employeeDetail.Esino}</Typography>
          <Typography>OT Calc: {employeeDetail.OT_calc}</Typography>
          <Typography>CTC: {employeeDetail.CTC}</Typography>
          <Typography>Basic Salary: {employeeDetail.basic_salary}</Typography>
          <Typography>Bank Code: {employeeDetail.Bank_code}</Typography>
          <Typography>Bank Name: {employeeDetail.Bank_Name}</Typography>
          <Typography>Branch Name: {employeeDetail.Branch_Name}</Typography>
          <Typography>Account Type: {employeeDetail.Account_Type}</Typography>
          <Typography>MICR Code: {employeeDetail.MICR_code}</Typography>
          <Typography>IFSC Code: {employeeDetail.IFSC_Code}</Typography>
          <Typography>Address: {employeeDetail.Address}</Typography>
          <Typography>Status: {employeeDetail.status}</Typography>
          <Typography>
            Reporting person: {employeeDetail.Reporting_person}
          </Typography>
          <Typography>
            Reporting email: {employeeDetail.Reporting_email}
          </Typography>
          <Typography>Reporting ID: {employeeDetail.ReportingID}</Typography>
          <Typography>Pan no: {employeeDetail.Pan_no}</Typography>
          <Typography>card no:{employeeDetail.card_no}</Typography>
          <Typography>salary type: {employeeDetail.salary_type}</Typography>
          <Typography>
            TDS Applicable: {employeeDetail.TDS_Applicable}
          </Typography>
          <Typography>flag: {employeeDetail.flag}</Typography>
          <Typography>role: {employeeDetail.role}</Typography>
        </div>
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
      scrollToBottom();
    } else {
      const botResponse = "No data available for the selected employee code.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
      scrollToBottom();
    }
  };

  const executeShiftDetailsQuery = async () => {
    // Ensure pnCompanyid, pnBranchid, and shiftCode have values selected by the user
    if (!pnCompanyid || !pnBranchid || !shfitCode) {
      console.error(
        "Please select values for pnCompanyid, pnBranchid, and shiftCode"
      );
      return;
    }

    // Construct the query
    const query = `SELECT shift_code, start_time, break_time_in, break_time_out, end_time, shift_indicator FROM shift_details WHERE pn_branchid= ${pnBranchid} and pn_companyid = ${pnCompanyid} and  shift_code='${shfitCode}'`;

    try {
      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      // Handle response and display result
      if (response.data && response.data.length > 0) {
        const shiftDetailsResult = response.data[0];
        const botResponse = (
          <div>
            <Typography>Shift Code: {shiftDetailsResult.shift_code}</Typography>
            <Typography>Start Time: {shiftDetailsResult.start_time}</Typography>
            <Typography>
              Break Time In: {shiftDetailsResult.break_time_in}
            </Typography>
            <Typography>
              Break Time Out: {shiftDetailsResult.break_time_out}
            </Typography>
            <Typography>End Time: {shiftDetailsResult.end_time}</Typography>
            <Typography>
              Shift Indicator: {shiftDetailsResult.shift_indicator}
            </Typography>
          </div>
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
        scrollToBottom();
      } else {
        const botResponse = "No data available for the selected criteria.";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error executing shift details query:", error);
      // Handle error
    }
  };

  const handleBranchOption = (option) => {
    const newMessage = { text: `Selected ${option}`, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");

    let botResponse = `You selected ${option}. Select branch.`;

    botResponse = (
      <div>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel shrink>BranchId</InputLabel>
            <select
              name="pnBranchid"
              onChange={(e) => {
                setBranch(e.target.value);
                fetchLeaveData(e.target.value, option); // Assuming 'option' is defined somewhere
              }}
              style={{ height: "50px", width: "150px" }}
              inputlabelprops={{ shrink: true }}>
              <option value="">Select</option>
              {timeCard.map((e) => (
                <option key={e.pnBranchid} value={e.pnBranchid}>
                  {e.pnBranchid}
                </option>
              ))}
            </select>
          </FormControl>
        </Grid>
      </div>
    );

    setTimeout(() => {
      const replyMessage = { text: botResponse, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
      scrollToBottom();
    }, 500);
  };

  const fetchLeaveData = async (branchId, option) => {
    let query = "";
    switch (option.toLowerCase()) {
      case "today":
        query = `SELECT tc.pn_branchid, SUM(CASE WHEN tc.status = 'L' THEN 1 ELSE 0 END) AS Current_Total_Leave, SUM(CASE WHEN tc.status = 'A' THEN 1 ELSE 0 END) AS Current_Total_Absent, SUM(CASE WHEN tc.status = 'P' THEN 1 ELSE 0 END) AS Current_Total_present FROM [dbo].[time_card] tc WHERE CONVERT(date, tc.dates) = CONVERT(date, GETDATE()) AND tc.pn_branchid = ${branchId} GROUP BY tc.pn_branchid`;
        break;
      case "week":
        query = `SELECT tc.pn_branchid, pb.branchname AS BranchName, SUM(CASE WHEN tc.status = 'L' THEN 1 ELSE 0 END) AS Week_Total_Leave, SUM(CASE WHEN tc.status = 'A' THEN 1 ELSE 0 END) AS Week_Total_Absent, SUM(CASE WHEN tc.status = 'P' THEN 1 ELSE 0 END) AS Week_Total_present FROM [dbo].[time_card] tc JOIN [dbo].[Paym_Branch] pb ON tc.pn_branchid = pb.pn_branchid WHERE tc.dates >= DATEADD(day, -6, CONVERT(date, GETDATE())) AND tc.dates <= CONVERT(date, GETDATE()) AND tc.pn_branchid = ${branchId} GROUP BY tc.pn_branchid, pb.branchname`;
        break;
      case "month":
        query = `SELECT tc.pn_branchid,MONTH(tc.dates) AS Month,YEAR(tc.dates) AS Year,SUM(CASE WHEN tc.status = 'L' THEN 1 ELSE 0 END) AS Month_Total_Leave,SUM(CASE WHEN tc.status = 'A' THEN 1 ELSE 0 END) AS Month_Total_Absent,SUM(CASE WHEN tc.status = 'P' THEN 1 ELSE 0 END) AS Month_Total_present FROM [dbo].[time_card] tc WHERE DATEPART(MONTH, tc.dates) = DATEPART(MONTH, GETDATE()) AND DATEPART(YEAR, tc.dates) = DATEPART(YEAR, GETDATE()) AND tc.pn_branchid = ${branchId} GROUP BY tc.pn_branchid,  MONTH(tc.dates), YEAR(tc.dates) ORDER BY tc.pn_branchid, Year, Month;`;
        break;
      default:
        break;
    }

    const leaveData = await postRequest(ServerConfig.url, REPORTS, { query });

    let botResponse = "";
    if (leaveData.data && leaveData.data.length > 0) {
      const leave = leaveData.data[0];
      botResponse = (
        <div>
          <Typography>
            Total Leave ={" "}
            {leave.Current_Total_Leave ||
              leave.Week_Total_Leave ||
              leave.Month_Total_Leave}
          </Typography>
          <Typography>
            Total Present ={" "}
            {leave.Current_Total_present ||
              leave.Week_Total_present ||
              leave.Month_Total_present}
          </Typography>
          <Typography>
            Total Absent ={" "}
            {leave.Current_Total_Absent ||
              leave.Week_Total_Absent ||
              leave.Month_Total_Absent}
          </Typography>
        </div>
      );
    } else {
      botResponse = "No data available for the selected branch and period.";
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: botResponse, sender: "bot" },
    ]);
    scrollToBottom();
  };
  useLockBodyScroll();
  return (
    <ThemeProvider theme={theme}>
      <Box
        className="chatbot-container"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          width: "20%",
          p: 1,
        }}>
        <Box
          className="chatbot-header"
          sx={{
            p: 2,
            fontFamily: "Poppins, Arial, sans-serif",
            backgroundColor: "#00bcd4",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "8px 8px 0 0",
          }}>
          <Typography variant="h5">Chat Bot 🤖</Typography>
        </Box>

        <Paper
          className="chatbot-messages"
          sx={{
            p: 2,
            mb: 2,
            flex: 1,
            overflowY: "auto",
            borderRadius: "0 0 8px 8px",
            color: "White",
          }}>
          {messages.map((message, index) => (
            <div key={index}>
              <Typography
                className={`message ${message.sender}`}
                sx={{
                  mt: 1,
                  textAlign: message.sender === "user" ? "right" : "left",
                  backgroundColor:
                    message.sender === "user" ? "#e3f2fd" : "#fce4ec",
                  p: 1,
                  borderRadius: 4,
                  display: "block",
                  clear: "both",
                }}>
                {message.text}
              </Typography>
              {/* Conditionally render branch dropdown */}
              {message.branchDropdown && (
                <div className="branch-dropdown">{message.branchDropdown}</div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        <Box
          className="chatbot-buttons"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            p: 1,
          }}>
          {["Leave", "EmployeeProfile", "Shift Details", "Salary"].map(
            (buttonText) => (
              <Button
                key={buttonText}
                variant="outlined"
                onClick={() => handleButtonClick(buttonText)}
                sx={{ m: 0.5 }}>
                {buttonText}
              </Button>
            )
          )}
        </Box>

        <Box
          component="form"
          onSubmit={handleMessageSubmit}
          className="chatbot-input"
          sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ mr: 1 }}
          />

          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Chatbot;

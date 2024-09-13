import React, { useEffect, useState } from "react";
import { postRequest } from "../../serverconfiguration/requestcomp";
import {
  Typography,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { REPORTS, SAVE } from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { Navigate, useNavigate } from "react-router-dom";
import Sidenav from "../Home Page/Sidenav";
import Navbar from "../Home Page/Navbar";

function GroupShift() {
  const navigate = useNavigate();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [grpSettings, setGrpSettings] = useState([]);
  const [grpid, setGrpid] = useState("");
  const [checkedRows, setCheckedRows] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const employeesData = await postRequest(ServerConfig.url, REPORTS, {
          query: `SELECT pe.EmployeeCode, pe.Employee_Full_Name FROM paym_employee pe LEFT JOIN employee_group eg ON pe.EmployeeCode = eg.employee_code WHERE eg.employee_code IS NULL;`,
        });
        setFilteredEmployees(employeesData.data);

        const groupData = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from Group_details`,
        });
        setGrpSettings(groupData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const handleCheckboxChange = (employeeCode, isChecked) => {
    if (isChecked) {
      const employee = filteredEmployees.find(
        (emp) => emp.EmployeeCode === employeeCode
      );
      const newCheckedRow = { ...employee, GroupID: grpid };
      setCheckedRows((prev) => [...prev, newCheckedRow]);
      console.log("Checked Rows:", [...checkedRows, newCheckedRow]);
    } else {
      setCheckedRows((prev) =>
        prev.filter((row) => row.EmployeeCode !== employeeCode)
      );
      console.log("Unchecked Employee Code:", employeeCode);
    }
  };

  const handlesave = async () => {
    if (checkedRows.length > 0) {
      const values = checkedRows
        .map((row) => `('${row.EmployeeCode}', '${row.GroupID}')`)
        .join(", ");

      const query = `
                INSERT INTO [dbo].[employee_Group]([employee_code],[groupid])
                VALUES ${values}
            `;

      try {
        await postRequest(ServerConfig.url, SAVE, { query });
        console.log("Data saved successfully");
        alert("Data saved successfully");
        window.location.reload();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      console.log("No rows to save");
    }
  };

  function handlesave23() {
    navigate("/groupui/addinfos");
  }

  return (
    <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "20px",
        width: "800px",
        margin: "auto",
        position: "relative",
      }}>
      <Typography variant="h6" gutterBottom>
        Move Employees to Group
      </Typography>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel shrink>Group Name</InputLabel>
          <select
            name="GroupId"
            onChange={(e) => {
              setGrpid(e.target.value);
            }}
            style={{ height: "50px" }}>
            <option value="">Select</option>
            {grpSettings.map((group) => (
              <option key={group.GroupID} value={group.GroupID}>
                {group.Group_name}
              </option>
            ))}
          </select>
        </FormControl>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: "16px" }}>Employee Code</TableCell>
              <TableCell style={{ fontSize: "16px" }}>
                Employee Full Name
              </TableCell>
              <TableCell style={{ fontSize: "16px" }}>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, index) => (
                <TableRow key={index}>
                  <TableCell>{employee.EmployeeCode}</TableCell>
                  <TableCell>{employee.Employee_Full_Name}</TableCell>
                  <TableCell>
                    <Checkbox
                      onChange={(e) =>
                        handleCheckboxChange(
                          employee.EmployeeCode,
                          e.target.checked
                        )
                      }
                      defaultChecked={false}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography>Every Employee has a Group</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button variant="contained" onClick={handlesave}>
          Save
        </Button>

        <Button variant="contained" onClick={handlesave23}>
          Next: Process
        </Button>
      </Box>
    </Box>
    </Grid>
    </Box>
    </div>
    </Grid>
  );
}

export default GroupShift;

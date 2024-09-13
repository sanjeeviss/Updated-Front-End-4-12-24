import React from "react";
import { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { createSvgIcon, InputLabel, MenuItem } from "@mui/material";
import { Button, Grid } from "@mui/material";
import {
  Card,
  TextField,
  Typography,
  Box,
  CardContent,
  FormControl,
  Select,
} from "@mui/material";
import {
  DAILYTIMECARD,
  EARNDEDUCT,
  PAYMEMPLOYEE,
  REPORTS,
  TEMPTIMECARDS,
  TIMECARD,
} from "../../serverconfiguration/controllers";
import { useNavigate } from "react-router-dom";
import JsonTable from "./jsoncomp";

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

const DailyTimeCardTables = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  const [from, setfrom] = useState("");
  const [to, setTo] = useState("");
  const [filterBy, setFilterBy] = useState([]);
  const [filterdata, setFilterData] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [showdata, setShowData] = useState(false);
  useEffect(() => {
    getRequest(ServerConfig.url, TEMPTIMECARDS)
      .then((e) => {
        setData(e.data);
      })
      .catch((e) => navigate("/dailytimecardform"));
  }, []);

  function handonClick() {
    navigate("/dailytimecardform");
  }

  return (
    <div>
      {console.log(data)}
      {/* <JsonToTable json={data} /> */}
      <div>
        <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
          <Grid xs={6} sm={3} item style={{ marginLeft: "20px" }}>
            <FormControl fullWidth>
              <TextField
                name="From"
                label="From"
                variant="outlined"
                fullWidth
                required
                type="datetime-local"
                onChange={(e) => {
                  setfrom(e.target.value);
                  console.log("from", e.target.value);
                }}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} sm={3} item style={{ marginLeft: "20px" }}>
            <FormControl fullWidth>
              <TextField
                name="To"
                label="To"
                variant="outlined"
                fullWidth
                required
                type="datetime-local"
                onChange={(e) => {
                  setTo(e.target.value);
                  console.log("To", e.target.value);
                  if (to > from) {
                    alert(
                      "invalid dates selected! to should be a date after from  "
                    );
                    setTo("");
                  }
                }}
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Grid>
          <Grid xs={6} sm={3} item style={{ marginLeft: "20px" }}>
            <FormControl fullWidth>
              <InputLabel>Filter by </InputLabel>
              <Select
                label="Filter By"
                onChange={(e) => {
                  if (e.target.value == "Branch") {
                    postRequest(ServerConfig.url, REPORTS, {
                      query: "select branchname from paym_branch",
                    }).then((e) => {
                      setFilterBy(e.data);
                      setFilterData("BranchCode");
                      setFilterColumn("Branch");
                    });
                  }
                  if (e.target.value == "Department") {
                    postRequest(ServerConfig.url, REPORTS, {
                      query:
                        "select pn_departmentID, v_departmentname from paym_department",
                    }).then((e) => {
                      console.log(e.data);
                      setFilterBy(e.data);
                      setFilterData("pn_DepartmentId");
                      setFilterColumn("Department");
                    });
                  }
                  if (e.target.value == "Group") {
                    postRequest(ServerConfig.url, REPORTS, {
                      query: "select group_name from group_details",
                    }).then((e) => {
                      setFilterBy(e.data);
                      setFilterData("group_name");
                      setFilterColumn("Group");
                    });
                  }
                  if (e.target.value == "Employee") {
                    getRequest(ServerConfig.url, PAYMEMPLOYEE).then((e) => {
                      setFilterBy(e.data);
                      setFilterData("pn_EmployeeID");
                      setFilterColumn("Employee");
                    });
                  }
                  console.log("filterby", filterBy);
                }}>
                <MenuItem value={"Select"}>Select...</MenuItem>
                <MenuItem value={"Branch"}>Branch</MenuItem>
                <MenuItem value={"Department"}>Department</MenuItem>
                <MenuItem value={"Group"}>Group</MenuItem>
                <MenuItem value={"Employee"}>Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} sm={3} item style={{ marginLeft: "20px" }}>
            <FormControl fullWidth>
              <InputLabel>Filter by </InputLabel>
              <Select
                label="Filter By"
                onChange={(e) => {
                  console.log(data);
                  console.log(e.target.value);
                  if (filterColumn == "Employee") {
                    const d1 = data.filter(
                      (s) =>
                        s.empCode == e.target.value &&
                        s.dates >= from &&
                        s.dates <= to
                    );
                    setData(d1);
                  }
                  if (filterColumn == "Branch") {
                    const d1 = data.filter(
                      (s) =>
                        s.branchCode == e.target.value &&
                        s.dates >= from &&
                        s.dates <= to
                    );
                    setData(d1);
                  }
                  if (filterColumn == "Department") {
                    const d1 = data.filter(
                      (s) =>
                        s.pndepartmentid == e.target.value &&
                        s.dates >= from &&
                        s.dates <= to
                    );
                    setData(d1);
                  }
                }}>
                {filterBy == undefined
                  ? console.log("no data")
                  : filterBy.map((e) => {
                      if (filterColumn == "Employee") {
                        return (
                          <MenuItem value={e.employeeCode}>
                            {e.employeeCode} {e.employeeFullName}
                          </MenuItem>
                        );
                      }
                      if (filterColumn == "Branch") {
                        console.log(e);
                        return (
                          <MenuItem value={e.branchname}>
                            {e.branchname}
                          </MenuItem>
                        );
                      }
                      if (filterColumn == "Department") {
                        console.log(e);
                        return (
                          <MenuItem value={e.pn_departmentID}>
                            {e.v_departmentname}
                          </MenuItem>
                        );
                      }
                      if (filterColumn == "Group") {
                        console.log(e);
                        return (
                          <MenuItem value={e.group_name}>
                            {e.group_name}
                          </MenuItem>
                        );
                      }
                    })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Button
          variant="outlined"
          color="success"
          sx={{ textAlign: "right" }}
          onClick={handonClick}>
          Add
          <PlusIcon />
        </Button> */}
      </div>
      <div>
        <Button
          onClick={() => {
            setShowData(true);
          }}>
          Load Data
        </Button>
        {showdata ? (
          data != null || data != undefined ? (
            <JsonTable jsonData={data} url={ServerConfig.url + TEMPTIMECARDS} />
          ) : (
            "no data available"
          )
        ) : (
          ""
        )}
        <Grid margin={5}></Grid>
      </div>
    </div>
  );
};

export default DailyTimeCardTables;

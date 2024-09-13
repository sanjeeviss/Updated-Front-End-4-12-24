import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Checkbox,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import {
  PAYMEMPLOYEE,
  TIMECARD,
  UPDATEDTIMECARD,
  SHIFTMONTH,
  REPORTS,
} from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import React from "react";

function cleararray(arr) {
  while (arr.length > 0) {
    arr.pop();
  }
}
function getMatchingRecords(array1, array2) {
  return array2.filter((obj1) => {
    return array1.some((obj2) => obj1.employeecode === obj2.pnEmployeeCode);
  });
}

export default function AttendanceNew() {
  const [employee, setEmployee] = useState([]);
  const [updatedTimeCard, setUpdatedTimeCard] = useState([]);
  const [company, setCompany] = useState("");
  const [branch, setBranch] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [shiftCode, setShiftCode] = useState("");
  const [shiftmonth, setShiftMonth] = useState([]);
  const [att, setAtt] = useState([]);
  const [empmarked, setEmpMarked] = useState([]);
  const [present, setPresent] = useState([]);
  const [enablesave, setEnableSave] = useState(true);
  const [notmarked, setNotMarked] = useState([]);
  useEffect(() => {
    async function loadmarked() {
      const data = await postRequest(ServerConfig.url, REPORTS, {
        query:
          "select * from  time_card where cast(dates as DATE)=cast(getdate() as DATE)",
      });
      return data;
    }
    loadmarked().then((e) => setEmpMarked(e.data));
    console.log(empmarked);
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(data.data);
      const timecard = await getRequest(ServerConfig.url, UPDATEDTIMECARD);

      const shiftmonth = await getRequest(ServerConfig.url, SHIFTMONTH);
      setShiftMonth(shiftmonth.data);
      return timecard.data;
    }
    async function getPresent() {
      const presentdata = await getRequest(ServerConfig.url, TIMECARD);
      console.log("present data", presentdata.data);
      setPresent(presentdata.data);
      return presentdata.data;
    }
    // async function setUpdatedValue() {
    //   console.log(present);
    //   console.log(updatedTimeCard);
    //   setUpdatedTimeCard(
    //     updatedTimeCard.filter(
    //       (e) => !present.some((r) => r.empCode == e.employeecode)
    //     )
    //   );
    // }

    getData().then((e) => {
      console.log("time card", e);
      getPresent().then((e) => setPresent(e));

      // console.log(e);

      setUpdatedTimeCard(e);

      //console.log("time card");
    });
  }, []);

  const handleload = () => {
    setEnableSave(true);
  };

  const handleSave = () => {
    // //console.log("emp marked", empmarked);
    const resultarr = getMatchingRecords(att, updatedTimeCard);
    resultarr.map((e) => {
      e.status = "P";
      const currentDate = new Date();
      const startTime = new Date(e.start_time);
      e.dates =
        currentDate.toISOString().split("T")[0] +
        e.start_time.substring(10, 19);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      e.days = days[currentDate.getDay()];
      e.breakOut = "2024-05-09T12:00:00";
      e.breakIn = "2024-05-09T12:30:00";
      e.earlyOut = "1900-01-01T17:00:00";
      e.lateIn = "2024-05-15T00:00:00";
      e.lateOut = "2024-05-20T00:00:00";
      e.otHrs = "1900-01-01T02:00:00";
      e.leaveCode = "AL";
      e.data = "Y";
      e.pnEmployeeId = "EMP005";
      e.flag = "Z";
      e.intime = e.start_time;
      e.outtime = e.end_time;
      e.pnCompanyid = e.pn_companyid;
      e.pnBranchid = e.pn_branchid;
      e.empCode = e.employeecode;
      e.empName = e.employee_full_name;
      e.shiftCode = e.shift_code;
      postRequest(ServerConfig.url, TIMECARD, e).then((e) => console.log(e));
    });
    //console.log(resultarr);
  };

  const margin = { margin: "0 5px" };
  {
  }
  return (
    <div>
      <div>
        <Grid>
          <Button
            variant="outlined"
            style={{ marginTop: "20px", marginLeft: "210px" }}
            onClick={() => {
              /*setEnableSave(true);
              console.log(present);
              console.log(updatedTimeCard);

              const v = updatedTimeCard.filter(
                (e) => !present.some((r) => r.empCode == e.employeecode)
              );
              console.log("present not marked", v);

              const x = shiftmonth.filter((e) =>
                v.some((r) => r.employeecode == e.pnEmployeeCode)
              );
              setShiftMonth(x);*/
            }}>
            Load
          </Button>
        </Grid>
      </div>
      {enablesave ? (
        <Grid style={{ padding: "80px 5px0 5px" }}>
          <Card style={{ maxWidth: 500, margin: "0 auto" }}>
            <CardContent>
              <Typography variant="h5" color="S- Light" align="center">
                Attendance
              </Typography>
              <form>
                <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <InputLabel shrink>Company</InputLabel>
                      <select
                        name="pnCompanyId"
                        onChange={(e) => {
                          setCompany(e.target.value);
                        }}
                        style={{ height: "50px" }}>
                        <option value="">Select</option>
                        {shiftmonth.map((e) => (
                          <option key={e.Id}>{e.pnCompanyId}</option>
                        ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <InputLabel shrink>BranchId</InputLabel>
                      <select
                        name="pnBranchId"
                        onChange={(e) => {
                          setBranch(e.target.value);
                        }}
                        style={{ height: "50px" }}
                        inputlabelprops={{ shrink: true }}>
                        <option value="">Select</option>
                        {shiftmonth
                          .filter((e) => e.pnCompanyId == company)
                          .map((e) => (
                            <option key={e.Id}>{e.pnBranchId}</option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} sm={12} item>
                    <FormControl fullWidth>
                      <InputLabel shrink>ShiftCode</InputLabel>
                      <select
                        name="shiftCode"
                        onChange={(e) => {
                          cleararray(att);
                          setShiftCode(e.target.value);
                        }}
                        style={{ height: "50px" }}
                        inputlabelprops={{ shrink: true }}>
                        <option value="">Select</option>
                        {shiftmonth
                          .filter(
                            (e) =>
                              e.pnBranchId == branch && e.pnCompanyId == company
                          )
                          .map((e) => (
                            <option key={e.Id}>{e.shiftCode}</option>
                          ))}
                      </select>
                    </FormControl>
                  </Grid>

                  <Grid xs={12} sm={12} item>
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left" }}>Employee Code</th>
                          <th style={{ textAlign: "left" }}>Employee Name</th>
                          <th style={{ textAlign: "left" }}>Present</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shiftmonth
                          .filter((r) => {
                            // console.log(r);

                            return (
                              r.pnBranchId == branch && r.shiftCode == shiftCode
                            );
                          })
                          .map((e, index) => {
                            att.push(e);
                            //console.log(att);
                            return (
                              <tr key={e.pnEmployeeCode}>
                                <td style={{ textAlign: "left" }}>
                                  {e.pnEmployeeCode}
                                </td>
                                <td style={{ textAlign: "left" }}>
                                  {e.pnEmployeeName}
                                </td>
                                <td style={{ textAlign: "left" }}>
                                  <Checkbox
                                    defaultChecked={true}
                                    onChange={(s) => {
                                      if (!s.currentTarget.checked) {
                                        att.pop(e);
                                        //     console.log(att);
                                      } else {
                                        att.push(e);
                                        //   console.log(att);
                                      }
                                    }}></Checkbox>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Grid>

                  <Grid container spacing={1} paddingTop={"10px"}>
                    <Grid item xs={12} align="right">
                      <Button
                        style={margin}
                        type="button"
                        variant="outlined"
                        color="primary"
                        onClick={() => window.location.reload()}>
                        RESET
                      </Button>

                      <Button
                        onClick={handleSave}
                        variant="contained"
                        color="primary">
                        SAVE
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      ) : (
        "No Data Loaded"
      )}
    </div>
  );
}

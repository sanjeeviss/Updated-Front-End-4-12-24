import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Checkbox,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { TIMECARD, REPORTS } from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import React from "react";

export default function EarlyAndLate() {
  const [timecard, setTimeCard] = useState([]);
  const [pnCompanyid, setPnCompanyId] = useState("");
  const [pnBranchid, setpnBranchId] = useState("");
  const [earlyOut, setEarlyOut] = useState({});
  const [lateIn, setLateIn] = useState({});
  const [lateOut, setLateOut] = useState({});
  const [showEarlyOut, setShowEarlyOut] = useState(false);
  const [showLateFields, setShowLateFields] = useState(false);

  useEffect(() => {
    async function getData() {
      const data1 = await getRequest(ServerConfig.url, TIMECARD);
      setTimeCard(data1.data);
    }
    getData();
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleEarlyOutChange = () => {
    setShowEarlyOut(!showEarlyOut);
    setEarlyOut({});
  };

  const handleLateEntriesChange = () => {
    setShowLateFields(!showLateFields);
    setLateIn({});
    setLateOut({});
  };

  const handleSave = async () => {
    try {
      const filteredEmployees = timecard.filter(
        (r) => r.pnBranchid == pnBranchid && r.status == "P"
      );

      if (filteredEmployees.length > 0) {
        for (const employee of filteredEmployees) {
          const empCode = employee.empCode;
          const earlyOutTime = earlyOut[empCode] || "";
          const lateInTime = lateIn[empCode] || "";
          const lateOutTime = lateOut[empCode] || "";

          const query = `UPDATE time_card SET early_out = '${earlyOutTime}', Late_in = '${lateInTime}', Late_out = '${lateOutTime}' WHERE emp_code = '${empCode}'`;
          console.log(query);

          const response = await postRequest(ServerConfig.url, REPORTS, {
            query: query,
          });
          console.log("Response:", response);
        }
      } else {
        console.error(
          'No employees found for the selected branch or status is not "P"'
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (setter, empCode, value) => {
    setter((prev) => ({ ...prev, [empCode]: formatDateTime(value) }));
  };

  const margin = { margin: "0 5px" };
  const gapStyle = { marginRight: "10px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 1200, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              Early and Late Entries
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>pnCompanyId</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => setPnCompanyId(e.target.value)}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {timecard.map((e) => (
                        <option key={e.Id}>{e.pnCompanyid}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select
                      name="pnBranchId"
                      onChange={(e) => setpnBranchId(e.target.value)}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {timecard
                        .filter((e) => e.pnCompanyid == pnCompanyid)
                        .map((e) => (
                          <option key={e.Id}>{e.pnBranchid}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "10px" }}>
                          EmployeeCode
                        </th>
                        <th style={{ textAlign: "left", padding: "10px" }}>
                          Employee Name
                        </th>
                        <th style={{ textAlign: "left", padding: "10px" }}>
                          Early Out{" "}
                          <Checkbox
                            checked={showEarlyOut}
                            onChange={handleEarlyOutChange}
                          />
                        </th>
                        <th style={{ textAlign: "left", padding: "10px" }}>
                          Late Entries{" "}
                          <Checkbox
                            checked={showLateFields}
                            onChange={handleLateEntriesChange}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {timecard
                        .filter(
                          (r) => r.pnBranchid == pnBranchid && r.status == "P"
                        )
                        .map((e, index) => (
                          <tr key={e.empCode}>
                            <td style={{ textAlign: "left", padding: "10px" }}>
                              {e.empCode}
                            </td>
                            <td style={{ textAlign: "left", padding: "10px" }}>
                              {e.empName}
                            </td>
                            <td style={{ textAlign: "left", padding: "10px" }}>
                              {showEarlyOut && (
                                <FormControl>
                                  <TextField
                                    name="Early Out"
                                    label="Early Out"
                                    variant="outlined"
                                    size="small"
                                    type="datetime-local"
                                    value={earlyOut[e.empCode] || ""}
                                    onChange={(event) =>
                                      handleInputChange(
                                        setEarlyOut,
                                        e.empCode,
                                        event.target.value
                                      )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                  />
                                </FormControl>
                              )}
                            </td>
                            <td style={{ textAlign: "left", padding: "10px" }}>
                              {showLateFields && (
                                <div>
                                  <FormControl style={gapStyle}>
                                    <TextField
                                      name="Late In"
                                      label="Late In"
                                      variant="outlined"
                                      size="small"
                                      type="datetime-local"
                                      value={lateIn[e.empCode] || ""}
                                      onChange={(event) =>
                                        handleInputChange(
                                          setLateIn,
                                          e.empCode,
                                          event.target.value
                                        )
                                      }
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  </FormControl>
                                  <FormControl>
                                    <TextField
                                      name="Late Out"
                                      label="Late Out"
                                      variant="outlined"
                                      size="small"
                                      type="datetime-local"
                                      value={lateOut[e.empCode] || ""}
                                      onChange={(event) =>
                                        handleInputChange(
                                          setLateOut,
                                          e.empCode,
                                          event.target.value
                                        )
                                      }
                                      InputLabelProps={{ shrink: true }}
                                    />
                                  </FormControl>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
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
                      variant="contained"
                      color="primary"
                      onClick={handleSave}>
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

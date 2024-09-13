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
  LEAVEAPPLY,
  TIMECARD,
  REPORTS,
  SAVE,
} from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import React from "react";
import { SevereCold } from "@mui/icons-material";

export default function Leaveapprovenew() {
  const [leaveapply, setLeaveApply] = useState([]);
  const [timecard, setTimeCard] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setpnBranchId] = useState("");
  const [comments, setComments] = useState({});
  const [employee, setEmployee] = useState({});
  const [canceledLeaves, setCanceledLeaves] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, LEAVEAPPLY);
      setLeaveApply(data.data);
      const data1 = await getRequest(ServerConfig.url, TIMECARD);
      setTimeCard(data1.data);
    }
    getData();
  }, []);

  const currentDate = new Date();

  const handleApprove = async (employeeCode) => {
    const employeeTimecards = timecard.filter(
      (tc) => tc.empCode === employeeCode
    );
    const alreadyPresent = employeeTimecards.some(
      (tc) => tc.status === "P" || tc.status === "L"
    );

    if (alreadyPresent) {
      alert("This employee is already marked present.");

      const updatedLeaveApply = leaveapply.map((leave) => {
        if (leave.empCode === employeeCode) {
          return { ...leave, comments: "Already marked present" };
        }
        return leave;
      });
      setLeaveApply(updatedLeaveApply);
    } else {
      try {
        await postRequest(ServerConfig.url, REPORTS, {
          query:
            "select e.pn_companyid,e.pn_branchid,e.employeecode,e.employee_full_name,s.shift_code,GetDate(),FORMAT(GETDATE(), 'dddd'),s.start_time,s.end_time from paym_Employee e join shift_details s on e.pn_branchid=s.pn_branchid where shift_code=(select shift_code from shift_month where pn_Employeecode=e.EmployeeCode and monthyear=FORMAT(GETDATE(), 'MM-yyyy'))",
        }).then((e) => {
          console.log(e);
          var emp = e.data.filter((s) => {
            return s.employeecode == employeeCode;
          });
          console.log(emp[0]);

          postRequest(ServerConfig.url, TIMECARD, {
            empCode: employeeCode,
            status: "L",
            dates:
              currentDate.toISOString().split("T")[0] +
              emp[0].start_time.substring(10, 19),
            pnCompanyid: emp[0].pn_companyid,
            pnBranchid: emp[0].pn_branchid,
            shiftCode: emp[0].shift_code,
            empName: emp[0].employee_full_name,
            flag: "Z",
          });
        });
        console.log("employee");
        console.log(employee);

        const updatedLeaveApply = leaveapply.map((leave) => {
          if (leave.empCode === employeeCode) {
            postRequest(ServerConfig.url, SAVE, {
              query:
                "update leave_apply set status='A' ,from_status='A' ,comments='Leave Approved',approve='A' where emp_code='" +
                leave.empCode +
                "' and sno=" +
                leave.sno,
            })
              .then((e) => "leave approved")
              .catch((e) => console.log(e));
            return { ...leave, comments: "Leave Approved" };
          }
          return leave;
        });
        setLeaveApply(updatedLeaveApply);
      } catch (error) {
        console.error("Error approving leave:", error);
        alert("An error occurred while approving the leave. Please try again.");
      }
    }
  };

  const handleCancel = async (employeeCode) => {
    try {
      const updatedLeaveApply = leaveapply.map((leave) => {
        if (leave.empCode === employeeCode) {
          return { ...leave, comments: "Leave Request Cancelled" };
        }
        return leave;
      });
      setLeaveApply(updatedLeaveApply);

      const isCancelled = updatedLeaveApply.some(
        (leave) =>
          leave.empCode === employeeCode &&
          leave.comments === "Leave Request Cancelled"
      );

      if (isCancelled) {
        const response = await postRequest(ServerConfig.url, REPORTS, {
          query: `UPDATE leave_apply SET comments = 'Leave Request Cancelled', status = 'C' WHERE Emp_code = '${employeeCode}'`,
        });

        const emp = response.data.filter((s) => s.empCode === employeeCode);
        console.log(emp[0]);

        setCanceledLeaves([...canceledLeaves, employeeCode]);
      } else {
        throw new Error("Failed to update leave request comment.");
      }
    } catch (error) {
      console.error("Error cancelling leave request:", error);
      alert(
        "An error occurred while cancelling the leave request. Please try again."
      );
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 800, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              Leave Approve
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>pnCompanyId</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setPnCompanyId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {leaveapply.map((e) => (
                        <option>{e.pnCompanyId}</option>
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
                        setpnBranchId(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {leaveapply
                        .filter((e) => e.pnCompanyId == pnCompanyId)
                        .map((e) => (
                          <option key={e.Id}>{e.pnBranchId}</option>
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
                        <th style={{ textAlign: "center", padding: "10px" }}>
                          comments
                        </th>
                        <th
                          style={{
                            textAlign: "right",
                            paddingLeft: "78px",
                            padding: "10px",
                          }}>
                          Status
                        </th>
                        <th
                          style={{ textAlign: "center", padding: "10px" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveapply
                        .filter(
                          (r) => r.pnBranchId == pnBranchId && r.status == "P"
                        )
                        .map((e, index) => {
                          return (
                            <tr key={e.pnEmployeeCode}>
                              <td
                                style={{ textAlign: "left", padding: "10px" }}>
                                {e.empCode}
                              </td>
                              <td
                                style={{ textAlign: "left", padding: "10px" }}>
                                {e.empName}
                              </td>
                              <td
                                style={{
                                  textAlign: "center",
                                  padding: "10px",
                                }}>
                                {e.comments}
                              </td>
                              <td
                                style={{
                                  textAlign: "left",
                                  padding: "10px",
                                  paddingRight: "10px",
                                }}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  disabled={canceledLeaves.includes(e.empCode)}
                                  onClick={() => handleApprove(e.empCode)}>
                                  Approve
                                </Button>
                              </td>
                              <td
                                style={{
                                  textAlign: "left",
                                  padding: "10px",
                                  paddingLeft: "10px",
                                }}>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  onClick={() => handleCancel(e.empCode)}>
                                  Cancel
                                </Button>
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

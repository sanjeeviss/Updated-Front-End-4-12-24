import React, { useEffect, useState } from "react";
import Sidenav from "./Sidenav";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts";
import { Grid } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { AGGREGATE } from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { REPORTS } from "../../serverconfiguration/controllers";
export default function DashBoard() {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];
  useEffect(() => {
    async function getData() {
      return postRequest(ServerConfig.url, REPORTS, {
        query:
          "SELECT emp_code,emp_name,(select dateofbirth from paym_employee where employeecode=emp_code) as dob,COUNT(CASE WHEN status = 'P' THEN 1 END) AS total_P,COUNT(CASE WHEN status = 'A' THEN 1 END) AS total_A,COUNT(CASE WHEN status = 'L' THEN 1 END) AS total_L,coUNT (CASE WHEN status='H' THEN 1 END) AS total_H,MAX(CASE WHEN DAY(dates) = 1 THEN status END) AS day_1,MAX(CASE WHEN DAY(dates) = 2 THEN status END) AS day_2,MAX(CASE WHEN DAY(dates) = 3 THEN status END) AS day_3,MAX(CASE WHEN DAY(dates) = 4 THEN status END) AS day_4,MAX(CASE WHEN DAY(dates) = 5 THEN status END) AS day_5,MAX(CASE WHEN DAY(dates) = 6 THEN status END) AS day_6,MAX(CASE WHEN DAY(dates) = 7 THEN status END) AS day_7,MAX(CASE WHEN DAY(dates) = 8 THEN status END) AS day_8,MAX(CASE WHEN DAY(dates) = 9 THEN status END) AS day_9,MAX(CASE WHEN DAY(dates) = 10 THEN status END) AS day_10,MAX(CASE WHEN DAY(dates) = 11 THEN status END) AS day_11,MAX(CASE WHEN DAY(dates) = 12 THEN status END) AS day_12,MAX(CASE WHEN DAY(dates) = 13 THEN status END) AS day_13,MAX(CASE WHEN DAY(dates) = 14 THEN status END) AS day_14,MAX(CASE WHEN DAY(dates) = 15 THEN status END) AS day_15,MAX(CASE WHEN DAY(dates) = 16 THEN status END) AS day_16,MAX(CASE WHEN DAY(dates) = 17 THEN status END) AS day_17,MAX(CASE WHEN DAY(dates) = 18 THEN status END) AS day_18,MAX(CASE WHEN DAY(dates) = 19 THEN status END) AS day_19,MAX(CASE WHEN DAY(dates) = 20 THEN status END) AS day_20,MAX(CASE WHEN DAY(dates) = 21 THEN status END) AS day_21,MAX(CASE WHEN DAY(dates) = 22 THEN status END) AS day_22,MAX(CASE WHEN DAY(dates) = 23 THEN status END) AS day_23,MAX(CASE WHEN DAY(dates) = 24 THEN status END) AS day_24,MAX(CASE WHEN DAY(dates) = 25 THEN status END) AS day_25,MAX(CASE WHEN DAY(dates) = 26 THEN status END) AS day_26,MAX(CASE WHEN DAY(dates) = 27 THEN status END) AS day_27,MAX(CASE WHEN DAY(dates) = 28 THEN status END) AS day_28,MAX(CASE WHEN DAY(dates) = 29 THEN status END) AS day_29,MAX(CASE WHEN DAY(dates) = 30 THEN status END) AS day_30,MAX(CASE WHEN DAY(dates) = 31 THEN status END) AS day_31 FROM time_card where Day(dates)=Day(getdate()) and Month(dates)=Month(getdate()) GROUP BY emp_code,emp_name",
      });
    }
    async function getGraphData() {
      return postRequest(ServerConfig.url, REPORTS, {
        query:
          " SELECT tc.pn_branchid,pb.branchname AS BranchName,SUM(CASE WHEN CAST(tc.early_out AS TIME) < '17:00' THEN 1 ELSE 0 END) AS EarlyOut,SUM(CASE WHEN CAST(tc.Late_in AS TIME) > '09:00' THEN 1 ELSE 0 END) AS LateIn,SUM(CASE WHEN CAST(tc.Late_out AS TIME) > '17:00' THEN 1 ELSE 0 END) AS LateOut,SUM(CAST(tc.ot_hrs AS DECIMAL(4, 2))) AS Total_OT_Hours,SUM(CASE WHEN tc.status = 'L' THEN 1 ELSE 0 END) AS Total_Leave FROM [dbo].[time_card] tc JOIN [dbo].[Paym_Branch] pb ON tc.pn_branchid = pb.pn_branchid GROUP BY tc.pn_branchid, pb.branchname ORDER BY tc.pn_branchid;",
      });
    }
    getData().then((e) => {
      setData(e.data);
      getGraphData().then((s) => {
        setGraphData(s.data);
      });
    });
  }, []);
  useEffect(() => {
    // Function to refresh the page
    const refreshPage = () => {
      window.location.reload();
    };

    // Set up an interval to refresh the page every 3 seconds
    const intervalId = setInterval(refreshPage, 10000); // 3000ms = 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div style={{ backgroundColor: "#1769aa" }}>
        <Navbar />
        <Box height={30} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Grid container style={{ justifyContent: "center" }}>
            <Grid columns={12}>
              <Box
                component="main"
                sx={{
                  m: 5,
                  p: 3,
                  alignContent: "center",
                  backgroundColor: "pink",
                  borderRadius: "20px",
                  width: 130,
                  height: 130,
                }}>
                <h1
                  style={{
                    padding: "5px",

                    textAlign: "center",
                    fontSize: "30px",
                    fontWeight: "bold",
                    width: "150px",
                    position: "relative",
                    top: "-25px",
                    left: "-35px",
                  }}>
                  {data.length > 0
                    ? data.reduce((a, b) => {
                        return a + b.total_P;
                      }, 0)
                    : 0}
                </h1>
                <h2
                  style={{
                    padding: "5px",

                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "150px",
                    position: "relative",
                    top: "-55px",
                    left: "-35px",
                  }}>
                  Total Marked Present
                </h2>
              </Box>
            </Grid>
            <Grid>
              <Box
                component="main"
                sx={{
                  m: 5,
                  p: 3,
                  alignContent: "center",
                  backgroundColor: "pink",
                  borderRadius: "20px",
                  width: 130,
                  height: 130,
                }}>
                <h1
                  style={{
                    padding: "5px",

                    textAlign: "center",
                    fontSize: "px",
                    fontWeight: "bold",
                    width: "150px",
                    position: "relative",
                    top: "-15px",
                    left: "-35px",
                  }}>
                  {data.length > 0
                    ? data.reduce((a, b) => {
                        return a + b.total_A;
                      }, 0)
                    : 0}
                </h1>
                <h2
                  style={{
                    padding: "5px",

                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "150px",
                    position: "relative",
                    top: "-55px",
                    left: "-35px",
                  }}>
                  Total Absent
                </h2>
              </Box>
            </Grid>
            <Grid>
              <Box
                component="main"
                sx={{
                  m: 5,
                  p: 3,
                  alignContent: "center",
                  backgroundColor: "pink",
                  borderRadius: "20px",
                  width: 130,
                  height: 130,
                }}>
                <h1>
                  {data.length > 0
                    ? data.reduce((a, b) => {
                        return a + b.total_H;
                      }, 0)
                    : 0}
                </h1>
                <h2
                  style={{
                    padding: "5px",

                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "150px",
                    position: "relative",
                    top: "-35px",
                    left: "-35px",
                  }}>
                  Total Half Day
                </h2>
              </Box>
            </Grid>
            <Grid>
              <Box
                component="main"
                sx={{
                  m: 5,
                  p: 3,
                  alignContent: "center",
                  backgroundColor: "pink",
                  borderRadius: "20px",
                  width: 130,
                  height: 130,
                }}>
                <h1>
                  {data.length > 0
                    ? data.reduce((a, b) => {
                        return a + b.total_L;
                      }, 0)
                    : 0}
                </h1>
                <h2
                  style={{
                    padding: "5px",

                    textAlign: "center",
                    fontSize: "20px",
                    fontWeight: "bold",
                    width: "150px",
                    position: "relative",
                    top: "-35px",
                    left: "-35px",
                  }}>
                  Total Leave
                </h2>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <Grid container justifyContent={"space-evenly"}>
          <Grid item>
            <Box component="main" sx={{ ml: 30, alignItems: "left" }}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: graphData.map((e) => e.BranchName),
                  },
                ]}
                series={[
                  {
                    data: graphData.map((e) => {
                      return e.Total_OT_Hours;
                    }),
                  },
                ]}
                width={350}
                height={350}
              />
              <div
                style={{
                  padding: "15px",
                  border: "1px solid black",
                  textAlign: "center",
                }}>
                <label>Total Ot Hours</label>
              </div>
            </Box>
          </Grid>

          <Grid item>
            <Box component="main" sx={{}}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: graphData.map((e) => e.BranchName),
                  },
                ]}
                series={[
                  {
                    data: graphData.map((e) => {
                      return e.Total_Leave;
                    }),
                  },
                ]}
                width={350}
                height={350}
              />
              <div
                style={{
                  padding: "15px",
                  border: "1px solid black",
                  textAlign: "center",
                }}>
                <label>Total Leave Taken</label>
              </div>
            </Box>
          </Grid>

          <Grid item>
            <Box component="main">
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: graphData.map((e) => e.BranchName),
                  },
                ]}
                series={[
                  {
                    data: graphData.map((e) => {
                      return e.LateOut;
                    }),
                  },
                ]}
                width={350}
                height={350}
              />
              <div
                style={{
                  padding: "15px",
                  border: "1px solid black",
                  textAlign: "center",
                }}>
                <label>Total Late Out</label>
              </div>
            </Box>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
  Container,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import { createSvgIcon } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
} from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest } from "../../serverconfiguration/requestcomp";
const PlusIcon = createSvgIcon(
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

function Setup2() {
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState([]);
  const location = useLocation();
  const company = location.state;
  const navigate = useNavigate();
  const [disablebtn, setDisabled] = useState(true);
  useEffect(() => {
    async function getCompanies() {
      console.log(company);
      return await getRequest(ServerConfig.url, PAYMBRANCHES);
    }
    getCompanies().then((e) => {
      console.log(e.data);
      const d = e.data.filter((e) => e.pnCompanyId == company.pnCompanyId);
      console.log(d);
      setBranches(d);
    });
  }, []);

  function handleonclick() {
    navigate("/PayBranchForm");
  }

  function handl23eonclick() {
    navigate("/Shiftdetails007", { state: branch[0] });
  }

  const margin = { margin: "0 5px" };

  return (
    <div>
      <div>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 500,
                height: 200,
                borderRadius: "20px",
              },
            }}>
            <Paper elevation={3}>
              <Grid
                display={"flex"}
                textAlign={"center"}
                paddingLeft={"100px"}
                paddingTop={"10px"}>
                <Typography variant="h5" color="S- Light" align="center">
                  Create a new Branch
                </Typography>
                <Grid textAlign={"right"} paddingLeft={"10px"}>
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={handleonclick}>
                    Add
                    <PlusIcon />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 500,
                height: 230,
                borderRadius: "20px",
              },
            }}>
            <Paper elevation={3}>
              <Grid
                display={"flex"}
                textAlign={"center"}
                paddingLeft={"100px"}
                paddingTop={"10px"}>
                <Typography variant="h5" color="S- Light" align="center">
                  Use Existing
                </Typography>
                <Grid textAlign={"right"} paddingLeft={"10px"}>
                  <select
                    onChange={(e) => {
                      if (e.target.value != "select") {
                        setDisabled(false);
                      } else {
                        setDisabled(true);
                      }
                      console.log(e.target.value);
                      setBranch(
                        branches.filter((r) => r.pnBranchId == e.target.value)
                      );
                    }}
                    style={{
                      height: "40px",
                      width: "160px",
                      borderRadius: "10px",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}>
                    <option>select</option>
                    {branches.map((e) => (
                      <option value={e.pnBranchId}>{e.branchName}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
              <Grid
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "sans-serif",
                }}>
                {
                  // console.log(branch)
                  branch == undefined || branch == null
                    ? "no data"
                    : branch.map((e) => (
                        <div style={{ padding: "20px" }}>
                          <div>{e.branchName}</div>{" "}
                          <div>
                            {e.addressLine1} {e.addressLine2}
                          </div>
                          <div>{e.emailId} </div>
                          <div> {e.city}</div>
                        </div>
                      ))
                }
              </Grid>
              <Grid style={{ textAlign: "right", paddingRight: "30px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handl23eonclick}
                  disabled={disablebtn}>
                  Next:Create Shift
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Setup2;

import { Height } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
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
import "../../App.css";
import Paper from "@mui/material/Paper";
import { createSvgIcon } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LEAVEALLOCATIONMASTER,
  PAYMCOMPANIES,
  PAYMLEAVE,
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

function LeaveSetup() {
  const [leaves, setLeaves] = useState([]);
  const [leave, setLeave] = useState([]);
  const [disablebtn, setDisablebtn] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const navdata = location.state;
  useEffect(() => {
    console.log(navdata);
    async function getCompanies() {
      return await getRequest(ServerConfig.url, PAYMLEAVE);
    }
    getCompanies().then((e) => setLeaves(e.data));
  }, []);

  function handleonclick() {
    navigate("/LeaveForm");
  }

  function handl23eonclick() {
    const navdata1 = {
      pattern: navdata.pattern,
      shift: navdata.shift,
      leave: leave[0],
    };
    navigate("/groupui", { state: navdata1 });
  }

  const margin = { margin: "0 5px" };
  return (
    <div className="Background">
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
                  Create Leave
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
                        setDisablebtn(false);
                      } else {
                        setDisablebtn(true);
                      }
                      console.log(e.target.value);
                      const cdata = leaves.filter(
                        (s) => s.vLeaveName == e.target.value
                      );

                      setLeave(cdata);
                      console.log(cdata);
                    }}
                    style={{
                      height: "40px",
                      width: "160px",
                      borderRadius: "10px",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}>
                    <option>select</option>
                    {leaves.map((e) => (
                      <option value={e.vLeaveName}>{e.vLeaveName}</option>
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
                {leave.map((e) => (
                  <div style={{ padding: "20px" }}>
                    <div>{e.companyName}</div>{" "}
                    <div>
                      {e.addressLine1} {e.addressLine2}
                    </div>
                    <div>{e.emailId} </div>
                    <div> {e.city}</div>
                  </div>
                ))}
              </Grid>
              <Grid style={{ textAlign: "right", paddingRight: "30px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handl23eonclick}
                  disabled={disablebtn}>
                  Next:Create Group
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default LeaveSetup;

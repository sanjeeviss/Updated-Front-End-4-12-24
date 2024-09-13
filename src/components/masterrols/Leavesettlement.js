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
import "../../App.css";
import Paper from "@mui/material/Paper";
import { createSvgIcon } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LEAVEALLOCATIONMASTER,
  LEAVESETTLEMENT,
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

function Leavesettlement() {
  const [leavesettlements, setLeavesettlements] = useState([]);
  const [leavesettlement, setLeavesettlement] = useState([]);
  const [disablebtn, setDisablebtn] = useState(true);
  const location = useLocation();
  const navdata1 = location.state;
  const navigate = useNavigate();
  console.log(useLocation());
  useEffect(() => {
    console.log(navdata1);
    async function getCompanies() {
      return await getRequest(ServerConfig.url);
    }
    getCompanies().then((e) => setLeavesettlements(e.data));
  }, []);

  function handleonclick() {
    navigate("/groupui");
  }

  function handl23eonclick() {
    navigate("/groupui", { state: Leavesettlement[0] });
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
                  Create
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
                      const cdata = leavesettlements.filter(
                        (s) => s.vLeaveName == e.target.value
                      );

                      setLeavesettlement(cdata);
                      console.log(cdata);
                    }}
                    style={{
                      height: "40px",
                      width: "160px",
                      borderRadius: "10px",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}>
                    {console.log(leavesettlements)}
                    <option>select</option>
                    {leavesettlements.map((e) => (
                      <option value={e.pnLeavId}>{e.pnLeavecode}</option>
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
                {leavesettlement.map((e) => (
                  <div style={{ padding: "20px" }}>
                    <div>{e.pnLeavecode}</div> <div></div>
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
                  Next:Create Pay Details
                </Button>
              </Grid>
            </Paper>
          </Box>
        </Container>
      </div>
    </div>
  );
}

export default Leavesettlement;

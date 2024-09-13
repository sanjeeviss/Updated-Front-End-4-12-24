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
  PAYMSHIFT,
  SHIFTDETAILS,
  SHIFTPATTERN,
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
function Shiftpatterns0009() {
  const [patterns, setPatterns] = useState([]);
  const [pattern, setPattern] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const location = useLocation();
  const shift = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    async function getCompanies() {
      console.log(shift);
      return await getRequest(ServerConfig.url, SHIFTPATTERN);
    }
    getCompanies().then((e) => {
      console.log("e", e.data);
      const d = e.data.filter(
        (e) =>
          e.shiftCode1 == shift.shiftCode ||
          e.shiftCode2 == shift.shiftCode ||
          e.shiftCode3 == shift.shiftCode ||
          e.shiftCode4 == shift.shiftCode ||
          e.shiftCode5 == shift.shiftCode ||
          e.shiftCode6 == shift.shiftCode ||
          e.shiftCode7 == shift.shiftCode ||
          e.shiftCode8 == shift.shiftCode
      );
      console.log("dataa", d);
      setPatterns(d);
    });
  }, []);

  function handleonclick() {
    navigate("/Sample12");
  }

  function handl23eonclick() {
    const navdata = {
      pattern: pattern[0],
      shift,
    };
    navigate("/setupleave", { state: navdata });
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
                  Create a new Shift Pattern
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
                height: 380,
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
                      console.log(e.target.value);
                      if (e.target.value != "select") {
                        setDisabled(false);
                      } else {
                        setDisabled(true);
                      }
                      setPattern(
                        patterns.filter((r) => r.patternCode == e.target.value)
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
                    {patterns.map((e) => (
                      <option value={e.patternCode}>{e.patternCode}</option>
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
                  pattern == undefined || pattern == null
                    ? "no data"
                    : pattern.map((e) => (
                        <div style={{ padding: "20px" }}>
                          <div>Pattern: {e.patternCode}</div>
                          <div>day 1 : {e.shiftCode1}</div>
                          <div> day 2 : {e.shiftCode2}</div>
                          <div> day 3 : {e.shiftCode3}</div>
                          <div>day 4: {e.shiftCode4}</div>
                          <div>day 5: {e.shiftCode5}</div>
                          <div>day 6: {e.shiftCode6}</div>
                          <div>day 7: {e.shiftCode7}</div>
                          <div>day 8: {e.shiftCode8}</div>
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
                  disabled={disabled}>
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
export default Shiftpatterns0009;

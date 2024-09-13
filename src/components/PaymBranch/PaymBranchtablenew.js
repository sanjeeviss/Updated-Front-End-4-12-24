import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { createSvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { JsonToTable } from "react-json-to-table";
import { Grid } from "@mui/material";
import { viewById } from "../../reduxcomp/actions/actionfunctions";
import {
  PAYMBRANCHES,
  PAYMEMPLOYEE,
} from "../../serverconfiguration/controllers";
import { getRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
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

function PaymBranchtable() {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getRequest(ServerConfig.url, PAYMBRANCHES).then((e) => {
      setData(e.data);
    });
  }, []);

  function handleonclick() {
    navigate("/PayBranchForm");
  }
  return (
    <div>
      <Grid margin={5}>
        <Button variant="outlined" color="success" onClick={handleonclick}>
          Add
          <PlusIcon />
        </Button>
      </Grid>
      <JsonTable jsonData={data} url={ServerConfig.url + PAYMBRANCHES} />
    </div>
  );
}
export default PaymBranchtable;

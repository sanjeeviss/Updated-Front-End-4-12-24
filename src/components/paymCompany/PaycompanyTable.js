import React from "react";
import { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest } from "../../serverconfiguration/requestcomp";
import { createSvgIcon } from "@mui/material";
import { Button, Grid } from "@mui/material";
import { PAYMCOMPANIES } from "../../serverconfiguration/controllers";
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

const PaycompanyTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{}]);
  useEffect(() => {
    getRequest(ServerConfig.url, PAYMCOMPANIES).then((e) => {
      setData(e.data);
    });
  }, []);

  function handleonclick() {
    navigate("/CompanyForm");
  }
  function handleon2click() {
    navigate("/Setup");
  }
  return (
    <div>
      <Grid margin={5}>
        <Button variant="outlined" color="success" onClick={handleonclick}>
          Add
          <PlusIcon />
        </Button>
        <Button variant="outlined" color="success" onClick={handleon2click}>
          Setup
        </Button>
      </Grid>
      <JsonTable jsonData={data} url={ServerConfig.url + PAYMCOMPANIES} />
      {/* <JsonToTable json={data}/> */}
    </div>
  );
};

export default PaycompanyTable;

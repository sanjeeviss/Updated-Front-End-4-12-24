import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { REPORTS } from "../../../serverconfiguration/controllers";
import { postRequest } from "../../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import Payslipmonthly from "./Payslipmonthly";

export default function PayslipGenerator() {
  const [isloggedin] = useState(sessionStorage.getItem("user"));
  const [paympaybills, setPaymPayBills] = useState([]);
  const [pnEmployeeId, setPnEmployeeId] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [paym, setPaym] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await postRequest(ServerConfig.url, REPORTS, {
        query: `select * from paym_paybill where EmployeeCode = '${isloggedin}'`,
      });
      setPaymPayBills(data.data);
    }
    getData();
  }, [isloggedin]);

  useEffect(() => {
    if (paympaybills.length > 0) {
      const latestPaySlip = paympaybills
        .filter(
          (e) =>
            e.pn_EmployeeID === paympaybills[0].pn_EmployeeID &&
            e.EmployeeCode === paympaybills[0].EmployeeCode
        )
        .sort((a, b) => new Date(b.d_date) - new Date(a.d_date))[0]; // Sort and get latest
      setPnEmployeeId(latestPaySlip?.pn_EmployeeID || "");
      setEmployeeCode(latestPaySlip?.EmployeeCode || "");
      setSelectedDate(latestPaySlip?.d_date || "");
      setPaym(latestPaySlip || {});
    }
  }, [paympaybills]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    const paym = paympaybills.filter(
      (item) =>
        item.EmployeeCode === employeeCode && item.d_date === selectedDate
    );

    setPaym(paym[0]);
  };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Typography
          variant="h4"
          color="primary"
          align="center"
          mt={-7}
          mb={3}
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          Payslip
        </Typography>

        {/* Date selection */}
        <Grid
          item
          xs={12}
          sm={12}
          mt={-1}
          mb={2}
          style={{ textAlign: "right" }}
        >
          <div
            style={{
              width: "200px",
              position: "relative",
              marginLeft: "auto",
              marginRight: "20px",
            }}
          >
            <label
              htmlFor="dDate"
              style={{
                position: "absolute",
                top: "-10px",
                left: "10px",
                backgroundColor: "white",
                padding: "0 4px",
                zIndex: 1,
              }}
            >
              Date
            </label>
            <select
              id="dDate"
              name="dDate"
              onChange={handleDateChange}
              style={{ height: "50px", width: "100%", padding: "10px" }}
              value={selectedDate} // Set the current selected date
            >
              <option value="">Select</option>
              {paympaybills
                .filter(
                  (e) =>
                    e.pn_EmployeeID === pnEmployeeId &&
                    e.EmployeeCode === employeeCode
                )
                .map((e) => (
                  <option key={e.d_date} value={e.d_date}>
                    {new Date(e.d_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </option>
                ))}
            </select>
          </div>
        </Grid>
      </Grid>

      {selectedDate && (
        <Payslipmonthly
          paym={paym}
          pnEmployeeId={pnEmployeeId}
          employeeCode={employeeCode}
        />
      )}
    </div>
  );
}

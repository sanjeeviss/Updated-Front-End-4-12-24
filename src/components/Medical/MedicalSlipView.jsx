import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { REPORTS } from "../../serverconfiguration/controllers";
import { useLocation } from "react-router-dom";

const MedicalSlipView = () => {
  const [medicalslip, setMedicalSlip] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const location = useLocation();

  const { pnEmployeeId, employeeCode } = location.state || {};

  useEffect(() => {
    async function getData() {
      try {
        const response = await postRequest(ServerConfig.url, REPORTS, {
          query: `select * from medicalslip where EmployeeCode = '${employeeCode}'`,
        });
        setMedicalSlip(response.data);
      } catch (error) {
        console.error("Error fetching medical slips:", error);
      }
    }
    getData();
  }, [pnEmployeeId, employeeCode]);

  const employeeCode1 = employeeCode;

  const handleImageClick = (index) => {
    setSelectedImageIndex(selectedImageIndex === index ? null : index);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Employee ID
            </TableCell>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Employee Code
            </TableCell>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Employee Full Name
            </TableCell>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Date of Service
            </TableCell>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Hospital Name
            </TableCell>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Amount
            </TableCell>
            <TableCell style={{ backgroundColor: "blue", color: "white" }}>
              Medical Bill
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicalslip.length > 0 ? (
            medicalslip.map((medical, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography>{medical.pn_EmployeeID}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{medical.EmployeeCode}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{medical.Employee_Full_Name}</Typography>
                </TableCell>

                <TableCell>
                  <Typography>{medical.Date_of_service}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{medical.Hospital_Name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{medical.Amount}</Typography>
                </TableCell>
                <TableCell>
                  {medical.Medicalbills ? (
                    selectedImageIndex === index ? (
                      <div>
                        <img
                          src={`data:image/png;base64,${medical.Medicalbills}`}
                          alt={`Medical Bill ${index + 1}`}
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                        <Button
                          variant="contained"
                          style={{ textAlign: "center", marginLeft: "480px" }}
                          onClick={() => handleImageClick(index)}>
                          Back
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outlined"
                        onClick={() => handleImageClick(index)}>
                        <Typography>View Medical Bill {index + 1}</Typography>
                      </Button>
                    )
                  ) : (
                    <Typography>No Medical Bill Image Available</Typography>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography>
                  No medical records found for EmployeeCode {employeeCode1}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicalSlipView;

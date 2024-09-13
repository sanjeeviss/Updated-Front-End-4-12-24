import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  TableCell,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Icon,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { Edit, Delete } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { SAVE } from "../../serverconfiguration/controllers";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const handlesaveall = () => {
  postRequest(ServerConfig.url, SAVE, {
    query: `INSERT INTO time_card 
      SELECT pn_companyid, pn_branchid, emp_code, emp_name, shift_code, dates, days, intime, break_out, break_in, early_out, outtime, late_in, late_out, ot_hrs, status, leave_code, data, pn_EmployeeID, flag
      FROM temp_timecard;`,
  })
    .then((response) => {
      alert("Attendance saved successfully!");

      return postRequest(ServerConfig.url, SAVE, {
        query: `DELETE FROM temp_timecard;`,
      });
    })
    .then((deleteResponse) => {
      alert("Data deleted from temp_timecard.");

      return postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO backup_attendance 
        SELECT pn_companyid, pn_branchid, emp_code, emp_name, shift_code, dates, days, intime, break_out, break_in, early_out, outtime, late_in, late_out, ot_hrs, status, leave_code, data, pn_EmployeeID, flag
        FROM time_card;`,
      });
    })
    .then((insertResponse) => {
      alert("Data inserted into backup_attendance.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Operation failed. Please try again.");
    });
};

function filterArray(array, column, value) {
  return array.filter((item) => item[column] === value);
}
const JsonTable = ({ jsonData, url }) => {
  const [editable, setEditable] = useState(-1);
  const [searchColumn, setSearchColumn] = useState("");
  const [searchText, setSearchText] = useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(url);
  if (!jsonData) {
    return <Typography>No JSON data provided.</Typography>;
  }

  const isObject = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  const renderCell = (value) => {
    if (isObject(value)) {
      return <JsonTable jsonData={[value]} />;
    } else {
      return value;
    }
  };

  const handleEdit = (rowIndex) => {
    setEditable(rowIndex);
  };

  const handleSave = (rowIndex, row) => {
    console.log(row);
    row.paymBranch = {
      pnCompany: {
        pnCompanyId: row.pnCompanyId,
      },
      pnBranchId: row.pnBranchId,
    };
    row.flag = "m";
    axios
      .put(url + "/" + row.sno, row)
      .then((response) => {
        if (response.status === 204) {
          alert("Data Saved Successfully!");
          setEditable(-1);
          window.location.reload();
        }
      })
      .catch((error) => {
        alert("Cannot perform this operation!");
      });
  };

  const handleDelete = (row) => {
    console.log(row);
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmed) {
      axios
        .delete(url + "/" + row)
        .then(() => {
          alert("Deleted successfully");
          window.location.reload();
        })
        .catch((error) => console.log(error));
    } else {
      alert("Delete operation cancelled");
    }
  };

  return (
    <div>
      <div style={{ maxWidth: "100%", marginLeft: "570px" }}>
        <div
          style={{
            display: "inline",
            paddingTop: "22px",
            //border: "2px solid white",
            fontSize: "1rem",
            textTransform: "uppercase",
            //padding: "8px",
            //backgroundColor: "black",
            //color: "white",
            //textAlign: "center",
            transition: "background-color 0.3s ease",
          }}>
          {/* Search By{" "} */}
          {/* <select
            onChange={(e) => {
              setSearchColumn(e.currentTarget.value);
            }}
            style={{
              display: "inline",
              paddingTop: "22px",
              border: "2px solid white",
              fontSize: "1rem",

              padding: "8px",
              //backgroundColor: "black",
              //color: "white",
              textAlign: "center",
              transition: "background-color 0.3s ease",
            }}>
            <option>select...</option>
            {Object.keys(jsonData[0]).map((header) => (
              <option>
                {header == "pnCompanyid" ||
                header == "pnBranchid" ||
                header == "empCode" ||
                header == "empName" ||
                header == "id"
                  ? header
                  : ""}
              </option>
            ))}
          </select> */}
        </div>
        <div style={{ display: "inline", paddingTop: "22px" }}>
          {/* <SearchIcon
            style={{ alignItems: "center", width: "1.5rem", height: "1rem" }}
          /> */}
        </div>
        {/* <input
          type="text"
          component={Paper}
          placeholder="search...."
          style={{
            width: "500px",
            height: "20px",
            borderRadius: "100px",
            padding: "15px",
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        /> */}
      </div>
      <div>
        <Button
          variant="outlined"
          style={{ marginBottom: "20px", marginLeft: "1300px" }}
          onClick={handlesaveall}>
          Save All
        </Button>
      </div>
      <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
        <Table size="xxlarge">
          <TableHead>
            <TableRow>
              {jsonData != null || jsonData != undefined
                ? Object.keys(jsonData[0]).map((header) => (
                    <StyledTableCell key={header}>
                      {header.split(/paym|pn/)}
                    </StyledTableCell>
                  ))
                : "no data available"}
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData
              .filter((f) => {
                if (searchText.toString().trim().length == 0) {
                  return f;
                } else {
                  switch (searchColumn) {
                    case "id":
                      return f[searchColumn] == searchText;
                    case "pnCompanyId":
                      return f.pnCompanyId == searchText;
                    case "pnBranchId":
                      return f.pnBranchId == searchText;
                    case "pnEmployeeId":
                      return f.pnEmployeeId == searchText;

                    case "empName":
                    case "empCode":
                      return f[searchColumn].toString().search(searchText) >= 0;
                    default:
                      return f;
                  }
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <StyledTableCell
                      key={`${rowIndex}-${cellIndex}`}
                      align="center">
                      {editable === rowIndex ? (
                        <TextField
                          defaultValue={cell}
                          onChange={(e) => {
                            row[Object.keys(row)[cellIndex]] = e.target.value;
                          }}
                        />
                      ) : (
                        renderCell(cell)
                      )}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell>
                    {editable === rowIndex ? (
                      <Tooltip title="Save">
                        <IconButton onClick={() => handleSave(rowIndex, row)}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ backgroundColor: "purple" }}
                            size="small">
                            Save
                          </Button>
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(rowIndex)}>
                          <Edit fontSize="medium" style={{ color: "green" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(rowIndex)}>
                        <Delete fontSize="medium" style={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={jsonData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default JsonTable;

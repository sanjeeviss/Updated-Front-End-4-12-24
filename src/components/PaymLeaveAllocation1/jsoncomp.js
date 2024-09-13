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
import { Edit, Delete } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
function filterArray(array, column, value) {
  return array.filter((item) => item[column] === value);
}
const JsonTable = ({ jsonData, url }) => {
  const [editable, setEditable] = useState(-1);
  const [searchColumn, setSearchColumn] = useState("");
  const [searchText, setSearchText] = useState(0);
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
      .put(url + "/" + row.pnCompanyid, row, {
        headers: {
          "X-Special-Header": sessionStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        if (response.status === 204) {
          alert("Data Saved Successfully!");
          setEditable(-1);
          window.location.href = "http://localhost:3000";
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
          Search By{" "}
          <select
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
          </select>
        </div>
        <div style={{ display: "inline", paddingTop: "22px" }}>
          <SearchIcon
            style={{ alignItems: "center", width: "1.5rem", height: "1rem" }}
          />
        </div>
        <input
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
        />
      </div>
      <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
        <Table size="xxlarge">
          <TableHead>
            <TableRow style={{ height: "1px", width: "5px" }}>
              {Object.keys(jsonData[0]).map((header) => (
                <TableCell
                  key={header}
                  style={{
                    border: "2px solid white",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    padding: "8px",
                    backgroundColor: "black",
                    color: "white",
                    textAlign: "center",
                    transition: "background-color 0.3s ease",
                  }}>
                  {header.split(/paym|pn/)}
                </TableCell>
              ))}
              <TableCell
                style={{
                  border: "2px solid white",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  padding: "8px",
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  transition: "background-color 0.3s ease",
                }}>
                Edit
              </TableCell>
              <TableCell
                style={{
                  border: "2px solid white",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  padding: "8px",
                  backgroundColor: "black",
                  color: "white",
                  textAlign: "center",
                  transition: "background-color 0.3s ease",
                }}>
                Delete
              </TableCell>
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
              .map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.values(row).map((cell, cellIndex) => (
                    <TableCell
                      key={`${rowIndex}-${cellIndex}`}
                      style={{
                        border: "1px solid black",
                        fontSize: "1rem",
                        Align: "left",
                      }}>
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
                    </TableCell>
                  ))}
                  <TableCell style={{ border: "1px solid black" }}>
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
                        <IconButton
                          onClick={() => handleEdit(rowIndex)}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}>
                          <Edit fontSize="medium" style={{ color: "green" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                  <TableCell style={{ border: "1px solid black" }}>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(rowIndex)}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}>
                        <Delete fontSize="medium" style={{ color: "red" }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default JsonTable;

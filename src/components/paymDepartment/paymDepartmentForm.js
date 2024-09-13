import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  FormControl,
} from "@mui/material";

import { inputpaymDepartmentForm } from "./paymDepartment";
import {
  PAYMBRANCHES,
  PAYMDEPARTMENT,
} from "../../serverconfiguration/controllers";

import { PAYMCOMPANIES } from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function DepartmentMasters() {
  const navigate = useNavigate();

  const [designation, setDesignation] = useState([]);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vDepartmentName, setVDepartmentName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
    }
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: pnCompanyId,
      pnBranchId: pnBranchId,
      vDepartmentName: vDepartmentName,
      status: status,
    };
    console.log(formData);
  };

  const margin = { margin: "0 5px" };
  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              DEPARTMENT
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setPnCompanyId(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {company.map((e) => (
                        <option>{e.pnCompanyId}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <select
                      name="PnBranchid"
                      onChange={(e) => {
                        setPnBranchId(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {branch
                        .filter((e) => e.pnCompanyId == pnCompanyId)
                        .map((e) => (
                          <option>{e.pnBranchId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="vDepartmentName"
                      label="vDepartmentName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVDepartmentName(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="status"
                      label="status"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setStatus(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={"10px"}>
                  <Grid item xs={12} align="right">
                    <Button
                      style={margin}
                      type="reset"
                      variant="outlined"
                      color="primary">
                      RESET
                    </Button>
                    <Button
                      onClick={() => {
                        const formData = {
                          pnCompanyId: pnCompanyId,
                          pnBranchId: pnBranchId,
                          vDepartmentName: vDepartmentName,
                          status: status,
                          pnCompany: {
                            pnCompanyId: pnCompanyId,
                          },
                        };
                        console.log(formData);
                        postRequest(ServerConfig.url, PAYMDEPARTMENT, formData)
                          .then((e) => {
                            console.log(e);
                            navigate("/PaymDepartmentTable");
                          })
                          .catch((e) => console.log(e));
                      }}
                      variant="contained"
                      color="primary">
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

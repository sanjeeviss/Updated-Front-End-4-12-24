import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  CardContent,
  InputLabel,
  FormControl,
} from "@mui/material";

import { inputpaymGradeForm } from "./paymGrade";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
  PAYMGRADE,
} from "../../serverconfiguration/controllers";

export default function GradeForm() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [grade, setGrade] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vGradeName, setVGradeName] = useState("");
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

  const margin = { margin: "0 5px" };
  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              PAYM GRADE
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
                      name="branchId"
                      onChange={(e) => {
                        setPnBranchId(e.target.value);
                      }}
                      style={{ height: "50px" }}
                      inputlabelprops={{ shrink: true }}>
                      <option value="">Select</option>
                      {branch
                        .filter((e) => {
                          return e.pnCompanyId == pnCompanyId;
                        })
                        .map((e) => (
                          <option>{e.pnBranchId}</option>
                        ))}
                    </select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="vGradeName"
                      label="vGradeName"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVGradeName(e.target.value)}
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
                          vGradeName: vGradeName,
                          status: status,
                          pnCompany: {
                            pnCompanyId: pnCompanyId,
                          },
                        };
                        console.log(formData);
                        postRequest(ServerConfig.url, PAYMGRADE, formData)
                          .then((e) => {
                            console.log(e);
                            navigate("/PaymgradeTables");
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

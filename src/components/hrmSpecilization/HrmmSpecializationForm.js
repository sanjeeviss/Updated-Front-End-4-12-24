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
import {
  HRMMSPECIALIZATION,
  PAYMCOMPANIES,
} from "../../serverconfiguration/controllers";
import React, { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { inputFormHrmmSpecialization } from "./HrmmSpecialization";

const SpecializationForm = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);

  const [pnCompanyId, setPnCompanyId] = useState("");
  const [vSpecializationName, setVSpecializationName] = useState("");
  const [status, setStatus] = useState("");
  const [pnBranchId, setpnBranchId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: pnCompanyId,
      vSpecializationName: vSpecializationName,
      pnBranchId: pnBranchId,
      status: status,
    };
  };

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
    }
    getData();
  }, []);

  return (
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 600, margin: "0 auto", font: "initial" }}>
          <CardContent>
            <Typography
              sx={{ mt: 3 }}
              align="center"
              color="primary"
              variant="h5">
              Hrmm Specialization
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>CompanyId</InputLabel>
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

                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>vSpecializationName</InputLabel>
                    <TextField
                      name="vSpecializationName"
                      label="vSpecializationName "
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVSpecializationName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>status</InputLabel>
                    <TextField
                      name="status"
                      label="status "
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>branchId</InputLabel>
                    <TextField
                      name="branchId"
                      label="branchId "
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setpnBranchId(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                {inputFormHrmmSpecialization &&
                  inputFormHrmmSpecialization.length > 0 &&
                  inputFormHrmmSpecialization.map((input) => (
                    <Grid xs={input.xs} sm={input.sm} item key={input.name}>
                      {/* Your input components */}
                    </Grid>
                  ))}
                <Grid container spacing={1}>
                  <Grid item xs={12} align="right">
                    <Button
                      type="reset"
                      variant="contained"
                      color="primary"
                      style={{ paddingRight: "3" }}>
                      Reset
                    </Button>
                    <Button
                      onClick={() => {
                        const formData = {
                          pnCompanyId: pnCompanyId,
                          vSpecializationName: vSpecializationName,
                          pnBranchId: pnBranchId,
                          status: status,
                          pnCompany: {
                            pnCompanyId: pnCompanyId,
                          },
                        };
                        console.log(formData);
                        postRequest(
                          ServerConfig.url,
                          HRMMSPECIALIZATION,
                          formData
                        )
                          .then((e) => {
                            console.log(e);
                            navigate("/HrmmSpecializationtable");
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
};
export default SpecializationForm;

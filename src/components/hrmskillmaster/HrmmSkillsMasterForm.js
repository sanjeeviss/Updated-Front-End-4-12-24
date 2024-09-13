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
  HRMMSKILLMASTER,
  PAYMCOMPANIES,
} from "../../serverconfiguration/controllers";

import React, { useState, useEffect } from "react";

import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { Label } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { inputFormHrmmSkillsMaster } from "./HrmmSkillsMaster";
import { decryptData } from "../Authentication/encryption";

const SkillsMasterForm = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState(
    decryptData(sessionStorage.getItem("company"))
  );

  const [PnCompanyId, setPnCompanyId] = useState(
    decryptData(sessionStorage.getItem("company"))
  );
  const [vSkillName, setVSkillName] = useState("");
  const [status, setStatus] = useState("");
  const [BranchId, setBranchId] = useState(
    decryptData(sessionStorage.getItem("branch"))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      pnCompanyId: PnCompanyId,
      branchId: BranchId,
      vSkillName: vSkillName,
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
              Hrmm Skill Master
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>CompanyId</InputLabel>
                    {/* <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setPnCompanyId(e.target.value);
                        
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {company.map((e) => (
                        <option>{e.pnCompanyId}</option>
                      ))}
                    </select> */}
                    {PnCompanyId}
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={12} item>
                  <FormControl fullWidth>
                    <InputLabel shrink>vSkillName</InputLabel>
                    <TextField
                      name="vSkillName"
                      label="vSkillName "
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVSkillName(e.target.value)}
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
                    {/* <TextField
                      name="b-ranchId"
                      label="branchId "
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBranchId(e.target.value)}
                    /> */}
                    {BranchId}
                  </FormControl>
                </Grid>

                {inputFormHrmmSkillsMaster &&
                  inputFormHrmmSkillsMaster.length > 0 &&
                  inputFormHrmmSkillsMaster.map((input) => (
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
                          pnCompanyId: PnCompanyId,
                          branchId: BranchId,
                          vSkillName: vSkillName,
                          status: status,
                          pnCompany: {
                            pnCompanyId: PnCompanyId,
                          },
                        };
                        console.log(formData);
                        postRequest(ServerConfig.url, HRMMSKILLMASTER, formData)
                          .then((e) => {
                            console.log(e);
                            navigate("/Hrmskillmastertable");
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
export default SkillsMasterForm;

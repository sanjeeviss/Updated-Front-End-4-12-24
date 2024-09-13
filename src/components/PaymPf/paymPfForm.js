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
import { useState, useEffect } from "react";
import {
  PAYMBRANCHES,
  PAYMCOMPANIES,
  PAYMEMPLOYEE,
  PAYMPF,
} from "../../serverconfiguration/controllers";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { InputLabel } from "@mui/material";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { useNavigate } from "react-router-dom";

export default function Sample24() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setpnCompanyId] = useState("");
  const [pnBranchId, setPnBranch] = useState([]);
  const [empConPf, setEmpConPf] = useState("");
  const [empConEpf, setEmpConEpf] = useState("");
  const [empConFpf, setEmpConFpf] = useState("");
  const [adminCharges, setAdminCharges] = useState("");
  const [eligibilityAmt, setEligibilityAmt] = useState("");
  const [cRound, setCRound] = useState("");
  const [dDate, setDdate] = useState("");
  const [checkCeiling, setCheckCeiling] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [checkAllowance, setCheckAllowance] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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
      empConPf: empConPf,
      empConEpf: empConEpf,
      empConFpf: empConFpf,
      adminCharges: adminCharges,
      eligibilityAmt: eligibilityAmt,
      cRound: cRound,
      dDate: dDate,
      checkCeiling: checkCeiling,
      maxAmount: maxAmount,
      checkAllowance: checkAllowance,
      month: month,
      year: year,
      paymBranch: {
        pnbranchId: pnBranchId,
      },
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
              PaymPF
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <select
                      name="pnCompanyId"
                      onChange={(e) => {
                        setpnCompanyId(e.target.value);
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
                      name="pnBranchId"
                      onChange={(e) => {
                        setPnBranch(e.target.value);
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
                      name="empConPf"
                      label="empConPf"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmpConPf(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="empConEpf"
                      label="empConEpf"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmpConEpf(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="empConFpf"
                      label="empConFpf"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEmpConFpf(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="adminCharges"
                      label="adminCharges"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAdminCharges(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="eligibilityAmt"
                      label="eligibilityAmt"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEligibilityAmt(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="cRound"
                      label="cRound"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCRound(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="dDate"
                      label="dDate"
                      variant="outlined"
                      type="datetime-local"
                      fullWidth
                      requi
                      red
                      onChange={(e) => setDdate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="checkCeiling"
                      label="checkCeiling"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCheckCeiling(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="maxAmount"
                      label="maxAmount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMaxAmount(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="checkAllowance"
                      label="checkAllowance"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCheckAllowance(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="month"
                      label="month"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMonth(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="year"
                      label="year"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setYear(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
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
                        empConPf: empConPf,
                        empConEpf: empConEpf,
                        empConFpf: empConFpf,
                        adminCharges: adminCharges,
                        eligibilityAmt: eligibilityAmt,
                        cRound: cRound,
                        dDate: dDate,
                        checkCeiling: checkCeiling,
                        maxAmount: maxAmount,
                        checkAllowance: checkAllowance,
                        month: month,
                        year: year,
                        paymBranch: {
                          pnbranchId: pnBranchId,
                          pnCompany: {
                            pnCompanyId: pnCompanyId,
                          },
                        },
                      };
                      console.log(formData);
                      postRequest(ServerConfig.url, PAYMPF, formData)
                        .then((e) => {
                          console.log(e);
                          navigate("/PaymPaypfTable");
                        })
                        .catch((e) => console.log(e));
                    }}
                    variant="contained"
                    color="primary">
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

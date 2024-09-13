import { Grid, Card, TextField, Button, Typography, CardContent, FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMDEPARTMENT } from '../../serverconfiguration/controllers';

export default function Departmensmasters() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vDepartmentName, setVDepartmentName] = useState("");
  const [status, setStatus] = useState("");

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [vDepartmentNameError, setVDepartmentNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
    }
    getData();
  }, []);

  const handleCompanyChange = (e) => {
    setPnCompanyId(e.target.value);
    setCompanyError(!e.target.value);
  };

  const handleBranchChange = (e) => {
    setPnBranchId(e.target.value);
    setBranchError(!e.target.value);
  };

  const handleVDepartmentNameChange = (e) => {
    const value = e.target.value;
    const isValid = /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,40}$/.test(value);
    setVDepartmentName(value);
    setVDepartmentNameError(!isValid);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    const isValid = /^[A-Za-z]{0,1}$/.test(value);
    setStatus(value);
    setStatusError(!isValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!pnCompanyId);
    setBranchError(!pnBranchId);
    setVDepartmentNameError(!/^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,40}$/.test(vDepartmentName));
    setStatusError(!/^[A-Za-z]{1}$/.test(status));

    if (companyError || branchError || vDepartmentNameError || statusError) {
      return;
    }

    const formData = {
      pnCompanyId: pnCompanyId,
      pnBranchId: pnBranchId,
      vDepartmentName: vDepartmentName,
      status: status,
      pnCompany: {
        pnCompanyId: pnCompanyId
      }
    };

    try {
      const response = await postRequest(ServerConfig.url, PAYMDEPARTMENT, formData);
      console.log(response);
      navigate('/PaymDepartmentTable');
    } catch (error) {
      console.log(error);
    }
  };

  const margin = { margin: "0 5px" };

  return (
    <div>
      <Grid style={{ padding: "80px 5px 0 5px" }}>
        <Card style={{ maxWidth: 1200, margin: "0 auto" }}>
          <CardContent>
            <Typography variant='h5' color='S- Light' align='center'>Department Name</Typography>
            <Typography variant='subtitle1' color="textSecondary" paddingBottom={'20px'}>
              Fill all the Mandatory fields
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      value={pnCompanyId}
                      onChange={handleCompanyChange}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {company.map((e) => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>{e.pnCompanyId}</MenuItem>
                      ))}
                    </Select>
                    {companyError && <FormHelperText sx={{ color: 'red' }}>Please select a CompanyId</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      value={pnBranchId}
                      onChange={handleBranchChange}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {branch.map((e) => (
                        <MenuItem key={e.pnBranchId} value={e.pnBranchId}>{e.pnBranchId}</MenuItem>
                      ))}
                    </Select>
                    {branchError && <FormHelperText sx={{ color: 'red' }}>Please select a BranchId</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth error={vDepartmentNameError}>
                    <TextField
                      name="vDepartmentName"
                      label="vDepartmentName"
                      variant="outlined"
                      fullWidth
                      required
                      value={vDepartmentName}
                      onChange={handleVDepartmentNameChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {vDepartmentNameError && <FormHelperText sx={{ color: 'red' }}>Please enter a valid Department Name (alphanumeric and special characters, max length 40)</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth error={statusError}>
                    <TextField
                      name="status"
                      label="status"
                      variant="outlined"
                      fullWidth
                      required
                      value={status}
                      onChange={handleStatusChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {statusError && <FormHelperText sx={{ color: 'red' }}>Please enter a valid Status (single alphabetic character)</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid container spacing={1} paddingTop={'10px'}>
                  <Grid item xs={12} align="right">
                    <Button style={margin} type="reset" variant='outlined' color='primary'>RESET</Button>
                    <Button type="submit" variant='contained' color='primary'>SAVE</Button>
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
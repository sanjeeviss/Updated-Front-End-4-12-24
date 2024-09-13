import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  CardContent,
} from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMDESIGNATION } from '../../serverconfiguration/controllers';

export default function DesignationMasters() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [vDesignationName, setVDesignationName] = useState('');
  const [authority, setAuthority] = useState('');
  const [status, setStatus] = useState('');
  const [branch,setBranch] = useState([]);

  const [companyError, setCompanyError] = useState(false);
  const [branchIdError, setBranchIdError] = useState(false);
  const [designationNameError, setDesignationNameError] = useState(false);
  const [authorityError, setAuthorityError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [branchError,setBranchError] = useState(false);

  useEffect(() => {
    async function getData() {
      const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(companyData.data);
      const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
      setBranch(data1.data);
    }
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'pnCompanyId':
        setPnCompanyId(value);
        setCompanyError(false);
        break;
        case 'branchId':
      setBranchId(value);
      setBranchError(false);
        break;
      case 'v_DesignationName':
        setVDesignationName(value);
        setDesignationNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(value));
        break;
      case 'authority':
        setAuthority(value.toUpperCase());
        setAuthorityError(!/^[A-Za-z]{1}$/.test(value));
        break;
      case 'status':
        setStatus(value.toUpperCase());
        setStatusError(!/^[A-Za-z]{1}$/.test(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!pnCompanyId);
    setBranchError(!branchId);
 
    setDesignationNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(vDesignationName));
    setAuthorityError(!/^[A-Za-z]{1}$/.test(authority));
    setStatusError(!/^[A-Za-z]{1}$/.test(status));

    if (
      companyError ||
      branchError ||
      branchIdError ||
      designationNameError ||
      authorityError ||
      statusError
    ) {
      return;
    }

    const formData = {
      pnCompanyId: pnCompanyId,
      branchId: branchId,
      vDesignationName: vDesignationName,
      authority: authority,
      status: status,
    };

    try {
      const response = await postRequest(ServerConfig.url, PAYMDESIGNATION, formData);
      console.log(response);
      navigate('/PaymDesignationTable');
    } catch (error) {
      console.error('Error saving designation:', error);
    }
  };

  const margin = { margin: '0 5px' };

  return (
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 1200, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center">
              Designation Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      value={pnCompanyId}
                      onChange={handleChange}
                      name="pnCompanyId"
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {company.map((e) => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.pnCompanyId}
                        </MenuItem>
                      ))}
                    </Select>
                    {companyError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please select a Company
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel shrink>BranchId</InputLabel>
                    <Select
                      value={branchId}
                      onChange={handleChange}     
                      name="branchId"              
                         displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {branch.map((e) => (
                        <MenuItem key={e.branchId} value={e.branchId}>{e.pnBranchId}</MenuItem>
                      ))}
                    </Select>
                    {branchError && <FormHelperText sx={{ color: 'red' }}>Please Select a BranchId</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth error={designationNameError}>
                    <TextField
                      name="v_DesignationName"
                      label="v_DesignationName"
                      variant="outlined"
                      fullWidth
                      required
                      value={vDesignationName}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {designationNameError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Designation Name (alphanumeric characters, max length 40)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth error={authorityError}>
                    <TextField
                      name="authority"
                      label="Authority"
                      variant="outlined"
                      fullWidth
                      required
                      value={authority}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {authorityError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Authority (only alphabetic characters)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth error={statusError}>
                    <TextField
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      required
                      value={status}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {statusError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Status (only alphabetic characters)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={'10px'}>
                  <Grid item xs={12} align="right">
                    <Button style={margin} type="reset" variant="outlined" color="primary">
                      RESET
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
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
import {
    Grid,
    Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent,
    FormControl,
    InputLabel,
    FormHelperText,
  } from '@mui/material';
  
  import { useNavigate } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
  import { ServerConfig } from '../../serverconfiguration/serverconfig';
  import { PAYMBRANCHES, PAYMCOMPANIES } from '../../serverconfiguration/controllers';
  
  export default function PayBranchForm01() {
    const navigate = useNavigate();
  
    const [company, setCompany] = useState([]);
    const [pnCompanyId, setPnCompanyId] = useState('');
    const [branchCode, setBranchCode] = useState('');
    const [branchName, setBranchName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [faxNo, setFaxNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [alternateEmailId, setAlternateEmailId] = useState('');
    const [branchUserId, setBranchUserId] = useState('');
    const [branchPassword, setBranchPassword] = useState('');
    const [status, setStatus] = useState('');
    const [pfno, setPfno] = useState('');
    const [esino, setEsino] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    const [companyError, setCompanyError] = useState(false);
    const [branchCodeError, setBranchCodeError] = useState(false);
    const [branchNameError, setBranchNameError] = useState(false);
    const [addressLine1Error, setAddressLine1Error] = useState(false);
    const [addressLine2Error, setAddressLine2Error] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [zipCodeError, setZipCodeError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [phoneNoError, setPhoneNoError] = useState(false);
    const [faxNoError, setFaxNoError] = useState(false);
    const [emailIdError, setEmailIdError] = useState(false);
    const [alternateEmailIdError, setAlternateEmailIdError] = useState(false);
    const [branchUserIdError, setBranchUserIdError] = useState(false);
    const [branchPasswordError, setBranchPasswordError] = useState(false);
    const [statusError, setStatusError] = useState(false);
    const [pfnoError, setPfnoError] = useState(false);
    const [esinoError, setEsinoError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);
  
    useEffect(() => {
      async function getData() {
        const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompany(data.data);
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
        case 'branchCode':
          setBranchCode(value);
          setBranchCodeError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
          break;
        case 'branchName':
          setBranchName(value);
          setBranchNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(value) || !value);
          break;
        case 'addressLine1':
          setAddressLine1(value);
          setAddressLine1Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(value) || !value);
          break;
        case 'addressLine2':
          setAddressLine2(value);
          setAddressLine2Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(value) || !value);
          break;
        case 'city':
          setCity(value);
          setCityError(!/^[A-Za-z0-9\s]{1,100}$/.test(value) || !value);
          break;
        case 'zipCode':
          setZipCode(value);
          setZipCodeError(!/^[/-{}.,A-Za-z0-9\s]{1,50}$/.test(value) || !value);
          break;
        case 'country':
          setCountry(value);
          setCountryError(!/^[A-Za-z0-9\s]{1,100}$/.test(value) || !value);
          break;
        case 'state':
          setState(value);
          setStateError(!/^[A-Za-z0-9\s]{1,100}$/.test(value) || !value);
          break;
        case 'phoneNo':
          const phoneNumber = value.replace(/\D/g, '');
          setPhoneNo(value);
          setPhoneNoError(phoneNumber.length !== 10);
          break;
        case 'faxNo':
          const faxNoPattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
          setFaxNo(value)
          setFaxNoError(!faxNoPattern.test(value));
          break;
        case 'emailId':
          setEmailId(value.trim());
          setEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
          break;
        case 'alternateEmailId':
          setAlternateEmailId(value.trim());
          setAlternateEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
          break;
        case 'branchUserId':
          setBranchUserId(value);
          setBranchUserIdError(!/^[@$/_(){}:;.,A-Za-z0-9\s]{1,10}$/.test(value) || !value);
          break;
        case 'branchPassword':
          setBranchPassword(value);
          setBranchPasswordError(!/^[@$*_.,";:{}()/'"A-Za-z0-9\s]{1,10}$/.test(value) || !value);
          break;
        case 'status':
          setStatus(value);
          setStatusError(!/^[A-Za-z\s]{1}$/.test(value) || !value);
          break;
        case 'pfno':
          setPfno(value);
          setPfnoError(!/^[A-Za-z0-9\s]{5,10}$/.test(value) || !value);
          break;
        case 'esino':
          setEsino(value);
          setEsinoError(!/^\d{10,17}$/.test(value) || !value);
          break;
        case 'startDate':
          setStartDate(value);
          setStartDateError(!value);
          break;
        case 'endDate':
          setEndDate(value);
          setEndDateError(!value);
          break;
        default:
          break;
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setCompanyError(!pnCompanyId);
      setBranchCodeError(!/^[A-Za-z0-9\s]{1,20}$/.test(branchCode) || !branchCode);
      setBranchNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(branchName) || !branchName);
      setAddressLine1Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine1) || !addressLine1);
      setAddressLine2Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine2) || !addressLine2);
      setCityError(!/^[A-Za-z0-9\s]{1,100}$/.test(city) || !city);
      setZipCodeError(!/^[/-{}.,A-Za-z0-9\s]{1,50}$/.test(zipCode) || !zipCode);
      setCountryError(!/^[A-Za-z0-9\s]{1,100}$/.test(country) || !country);
      setStateError(!/^[A-Za-z0-9\s]{1,100}$/.test(state) || !state);
      setPhoneNoError(phoneNo.replace(/\D/g, '').length !== 10);
      setFaxNoError(!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(faxNo));
      setEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId));
      setAlternateEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alternateEmailId));
      setBranchUserIdError(!/^[@$/_(){}:;.,A-Za-z0-9\s]{1,10}$/.test(branchUserId) || !branchUserId);
      setBranchPasswordError(!/^[@$*_.,";:{}()/'"A-Za-z0-9\s]{1,10}$/.test(branchPassword) || !branchPassword);
      setStatusError(!/^[A-Za-z\s]{1}$/.test(status) || !status);
      setPfnoError(!/^[A-Za-z0-9\s]{20}$/.test(pfno) || !pfno);
      setEsinoError(!/^\d{10,17}$/.test(esino) || !esino);
      setStartDateError(!startDate);
      setEndDateError(!endDate);
  
      if (
        pnCompanyId &&
        /^[A-Za-z0-9\s]{1,20}$/.test(branchCode) &&
        /^[A-Za-z0-9\s]{1,50}$/.test(branchName) &&
        /^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine1) &&
        /^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine2) &&
        /^[A-Za-z0-9\s]{1,100}$/.test(city) &&
        /^[/-{}.,A-Za-z0-9\s]{1,50}$/.test(zipCode) &&
        /^[A-Za-z0-9\s]{1,100}$/.test(country) &&
        /^[A-Za-z0-9\s]{1,100}$/.test(state) &&
        phoneNo.replace(/\D/g, '').length === 10 &&
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/(faxNo) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alternateEmailId) &&
        /^[@$/_(){}:;.,A-Za-z0-9\s]{1,10}$/.test(branchUserId) &&
        /^[@$*_.,";:{}()/'"A-Za-z0-9\s]{1,10}$/.test(branchPassword) &&
        /^[A-Za-z\s]{1}$/.test(status) &&
        /^[A-Za-z0-9\s]{20}$/.test(pfno) &&
        /^\d{10,17}$/.test(esino) &&
        startDate &&
        endDate
      ) {
        const data = {
          pnCompanyId,
          branchCode,
          branchName,
          addressLine1,
          addressLine2,
          city,
          zipCode,
          country,
          state,
          phoneNo,
          faxNo,
          emailId,
          alternateEmailId,
          branchUserId,
          branchPassword,
          status,
          pfno,
          esino,
          startDate,
          endDate,
        };
  
        await postRequest(ServerConfig.url, PAYMBRANCHES, data);
        navigate('/paybranches');
      }
    };
  
    return (
     
        <Grid style={{ padding: "30px 5px 0 5px" }}>
          <Card style={{ maxWidth: 1200, margin: "0 auto" }}>
            <CardContent>
              <Typography variant='h5' gutterBottom>
               Paym Branch
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={3} >
              <FormControl fullWidth>
             
              <InputLabel shrink>Company</InputLabel>
                 <select name = "pnCompanyId" 
                 value={pnCompanyId}
                onChange={handleChange}
                 style={{ height: '55px' }}
  
                 >
                  <option value="">Select</option>
                     {
  
                        company.map((e)=><option>{e.pnCompanyId}</option>)
                     }
                 </select>
                 {companyError && <FormHelperText sx={{color:'red'}}>Please select a company</FormHelperText>}
  
              </FormControl >
                  </Grid>
                <Grid item xs={12} sm={3}>              
                <TextField
                    fullWidth
                    label="Branch Code"
                    name="branchCode"
                    value={branchCode}
                    onChange={handleChange}
                    error={branchCodeError}
                    helperText={branchCodeError && "Please enter  branch code"}
                  />
                </Grid>
                
                {/** Continue for other input fields similarly **/}
  
                <Grid item xs={12} sm={3}>              
                <TextField
                    fullWidth
                    label="Branch Name"
                    name="branchName"
                    value={branchName}
                    onChange={handleChange}
                    error={branchNameError}
                    helperText={branchNameError && "Please enter  branch name"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>              
                <TextField
                    fullWidth
                    label="Address Line 1"
                    name="addressLine1"
                    value={addressLine1}
                    onChange={handleChange}
                    error={addressLine1Error}
                    helperText={addressLine1Error && "Please enter  address"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3} >
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="addressLine2"
                    value={addressLine2}
                    onChange={handleChange}
                    error={addressLine2Error}
                    helperText={addressLine2Error && "Please enter address"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>              
                <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    error={cityError}
                    helperText={cityError && "Please enter  city"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>              
                <TextField
                    fullWidth
                    label="Zip Code"
                    name="zipCode"
                    value={zipCode}
                    onChange={handleChange}
                    error={zipCodeError}
                    helperText={zipCodeError && "Please enter  zip code"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3} >
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    error={countryError}
                    helperText={countryError && "Please enter  country"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={state}
                    onChange={handleChange}
                    error={stateError}
                    helperText={stateError && "Please enter  state"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={handleChange}
                    error={phoneNoError}
                    helperText={phoneNoError && "Please enter only 10 digits  number"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Fax Number"
                    name="faxNo"
                    value={faxNo}
                    onChange={handleChange}
                    error={faxNoError}
                    helperText={faxNoError && "Please enter  fax number"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Email ID"
                    name="emailId"
                    value={emailId}
                    onChange={handleChange}
                    error={emailIdError}
                    helperText={emailIdError && "Please enter  email ID"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Alternate Email ID"
                    name="alternateEmailId"
                    value={alternateEmailId}
                    onChange={handleChange}
                    error={alternateEmailIdError}
                    helperText={alternateEmailIdError && "Please enter  alternate email ID"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Branch User ID"
                    name="branchUserId"
                    value={branchUserId}
                    onChange={handleChange}
                    error={branchUserIdError}
                    helperText={branchUserIdError && "Please enter  branch user ID"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Branch Password"
                    name="branchPassword"
                    value={branchPassword}
                    onChange={handleChange}
                    error={branchPasswordError}
                    helperText={branchPasswordError && "Please enter  branch password"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Status"
                    name="status"
                    value={status}
                    onChange={handleChange}
                    error={statusError}
                    helperText={statusError && "Please enter  status"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="PF No"
                    name="pfno"
                    value={pfno}
                    onChange={handleChange}
                    error={pfnoError}
                    helperText={pfnoError && "Please enter  PF number"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="ESI No"
                    name="esino"
                    value={esino}
                    onChange={handleChange}
                    error={esinoError}
                    helperText={esinoError && "Please enter  ESI number"}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    name="startDate"
                    value={startDate}
                    onChange={handleChange}
                    error={startDateError}
                    helperText={startDateError && "Please select  start date"}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    name="endDate"
                    value={endDate}
                    onChange={handleChange}
                    error={endDateError}
                    helperText={endDateError && "Please select  end date"}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
  
                <Grid item xs={12} align="right">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    );
  }
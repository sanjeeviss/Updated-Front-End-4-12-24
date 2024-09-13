import React, { useEffect, useState } from 'react';
import { JsonToTable } from 'react-json-to-table';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { Button, Grid } from '@mui/material';
import { SALARYPERIOD } from '../../serverconfiguration/controllers';
import { useNavigate } from 'react-router-dom';

const SalaryPeriodTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch salary period data
    getRequest(ServerConfig.url, SALARYPERIOD).then((response) => {
      setData(response.data);
    });
  }, []);

  function handleAdd() {
    navigate('/Sample17');
  }

  return (
    <div>
      <JsonToTable json={data} />
      <Grid margin={5}>
        <Button variant='outlined' color='success' onClick={handleAdd}>Add</Button>
      </Grid>
    </div>
  );
}

export default SalaryPeriodTable;

import React from 'react'
import {useEffect, useState} from 'react'
import { JsonToTable } from 'react-json-to-table'
import { ServerConfig } from '../../serverconfiguration/serverconfig'
import { getRequest } from '../../serverconfiguration/requestcomp'
import { createSvgIcon } from '@mui/material'
import {Button, Grid} from '@mui/material'
import {PAYMDESIGNATION} from '../../serverconfiguration/controllers'
import { useNavigate} from 'react-router-dom'

const PlusIcon = createSvgIcon(
    // credit: plus icon from https://heroicons.com/
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
  );

  const PaymDesignationTable = ()=> {
    const navigate = useNavigate();
    const [data,setData] = useState([])
    useEffect(()=>{
        getRequest(ServerConfig.url, PAYMDESIGNATION).then((e)=>{
            setData(e.data);
        }
    )
    },[]);
    function handleonclick(){
        navigate('/DesignationForm')
    }
  return (
    <div> 
        <JsonToTable json={data}/>
    <Grid margin={5}><Button variant='outlined' color='success' onClick={handleonclick}>Add<PlusIcon/></Button></Grid>
</div>
  )
}

export default PaymDesignationTable
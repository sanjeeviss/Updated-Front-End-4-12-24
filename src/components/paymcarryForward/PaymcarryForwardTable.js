import React from 'react'
import { JsonToTable } from 'react-json-to-table'
import { useEffect, useState } from 'react'
import { ServerConfig } from '../../serverconfiguration/serverconfig'
import { getRequest } from '../../serverconfiguration/requestcomp'
import { PAYMCARRYFORWARD } from '../../serverconfiguration/controllers'
import { Button, Grid } from '@mui/material'
import {createSvgIcon} from '@mui/material'
import { useNavigate } from 'react-router-dom'

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

const PaymcarryForwardTable = ()=> {
    const navigate = useNavigate();
    const[data, setData] = useState([])
    useEffect(()=> {
        getRequest(ServerConfig.url, PAYMCARRYFORWARD).then((e)=>{
                  setData(e.data)
        }
    )
    },[]);
    function handleonclick(){
        navigate('/PaymCarrForwardForm')
    }
  return (

    <div>
        <JsonToTable json={data}/>
    <Grid margin={5}><Button variant='outlined' color='success' onClick={handleonclick}>Add<PlusIcon/></Button></Grid>
    </div> 
  )
}

export default PaymcarryForwardTable
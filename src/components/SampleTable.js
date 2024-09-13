import React from 'react'
import { JsonToTable } from "react-json-to-table";
import { useEffect ,useState} from 'react';
import { getRequest } from '../serverconfiguration/requestcomp';
import { ServerConfig } from '../serverconfiguration/serverconfig';
import { PAYMEMPLOYEE } from '../serverconfiguration/controllers';
import { Paper } from '@mui/material';
const SampleTable = () => {
    const [data,setData]=useState([])

    useEffect(()=>{
               getRequest(ServerConfig.url,PAYMEMPLOYEE).then((e)=>{
                setData(e.data)
               })
    },[])

  return (
    <div>
<JsonToTable json={data}/>
    </div>
  )
}

export default SampleTable
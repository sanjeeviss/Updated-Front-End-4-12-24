import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import {createSvgIcon} from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {connect} from 'react-redux'
import { viewById } from '../../reduxcomp/actions/actionfunctions';
import { PAYMEMPLOYEE } from '../../serverconfiguration/controllers';
import { getRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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



 function CustomizedTables(props) {
   const [data,setData]=useState([])
    const navigate = useNavigate();
    useEffect(()=>{

      var data={"controller":PAYMEMPLOYEE}     
      getRequest(ServerConfig.url,PAYMEMPLOYEE).then((e)=>{
        setData(e.data)
        console.log(e.data)
      })
      
    },[])
  function  handlePlusIconClick ()  {
    navigate("/paymemployeeform")
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          
            <StyledTableCell align="center">pncompanyID</StyledTableCell>
            <StyledTableCell align="center">pnBranchID</StyledTableCell>
            <StyledTableCell align="center">EmployeeCode</StyledTableCell>
            <StyledTableCell align="center">EmployeeFirstName</StyledTableCell>
            <StyledTableCell align="center">EmployeeMiddleName</StyledTableCell>
            <StyledTableCell align="center">EmployeeLastName</StyledTableCell>
            <StyledTableCell align="center">DateofBirth</StyledTableCell>
            <StyledTableCell align="center">Password</StyledTableCell>
            <StyledTableCell align="center">Gender</StyledTableCell>
            <StyledTableCell align="center">status</StyledTableCell>
            <StyledTableCell align="center">EmployeeFullName</StyledTableCell>
            <StyledTableCell align="center">ReaderId</StyledTableCell>
            <StyledTableCell align="center">OTEligible</StyledTableCell>
            <StyledTableCell align="center">PfNo</StyledTableCell>
            <StyledTableCell align="center">EsiNo</StyledTableCell>
            <StyledTableCell align="center">OTCalc</StyledTableCell>
            <StyledTableCell align="center">CTC</StyledTableCell>
            <StyledTableCell align="center">BasicSalary</StyledTableCell>
            <StyledTableCell align="center">BankCode</StyledTableCell>
            <StyledTableCell align="center">BankName</StyledTableCell>
            <StyledTableCell align="center">BranchName</StyledTableCell>
            <StyledTableCell align="center">AccountType</StyledTableCell>
            <StyledTableCell align="center">MICRCode</StyledTableCell>
            <StyledTableCell align="center">IFSCCode</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="center">OtherInfo</StyledTableCell>
            <StyledTableCell align="center">Reportingperson</StyledTableCell>
            <StyledTableCell align="center">ReportingID</StyledTableCell>
            <StyledTableCell align="center">ReportingEmail</StyledTableCell>
            <StyledTableCell align="center">PanNo</StyledTableCell>
            <StyledTableCell align="center">cardNo</StyledTableCell>
            <StyledTableCell align="center">salaryType</StyledTableCell>
            <StyledTableCell align="center">TDSApplicable</StyledTableCell>
            <StyledTableCell align="center">Flag</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"><Button variant='contained' color='success' onClick={handlePlusIconClick}><PlusIcon /></Button>
      </StyledTableCell>



       </TableRow>
        </TableHead>
        <TableBody>
       
            
              {
                data.map((e)=> {

                  return<StyledTableRow>
                   <StyledTableCell align="center">{e.pnCompanyId}</StyledTableCell>
                   <StyledTableCell align="center">{e.pnBranchId}</StyledTableCell>
                   <StyledTableCell align="center">{e.employeeCode}</StyledTableCell>
                   <StyledTableCell align="center">{e.employeeFirstName}</StyledTableCell>
                   <StyledTableCell align="center">{e.employeeMiddleName}</StyledTableCell>
                   <StyledTableCell align="center">{e.employeeLastName}</StyledTableCell>
                   <StyledTableCell align="center">{e.dateofBirth}</StyledTableCell>
                   <StyledTableCell align="center">{e.password}</StyledTableCell>
                   <StyledTableCell align="center">{e.gender}</StyledTableCell>
                   <StyledTableCell align="center">{e.status}</StyledTableCell>
                   <StyledTableCell align="center">{e.employeeFullName}</StyledTableCell>
                   <StyledTableCell align="center">{e.readerid}</StyledTableCell>
                   <StyledTableCell align="center">{e.otEligible}</StyledTableCell>
                   <StyledTableCell align="center">{e.pfno}</StyledTableCell>
                   <StyledTableCell align="center">{e.esino}</StyledTableCell>
                   <StyledTableCell align="center">{e.otCalc}</StyledTableCell>
                   <StyledTableCell align="center">{e.ctc}</StyledTableCell>
                   <StyledTableCell align="center">{e.basicSalary}</StyledTableCell>
                   <StyledTableCell align="center">{e.bankCode}</StyledTableCell>
                   <StyledTableCell align="center">{e.bankName}</StyledTableCell>
                   <StyledTableCell align="center">{e.branchName}</StyledTableCell>
                   <StyledTableCell align="center">{e.accountType}</StyledTableCell>
                   <StyledTableCell align="center">{e.micrCode}</StyledTableCell>
                   <StyledTableCell align="center">{e.ifscCode}</StyledTableCell>
                   <StyledTableCell align="center">{e.address}</StyledTableCell>
                   <StyledTableCell align="center">{e.otherInfo}</StyledTableCell>
                   <StyledTableCell align="center">{e.reportingPerson}</StyledTableCell>
                   <StyledTableCell align="center">{e.reportingId}</StyledTableCell>
                   <StyledTableCell align="center">{e.reportingEmail}</StyledTableCell>
                   <StyledTableCell align="center">{e.panNo}</StyledTableCell>
                   <StyledTableCell align="center">{e.cardNo}</StyledTableCell>
                   <StyledTableCell align="center">{e.salaryType}</StyledTableCell>
                   <StyledTableCell align="center">{e.tdsApplicable}</StyledTableCell>
                   <StyledTableCell align="center">{e.flag}</StyledTableCell>
                   <StyledTableCell align="center">{e.role}</StyledTableCell>
                   <StyledTableCell align="center">{<Button variant="contained">Edit</Button>}</StyledTableCell>
              <StyledTableCell align='left'><Button variant='contained' color='error'>Delete</Button></StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
                   </StyledTableRow>
        
                })
              }
             
              
            
{/*
              <StyledTableCell align="center">{}</StyledTableCell>
              
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
              <StyledTableCell align="center">{}</StyledTableCell>
  <StyledTableCell align="center">{}</StyledTableCell>*/}
             
      
        
            
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps=(state)=>({state:state})
const mapDispatchToProps=(dispatch)=>({dispatch:dispatch})
export default (connect)(mapStateToProps,mapDispatchToProps)(CustomizedTables)
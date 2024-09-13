import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, Button ,Box} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PolicyIcon from '@mui/icons-material/Policy';
import FormIcon from '@mui/icons-material/FormatListNumbered';
import NoteIcon from '@mui/icons-material/Note';

import PaymBranch from "../../images/paym-branch-icon.png";
import PaymEmplo from "../../images/paym-employee-icon.png";
import PaymDep from "../../images/paym-department-icon.png";
import PaymDesig from "../../images/paym-desiganation-icon.png";

import PaymCompany from "../../images/paym-company-icon.png";
import shiftreee from "../../images/shiftrelated-icons.jpeg";
import setup from "../../images/setting-icon-png-24.jpg";
import { Navigate, useNavigate } from 'react-router-dom';
import Sidenav from "../Home Page/Sidenav";
import Navbar from "../Home Page/Navbar"
import {Link} from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
      
    },
    item: {
        padding: theme.spacing(2),
        textAlign: 'center',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        fontSize: '3rem',
    },
    textContainer: {
        flex: 1,
        marginLeft: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        marginRight: theme.spacing(2),
        fontSize: "18px",
        
        
    },
    button: {
        backgroundColor: "none",
        color: 'blue',
       
    },
}));

const MastersTemplate = () => {
    const navigate =useNavigate();
    const classes = useStyles();
    const documents = [
        {
            title: "Company",
            icon: <img src={PaymCompany} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/CompanyForm01"),
          },
        {
            title: "Branch",
            icon: <img src={PaymBranch} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/PayBranchForm01"),
          },
          {
            title: "Employee",
            icon: <img src={PaymEmplo} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/PaymEmployeeMasters"),
          },
          {
            title: "Department",
            icon: <img src={PaymDep} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/Departmensmasters"),
          },
          {
            title: "Designation",
            icon: <img src={PaymDesig} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/DesignationMasters"),
          },
          {
            title: "Shift Related",
            icon: <img src={shiftreee} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/ShiftMasters"),
          },
          {
            title: "Earn & Deduct",
            icon: <img src={PaymCompany} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/EarnDeductMasters"),
          },
         
          {
            title: "Group",
            icon: <img src={PaymDep} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/Group"),
          },
         
         
          {
            title: "Set up",
            icon: <img src={setup} width={40} height={40} />,
            buttonLabel:"View",
            onClick: () => navigate("/Setup"),
          },
    ];

    return (
      <Grid container>
      {/* Navbar and Sidebar */}
      <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>

        <Container maxWidth="lg" className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                We've got it sorted for you!
            </Typography>
            <Typography variant="body1">
                This is a Masters Setion.. Here you can predefine some of the details and use it later in the setup section..
            </Typography>
            <Grid container spacing={3} mt={3}>
                {documents.map((doc, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} >
                        <div className={classes.item}>
                            {doc.icon}
                            <div className={classes.textContainer}>
                                <Typography variant="h6" margin={'auto'} className={classes.text}>
                                    {doc.title}
                                </Typography>
                                

<Link onClick={doc.onClick} href={doc.href} target="_blank" rel="noopener" >
  <Button
    className={classes.button}
    color="primary"
  >
    {doc.buttonLabel}
  </Button>
</Link>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
        </Grid>
        </Box>
        </div>
        </Grid>
        </Grid>
    );
};

export default MastersTemplate;

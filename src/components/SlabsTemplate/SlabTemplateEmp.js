import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Container, Button, Box, TextField, ToggleButton, ToggleButtonGroup, TableHead, Table, TableBody, TableRow, Paper, TableCell, TableContainer } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Sidenav from '../Home Page/Sidenav';
import Navbar from '../Home Page/Navbar';
import PtGrid from '../Responsive-Tables/Responsive-Tables/Proftaxgrid';
import AttendanceBonusSetup from '../Responsive-Tables/Responsive-Tables/AttendanceBonus'
import OverTime from '../Responsive-Tables/Responsive-Tables/ResponsiveTable'
import OverTimeGrid from '../Responsive-Tables/Responsive-Tables/ResponsiveTableNew';



const RootContainer = styled(Container)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
}));



const ToggleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    width: '100%', // Ensure container takes full width
}));



const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.Mui-selected': {
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
    },
    flex: 1, // Make each button take equal space
    textAlign: 'center', // Center the text
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    display: 'flex',
    flex: 1, // Make sure the group takes full space of the container
    justifyContent: 'space-between', // Space out the buttons
}));

const initialRows = [
    { id: 1, monthlyIncome: '', annualBasis: '', halfYearlyBasis:'', monthlybasis: '' },
];




const sampleTables = {
    apply: <PtGrid />,
    pending: <OverTimeGrid/>,
    history: <AttendanceBonusSetup/>,
    AttBonus: <AttendanceBonusSetup/>,
};

const SlabTemplateEmp = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState('pending');

    const handleToggle = (event, newSelected) => {
        if (newSelected !== null) {
            setSelected(newSelected);
        }
    };

    return (
        <Grid container>
            {/* Navbar and Sidebar */}
            <Grid item xs={12}>
                <div style={{ backgroundColor: '#fff' }}>
                    <Navbar />
                    <Box height={30} />
                    <Box sx={{ display: 'flex' }}>
                        <Sidenav />
                        <Grid item xs={12} sm={10} md={9} lg={8} xl={7} sx={{ marginLeft: 'auto', marginRight: 'auto', margin: '100px 50px 50px 50px' }}>
                            <RootContainer maxWidth="lg">
                                <TitleTypography variant="h4" gutterBottom>
                                    We've got it sorted for you!
                                </TitleTypography>
                                <Typography variant="body1" gutterBottom>   
                                    This is a Slab Section.. Here you can predefine some of the details and use it later in the setup section..
                                </Typography>
                                <ToggleContainer>
    <StyledToggleButtonGroup
        value={selected}
        exclusive
        onChange={handleToggle}
        aria-label="text alignment"
    >
        <CustomToggleButton value="apply" aria-label="apply">
            Professional Tax
        </CustomToggleButton>
        <CustomToggleButton value="pending" aria-label="pending">
            OverTime
        </CustomToggleButton>
        <CustomToggleButton value="history" aria-label="history">
            Income Tax
        </CustomToggleButton>
        <CustomToggleButton value="AttBonus" aria-label="AttBonus">
            Attendance Bonus
        </CustomToggleButton>
    </StyledToggleButtonGroup>
</ToggleContainer>
                                {sampleTables[selected]}
                            </RootContainer>
                        </Grid>
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
};

export default SlabTemplateEmp;

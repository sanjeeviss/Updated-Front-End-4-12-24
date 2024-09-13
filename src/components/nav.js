import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import Popover from "@mui/material/Popover";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import Avatar from "@mui/material/Avatar";
import { Navigate, useNavigate } from "react-router-dom";
import daily from "../images/Daily-timecard-icon.png";
import att from "../images/attendance-icon.png";
import ass from "../images/assest-icon.png";
import ear from "../images/Earn-Deduction-icon.png";
import Form from "../images/Form7-icon.png";
import HRAuth from "../images/Hr-icon.png";
import Hrmmcourse from "../images/hrmm-icon.png";
import HrmmSkillmaster from "../images/hrmm-skillmaster-icon.png";
import HrmmSpecilalization from "../images/hrmm-specilization-icon.png";
import Jobstatus from "../images/job-status-icon.png";
import LeaveAllocation from "../images/Leave-allocation-icon.png";
import LeaveApprove from "../images/Leave-apply-icon.png";
import LeaveAppHr from "../images/leave-approveHr-icon.png";
import LeaAppMan from "../images/Leave-approveMG-icon.png";
import LeaSettlement from "../images/leave-settlement-icon.png";
import LoanEntry from "../images/loan-entry-icon.png";
import LoanPost from "../images/Loan-post-icon.png";
import LoanPrecloser from "../images/loan-precloser-icon.png";
import OnDuty from "../images/Onduty-icon.png";
import OTSLab from "../images/ots-lab-icon.png";
import PayInput from "../images/Payinput-icon.png";
import PayAttBonus from "../images/Paym-att-bonus-icon.png";
import PaymBank from "../images/Paym-bank-icon.png";
import PaymBranch from "../images/paym-branch-icon.png";
import PaymCarryForward from "../images/paym-carryforward-icon.png";
import PaymCategory from "../images/Paym-category-icon.png";
import PaymCompany from "../images/paym-company-icon.png";
import PaymComputation from "../images/paym-computation-icon.png";
import PaymDep from "../images/paym-department-icon.png";
import PaymDesig from "../images/paym-desiganation-icon.png";
import PaymDiv from "../images/paym-division-icon.png";
import PaymEarn from "../images/paym-earning-icon.png";
import PaymEmpEarn from "../images/paym-empearning-icon.png";
import PaymEmpDeduc from "../images/pay-deduction-icon.png";
import PaymEmplo from "../images/paym-employee-icon.png";
import PaymEmpLeave from "../images/paym-employee-leave-icon.png";
import PaymEmpProfile from "../images/paym-profile-icon.png";
import PaymEmpWorkDeta from "../images/paym-employeework-details-icon.png";
import PaymEncashDeta from "../images/paym-encashment-details-icon.png";
import PaymGrade from "../images/paym-grade-icon.png";
import PaymHoliday from "../images/paym-holiday-icon.png";
import PaymLeave from "../images/paym-leave-icon.png";
import PaymLeaveAlloc from "../images/paym-leave-allocation-icon.png";
import PaymLevel from "../images/paym-level-icon.png";
import PaymLoan from "../images/paym-loan-icon.png";
import PaymLoanDiminishing from "../images/paym-loan-diminishing-icon.png";
import PaymOverHeadCost from "../images/paym-over-heading-cost-icon.png";
import PaymPayBill from "../images/paym-payBill-icon.png";
import PaymPf from "../images/paym-pf-icon.png";
import PaymShift from "../images/paym-shift-icon.png";
import PaymOutputLoan from "../images/paym-output-loan-icon.png";
import PaymFinalSettlement from "../images/paym-final-settelement-icon.png";
import Pfep from "../images/pfep-icon.png";
import PfEpf from "../images/Pfepf-icon.png";
import PunchDetails from "../images/punch details-icon.png";
import SalaryPeriod from "../images/salary-detail-icon.png";
import SalaryStructure from "../images/salary-structure-icon.png";
import ShiftBalance from "../images/shift-balance-icon.png";
import ShiftDetails from "../images/shift-details-icon.png";

import ShiftMonth from "../images/shift-month-icon.png";
import ShiftPattern from "../images/shift-pattern-icon.png";
import TempShiftDetails from "../images/temp-shift-detail-icon.png";
import DashBoard from "./dashboredsss/DashBoard";
import YearEnd from "../images/yearend-icon.png";
import masterrols from "../images/masterroll-icons.jpeg";

export default function MainPage() {
  const navigate = useNavigate();
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
    setIsOverlayVisible(true);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setIsOverlayVisible(false);
  };

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Navigate to login page or any other page you desire
    window.location.href = "http://localhost:3000/";
  };

  const isLoggedIn = sessionStorage.getItem("user") !== null;

  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar>
        <Toolbar
          style={{ justifyContent: "flex-end", backgroundColor: "#482880" }}>
          <IconButton
            color="primary"
            aria-label="Log out"
            onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>

          <IconButton color="primary" aria-label="Settings">
            <SettingsApplicationsSharpIcon />
          </IconButton>
          <AppsIcon onClick={handlePopoverOpen} />
          {sessionStorage.getItem("user") != null ? (
            <Avatar>{sessionStorage.getItem("user").charAt(0)}</Avatar>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
      {isOverlayVisible && (
        <div className="overlay">
          <Popover
            open={Boolean(popoverAnchorEl)}
            anchorEl={popoverAnchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}>
            <div
              style={{
                padding: "20px",
                alignItems: "center",
                height: "300px",
                maxWidth: "300px",
                cursor: "pointer",
              }}>
              <Container className="background-b1">
                <Grid
                  container
                  direction="column"
                  rowSpacing={3}
                  columnSpacing={3}>
                  <Grid item>
                    <Typography align="center">sanjeevi HI</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={2}>
                      <Grid item xs={3}>
                        <img
                          src={daily}
                          width={30}
                          height={30}
                          onClick={() => navigate("/dailytimecardtable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={att}
                          width={25}
                          height={25}
                          onClick={() => navigate("/AttendenceTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={ass}
                          width={30}
                          height={30}
                          onClick={() => navigate("/AssetsTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={ear}
                          width={30}
                          height={30}
                          onClick={() => navigate("/EarnDeductTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={Form}
                          width={30}
                          height={30}
                          onClick={() => navigate("/Form7table")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={HRAuth}
                          width={30}
                          height={30}
                          onClick={() => navigate("/HrAuthenticationTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={Hrmmcourse}
                          title="hrmmcourse"
                          width={30}
                          height={30}
                          onClick={() => navigate("/Hrmcoursetable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={HrmmSkillmaster}
                          width={30}
                          height={30}
                          onClick={() => navigate("/Hrmskillmastertable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={HrmmSpecilalization}
                          width={30}
                          height={30}
                          onClick={() => navigate("/HrmmSpecializationtable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={Jobstatus}
                          width={25}
                          height={25}
                          onClick={() => navigate("/PaymJobStatusTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={LeaveAllocation}
                          width={30}
                          height={30}
                          onClick={() =>
                            navigate("/LeaveAllocationMasterTable")
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={LeaveApprove}
                          width={30}
                          height={30}
                          onClick={() => navigate("/LeaveApplyTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={LeaveAppHr}
                          width={30}
                          height={30}
                          onClick={() => navigate("/LeaveApproveHrTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={LeaAppMan}
                          width={25}
                          height={25}
                          onClick={() => navigate("/LeaveApproveHrTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={LeaSettlement}
                          width={30}
                          height={30}
                          onClick={() => navigate("/LeaveSettlementTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={LoanEntry}
                          width={30}
                          height={30}
                          onClick={() => navigate("/LoanEntryTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={LoanPost}
                          width={30}
                          height={30}
                          onClick={() => navigate("/LoanPostTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={LoanPrecloser}
                          width={25}
                          height={25}
                          onClick={() => navigate("/LoanPreCloserTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={OnDuty}
                          width={30}
                          height={30}
                          onClick={() => navigate("/OnDutyTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={OTSLab}
                          width={30}
                          height={30}
                          onClick={() => navigate("/OtsLabTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PayInput}
                          width={30}
                          height={30}
                          onClick={() => navigate("/payInputTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PayAttBonus}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymAttBonusTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymBank}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymBankTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymBranch}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymBranchtable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymCarryForward}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymcarryForwardTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymCategory}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymCategoryTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymCompany}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaycompanyTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymComputation}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymComputationtables")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymDep}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymDepartmentTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymDesig}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymDesignationTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymDesig}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymDeductionTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymDiv}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymDIvisionTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymEarn}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymEarnTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymEmpEarn}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymEmpDeductionTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymEmpDeduc}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymEmpEarningsTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymEmplo}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymEmpTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymEmpLeave}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymEmpLeaveTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymEmpProfile}
                          width={30}
                          height={30}
                          onClick={() =>
                            navigate("/PaymEmployeeProfile1Tables")
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymEmpWorkDeta}
                          width={30}
                          height={30}
                          onClick={() =>
                            navigate("/PaymEmployeeWorkDetailTables")
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymEncashDeta}
                          width={30}
                          height={30}
                          onClick={() =>
                            navigate("/PaymEncashmentDetailsTables")
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymGrade}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymgradeTables")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymHoliday}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymHolidayTables")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymLeave}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymleaveTables")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymLeaveAlloc}
                          width={30}
                          height={30}
                          onClick={() =>
                            navigate("/Paymleaveallocation1Tables")
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymLevel}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymlevelTables")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymLoan}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymLoanTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymLoanDiminishing}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymLoanDiminishingTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymOverHeadCost}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymOverHeadingcostTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymPf}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaympfTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymPayBill}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymPaybillTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymShift}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaymshiftTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PaymOutputLoan}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PaympayoutputloanTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={PaymFinalSettlement}
                          width={30}
                          height={30}
                          onClick={() =>
                            navigate("/PayrollFinalSettlemetTable")
                          }
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={Pfep}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PfepTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PfEpf}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PfepfTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={PunchDetails}
                          width={30}
                          height={30}
                          onClick={() => navigate("/PunchdetailsTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={SalaryPeriod}
                          width={30}
                          height={30}
                          onClick={() => navigate("/SalaryPeriodTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={SalaryStructure}
                          width={30}
                          height={30}
                          onClick={() => navigate("/SalaryStructureTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={ShiftBalance}
                          width={30}
                          height={30}
                          onClick={() => navigate("/ShiftBalanceTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={ShiftDetails}
                          width={30}
                          height={30}
                          onClick={() => navigate("/ShiftDetailsTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={ShiftMonth}
                          width={30}
                          height={30}
                          onClick={() => navigate("/ShiftMonthTable")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={ShiftPattern}
                          width={30}
                          height={30}
                          onClick={() => navigate("/ShiftPatternTable")}
                        />
                      </Grid>
                      <Grid item xs={6} sx={{ textAlign: "center" }}>
                        <img
                          src={TempShiftDetails}
                          width={30}
                          height={30}
                          onClick={() => navigate("/TempshiftdetailsTables")}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        title="dash"
                        sx={{ textAlign: "center" }}>
                        <img
                          src={ear}
                          width={30}
                          height={30}
                          onClick={() => navigate("/employeedashboared")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={YearEnd}
                          width={30}
                          height={30}
                          onClick={() => navigate("/YearEndTable")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item>
                    <Grid container justifyContent="center" spacing={1}>
                      <Grid item xs={3}>
                        <img
                          src={SalaryPeriod}
                          width={30}
                          height={30}
                          onClick={() => navigate("/Paycalc")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={daily}
                          width={30}
                          height={30}
                          onClick={() => navigate("/TimesheetManager")}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={masterrols}
                          width={30}
                          height={30}
                          onClick={() => navigate("/Mastterrol")}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </div>
          </Popover>
        </div>
      )}
    </div>
  );
}

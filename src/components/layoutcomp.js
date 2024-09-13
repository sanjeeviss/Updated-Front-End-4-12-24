// Layoutcomp.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ServiceCard from "./servicecard.js";
import SearchFilter from "./searchfilter.js";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
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
import YearEnd from "../images/yearend-icon.png";
import group from "../images/group-icons.png";
import groupshift from "../images/group-shift-icons.png";
import masterrols from "../images/masterroll-icons.jpeg";
function Layoutcomp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setUserRole(role);
  }, []);

  // Sample data for cards
  const cardsData = [
    {
      title: "Daily Timecard",
      icon: <img src={daily} width={40} height={40} />,
      onClick: () => navigate("/dailytimecardtable"),
      roles: ["branchmanager", "hr", "employee", "accounts", "grouphead"],
    },
    {
      title: "Attendance Ceilling",
      icon: <img src={att} width={30} height={30} />,
      onClick: () => navigate("/AttendenceTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Attendance",
      icon: <img src={att} width={30} height={30} />,
      onClick: () => navigate("/Attendance"),
      roles: ["branchmanager"],
    },
    {
      title: "Asset",
      icon: <img src={ass} width={45} height={45} />,
      onClick: () => navigate("/AssetsTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Earn Deduct",
      icon: <img src={ear} width={40} height={40} />,
      onClick: () => navigate("/EarnDeductTable"),
      roles: ["hr"],
    },
    {
      title: "Form7",
      icon: <img src={Form} width={40} height={40} />,
      onClick: () => navigate("/Form7table"),
      roles: ["branchmanager"],
    },
    {
      title: "HR Authentication",
      icon: <img src={HRAuth} width={40} height={40} />,
      onClick: () => navigate("/HrAuthenticationTable"),
      roles: ["branchmanager"],
    },
    {
      title: "HRMM Course",
      icon: <img src={Hrmmcourse} width={40} height={40} />,
      onClick: () => navigate("/Hrmcoursetable"),
      roles: ["branchmanager"],
    },
    {
      title: "HRMM Skill Master",
      icon: <img src={HrmmSkillmaster} width={40} height={40} />,
      onClick: () => navigate("/Hrmskillmastertable"),
      roles: ["branchmanager"],
    },
    {
      title: "HRMM Specialization",
      icon: <img src={HrmmSpecilalization} width={40} height={40} />,
      onClick: () => navigate("/HrmmSpecializationtable"),
      roles: ["branchmanager"],
    },
    {
      title: "Job Status",
      icon: <img src={Jobstatus} width={40} height={40} />,
      onClick: () => navigate("/PaymJobStatusTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Leave Allocation",
      icon: <img src={LeaveAllocation} width={40} height={40} />,
      onClick: () => navigate("/LeaveAllocationMasterTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Leave Apply",
      icon: <img src={LeaveApprove} width={40} height={40} />,
      onClick: () => navigate("/LeaveApplyTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Leave Approve Hr",
      icon: <img src={LeaveAppHr} width={40} height={40} />,
      onClick: () => navigate("/LeaveApproveHrTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Leave Approve Manager",
      icon: <img src={LeaAppMan} width={40} height={40} />,
      onClick: () => navigate("/LeaveApproveHrTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Leave Settlement",
      icon: <img src={LeaSettlement} width={40} height={40} />,
      onClick: () => navigate("/LeaveSettlementTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Loan Entry",
      icon: <img src={LoanEntry} width={40} height={40} />,
      onClick: () => navigate("/LoanEntryTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Loan Post",
      icon: <img src={LoanPost} width={40} height={40} />,
      onClick: () => navigate("/LoanPostTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Loan PreCloser",
      icon: <img src={LoanPrecloser} width={40} height={40} />,
      onClick: () => navigate("/LoanPreCloserTable"),
      roles: ["branchmanager"],
    },
    {
      title: "On Duty",
      icon: <img src={OnDuty} width={40} height={40} />,
      onClick: () => navigate("/OnDutyTable"),
      roles: ["branchmanager"],
    },
    {
      title: "OTS Lab",
      icon: <img src={OTSLab} width={40} height={40} />,
      onClick: () => navigate("/OtsLabTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Pay Input",
      icon: <img src={PayInput} width={40} height={40} />,
      onClick: () => navigate("/payInputTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Att Bonus",
      icon: <img src={PayAttBonus} width={40} height={40} />,
      onClick: () => navigate("/PaymAttBonusTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Bank",
      icon: <img src={PaymBank} width={40} height={40} />,
      onClick: () => navigate("/PaymBankTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Branch",
      icon: <img src={PaymBranch} width={40} height={40} />,
      onClick: () => navigate("/PaymBranchtable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Carry Forward",
      icon: <img src={PaymCarryForward} width={40} height={40} />,
      onClick: () => navigate("/PaymcarryForwardTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Category",
      icon: <img src={PaymCategory} width={40} height={40} />,
      onClick: () => navigate("/PaymCategoryTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Company",
      icon: <img src={PaymCompany} width={40} height={40} />,
      onClick: () => navigate("/PaycompanyTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Computation",
      icon: <img src={PaymComputation} width={40} height={40} />,
      onClick: () => navigate("/PaymComputationtables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Department",
      icon: <img src={PaymDep} width={40} height={40} />,
      onClick: () => navigate("/PaymDepartmentTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Designation",
      icon: <img src={PaymDesig} width={40} height={40} />,
      onClick: () => navigate("/PaymDesignationTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Deduction",
      icon: <img src={PaymDesig} width={40} height={40} />,
      onClick: () => navigate("/PaymDeductionTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Division",
      icon: <img src={PaymDiv} width={40} height={40} />,
      onClick: () => navigate("/PaymDIvisionTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Earning",
      icon: <img src={PaymEarn} width={40} height={40} />,
      onClick: () => navigate("/PaymEarnTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Emp Deduction",
      icon: <img src={PaymEmpEarn} width={40} height={40} />,
      onClick: () => navigate("/PaymEmpDeductionTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Emp Earning",
      icon: <img src={PaymEmpDeduc} width={40} height={40} />,
      onClick: () => navigate("/PaymEmpEarningsTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Employee",
      icon: <img src={PaymEmplo} width={40} height={40} />,
      onClick: () => navigate("/PaymEmpTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Emp Leave",
      icon: <img src={PaymEmpLeave} width={40} height={40} />,
      onClick: () => navigate("/PaymEmpLeaveTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym emp profile",
      icon: <img src={PaymEmpProfile} width={40} height={40} />,
      onClick: () => navigate("/PaymEmployeeProfile1Tables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym emp work Details",
      icon: <img src={PaymEmpWorkDeta} width={40} height={40} />,
      onClick: () => navigate("/PaymEmployeeWorkDetailTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Encashment Details ",
      icon: <img src={PaymEncashDeta} width={40} height={40} />,
      onClick: () => navigate("/PaymEncashmentDetailsTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Grade ",
      icon: <img src={PaymGrade} width={40} height={40} />,
      onClick: () => navigate("/PaymgradeTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym holiday ",
      icon: <img src={PaymHoliday} width={40} height={40} />,
      onClick: () => navigate("/PaymHolidayTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym leave ",
      icon: <img src={PaymLeave} width={40} height={40} />,
      onClick: () => navigate("/PaymleaveTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym leave Allocation ",
      icon: <img src={PaymLeaveAlloc} width={40} height={40} />,
      onClick: () => navigate("/Paymleaveallocation1Tables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym level ",
      icon: <img src={PaymLevel} width={40} height={40} />,
      onClick: () => navigate("/PaymlevelTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Loan ",
      icon: <img src={PaymLoan} width={40} height={40} />,
      onClick: () => navigate("/PaymLoanTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Loan Diminshing",
      icon: <img src={PaymLoanDiminishing} width={40} height={40} />,
      onClick: () => navigate("/PaymLoanDiminishingTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Over Heading cost",
      icon: <img src={PaymOverHeadCost} width={40} height={40} />,
      onClick: () => navigate("/PaymOverHeadingcostTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Pay Bill",
      icon: <img src={PaymPayBill} width={40} height={40} />,
      onClick: () => navigate("/PaympaybillTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Pf",
      icon: <img src={PaymPf} width={40} height={40} />,
      onClick: () => navigate("/PaymPaypfTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Group name",
      icon: <img src={group} width={40} height={40} />,
      onClick: () => navigate("/groupui"),
      roles: ["branchmanager"],
    },
    {
      title: "Group shift",
      icon: <img src={groupshift} width={40} height={40} />,
      onClick: () => navigate("/groupshift"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Shift",
      icon: <img src={PaymShift} width={40} height={40} />,
      onClick: () => navigate("/PaymshiftTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Output Loan",
      icon: <img src={PaymOutputLoan} width={40} height={40} />,
      onClick: () => navigate("/PaympayoutputloanTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Paym Final Settlement",
      icon: <img src={PaymFinalSettlement} width={40} height={40} />,
      onClick: () => navigate("/PayrollFinalSettlemetTable"),
      roles: ["branchmanager"],
    },
    {
      title: "PFEp",
      icon: <img src={Pfep} width={40} height={40} />,
      onClick: () => navigate("/PfepTable"),
      roles: ["branchmanager"],
    },
    {
      title: "REPORTS",
      icon: <img src={PfEpf} width={40} height={40} />,
      onClick: () => navigate("/PfepfTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Punch Detail",
      icon: <img src={PunchDetails} width={40} height={40} />,
      onClick: () => navigate("/PunchdetailsTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Salary Period",
      icon: <img src={SalaryPeriod} width={40} height={40} />,
      onClick: () => navigate("/SalaryPeriodTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Salary Structure",
      icon: <img src={SalaryStructure} width={40} height={40} />,
      onClick: () => navigate("/SalaryStructureTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Shift Balance",
      icon: <img src={ShiftBalance} width={40} height={40} />,
      onClick: () => navigate("/ShiftBalanceTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Shift Details",
      icon: <img src={ShiftDetails} width={40} height={40} />,
      onClick: () => navigate("/ShiftDetailsTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Shift Month",
      icon: <img src={ShiftMonth} width={40} height={40} />,
      onClick: () => navigate("/ShiftMonthTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Shift Pattern",
      icon: <img src={ShiftPattern} width={40} height={40} />,
      onClick: () => navigate("/ShiftPatternTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Temp shift Details",
      icon: <img src={TempShiftDetails} width={40} height={40} />,
      onClick: () => navigate("/TempshiftdetailsTables"),
      roles: ["branchmanager"],
    },
    {
      title: "Year End",
      icon: <img src={YearEnd} width={40} height={40} />,
      onClick: () => navigate("/YearEndTable"),
      roles: ["branchmanager"],
    },
    {
      title: "Year Paym job status",
      icon: <img src={YearEnd} width={40} height={40} />,
      onClick: () => navigate("/YearEndTable"),
      roles: ["branchmanager"],
    },
    {
      title: "payslip",
      icon: <img src={SalaryPeriod} width={40} height={40} />,
      onClick: () => navigate("/payslipgenerator"),
      roles: ["branchmanager"],
    },
    {
      title: "timesheet",
      icon: <img src={daily} width={40} height={40} />,
      onClick: () => navigate("/TimesheetManager"),
      roles: ["branchmanager"],
    },
    {
      title: "masterrols",
      icon: <img src={masterrols} width={40} height={40} />,
      onClick: () => navigate("/Mastterrol"),
      roles: ["branchmanager"],
    },
  ];

  // Filtering function
  const filteredCards = cardsData
    .filter((card) => card.roles.includes(userRole))
    .filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Container>
      <SearchFilter value={searchQuery} onChange={handleSearch} />
      <br />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {filteredCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={5} lg={2} marginLeft={2} key={index}>
            <ServiceCard
              title={card.title}
              icon={card.icon}
              onClick={card.onClick}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Layoutcomp;

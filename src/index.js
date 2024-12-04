import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ServiceCard from "./components/servicecard";
import Layoutcomp from "./components/layoutcomp";
import DailyTimeCardForm from "./components/DailyTimeCard/DailyTimeCardForm";
import DailyTimeCardTables from "./components/DailyTimeCard/DailyTimeCardTables";
import AttendenceForm from "./components/AttendeceCeiling/attendenceform";
import AttendenceTable from "./components/AttendeceCeiling/AttendenceTable";
import AssetsTable from "./components/Assets/AssetsTable";
import SampleForm from "./components/Assets/sampleform";
import EarnDeductTable from "./components/Earn Deduct/EarnDeductTable";
import EarnDeductForm from "./components/Earn Deduct/EarnDeductForm";
import Form7table from "./components/Form7/Form7table";
import SampleForm7 from "./components/Form7/form7form";
import HrAuthForm from "./components/hrauthentication/HrAuthenticationForm";
import HrAuthenticationTable from "./components/hrauthentication/HrAuthenticationTable";
import Hrmcoursetable from "./components/hrmcourse/hrmcoursetable";
import CourseForm from "./components/hrmcourse/HrmmCourseForm";
import Hrmskillmastertable from "./components/hrmskillmaster/Hrmskillmastertable";
import SkillsMasterForm from "./components/hrmskillmaster/HrmmSkillsMasterForm";
import HrmmSpecializationtable from "./components/hrmSpecilization/HrmmSpecializationtable";
import SpecializationForm from "./components/hrmSpecilization/HrmmSpecializationForm";
import PaymJobStatusTable from "./components/JobStatus/paymJobStatusTables";
import JobStatusForm from "./components/JobStatus/paymJobStatusForm";
import LeaveAllocationMasterTable from "./components/LeaveAllocationMaster/LeaveAllocationMasterTable";
import LeaveAllocationForm from "./components/LeaveAllocationMaster/LeaveAllocationMasterForm";
import LeaveApplyTable from "./components/LeaveApply/LeaveApplyTable";
import LeaveAppForm from "./components/LeaveApply/LeaveApplyForm";
import ApprovehrForm from "./components/LeaveApproveHr/LeaveApproveHrForm";
import LeaveApproveHrTable from "./components/LeaveApproveHr/LeaveApproveHrTable";
import ApproveManagerForm from "./components/LeaveApproveManager/LeaveApproveManagerForm";
import LeaveApproveManagerTable from "./components/LeaveApproveManager/LeaveApproveManagerTable";
import LeaveSettleForm from "./components/LeaveSettlement/LeaveSettlementForm";
import LeaveSettlementTable from "./components/LeaveSettlement/LeaveSettlementTable";
import LoanEntForm from "./components/LoanEntry/LoanEntryForm";
import LoanEntryTable from "./components/LoanEntry/LoanEntryTable";
import LoanPostForm from "./components/LoanPost/LoanPostForm";
import LoanPostTable from "./components/LoanPost/LoanPostTable";
import LoanPreclosForm from "./components/LoanPreCloser/LoanPreclosureForm";
import LoanPreCloserTable from "./components/LoanPreCloser/LoanPreCloserTable";
import OndutyForm from "./components/OnDuty/ondutyForm";
import OnDutyTable from "./components/OnDuty/OnDutyTable";
import OTSlabForm from "./components/OtsLabs/OTSLabForm";
import OtsLabTable from "./components/OtsLabs/OtsLabTable";
import PayInputTable from "./components/payinputs/payInputTable";
import PayinputForm from "./components/payinputs/PayInputForm";
import PaymAttBonusTable from "./components/PaymAttBonus/PaymAttBonusTable";
import PaymattbonusForm from "./components/PaymAttBonus/PaymAttBonusForm";
import PaymBankTable from "./components/PaymBank/paymbankTables";
import PaybankForm from "./components/PaymBank/paymbankForm";
import PayBranchForm from "./components/PaymBranch/PaymBranchForm";
import PaymcarryForwardTable from "./components/paymcarryForward/PaymcarryForwardTable";
import PaymCarrForwardForm from "./components/paymcarryForward/paymCarryForwardForm";
import Paymcategoryform from "./components/PaymCategory/PaymCategoryForm";
import PaymCategoryTable from "./components/PaymCategory/PaymCategoryTable";
import PaycompanyTable from "./components/paymCompany/PaycompanyTable";
import CompanyForm from "./components/paymCompany/paymCompanyForm";
import ComputationForm from "./components/PaymComputation/paymComputationForm";
import PaymComputationtables from "./components/PaymComputation/PaymComputationtables";
import PaymDeductionTable from "./components/PaymDeduction/paymDeductionTable";
import DeductionForm from "./components/PaymDeduction/paymDeductionForm";
import PaymDesignationTable from "./components/paymDesignation/PaymDesignationTable";
import DesignationForm from "./components/paymDesignation/PaymDesignationForm";
import PaymDIvisionTable from "./components/paymDivision/PaymDivisionTable";
import DivisionForm from "./components/paymDivision/paymDivisionForm";
import PaymEarningsTable from "./components/PaymEarnings/PaymEarningTable";
import EarningsForm from "./components/PaymEarnings/paymEarningsForm";
import PaymEmpDeductionTable from "./components/PaymEmpDeduction/PaymEmpDeductionTable";
import EmpDeductionForm from "./components/PaymEmpDeduction/paymEmpDeductionForm";
import PaymEmployeeLeaveTable from "./components/PaymEmpEarning/PaymEmpEarningTable";
import EmpEarningsForm from "./components/PaymEmpEarning/paymEmpEarningsForm";
import PaymEmpTable from "./components/paymEmployee/PaymEmpTable";
import EmployeeForm from "./components/paymEmployee/paymEmployeeForm";
import PaymEmployeeForm from "./components/paymEmployee/paymEmployeeForm";
import EmployeeLeaveForm from "./components/PaymEmployeeLeave/paymEmployeeLeaveForm";
import PaymEmployeeProfile1Tables from "./components/paymEmployeeProfile/paymEmployeeProfileTables";
import EmployeeProfile1Form from "./components/paymEmployeeProfile/paymEmployeeProfile1Form";
import PaymEmployeeWorkDetailTables from "./components/PaymEmployeeWorkDetails/paymEmployeeWorkDetailsTable";
import EmployeeWorkDetailsForm from "./components/PaymEmployeeWorkDetails/paymEmployeeWorkDetailsForm";
import PaymEncashmentDetailsTables from "./components/PaymEncashmentDetails/paymEncashmentDetailsTable";
import EncashmentDetailsForm from "./components/PaymEncashmentDetails/paymEncashmentDetailsForm";
import PaymgradeTables from "./components/PaymGrade/PaymGradeTables";
import GradeForm from "./components/PaymGrade/paymGradeForm";
import PaymHolidayTables from "./components/PaymHolidays/PaymHolidaysTables";
import HolidayForm from "./components/PaymHolidays/paymHolidaysForm";
import PaymleaveTables from "./components/PaymLeave/paymleaveTable";
import LeaveForm from "./components/PaymLeave/paymleaveForm";
import Paymleaveallocation1Tables from "./components/PaymLeaveAllocation1/paymLeaveAllocation1table";
import LeaveAllocation1Form from "./components/PaymLeaveAllocation1/paymleaveAllocation1Form";
import PaymlevelTables from "./components/PaymLevel/paymLevelTables";
import LevelForm from "./components/PaymLevel/paymLevelForm";
import PaymLoanTable from "./components/PaymLoan/PaymLoanTable";
import Sample28 from "./components/PaymLoan/PayLoanForm";
import PayLoanForm from "./components/PaymLoan/PayLoanForm";
import PaymLoanDiminishingTable from "./components/PaymloanDiminshing/paymloandiminshingTable";
import Sample27 from "./components/PaymloanDiminshing/paymloandiminishingForm";
import Sample26 from "./components/PaymOverHeadingCost/paymoverheadingCostForm";
import PaymOverHeadingcostTable from "./components/PaymOverHeadingCost/paymoverheadingcostTable";
import PaympfTable from "./components/PaymPaybill/paympaybillTables";
import Sample25 from "./components/PaymPaybill/paympaybillForm";
import PaymPaybillTable from "./components/PaymPf/paympfTable";
import Sample24 from "./components/PaymPf/paymPfForm";
import PaymshiftTable from "./components/PaymShift/paymshiftTable";
import Sample23 from "./components/PaymShift/paymshiftform";
import PaympayoutputloanTable from "./components/PayoutputLoan/payoutputloanTable";
import Sample22 from "./components/PayoutputLoan/payoutputloanForm";
import PayrollFinalSettlemetTable from "./components/Payrollfinalsettlement/payrollfinalsettlementTables";
import Sample21 from "./components/Payrollfinalsettlement/payrollfinalsettlementForm";
import PfepTable from "./components/PfEp/pfepTable";
import Sample20 from "./components/PfEp/pfepform";
import PfepfTable from "./components/PfEPF/pfepfTable";
import Sample19 from "./components/PfEPF/pfEpfForm";
import PunchdetailsTable from "./components/PunchDetails/punchdetailsTables";
import Sample18 from "./components/PunchDetails/punchdetailform";
import SalaryPeriodTable from "./components/SalaryPeriod/salaryperiodTable";
import Sample17 from "./components/SalaryPeriod/salaryperiodform";
import Sample16 from "./components/SalaryStructure/salarystructureform";
import SalaryStructureTable from "./components/SalaryStructure/salarystructureTable";
import ShiftBalanceTable from "./components/ShiftBalance/shiftbalanceTable";
import Sample15 from "./components/ShiftBalance/shiftbalanceform";
import ShiftDetailsTable from "./components/ShiftDetails/shiftdetailsTables";
import DetailsForm from "./components/ShiftDetails/shiftdetailform";
import ShiftMonthTable from "./components/ShiftMonth/shiftmonthTable";
import Sample13 from "./components/ShiftMonth/shiftmonthform";
import ShiftPatternTable from "./components/ShiftPattern/shiftpatternTable";
import Sample12 from "./components/ShiftPattern/shiftpatternform";
import TempshiftdetailsTables from "./components/TempShiftDetails/tempshiftdetailsTable";
import YearEndTable from "./components/Yearend/yearendTable";
import Sample1 from "./components/Yearend/yearendform";
import TempShiftDetailsForm from "./components/TempShiftDetails/tempshiftdetailsForm";
import PaymEmployeeEarningsTable from "./components/PaymEmpEarning/PaymEmpEarningTable";
import PaymEmployeeLeaveForm from "./components/PaymEmployeeLeave/paymEmployeeLeaveForm";
import PaymEmpLeaveTable from "./components/PaymEmployeeLeave/PaymEmployeeLeaveTable";
import PaymEmpLeaveForm from "./components/PaymEmployeeLeave/paymEmployeeLeaveForm";
import PaymEmpEarningsTable from "./components/PaymEmpEarning/PaymEmpEarningTable";
import PaymEmpEarningsForm from "./components/PaymEmpEarning/paymEmpEarningsForm";
import PaymEarnTable from "./components/PaymEarnings/PaymEarningTable";
import PaymEarnForm from "./components/PaymEarnings/paymEarningsForm";
import LoginForm from "./components/Authentication/Login";
import Paycalc from "./components/payslips/Payslips";
import TimesheetManage from "./components/Timesheet/TimeSheetManger";
import TimesheetManager from "./components/Timesheet/TimeSheetManger";
import PaymDepartmentTable from "./components/paymDepartment/paymDepartmentTable";
import DepartmentForm from "./components/paymDepartment/paymDepartmentForm";
import PaymBranchtable from "./components/PaymBranch/PaymBranchtablenew";
import Mrgabs from "./components/ReportFormates/AttendanceD2";
import ButtonEsi from "./components/ReportFormates/AttendanceD2Button";
import ButtonEsi2 from "./components/ReportFormates/OTHoursReportsButtonPrint";
import ButtonEsi3 from "./components/ReportFormates/OTSummaryButton";
import ButtonEsi4 from "./components/ReportFormates/WorkDetailsButtonPrint";
import ButtonEsi5 from "./components/ReportFormates/AttedanceDetailsButton";
import ButtonEsi6 from "./components/ReportFormates/AbsentDetailsButton";
import ButtonEsi7 from "./components/ReportFormates/AdvanceReportButton";
import ButtonEsi8 from "./components/ReportFormates/TAandDButton";
import MasterrollButton from "./components/ReportFormates/masterrollButton";
import LeaveApprovenew from "./components/LeaveApply/LeaveApplyNew";
import Leaveapprovenew from "./components/LeaveApply/LeaveApplyNew";
import { createStore } from "redux";
import { Provider } from "react-redux";
import entityReducer from "./reduxcomp/actions/reducer/entityreducer";
import AttendanceNew from "./components/Attendance/Attendance";
import OtHrsNewForm from "./components/OtHrsNew/OtHrsNewForm";
import LoginOthers from "./components/Authentication/LoginOthers";
import DashBoard from "./components/dashboredsss/DashBoard";
import BasicDateCalendar from "./components/Nattendance/Nattendance";
import GroupUi from "./components/Group UI/GroupUi";
import Chatbot from "./components/Chatbot/chatbot";
import AddInfos from "./components/Group UI/AddInfos";
import PaympaybillTable from "./components/PaymPaybill/paympaybillTables";
import PaymPaypfTable from "./components/PaymPf/paympfTable";
import GroupShift from "./components/Group UI/GroupShift";
import Medical from "./components/Medical/Medical";
import MedicalSlipGenerator from "./components/Medical/MedicalSlipGenerator";
import MedicalSlipView from "./components/Medical/MedicalSlipView";
import ViewMedical from "./components/Medical/ViewMedical";
import EarlyAndLate from "./components/Early and Late entries/Earlyandlateentriesform";
import Mastterrol from "./components/masterrols/Masterrols";
import Setup from "./components/masterrols/setup";
import Setup2 from "./components/masterrols/Setup2";
import Shiftpattern from "./components/masterrols/shiftpattern";
import Shiftpattern007 from "./components/masterrols/shiftpattern";
import Shiftdetails007 from "./components/masterrols/shiftpattern";
import Shiftpatterns0009 from "./components/masterrols/emshiftpatern";
import LeaveSetup from "./components/masterrols/leavesetup";
import Leavesettlement from "./components/masterrols/Leavesettlement";
import HomePage from "./components/Home Page/HomePage";
import MastersTemplate from "./components/Masters/MastersTemplate";
import CompanyForm01 from "./components/Masters/CompanyMasters"
import PayBranchForm01 from "./components/Masters/BranchMaster";
import PaymEmployeeMasters from "./components/Masters/EmployeeMasters";
import DepartmentMasters from "./components/paymDepartment/paymDepartmentForm";
import DesignationMasters from "./components/Masters/DesignationMasters";
import ShiftMasters from "./components/Masters/ShiftMasters";
import EarnDeductMasters from "./components/Masters/EarnDeductMasters";
import SlabTemplate from "./components/SlabsTemplate/SlabTemplate";
import Departmensmasters from "./components/Masters/DepartmentMasters";
import LeaveApplyRequestHigher from "./components/Home Page/LeaveRequestshigher";
import LeaveRequestManager from "./components/Home Page/LeaveRequestManager";
import LeaveRequestEmployee from "./components/Home Page/LeaveRequestEmployee";
import CompanyMasters from "./components/Masters/CompanyMasters";
import AttendanceHome from "./components/Home Page/Attendance";
// import ResponsiveTable from "./components/Responsive-Tables/ResponsiveTable";

import SpreadGrid1 from "./components/SpreadGrid";
import MySpreadGrid from "./";
import SlabTemplateEmp from "./components/SlabsTemplate/SlabTemplateEmp";
// import RTN from "./components/Responsive-Tables/ResponsiveTableNew";
// import ResTable from "./components/Responsive-Tables/ResponsiveTableNew";
// import Example from "./components/Responsive-Tables/ResponsiveTableNew";
// import DataGridComponent from "./components/Responsive-Tables/ResponsiveTableNew";
// import DataGridComp from "./components/Responsive-Tables/ResponsiveTableNew";
// import BasicEditingGrid from "./components/Responsive-Tables/ResponsiveTableNew";
// import OverTime from "./components/Responsive-Tables/ResponsiveTableNew";
import PtGrid from "./components/Responsive-Tables/Responsive-Tables/Proftaxgrid";
import AttendanceBonusSetup from "./components/Responsive-Tables/Responsive-Tables/AttendanceBonus";
import OverTime from "./components/Responsive-Tables/Responsive-Tables/ResponsiveTable";
import Empcalendar from "./components/Masters/EmpCalendar";
import GraphCheckBox1 from "./components/Home Page/dashboard/Checkbox";
import Dashboard from "./components/Home Page/dashboard/DBoard";
import DBoards from "./components/Home Page/dashboard/DBoard";
import EmployeeHome220 from "./components/Masters/EmployeeCree/EmployeeMater";
import PaymEmployeeForm0045 from "./components/Masters/EmployeeCree/Employeeprofile";
import PaymEmployeeFormCs from "./components/Masters/EmployeeCree/Employeeprofile";
import HolidaysPage from "./components/Masters/HolidayHr/Holiday";
import HolidayForm1 from "./components/Masters/HolidayHr/HolidayHr";
import EmployeeHome from "./components/Masters/EmployeeCree/EmployeeMater";
import PaymEmployeeFormCss from "./components/Masters/EmployeeCree/Employeeprofile";
import PaymEmployeeFormm from "./components/Masters/EmployeeCree/Employeeprofile";
import Attendance01 from "./components/Masters/Attendance/Attendance1";
import LeaveRequestHr from "./components/Masters/LeaveApprove/Leaveapprove";
import ReimbursementApprovalForm from "./components/Masters/Reimbursment/Reimbursement";
import EmployeeReimbursement from "./components/Masters/Reimbursment/Reimbursement";
import EarnDeductMasterss from "./components/Masters/EarnDeduct/EarnDeduct";
import Sandy from "./components/Masters/EmployeeCree/EmployeePrfile1Org";
import EarnDeductValueMasters from "./components/Masters/EarnDeduct/EarnductValues";
import EarnDeductMastersss from "./components/Masters/EarnDeduct/EarnDeduct";
import Employeeprofile0909 from "./components/Masters/EmployeeCree/EmployeePrfile1Org";
import Editprofile from "./components/Masters/EmployeeCree/Viewprofile";
import EditEmployee from "./components/Masters/EmployeeCree/EditProfile1";
import DesignationMaster from "./components/Masters/Designation/Designation";
import DepartmentMaster from "./components/Masters/Department/Department";
import DepartmentHome from "./components/Masters/Department/DepartmentMaster";
import DesignationHome from "./components/Masters/Designation/Designationmaster";
import SlideAnimationComponent from "./components/timecard";
import HomePage1 from "./component/Home Page-comapny/HomePage1";
import CompanyMasterss1 from "./component/Masters-company/CompanyMasters1";
import CategoryFormMaster1 from "./component/Masters-company/CategoryMater1";
import DivisionMaster1 from "./component/Masters-company/Division1";
import DepartmentFormMaster1 from "./component/Masters-company/DepartmentMasters1";
import DesignationMasterForm1 from "./component/Masters-company/DesignationMasters1";
import GradeForm1 from "./component/Masters-company/Grade1";
import ShiftFormMaster1 from "./component/Masters-company/ShiftDetailsMaster1";
import JobStatusFormMaster1 from "./component/Masters-company/Jobstatus1";
import LevelFormMaster1 from "./component/Masters-company/LevelMaster1";
import PaymLeaveMaster1 from "./component/Masters-company/PaymLeaveMaster1";
import HomePage2 from "./Component1/Home Page3/HomePage2";
import HolidaysPage2 from "./Component1/Masters/Leaveapply/Holiday2";
import LeaveapplyHr2 from "./Component1/Masters/Leaveapply/Leaveapply2";
import LeaveRequestTable2 from "./Component1/Masters/Leaveapply/LeaveApplyHistory2";
import LeaveBalances2 from "./Component1/Masters/Leaveapply/LeaveBalance2";
import LeaveCalendar2 from "./Component1/Masters/LeaveCalender2";
import ReimbursementForm2 from "./Component1/Masters/Reimbursement2";
import EmployeeDashBoard2 from "./Component1/Nattendance Epm/EmployeeDashBoard2";
import BasicDateCalendar2 from "./Component1/Nattendance Epm/Nattendance2";
import OldPayslip from "./Component1/Masters/PayslipNew format/Oldpayslip";
import OldPayslipGenerator from "./Component1/Masters/PayslipNew format/OldPayslipGenerator";
import Payslipelegant from "./Component1/Masters/PayslipNew format/Payslipelegant";
import PayslipGenerator from "./Component1/Masters/PayslipNew format/payslipgenerator";
import Payslipmonthly from "./Component1/Masters/PayslipNew format/Payslipmonthly";
import PayslipNewFormat from "./Component1/Masters/PayslipNew format/PayslipNewFormat";
import PaySlipTemplate from "./Component1/Masters/PayslipNew format/paysliptemplate";
import PaySlipFormTemplate from "./Component1/Masters/PayslipNew format/paysliptemplateform";
import PrintPayslip from "./Component1/Masters/PayslipNew format/PrintPayslip";
import HolidaysempPage2 from "./Component1/Masters/Holidayemp/Holidayemp2";
import { LightThemeConfig } from "./component/Home Page-comapny/Theme";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Grade_Slab from "./component/Masters-company/SlabGrade";
import EarnDeductCompanyMasters from "./component/Masters-company/EarnDeductMaster";
import YesNoButtons from "./components/Tmpemployeidform";
import BranchMaster1 from "./component/Masters-company/BranchHead";
import BranchMasters2 from "./component/Masters-company/BranchMaster2";
import EditEmployeeh1 from "./component/Masters-company/EmployeeCree/EditProfile1";
import Editprofileh1 from "./component/Masters-company/EmployeeCree/Viewprofile";
import EmployeeHomeH1 from "./component/Masters-company/EmployeeCree/EmployeeMater";
import PaymEmployeeFormmh1 from "./component/Masters-company/EmployeeCree/Employeeprofile";
import Employeeprofile0909h1 from "./component/Masters-company/EmployeeCree/EmployeePrfile1Org";
import YesNoSwitch from "./components/Tmpemployeidform";
import LoanMaster from "./component/Masters-company/LoanModule/LoanMaster";
import LoanEntry from "./component/Masters-company/LoanModule/LoanEntry";
import CTCSlabTable from "./component/Masters-company/LoanModule/LoanSlab";
import Masterroll from "./components/ReportFormates/masteerrol";
import LoanApproval from "./component/Masters-company/LoanModule/Loanapprove";
import PFvalues from "./component/Masters-company/PayslipModule/PFmodule/PFModule";
import AllowanceMaster from "./component/Masters-company/PayslipModule/AllowanceModule/AllowanceMaster";
import AllowanceValues from "./component/Masters-company/PayslipModule/AllowanceModule/AllowanceValues";
import DeductionMaster from "./component/Masters-company/PayslipModule/DeductionModule.js/DeductionMaster";
import AllowanceSettings from "./component/Masters-company/PayslipModule/AllowanceModule/AllowanceSettings";
import AllowanceMasterBranch from "./components/Masters/PayslipModule/AllowanceModule/AllowanceMaster";
import AllowanceValuesBranch from "./components/Masters/PayslipModule/AllowanceModule/AllowanceValues";
import AllowanceSettingsBranch from "./components/Masters/PayslipModule/AllowanceModule/AllowanceSettings";
import ESIsettings from "./component/Masters-company/PayslipModule/DeductionModule.js/EsiSettings";

const store = createStore(entityReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={LightThemeConfig}>
       <CssBaseline />
  <Provider store={store}>
    <BrowserRouter>
      {/* <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br> */}
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/loginemployee" element={<LoginOthers />} />

          {/*login Branch---------------------------------------------------------------------------------------------------*/}

          <Route path="/HomePage" element={<HomePage/>}></Route>
          <Route path="/Masters" element={<MastersTemplate />} />
          <Route path="/CompanyForm01" element={<CompanyMasters/>}/>
          <Route path="/PayBranchForm01" element={<PayBranchForm01/>}/>
          <Route path="/PaymEmployeeMasters" element={<PaymEmployeeMasters/>}/>
          <Route path="/Departmensmasters" element={<Departmensmasters/>}/>
          <Route path="/DesignationMasters" element={<DesignationMasters/>}/>
          <Route path="/ShiftMasters" element={<ShiftMasters/>}/>
          <Route path="/Group" element={<GroupUi/>}/>
          <Route path="/Group/addinfos" element={<AddInfos/>}/>
          <Route path="/EmployeeShift" element={<GroupShift/>}/>
          <Route path="/SlabTemplate" element={<SlabTemplate/>}/>
          <Route path="/LeaveApply" element={<LeaveApplyRequestHigher/>}/>
          <Route path="/LeaveRequestManager" element={<LeaveRequestManager/>}/>
          <Route path="/LeaveRequestEmployee" element={<LeaveRequestEmployee/>}/>
          <Route path="/Attendance" element={<AttendanceHome/>}/>
          <Route path="/AssetsTable" element={<AssetsTable />}></Route>
          <Route path="/EarnDeductTable" element={<EarnDeductTable />}></Route>
          <Route path="/SlabTemplateEmp" element={<SlabTemplateEmp/>}/>
          <Route
            path="/PaymEmployeeForm"
            element={<PaymEmployeeForm />}/>
             <Route path="/PaymEmpTable" element={<PaymEmpTable />}></Route>
             {/* <Route path="/payslipgenerator" element={<PayslipGenerator />}></Route> */}
             {/* <Route path="/payslipgenerator/payslipmonthly" element={<Payslipmonthly />}></Route> */}
             {/* <Route path="/payslipelegant" element={<Payslipelegant />}></Route> */}
             <Route path="/classic" element={<PayslipNewFormat/>}></Route>
             <Route path="/PtGrid" element={<PtGrid/>}></Route>
             <Route path="/OverTime" element={<OverTime/>}></Route>
             <Route path="/AttendanceBonusSetup" element={<AttendanceBonusSetup/>}></Route>
             <Route path="/Empcalendar" element={<Empcalendar/>}></Route>
             <Route path="/DBoards" element={<DBoards />} />
             <Route path="/GraphCheckBox1" element={<GraphCheckBox1/>}> </Route>
             <Route path="/EmployeeHome" element={<EmployeeHome/>}></Route>
             <Route path="/PaymEmployeeForm0045" element={<PaymEmployeeForm0045/>}></Route>
             <Route path="/PaymEmployeeFormm" element={<PaymEmployeeFormm/>}/>
             <Route path="/HolidaysPage" element={<HolidaysPage/>}></Route>
             <Route path="/HolidayForm1" element={<HolidayForm1/>}></Route>
             <Route path="/Attendance01" element={<Attendance01/>}></Route>
             <Route path="/LeaveRequestHr" element={<LeaveRequestHr/>}></Route>
             <Route path="/EmployeeReimbursement" element={<EmployeeReimbursement/>}></Route>
             <Route path="/EarnDeductMasters" element={<EarnDeductMastersss/>}/>
             <Route path="/Employeeprofile0909" element={<Employeeprofile0909/>}/>
             <Route path="/EarnDeductValueMaters" element={<EarnDeductValueMasters/>}/> 
             <Route path="/Editprofile/:employeeId" element={<Editprofile/>} />   
             <Route path="/EditEmployee/:employeeId"  element={<EditEmployee/>}/>
             <Route path="/DesignationMaster" element={<DesignationMaster/>}/>
             <Route path="/DepartmentMaster" element={<DepartmentMaster/>}/>
             <Route path="/DepartmentHome" element={<DepartmentHome/>}/>
             <Route path="/DesignationHome" element={<DesignationHome/>}/>
             <Route path="/SlideAnimationComponent" element={<SlideAnimationComponent/>}></Route>



{/*login company---------------------------------------------------------------------------------------------------*/}

             <Route path="/HomePage1" element={<HomePage1/>}/>
             <Route path="/CompanyMasterss1" element={<CompanyMasterss1/>}/>
             <Route path="/BranchMaster1" element={<BranchMaster1/>}/>
             <Route path="/BranchMasters2" element={<BranchMasters2/>}/>
             <Route path="/CategoryFormMaster1" element={<CategoryFormMaster1/>}/>
             <Route path="/DivisionMaster1" element={<DivisionMaster1/>}/>
             <Route path="/DepartmentFormMaster1" element={<DepartmentFormMaster1/>}/>
             <Route path="/DesignationMasterForm1" element={<DesignationMasterForm1/>}/>
             <Route path="/GradeForm1" element={<GradeForm1/>}/>
             <Route path="/ShiftFormMaster1" element={<ShiftFormMaster1/>}/>
             <Route path="/JobStatusFormMaster1" element={<JobStatusFormMaster1/>}/>
             <Route path="/LevelFormMaster1" element={<LevelFormMaster1/>}/>
             <Route path="/PaymLeaveMaster1" element={<PaymLeaveMaster1/>}/>
             <Route path="/GradeSlab" element={<Grade_Slab/>}/>
             <Route path="/EarnDeductCompanyMasters" element={<EarnDeductCompanyMasters/>}/>
             <Route path="/Editprofileh1/:employeeId" element={<Editprofileh1/>} />   
             <Route path="/EditEmployeeh1/:employeeId"  element={<EditEmployeeh1/>}/>
             <Route path="/EmployeeHomeH1" element={<EmployeeHomeH1/>}></Route>
             <Route path="/PaymEmployeeFormmh1" element={<PaymEmployeeFormmh1/>}/>
             <Route path="/Employeeprofile0909h1" element={<Employeeprofile0909h1/>}/>
          



          {/*login employee---------------------------------------------------------------------------------------------------*/}
<Route path="/LoginForm" element={<LoginForm/>}/>

<Route path="/HomePage2"  element={<HomePage2/>}/>
<Route path="HolidaysempPage2" element={<HolidaysempPage2/>}/>
<Route path="/LeaveapplyHr2" element={<LeaveapplyHr2/>}/>
<Route path="/LeaveRequestTable2" element={<LeaveRequestTable2/>}/>
<Route path="/LeaveBalances2" element={<LeaveBalances2/>}/>
<Route path="/LeaveCalendar2" element={<LeaveCalendar2/>}/>
<Route path="/ReimbursementForm2" element={<ReimbursementForm2/>}/>
<Route path="/EmployeeDashBoard2" element={<EmployeeDashBoard2/>}/>
<Route path="/BasicDateCalendar2" element={<BasicDateCalendar2/>}/>



<Route path="/OldPayslip" element={<OldPayslip/>}/>
<Route path="/OldPayslipGenerator" element={<OldPayslipGenerator/>}/>
<Route path="/payslipelegant" element={<Payslipelegant/>}/>
<Route path="/payslipgenerator" element={<PayslipGenerator/>}/>
<Route path="/payslipgenerator/Payslipmonthly" element={<Payslipmonthly/>}/>
<Route path="/classic" element={<PayslipNewFormat/>}/>
<Route path="/PaySlipTemplate" element={<PaySlipTemplate/>}/>
<Route path="/PaySlipFormTemplate" element={<PaySlipFormTemplate/>}/>
<Route path="/PrintPayslip" element={<PrintPayslip/>}/>
<Route path="/YesNoSwitch" element={<YesNoSwitch/>}/>
<Route path="/LoanMaster" element={<LoanMaster/>}/>
<Route path="/LoanEntry" element={<LoanEntry/>}/>
<Route path="/CTCSlabTable" element={<CTCSlabTable/>}/>
<Route path="/LoanApproval" element={<LoanApproval/>}/>
<Route path="/PFvalues" element={<PFvalues/>}/>
<Route path="/AllowanceMaster" element={<AllowanceMaster/>}/>
<Route path="/AllowanceValues" element={<AllowanceValues/>}/>
<Route path="/DeductionMaster" element={<DeductionMaster/>}/>
<Route path="/AllowanceSettings" element={<AllowanceSettings/>}/>
<Route path="/AllowanceMasterBranch" element={<AllowanceMasterBranch/>}/>
<Route path="/AllowanceValuesBranch" element={<AllowanceValuesBranch/>}/>
<Route path="/AllowanceSettingsBranch" element={<AllowanceSettingsBranch/>}/>
<Route path="/ESIsettings" element={<ESIsettings/>}/>















{/* <Route path="/YesNoButtons" element={<YesNoButtons/>}/> */}



                           {/* <Route path="/layout" elem ent={<Layoutcomp />} />
          <Route path="/att" element={<BasicDateCalendar />} />
          <Route path="/home" element={<ServiceCard />}></Route>
          <Route path="/AssetsTable" element={<AssetsTable />}></Route>
          <Route path="/SampleForm" element={<SampleForm />}></Route>
          <Route path="/dashboared" element={<DashBoard />}></Route>
          <Route
            path="/employeedashboared"
            element={<BasicDateCalendar />}></Route>
          <Route
            path="/dailytimecardtable"
            element={<DailyTimeCardTables />}></Route>
          <Route path="/Chatbot" element={<Chatbot />}></Route>
          <Route
            path="/dailytimecardform"
            element={<DailyTimeCardForm />}></Route>
          <Route path="/AttendenceTable" element={<AttendenceTable />}></Route>
          <Route path="/AttendenceForm" element={<AttendenceForm />}></Route>
          <Route path="/Attendance" element={<AttendanceNew />}></Route>
          <Route path="/EarnDeductTable" element={<EarnDeductTable />}></Route>
          <Route path="/EarnDeductForm" element={<EarnDeductForm />}></Route>

          <Route path="/Form7table" element={<Form7table />}></Route>
          <Route path="/SampleForm7" element={<SampleForm7 />}></Route>
          <Route path="/groupui" element={<GroupUi />} />
          <Route path="/groupui/addinfos" element={<AddInfos />} />
          <Route path="/groupshift" element={<GroupShift />} />
          <Route
            path="/HrAuthenticationTable"
            element={<HrAuthenticationTable />}></Route>
          <Route path="/HrAuthForm" element={<HrAuthForm />}></Route>

          <Route path="/Hrmcoursetable" element={<Hrmcoursetable />}></Route>
          <Route path="/CourseForm" element={<CourseForm />}></Route>

          <Route
            path="/Hrmskillmastertable"
            element={<Hrmskillmastertable />}></Route>
          <Route
            path="/SkillsMasterForm"
            element={<SkillsMasterForm />}></Route>

          <Route
            path="/HrmmSpecializationtable"
            element={<HrmmSpecializationtable />}></Route>
          <Route
            path="/SpecializationForm"
            element={<SpecializationForm />}></Route>

          <Route
            path="/PaymJobStatusTable"
            element={<PaymJobStatusTable />}></Route>
          <Route path="/JobStatusForm" element={<JobStatusForm />}></Route>

          <Route
            path="/LeaveAllocationMasterTable"
            element={<LeaveAllocationMasterTable />}></Route>
          <Route
            path="/LeaveAllocationForm"
            element={<LeaveAllocationForm />}></Route>

          <Route path="/LeaveApplyTable" element={<LeaveApplyTable />}></Route>
          <Route path="/LeaveAppForm" element={<LeaveAppForm />}></Route>
          <Route path="/LeaveApplyNew" element={<Leaveapprovenew />}></Route>

          <Route
            path="/LeaveApproveHrTable"
            element={<LeaveApproveHrTable />}></Route>
          <Route path="/ApprovehrForm" element={<ApprovehrForm />}></Route>

          <Route
            path="/LeaveApproveManagerTable"
            element={<LeaveApproveManagerTable />}></Route>
          <Route
            path="/ApproveManagerForm"
            element={<ApproveManagerForm />}></Route>

          <Route
            path="/LeaveSettlementTable"
            element={<LeaveSettlementTable />}></Route>
          <Route path="/LeaveSettleForm" element={<LeaveSettleForm />}></Route>

          <Route path="/LoanEntryTable" element={<LoanEntryTable />}></Route>
          <Route path="/LoanEntForm" element={<LoanEntForm />}></Route>

          <Route path="/LoanPostTable" element={<LoanPostTable />}></Route>
          <Route path="/LoanPostForm" element={<LoanPostForm />}></Route>

          <Route
            path="/LoanPreCloserTable"
            element={<LoanPreCloserTable />}></Route>
          <Route path="/LoanPreclosForm" element={<LoanPreclosForm />}></Route>

          <Route path="/OnDutyTable" element={<OnDutyTable />}></Route>
          <Route path="/OndutyForm" element={<OndutyForm />}></Route>

          <Route path="/OtsLabTable" element={<OtsLabTable />}></Route>
          <Route path="/OTSlabForm" element={<OTSlabForm />}></Route>
          <Route path="/Othrs" element={<OtHrsNewForm />}></Route>

          <Route path="/PayInputTable" element={<PayInputTable />}></Route>
          <Route path="/PayinputForm" element={<PayinputForm />}></Route>

          <Route
            path="/PaymAttBonusTable"
            element={<PaymAttBonusTable />}></Route>
          <Route
            path="/PaymattbonusForm"
            element={<PaymattbonusForm />}></Route>

          <Route path="/PaymBankTable" element={<PaymBankTable />}></Route>
          <Route path="/PaybankForm" element={<PaybankForm />}></Route>

          <Route path="/PaymBranchtable" element={<PaymBranchtable />}></Route>
          <Route path="/PayBranchForm" element={<PayBranchForm />}></Route>

          <Route
            path="/PaymcarryForwardTable"
            element={<PaymcarryForwardTable />}></Route>
          <Route
            path="/PaymCarrForwardForm"
            element={<PaymCarrForwardForm />}></Route>

          <Route
            path="/PaymCategoryTable"
            element={<PaymCategoryTable />}></Route>
          <Route
            path="/Paymcategoryform"
            element={<Paymcategoryform />}></Route>

          <Route path="/PaycompanyTable" element={<PaycompanyTable />}></Route>
          <Route path="/CompanyForm" element={<CompanyForm />}></Route>

          <Route
            path="/PaymComputationtables"
            element={<PaymComputationtables />}></Route>
          <Route path="/ComputationForm" element={<ComputationForm />}></Route>

          <Route path="/PaymEarnTable" element={<PaymEarnTable />}></Route>
          <Route path="/PaymEarnForm" element={<PaymEarnForm />}></Route>

          <Route
            path="/PaymDeductionTable"
            element={<PaymDeductionTable />}></Route>
          <Route path="/DeductionForm" element={<DeductionForm />}></Route>

          <Route
            path="/PaymDepartmentTable"
            element={<PaymDepartmentTable />}></Route>
          <Route path="/DepartmentForm" element={<DepartmentForm />}></Route>

          <Route
            path="/PaymDesignationTable"
            element={<PaymDesignationTable />}></Route>
          <Route path="/DesignationForm" element={<DesignationForm />}></Route>

          <Route
            path="/PaymDIvisionTable"
            element={<PaymDIvisionTable />}></Route>
          <Route path="/DivisionForm" element={<DivisionForm />}></Route>

          <Route
            path="/PaymEmpEarningsTable"
            element={<PaymEmpEarningsTable />}></Route>
          <Route
            path="/PaymEmpEarningsForm"
            element={<PaymEmpEarningsForm />}></Route>

          <Route
            path="/PaymEmpDeductionTable"
            element={<PaymEmpDeductionTable />}></Route>
          <Route
            path="/EmpDeductionForm"
            element={<EmpDeductionForm />}></Route>

          <Route path="/PaymEmpTable" element={<PaymEmpTable />}></Route>
          <Route
            path="/PaymEmployeeForm"
            element={<PaymEmployeeForm />}></Route>

          <Route
            path="/PaymEmpLeaveTable"
            element={<PaymEmpLeaveTable />}></Route>
          <Route
            path="/PaymEmpLeaveForm"
            element={<PaymEmpLeaveForm />}></Route>

          <Route
            path="/PaymEmployeeProfile1Tables"
            element={<PaymEmployeeProfile1Tables />}></Route>
          <Route
            path="/EmployeeProfile1Form"
            element={<EmployeeProfile1Form />}></Route>

          <Route
            path="/PaymEmployeeWorkDetailTables"
            element={<PaymEmployeeWorkDetailTables />}></Route>
          <Route
            path="/EmployeeWorkDetailsForm"
            element={<EmployeeWorkDetailsForm />}></Route>

          <Route
            path="/PaymEncashmentDetailsTables"
            element={<PaymEncashmentDetailsTables />}></Route>
          <Route
            path="/EncashmentDetailsForm"
            element={<EncashmentDetailsForm />}></Route>

          <Route path="/PaymgradeTables" element={<PaymgradeTables />}></Route>
          <Route path="/GradeForm" element={<GradeForm />}></Route>

          <Route
            path="/PaymHolidayTables"
            element={<PaymHolidayTables />}></Route>
          <Route path="/HolidayForm" element={<HolidayForm />}></Route>

          <Route path="/PaymleaveTables" element={<PaymleaveTables />}></Route>
          <Route path="/LeaveForm" element={<LeaveForm />}></Route>
          <Route path="/setupleave" element={<LeaveSetup />}></Route>
          <Route
            path="/Paymleaveallocation1Tables"
            element={<Paymleaveallocation1Tables />}></Route>
          <Route
            path="/LeaveAllocation1Form"
            element={<LeaveAllocation1Form />}></Route>

          <Route path="/PaymlevelTables" element={<PaymlevelTables />}></Route>
          <Route path="/LevelForm" element={<LevelForm />}></Route>

          <Route path="/PaymLoanTable" element={<PaymLoanTable />}></Route>
          <Route path="/PayLoanForm" element={<PayLoanForm />}></Route>

          <Route
            path="/PaymLoanDiminishingTable"
            element={<PaymLoanDiminishingTable />}></Route>
          <Route path="/Sample27" element={<Sample27 />}></Route>

          <Route
            path="/PaymOverHeadingcostTable"
            element={<PaymOverHeadingcostTable />}></Route>
          <Route path="/Sample26" element={<Sample26 />}></Route>

          <Route path="/PaymPaypfTable" element={<PaymPaypfTable />}></Route>
          <Route path="/Sample24" element={<Sample24 />}></Route>

          <Route
            path="/PaymPaybillTable"
            element={<PaympaybillTable />}></Route>
          <Route path="/Sample25" element={<Sample25 />}></Route>

          <Route path="/PaymshiftTable" element={<PaymshiftTable />}></Route>
          <Route path="/Sample23" element={<Sample23 />}></Route>

          <Route
            path="/PaympayoutputloanTable"
            element={<PaympayoutputloanTable />}></Route>
          <Route path="/Sample22" element={<Sample22 />}></Route>

          <Route
            path="/PayrollFinalSettlemetTable"
            element={<PayrollFinalSettlemetTable />}></Route>
          <Route path="/Sample21" element={<Sample21 />}></Route>

          <Route path="/PfepTable" element={<PfepTable />}></Route>
          <Route path="/Sample20" element={<Sample20 />}></Route>

          <Route path="/PfepfTable" element={<PfepfTable />}></Route>
          <Route path="/Sample19" element={<Sample19 />}></Route>

          <Route
            path="/PunchdetailsTable"
            element={<PunchdetailsTable />}></Route>
          <Route path="/Sample18" element={<Sample18 />}></Route>

          <Route
            path="/SalaryPeriodTable"
            element={<SalaryPeriodTable />}></Route>
          <Route path="/Sample17" element={<Sample17 />}></Route>

          <Route
            path="/SalaryStructureTable"
            element={<SalaryStructureTable />}></Route>
          <Route path="/Sample16" element={<Sample16 />}></Route>

          <Route
            path="/ShiftBalanceTable"
            element={<ShiftBalanceTable />}></Route>
          <Route path="/Sample15" element={<Sample15 />}></Route>

          <Route
            path="/ShiftDetailsTable"
            element={<ShiftDetailsTable />}></Route>
          <Route path="/DetailsForm" element={<DetailsForm />}></Route>

          <Route path="/ShiftMonthTable" element={<ShiftMonthTable />}></Route>
          <Route path="/Sample13" element={<Sample13 />}></Route>

          <Route
            path="/ShiftPatternTable"
            element={<ShiftPatternTable />}></Route>
          <Route path="/Sample12" element={<Sample12 />}></Route>

          <Route path="/YearEndTable" element={<YearEndTable />}></Route>
          <Route path="/Sample1" element={<Sample1 />}></Route>

          <Route
            path="/TempshiftdetailsTables"
            element={<TempshiftdetailsTables />}></Route>
          <Route
            path="/TempShiftDetailsForm"
            element={<TempShiftDetailsForm />}></Route>

          <Route path="/Paycalc" element={<Paycalc />}></Route>

          <Route
            path="/TimesheetManager"
            element={<TimesheetManager />}></Route>

          <Route path="/daysheet" element={<ButtonEsi />}></Route>

          <Route path="/OTSheet" element={<ButtonEsi2 />}></Route>

          <Route path="/OTSummary" element={<ButtonEsi3 />}></Route>

          <Route path="/WorkDetails" element={<ButtonEsi4 />}></Route>

          <Route path="/AttedanceDetails" element={<ButtonEsi5 />}></Route>

          <Route path="/AbsentDetails" element={<ButtonEsi6 />}></Route>

          <Route path="/AdvanceReports" element={<ButtonEsi7 />}></Route>

          <Route path="/TAandDReports" element={<ButtonEsi8 />}></Route>

          <Route path="/Masterroll" element={<MasterrollButton />}></Route>

          <Route
            path="/payslipgenerator"
            element={<PayslipGenerator />}></Route>

          <Route
            path="/payslipgenerator/payslipnewformat"
            element={<PayslipNewFormat />}></Route>

          <Route
            path="/oldpayslipgenerator"
            element={<OldPayslipGenerator />}></Route>

          <Route
            path="/oldpayslipgenerator/oldpayslip"
            element={<OldPayslip />}></Route>

          <Route
            path="/medicalslipgenerator/medical"
            element={<Medical />}></Route>
          <Route
            path="/medicalslipgenerator"
            element={<MedicalSlipGenerator />}></Route>

          <Route
            path="/viewmedical/medicalslipview"
            element={<MedicalSlipView />}></Route>
          <Route path="/viewmedical" element={<ViewMedical />}></Route>

          <Route path="/earlyandlatentries" element={<EarlyAndLate />}></Route>

          <Route path="/leaveapprovenew" element={<LeaveApprovenew />}></Route>

          <Route path="/payslipelegant" element={<Payslipelegant />}></Route>

          <Route
            path="/payslipgenerator/payslipmonthly"
            element={<Payslipmonthly />}></Route>
        </Route>
        <Route path="/Mastterrol" element={<Mastterrol />}></Route>
        <Route path="/Setup" element={<Setup />}></Route>
        <Route path="/Setup2" element={<Setup2 />}></Route>
        <Route path="/Shiftdetails007" element={<Shiftdetails007 />}></Route>
        <Route
          path="/Shiftpatterns0009"
          element={<Shiftpatterns0009 />}></Route>
        <Route path="/Leavesettlement" element={<Leavesettlement />}></Route> */}
       
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
    </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

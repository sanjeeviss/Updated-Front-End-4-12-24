import React, { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Grid,
  Button,
  Card,
  Typography,
  CardContent,
  TextField,
  Box
} from "@mui/material";
import {
  PAYMPF,
  REPORTS,
  SHIFTDETAILS,
  PAYMVPF,
  LEAVEALLOCATIONMASTER,
  PAYOUTPUTESI,
  SAVE,
} from "../../serverconfiguration/controllers";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { postRequest, getRequest } from "../../serverconfiguration/requestcomp";
import Sidenav from "../Home Page/Sidenav";
import Navbar from "../Home Page/Navbar";

function AddInfos() {
  const [employeegrp, setemployeegrp] = useState([]);
  const [empgrp, setempgrp] = useState({});
  const [paympf, setpaympf] = useState([]);
  const [ShiftDetails, setshiftdetails] = useState([]);
  const [paymVpf, setpaymVpf] = useState([]);
  const [LeaveAllocationMaster, setLeaveAllocationMaster] = useState([]);
  const [payEsi, setPayEsi] = useState([]);
  const [grpid, setgrpid] = useState("");
  const [emppf, setemppf] = useState("");
  const [empEPF, setempEPF] = useState("");
  const [empFPF, setempFPF] = useState("");
  const [admincharges, setadmincharges] = useState("");
  const [shiftcode, setshiftcode] = useState("");
  const [vpfAmount, setVpfAmount] = useState("");
  const [medical, setMedical] = useState("");
  const [official, setOfficial] = useState("");
  const [casual, setCasual] = useState("");
  const [personnel, setPersonnel] = useState("");
  const [earned, setEarned] = useState("");
  const [maternity, setMaternity] = useState("");
  const [esiEmp, setEsiemp] = useState("");
  const [esiEpr, setEsiepr] = useState("");
  const [dedamount, setdedamount] = useState("");
  const [earnedamount, setearnedamount] = useState("");
  const [grosssalary, setgrosssalary] = useState("");
  const [basicsalary, setBasicsalary] = useState("");
  const [netSalary, setNetsalary] = useState("");
  const [netPay, setNetpay] = useState("");
  const [earnedBasic, setEarnedbasic] = useState("");
  const [maxAmount, setMaxamount] = useState("");
  const [allowance1, setAllowance1] = useState("");
  const [value1, setValue1] = useState("");
  const [allowance2, setAllowance2] = useState("");
  const [value2, setValue2] = useState("");
  const [allowance3, setAllowance3] = useState("");
  const [value3, setValue3] = useState("");
  const [allowance4, setAllowance4] = useState("");
  const [value4, setValue4] = useState("");
  const [allowance5, setAllowance5] = useState("");
  const [value5, setValue5] = useState("");
  const [allowance6, setAllowance6] = useState("");
  const [value6, setValue6] = useState("");
  const [allowance7, setAllowance7] = useState("");
  const [value7, setValue7] = useState("");
  const [allowance8, setAllowance8] = useState("");
  const [value8, setValue8] = useState("");
  const [allowance9, setAllowance9] = useState("");
  const [value9, setValue9] = useState("");
  const [allowance10, setAllowance10] = useState("");
  const [value10, setValue10] = useState("");
  const [deduction1, setDeduction1] = useState("ESI EMP");
  const [valueA1, setValueA1] = useState(0.75);
  const [deduction2, setDeduction2] = useState("");
  const [valueA2, setValueA2] = useState("");
  const [deduction3, setDeduction3] = useState("");
  const [valueA3, setValueA3] = useState("");
  const [deduction4, setDeduction4] = useState("");
  const [valueA4, setValueA4] = useState("");
  const [deduction5, setDeduction5] = useState("");
  const [valueA5, setValueA5] = useState("");
  const [deduction6, setDeduction6] = useState("");
  const [valueA6, setValueA6] = useState("");
  const [deduction7, setDeduction7] = useState("");
  const [valueA7, setValueA7] = useState("");
  const [deduction8, setDeduction8] = useState("");
  const [valueA8, setValueA8] = useState("");
  const [deduction9, setDeduction9] = useState("");
  const [valueA9, setValueA9] = useState("");
  const [deduction10, setDeduction10] = useState("");
  const [valueA10, setValueA10] = useState("");

  const location = useLocation();
  const navdata1 = location.state;

  const navigate = useNavigate();
  console.log("navdata ", navdata1);
  const margin = { margin: "0 5px" };

  useEffect(() => {
    async function getData() {
      const data = await postRequest(ServerConfig.url, REPORTS, {
        query: `select * from Group_details`,
      });
      setemployeegrp(data.data);
      const empgrp = await postRequest(ServerConfig.url, REPORTS, {
        query: `select * from employee_Group`,
      });
      setempgrp(empgrp.data);
      const paympf = await getRequest(ServerConfig.url, PAYMPF);
      setpaympf(paympf.data);
      const shiftdetails = await getRequest(ServerConfig.url, SHIFTDETAILS);
      setshiftdetails(shiftdetails.data);
      const paymVpf = await getRequest(ServerConfig.url, PAYMVPF);
      setpaymVpf(paymVpf.data);
      const leaveAllocationMaster = await getRequest(
        ServerConfig.url,
        LEAVEALLOCATIONMASTER
      );
      setLeaveAllocationMaster(leaveAllocationMaster.data);
      const Esi = await getRequest(ServerConfig.url, PAYOUTPUTESI);
      setPayEsi(Esi.data);
      console.log(empgrp);
    }
    getData();
  }, []);

  const handlesave = () => {
    const query = `INSERT INTO [dbo].[Group_Settings]([groupid],[emp_EPF],[emp_FPF],[Ded_Amount],[Earned_Amount],[Gross_salary],[Basic_salary],[Net_salary],[vpfamount],[shift_code],[Allowance1],[Value1],[Allowance2],[value2],[Allowance3],[Value3],[Allowance4],[Value4],[Allowance5],[Value5],[Allowance6],[Value6],[Allowance7],[Value7],[Allowance8],[Value8],[Allowance9],[Value9],[Allowance10],[Value10],[Deduction1],[valueA1],[Deduction2],[valueA2],[Deduction3],[valueA3],[Deduction4],[valueA4],[Deduction5],[valueA5],[Deduction6],[valueA6],[Deduction7],[valueA7],[Deduction8],[valueA8],[Deduction9],[valueA9],[Deduction10],[valueA10],[medical],[official],[casual],[personnel],[maternity],[Earned],[Admin_Charges],[NetPay],[Earned_Basic],[max_amount],[emp_PF]) VALUES(${grpid},${empEPF},${empFPF},${dedamount},${earnedamount},${grosssalary},${basicsalary},${netSalary},${vpfAmount},'${shiftcode}','${allowance1}',${value1},'${allowance2}',${value2},'${allowance3}',${value3},'${allowance4}',${value4},'${allowance5}',${value5},'${allowance6}',${value6},'${allowance7}',${value7},'${allowance8}',${value8},'${allowance9}',${value9},'${allowance10}',${value10},'${deduction1}',${valueA1},'${deduction2}',${valueA2},'${deduction3}',${valueA3},'${deduction4}',${valueA4},'${deduction5}',${valueA5},'${deduction6}',${valueA6},'${deduction7}',${valueA7},'${deduction8}',${valueA8},'${deduction9}',${valueA9},'${deduction10}',${valueA10},${medical},${official},${casual},'${personnel}','${maternity}','${earned}',${admincharges},${netPay},${earnedBasic},${maxAmount},${emppf})`;

    postRequest(ServerConfig.url, SAVE, { query })
      .then((response) => {
        if (response.status === 200) {
          alert("Data saved successfully!");
        } else {
          alert("Failed to save data.");
        }
      })
      .catch((error) => {
        alert("An error occurred: " + error.message);
      });
  };

  const handlegroupsave = () => {
    const processedGroupIds = new Set();

    empgrp.forEach((group) => {
      if (!processedGroupIds.has(group.groupid)) {
        processedGroupIds.add(group.groupid);

        const query1 = `INSERT INTO paym_paybill (EmployeeCode, Earn_Amount, Ded_Amount, Act_Basic, Net_salary, Gross_salary, NetPay, Earned_Basic, max_amount, pn_CompanyID, pn_BranchID, pn_EmployeeID, Allowance1, value1, Allowance2, value2, Allowance3, value3, Allowance4, value4, Allowance5, value5, Allowance6, value6, Allowance7, value7, Allowance8, value8, Allowance9, value9, Allowance10, value10, Deduction1, valueA1, Deduction2, valueA2, Deduction3, valueA3, Deduction4, valueA4, Deduction5, valueA5, Deduction6, valueA6, Deduction7, valueA7, Deduction8, valueA8, Deduction9, valueA9, Deduction10, valueA10, Employee_First_Name, CompanyName, DesignationName, DepartmentName, GradeName, CategoryName, JoiningDate, d_date, EPF, FPF, period_code, ot_hrs, ot_value, ot_amt, Address_line1, Address_Line2, City, Zipcode)
          SELECT eg.employee_code, gs.Earned_Amount, gs.Ded_Amount, gs.Basic_salary, gs.Net_salary, gs.Gross_salary, gs.NetPay, gs.Earned_Basic, gs.max_amount, pe.pn_CompanyID, pe.pn_BranchID, pe.pn_EmployeeID, gs.Allowance1, gs.Value1, gs.Allowance2, gs.value2, gs.Allowance3, gs.value3, gs.Allowance4, gs.Value4, gs.Allowance5, gs.Value5, gs.Allowance6, gs.Value6, gs.Allowance7, gs.value7, gs.Allowance8, gs.Value8, gs.Allowance9, gs.Value9, gs.Allowance10, gs.Value10, gs.Deduction1, gs.valueA1, gs.Deduction2, gs.valueA2, gs.Deduction3, gs.valueA3, gs.Deduction4, gs.valueA4, gs.Deduction5, gs.valueA5, gs.Deduction6, gs.valueA6, gs.Deduction7, gs.valueA7, gs.Deduction8, gs.valueA8, gs.Deduction9, gs.valueA9, gs.Deduction10, gs.valueA10, pe.Employee_First_Name, pc.CompanyName, pd.v_DesignationName, pde.v_DepartmentName, pg.v_GradeName, pca.v_CategoryName, pew.JoiningDate, ed.d_date, gs.emp_EPF, gs.emp_FPF, null, tc.ot_hrs, pin.ot_value, pin.ot_Amt, pbr.Address_Line1, pbr.Address_Line2, pbr.City, pbr.ZipCode
          FROM Group_Settings gs 
          JOIN Employee_Group eg ON gs.groupid = eg.groupid 
          JOIN paym_Employee pe ON eg.employee_code = pe.EmployeeCode 
		  JOIN paym_employee_profile1 pep ON pe.pn_EmployeeID = pep.pn_EmployeeID
          JOIN paym_Company pc ON pe.pn_CompanyID = pc.pn_CompanyID and pep.pn_CompanyID = pc.pn_CompanyID
          JOIN paym_Designation pd on pe.pn_CompanyID = pd.pn_CompanyID and pe.pn_BranchID = pd.BranchID  and pep.pn_DesingnationId = pd.pn_DesignationID
          JOIN paym_Department pde on pe.pn_CompanyID = pde.pn_CompanyID and pe.pn_BranchID = pde.pn_BranchID and pep.pn_DepartmentId = pde.pn_DepartmentID
          JOIN paym_Grade pg on pe.pn_CompanyID = pg.pn_CompanyID and pe.pn_BranchID = pg.BranchID and pep.pn_GradeId =pg.pn_GradeID
          JOIN paym_Category pca on pe.pn_CompanyID = pca.pn_CompanyID and pe.pn_BranchID = pca.BranchID and pep.pn_CategoryId = pca.pn_CategoryID
          JOIN paym_Employee_WorkDetails pew on pe.pn_EmployeeID = pew.pn_EmployeeID 
          JOIN earn_deduct ed on pe.pn_EmployeeID = ed.pn_EmployeeID 
          JOIN time_card tc on pe.EmployeeCode = tc.emp_code 
      JOIN PayInput pin on pe.pn_EmployeeID = pin.pn_EmployeeID 
          JOIN paym_Branch pbr on pe.pn_CompanyID = pbr.pn_CompanyID and pe.pn_BranchID = pbr.pn_BranchID and pep.pn_BranchID = pbr.pn_BranchID
          WHERE gs.groupid = ${group.groupid};`;

        const query2 = `INSERT INTO shift_month (pn_CompanyID, pn_BranchID, pn_EmployeeCode, pn_EmployeeName, monthyear, date, shift_Code)
          SELECT 
              pe.pn_CompanyID,
              pe.pn_BranchID,
              eg.employee_code,
              pe.Employee_Full_Name,
              FORMAT(GETDATE(), 'MMyyyy') AS monthyear,
              GETDATE() AS date,
              gs.shift_code
          FROM 
              Group_Settings gs
          JOIN 
              Employee_Group eg ON gs.groupid = eg.groupid
          JOIN 
              paym_Employee pe ON eg.employee_code = pe.EmployeeCode
          WHERE 
              gs.groupid = ${group.groupid};`;

        const query3 = ` INSERT INTO leaveallocation_master (pn_CompanyID, pn_BranchID, pn_EmployeeID, pn_leaveID, Medical, Official, Casual, personnel, maternity, Earned, Yearend)
          SELECT 
              pe.pn_CompanyID,
              pe.pn_BranchID,
              pe.pn_EmployeeID,
              pl.pn_leaveID,
              gs.medical,
              gs.official,
              gs.casual,
              gs.personnel,
              gs.maternity,
              gs.Earned,
              YEAR(ye.StartDate)
          FROM 
              Group_Settings gs
          JOIN 
              employee_group eg ON gs.groupid = eg.groupid
          JOIN 
              paym_Employee pe ON eg.employee_code = pe.EmployeeCode
	      JOIN
			  paym_employee_profile1 pep on pe.pn_EmployeeID = pep.pn_EmployeeID
			  JOIN
			  leave_settlement ls ON pe.pn_EmployeeID = ls.pn_EmployeeID
          JOIN 
              paym_leave pl ON  ls.pn_CompanyID = pl.pn_CompanyID and ls.pn_BranchID = pl.pn_CompanyID and ls.pn_LeaveID = pl.pn_leaveID
          JOIN 
              Yearend ye ON pe.pn_CompanyID = ye.pn_CompanyID and pe.pn_BranchID = ye.pn_BranchID and pep.pn_BranchID = ye.pn_BranchID

          WHERE 
              gs.groupid = ${group.groupid};`;

        const query4 =
          "Begin Transaction " +
          query1 +
          " IF @@ROWCOUNT = 0 " +
          " Begin  ROLLBACK TRANSACTION; Print ' first  transaction failed'; return; end " +
          query2 +
          " if @@ROWCOUNT=0 Begin RollBack Transaction; Print 'Second Transaction Failed ' return; end " +
          query3 +
          " if @@ROWCOUNT=0 Begin Rollback Transaction; Print 'Third insert failed' return; end commit transaction print 'all transactions succeeded'";
        Promise.all([
          postRequest(ServerConfig.url, SAVE, { query: query4 }),
          // postRequest(ServerConfig.url, SAVE, { query: query2 }),
          // postRequest(ServerConfig.url, SAVE, { query: query3 }),
        ])
          .then(([response1]) => {
            if (
              response1.status === 200 &&
              response1.data > 0
              // response2.status === 200 &&
              // response3.status === 200
            ) {
              alert(`Data saved successfully for group ${group.groupid}!`);
            } else {
              alert(
                `Failed to save data for group ${group.groupid}. you are missing on supporting information`
              );
            }
          })
          .catch((error) => {
            alert(
              `An error occurred for group ${group.groupid}: ` + error.message
            );
          });
      }
    });
  };

  function handleaddEmployee() {
    navigate("/PaymEmployeeForm");
  }

  return (
    <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <div>
      <Grid style={{ padding: "80px 5px0 5px" }}>
        <Card style={{ maxWidth: 1000, margin: "0 auto" }}>
          <CardContent>
            <Typography variant="h5" color="S- Light" align="center">
              Group Form
            </Typography>
            <Grid item xs={12} align="right">
              <Button
                variant="outlined"
                color="primary"
                onClick={handlegroupsave}>
                Process Existing Employees
              </Button>
            </Grid>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              paddingBottom={"20px"}>
              Fill all the Mandatory fields
            </Typography>
            <form>
              <Grid container spacing={2} inputlabelprops={{ shrink: true }}>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel shrink>GroupId</InputLabel>
                    <select
                      name="groupid"
                      onChange={(e) => {
                        setgrpid(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {console.log(employeegrp)}
                      {employeegrp.map((e) => (
                        <option value={e.GroupID}>{e.Group_name}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Emp_PF</InputLabel>
                    <select
                      name="Emp_PF"
                      onChange={(e) => {
                        setemppf(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {paympf.map((e) => (
                        <option>{e.empConPf}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>emp_EPF</InputLabel>
                    <select
                      name="emp_EPF"
                      onChange={(e) => {
                        setempEPF(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {paympf.map((e) => (
                        <option>{e.empConEpf}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>emp_FPF</InputLabel>
                    <select
                      name="emp_FPF"
                      onChange={(e) => {
                        setempFPF(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {paympf.map((e) => (
                        <option>{e.empConFpf}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>Admin Charges</InputLabel>
                    <select
                      name="Admin Charges"
                      onChange={(e) => {
                        setadmincharges(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {paympf.map((e) => (
                        <option>{e.adminCharges}</option>
                      ))}
                    </select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>shiftCode</InputLabel>

                    {navdata1 != null || navdata1 != undefined ? (
                      <TextField
                        name="shiftcode"
                        style={{ height: "50px" }}
                        value={navdata1.shift.shiftCode}
                      />
                    ) : (
                      <select
                        name="shiftcode"
                        onChange={(e) => {
                          setshiftcode(e.target.value);
                        }}
                        style={{ height: "50px" }}>
                        <option value="">Select</option>
                        {ShiftDetails.map((e) => (
                          <option>{e.shiftCode}</option>
                        ))}
                      </select>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>vpfamount</InputLabel>
                    {/* <select name = "vpfamount" 
               onChange={(e)=>{
                setVpfAmount (e.target.value)
                
               }}
               style={{ height: '50px' }}
              
               >
                <option value="">Select</option>
                   {

                      paymVpf.map((e)=><option>{e.vpfamount}</option>)
                      
                   }
               </select> */}
                    <TextField
                      name="vpfamount"
                      label="vpfamount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setVpfAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>medical</InputLabel>
                    {/* <select
                      name="medical"
                      onChange={(e) => {
                        setMedical(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {LeaveAllocationMaster.map((e) => (
                        <option>{e.medical}</option>
                      ))}
                    </select> */}
                    <TextField
                      name="medical"
                      label="medical"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMedical(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>official</InputLabel>
                    {/* <select
                      name="official"
                      onChange={(e) => {
                        setOfficial(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {LeaveAllocationMaster.map((e) => (
                        <option>{e.official}</option>
                      ))}
                    </select> */}
                    <TextField
                      name="official"
                      label="official"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setOfficial(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>casual</InputLabel>
                    {/* <select
                      name="casual"
                      onChange={(e) => {
                        setCasual(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {LeaveAllocationMaster.map((e) => (
                        <option>{e.casual}</option>
                      ))}
                    </select> */}
                    <TextField
                      name="casual"
                      label="casual"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setCasual(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel shrink>personnel</InputLabel>
                    {/* <select
                      name="Personnel"
                      onChange={(e) => {
                        setPersonnel(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {LeaveAllocationMaster.map((e) => (
                        <option>{e.personnel}</option>
                      ))}
                    </select> */}
                    <TextField
                      name="Personnel"
                      label="Personnel"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setPersonnel(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>maternity</InputLabel>
                    {/* <select
                      name="maternity"
                      onChange={(e) => {
                        setMaternity(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {LeaveAllocationMaster.map((e) => (
                        <option>{e.maternity}</option>
                      ))}
                    </select> */}
                    <TextField
                      name="maternity"
                      label="maternity"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMaternity(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel shrink>earned</InputLabel>
                    {/* <select
                      name="earned"
                      onChange={(e) => {
                        setEarned(e.target.value);
                      }}
                      style={{ height: "50px" }}>
                      <option value="">Select</option>
                      {LeaveAllocationMaster.map((e) => (
                        <option>{e.earned}</option>
                      ))}
                    </select> */}
                    <TextField
                      name="earned"
                      label="earned"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEarned(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="basicsalary"
                      label="basicsalary"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setBasicsalary(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="grosssalary"
                      label="grosssalary"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setgrosssalary(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="dedamount"
                      label="dedamount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setdedamount(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="earnedamount"
                      label="earnedamount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setearnedamount(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="netSalary"
                      label="netSalary"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setNetsalary(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="netPay"
                      label="netPay"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setNetpay(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="earnedBasic"
                      label="earnedBasic"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setEarnedbasic(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="maxAmount"
                      label="maxAmount"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setMaxamount(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance1"
                      label="Allowance1"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance1(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value1"
                      label="Value1"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue1(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance2"
                      label="Allowance2"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance2(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value2"
                      label="Value2"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue2(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={3} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance3"
                      label="Allowance3"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance3(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value3"
                      label="Value3"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue3(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance4"
                      label="Allowance4"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance4(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value4"
                      label="Value4"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue4(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance5"
                      label="Allowance5"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance5(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value5"
                      label="Value5"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue5(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance6"
                      label="Allowance6"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance6(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value6"
                      label="Value6"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue6(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance7"
                      label="Allowance7"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance7(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value7"
                      label="Value7"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue7(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance8"
                      label="Allowance8"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance8(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value8"
                      label="Value8"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue8(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance9"
                      label="Allowance9"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance9(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value9"
                      label="Value9"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue9(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Allowance10"
                      label="Allowance10"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setAllowance10(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Value10"
                      label="Value10"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValue10(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction1"
                      label="Deduction1"
                      variant="outlined"
                      fullWidth
                      required
                      value={deduction1}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA1"
                      label="ValueA1"
                      variant="outlined"
                      fullWidth
                      required
                      value={valueA1}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction2"
                      label="Deduction2"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction2(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA2"
                      label="ValueA2"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA2(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction3"
                      label="Deduction3"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction3(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA3"
                      label="ValueA3"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA3(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction4"
                      label="Deduction4"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction4(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA4"
                      label="ValueA4"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA4(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction5"
                      label="Deduction5"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction5(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA5"
                      label="ValueA5"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA5(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction6"
                      label="Deduction6"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction6(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA6"
                      label="ValueA6"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA6(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction7"
                      label="Deduction7"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction7(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA7"
                      label="ValueA7"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA7(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction8"
                      label="Deduction8"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction8(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA8"
                      label="ValueA8"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA8(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction9"
                      label="Deduction9"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction9(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA9"
                      label="ValueA9"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA9(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="Deduction10"
                      label="Deduction10"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setDeduction10(e.target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <TextField
                      name="ValueA10"
                      label="ValueA10"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => setValueA10(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={"10px"}>
                <Grid item xs={12} align="right">
                  <Button
                    variant="contained"
                    style={margin}
                    color="primary"
                    onClick={handlesave}>
                    SAVE
                  </Button>

                  <Button
                    variant="contained"
                    style={margin}
                    color="primary"
                    onClick={handleaddEmployee}>
                    ADD EMPLOYEE
                  </Button>
                  {/* <Button
                    variant="outlined"
                    color="primary"
                    onClick={handlegroupsave}>
                    Process
                  </Button> */}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
    </Grid>
    </Box>
    </div>
    </Grid>
  );
}

export default AddInfos;

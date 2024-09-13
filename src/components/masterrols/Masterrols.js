import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import ServiceCard from "../servicecard";
import PaymBranch from "../../images/paym-branch-icon.png";
import PaymEmplo from "../../images/paym-employee-icon.png";
import PaymDep from "../../images/paym-department-icon.png";
import PaymDesig from "../../images/paym-desiganation-icon.png";

import PaymCompany from "../../images/paym-company-icon.png";
import shiftreee from "../../images/shiftrelated-icons.jpeg";
import setup from "../../images/setting-icon-png-24.jpg";
function Mastterrol() {
  const navigate = useNavigate();

  const cardsData = [
    {
      title: "Branch",
      icon: <img src={PaymBranch} width={40} height={40} />,
      onClick: () => navigate("/PaymBranchtable"),
    },
    {
      title: "Employee",
      icon: <img src={PaymEmplo} width={40} height={40} />,
      onClick: () => navigate("/PaymEmpTable"),
    },
    {
      title: "Department",
      icon: <img src={PaymDep} width={40} height={40} />,
      onClick: () => navigate("/PaymDepartmentTable"),
    },
    {
      title: "Designation",
      icon: <img src={PaymDesig} width={40} height={40} />,
      onClick: () => navigate("/PaymDesignationTable"),
    },
    {
      title: "Company",
      icon: <img src={PaymCompany} width={40} height={40} />,
      onClick: () => navigate("/PaycompanyTable"),
    },
    {
      title: "Group",
      icon: <img src={PaymDep} width={40} height={40} />,
      onClick: () => navigate("/PaymDepartmentTable"),
    },
    {
      title: "Shift Related",
      icon: <img src={shiftreee} width={40} height={40} />,
      onClick: () => navigate("/PaymDesignationTable"),
    },
    {
      title: "Earning And Deductions",
      icon: <img src={PaymCompany} width={40} height={40} />,
      onClick: () => navigate("/PaycompanyTable"),
    },
    {
      title: "Set up",
      icon: <img src={setup} width={40} height={40} />,
      onClick: () => navigate("/Setup"),
    },
  ];
  return (
    <Container>
      <Grid container spacing={2}>
        {cardsData.map((card, index) => (
          <Grid item xs={12} sm={6} md={5} lg={3} key={index}>
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

export default Mastterrol;

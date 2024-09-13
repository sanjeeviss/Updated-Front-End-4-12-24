import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { REPORTS, SAVE } from "../../serverconfiguration/controllers";
import { Save } from "@mui/icons-material";
import Sidenav from "../Home Page/Sidenav";
import Navbar from "../Home Page/Navbar";


function GroupUi() {
  const [showTextField, setShowTextField] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [Names, setGroupNames] = useState([]);
  const location = useLocation();
  const navdata1 = location.state;

  const navigate = useNavigate();
  console.log(navdata1);

  const handleMoveEmployee = () => {
    navigate('/EmployeeShift')
  }
  const handleAddButtonClick = () => {
    setShowTextField(true);
  };

  const handleAddInfos = () => {
    navigate("addinfos", { state: navdata1 });
  };

  useEffect(() => {
    async function getData() {
      const Names = await postRequest(ServerConfig.url, REPORTS, {
        query: 'select * from Group_details',
      });
      return Names;
    }

    getData().then((e) => setGroupNames(e.data));
  }, []);

  const handleSaveButtonClick = () => {
    postRequest(ServerConfig.url, SAVE, {
      query: `INSERT INTO [dbo].[Group_details]([Group_name])VALUES('${groupName}')`,
    })
      .then((response) => {
        if (response.status === 200 || response.status === "success") {
          alert("Data saved successfully!");
          window.location.reload();
        } else {
          alert("Failed to save data.");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while saving data.");
        window.location.reload();
      });
  };

  return (
    <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto", margin: "100px 50px 50px 50px"  }}>
    <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px", // Add some padding from the top if needed
    height: "100vh",
    width: "100%", // Ensure it takes full width
  }}
>
  <Box
    sx={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "20px",
      width: "800px",
      backgroundColor: "#EFEDF4",
    }}
  >
    <Grid>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Create Group Name
      </Typography>
    </Grid>

    <Grid style={{ marginTop: "40px" }}>
      <Button
        variant="outlined"
        onClick={handleAddButtonClick}
        style={{ marginBottom: "20px" }}
      >
        Add New Group
      </Button>
      <Button
        variant="outlined"
        onClick={handleAddInfos}
        style={{ marginBottom: "20px", marginLeft: "20px" }}
      >
        Add Infos
      </Button>
      <Button
        variant="outlined"
        onClick={handleMoveEmployee}
        style={{ marginBottom: "20px", marginLeft: "15px" }}
      >
        Move Employee to group
      </Button>
    </Grid>
    {showTextField && (
      <>
        <TextField
          variant="outlined"
          placeholder="Enter Group Name"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" onClick={handleSaveButtonClick}>
          Save
        </Button>

        {Names.length > 0 ? (
          <ul>
            {Names.map((Names, index) => (
              <Typography
                key={index}
                variant="h6"
                style={{ marginRight: "480px", textAlign: "left" }}
              >
                {index + 1}. {Names.Group_name}
              </Typography>
            ))}
          </ul>
        ) : (
          <Typography>No GroupName found.</Typography>
        )}
      </>
    )}
  </Box>
</Box>
</Grid>
</Box>
</div>
</Grid>
  )
}

export default GroupUi;
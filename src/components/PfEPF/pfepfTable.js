import React from "react";
import {
  TextField,
  Button,
  Card,
  Typography,
  Box,
  Grid,
  CardContent,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useEffect, useState } from "react";
import { JsonToTable } from "react-json-to-table";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest } from "../../serverconfiguration/requestcomp";
import { createSvgIcon } from "@mui/material";
import { PFEPF } from "../../serverconfiguration/controllers";
import { useNavigate } from "react-router-dom";
import ear from "../../images/Earn-Deduction-icon.png";
import TempShiftDetails from "../../images/temp-shift-detail-icon.png";
import PaymLeave from "../../images/paym-leave-icon.png";

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

const PfepfTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    getRequest(ServerConfig.url, PFEPF).then((e) => {
      setData(e.data);
    });
  }, []);

  function handleonclick() {
    navigate("/Sample19");
  }
  return (
    <div>
      {/* <JsonToTable json={data}/> */}
      {/* <Grid margin={5}><Button variant='outlined' color='success' onClick={handleonclick}>Add<PlusIcon/></Button></Grid> */}
      <Card style={{ maxWidth: "800px", margin: "0 auto" }}>
        <CardContent>
          <div>
            <Container className="background-b1">
              <Grid
                container
                direction="column"
                rowSpacing={3}
                columnSpacing={3}>
                <Grid item>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                      <img
                        src={PaymLeave}
                        width={50}
                        height={50}
                        onClick={() => navigate("/AbsentDetails")}
                      />
                      payslip
                    </Grid>
                    <Grid item xs={3} title="dash" sx={{ textAlign: "center" }}>
                      <img
                        src={ear}
                        width={50}
                        title="dashbored"
                        height={50}
                        onClick={() => navigate("")}
                      />
                      dashboared
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: "center" }}>
                      <img
                        src={TempShiftDetails}
                        width={50}
                        height={50}
                        onClick={() => navigate("")}
                      />
                      payslip
                    </Grid>
                    <Grid item xs={3} title="dash" sx={{ textAlign: "center" }}>
                      <img
                        src={ear}
                        width={50}
                        title="dashbored"
                        height={50}
                        onClick={() => navigate("")}
                      />
                      dashboared
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PfepfTable;

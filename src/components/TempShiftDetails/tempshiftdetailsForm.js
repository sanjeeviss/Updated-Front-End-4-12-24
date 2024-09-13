import { Grid,Card,
    TextField,
    Button,
    Typography,
    Box,
    CardContent
  } from '@mui/material';

  import {inputtempshiftdetailsForm} from './tempshiftdetails';

  

  export default function TempShiftDetailsForm() {

    const margin={margin:"0 5px"}
    return (
      <div className="App">
        <Grid style ={{ padding: "80px 5px0 5px" }}>
        <Card style ={{ maxWidth: 600, margin: "0 auto" ,font:'initial'}}>
        <CardContent>
        <Typography sx={{ mt: 3 }} align='center' color='primary' variant="h5">Temp Shift Details</Typography>
        <form>
          <Grid container spacing={2} columns={12} >
            {
            inputtempshiftdetailsForm.map(input=> <Grid xs={input.xs} sm={input.sm} item>
                              <TextField {...input}  InputLabelProps={{shrink:true}}/>
              </Grid>)
            }
             <Grid container spacing={1}>
             <Grid item xs={12} align="right">
              <Button type="reset" variant="contained" color="primary"style={{paddingRight:'3'}} >Reset</Button>
            <Button  type="submit" variant="contained" color="primary">Submit</Button>
              </Grid>
            </Grid>
           
          </Grid>
        </form>
        </CardContent>
        </Card>
        </Grid>
      </div>
    );
  }
  
 
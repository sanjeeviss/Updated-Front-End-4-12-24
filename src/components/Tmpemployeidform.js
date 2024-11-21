import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function YesNoSwitch() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked ? 'Yes' : 'No');
  };

  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={handleChange} />}
    
    />
  );
}

export default YesNoSwitch;

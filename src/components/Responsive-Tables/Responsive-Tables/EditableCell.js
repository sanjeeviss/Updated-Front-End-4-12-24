import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

const EditableCell = ({ id, field, value, onChange, editable }) => {
  const [inputValue, setInputValue] = useState(value);

  // Sync the local state with the passed value whenever it changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onChange(id, field, newValue);
  };

  return editable ? (
    <TextField
      value={inputValue}
      onChange={handleInputChange}
      fullWidth
    />
  ) : (
    <span>{value}</span>
  );
};

export default EditableCell;

import React, { useState, useRef } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const initialRows = [
  { id: 1, monthlyIncome: '', annualBasis: '', halfYearlyBasis: '' },
];

const SpreadGrid1 = () => {
  const [rows, setRows] = useState(initialRows);
  const [editCell, setEditCell] = useState({ id: null, column: '' });
  const [isEditable, setIsEditable] = useState(true);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const checkIfAllRowsFilled = () => {
    return rows.every(row => row.monthlyIncome && row.annualBasis && row.halfYearlyBasis);
  };

  const handleAddRow = () => {
    setRows([...rows, { id: rows.length + 1, monthlyIncome: '', annualBasis: '', halfYearlyBasis: '' }]);
    setIsEditEnabled(true); // Enable the edit button when a new row is added
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
    if (rows.length <= 1) { // Disable the edit button if there's only one row left
      setIsEditEnabled(false);
    }
  };

  const handleChange = (id, column, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [column]: value } : row));
    // Update the edit button status
    setIsEditEnabled(checkIfAllRowsFilled());
  };

  const handleClick = (id, column) => {
    if (isEditable) {
      setEditCell({ id, column });
    }
  };

  const handleBlur = () => {
    setEditCell({ id: null, column: '' });
  };

  const handleKeyPress = (e, id, column) => {
    if (e.key === 'Enter') {
      handleChange(id, column, e.target.innerText);
      handleBlur();
    }
  };

  const handleSave = () => {
    setIsEditable(false);
    setIsEditEnabled(true); // Enable the edit button after saving
  };

  const handleEdit = () => {
    setIsEditable(true);
    setIsEditEnabled(false); // Disable the edit button while editing
  };

  return (
    <div style={{ padding: 20 }}>
      <TableContainer component={Paper} style={{ maxWidth: '80%', overflowX: 'auto', margin: '0 auto' }}>
        <Table style={{ borderCollapse: 'collapse', border: '2px solid black', fontSize: '0.875rem' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}><strong>Average Monthly Income</strong></TableCell>
              <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}><strong>Annual Basis</strong></TableCell>
              <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}><strong>Half-Yearly Basis</strong></TableCell>
              <TableCell style={{ border: '2px solid black', padding: '8px' }}><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell
                  style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}
                  onClick={() => handleClick(row.id, 'monthlyIncome')}
                  contentEditable={isEditable && editCell.id === row.id && editCell.column === 'monthlyIncome'}
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, row.id, 'monthlyIncome')}
                >
                  {row.monthlyIncome || ' '}
                </TableCell>
                <TableCell
                  style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}
                  onClick={() => handleClick(row.id, 'annualBasis')}
                  contentEditable={isEditable && editCell.id === row.id && editCell.column === 'annualBasis'}
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, row.id, 'annualBasis')}
                >
                  {row.annualBasis || ' '}
                </TableCell>
                <TableCell
                  style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px' }}
                  onClick={() => handleClick(row.id, 'halfYearlyBasis')}
                  contentEditable={isEditable && editCell.id === row.id && editCell.column === 'halfYearlyBasis'}
                  suppressContentEditableWarning
                  onBlur={handleBlur}
                  onKeyPress={(e) => handleKeyPress(e, row.id, 'halfYearlyBasis')}
                >
                  {row.halfYearlyBasis || ' '}
                </TableCell>
                <TableCell style={{ border: '2px solid black', padding: '8px' }}>
                  <IconButton onClick={() => handleDeleteRow(row.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: 20, textAlign: 'right' }}>
        {isEditable ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="secondary" disabled>
            Saved
          </Button>
        )}
        <Button variant="contained" color="primary" onClick={handleAddRow} style={{ marginLeft: 10 }}>
          Add Row
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleEdit}
          disabled={!isEditEnabled || isEditable}
          style={{ marginLeft: 10 }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default SpreadGrid1;

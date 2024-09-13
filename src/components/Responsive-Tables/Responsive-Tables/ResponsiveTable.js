import React from 'react';
import { useState } from 'react';
import { Button, TableHead, Table, TableBody, TableRow, TableCell, Paper, TableContainer, IconButton, MenuItem, Menu, FormControlLabel, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const initialRows = [
    { id: 1, category: '', otFromDuration: '', otToDuration: '', otSlabDuration: '' },
];

const formatTime = (input) => {
    // Extract hours and minutes from input
    const [hours, minutes] = input.split(':').map(num => num.padStart(2, '0'));
    return `${hours || '00'}:${minutes || '00'}`;
};

const OverTime = () => {
    const [rows, setRows] = useState(initialRows);
    const [editCell, setEditCell] = useState({ id: null, column: '' });
    const [isEditable, setIsEditable] = useState(true);
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentCell, setCurrentCell] = useState({ id: null, column: '' });
    const [showCategory, setShowCategory] = useState(true);
    const [showAllEmployees, setShowAllEmployees] = useState(false);

    const categories = ['Staffs', 'Workers'];

    const checkIfAllRowsFilled = () => {
        return rows.every(row => row.category && row.otFromDuration && row.otToDuration && row.otSlabDuration);
    };

    const incrementTime = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        let newHours = hours;
        let newMinutes = minutes + 1;
    
        if (newMinutes >= 60) {
            newMinutes = 0;
            newHours += 1;
        }
    
        // Optional: Handle wrapping around the 24-hour format
        if (newHours >= 24) {
            newHours = 0;
        }
    
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    };
    
    
    

    const handleAddRow = () => {
        const lastRow = rows[rows.length - 1];
        const otToDuration = rows.length > 0 ? lastRow.otToDuration : '00:00';
    
        console.log('Last Row OT To Duration:', otToDuration); // Log the OT To Duration from the last row
    
        const otFromDuration = incrementTime(otToDuration);
    
        console.log('Calculated OT From Duration:', otFromDuration); // Log the calculated OT From Duration
    
        const newRows = [...rows, { id: rows.length + 1, category: '', otFromDuration, otToDuration: '', otSlabDuration: '' }];
        console.log('New Rows:', newRows); // Log the new rows
    
        setRows(newRows);
        setIsEditEnabled(true);
    };
    
    

    

    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
        if (rows.length <= 1) {
            setIsEditEnabled(false);
        }
    };

    const handleChange = (id, column, value) => {
        setRows(rows.map(row => row.id === id ? { ...row, [column]: value } : row));
        setIsEditEnabled(checkIfAllRowsFilled());
    };

    const handleClick = (id, column) => {
        if (isEditable) {
            setEditCell({ id, column });
            setCurrentCell({ id, column });
            setAnchorEl(null); // Close any open menu
        }
    };

    const handleMenuClick = (event, id, column) => {
        setAnchorEl(event.currentTarget);
        setCurrentCell({ id, column });
    };

    const handleMenuItemClick = (value) => {
        handleChange(currentCell.id, currentCell.column, value);
        setAnchorEl(null);
    };

    const handleBlur = (e, id, column) => {
        // Format cell value on blur
        const hours = document.getElementById(`hours-${id}-${column}`).innerText;
        const minutes = document.getElementById(`minutes-${id}-${column}`).innerText;
        const formattedValue = formatTime(`${hours}:${minutes}`);
        handleChange(id, column, formattedValue);
        setEditCell({ id: null, column: '' });
    };

    const handleKeyPress = (e, id, column) => {
        if (e.key === 'Enter') {
            // Format input and update the cell
            handleBlur(e, id, column);
        }
    };

    const handleSave = () => {
        setIsEditable(false);
        setIsEditEnabled(true);
    };

    const handleEdit = () => {
        setIsEditable(true);
        setIsEditEnabled(false);
    };

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={!showAllEmployees}
                            onChange={() => setShowAllEmployees(!showAllEmployees)}
                            color="primary"
                        />
                    }
                    label="Show Category"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={showAllEmployees}
                            onChange={() => setShowAllEmployees(!showAllEmployees)}
                            color="primary"
                        />
                    }
                    label="All Employees"
                />
            </div>

            <TableContainer component={Paper} style={{ maxWidth: '80%', overflowX: 'auto', margin: '0 auto' }}>
                <Table style={{ borderCollapse: 'collapse', border: '2px solid black', fontSize: '0.75rem' }}>
                    <TableHead>
                        <TableRow>
                            {!showAllEmployees && showCategory && (
                                <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', width: '20%', textAlign: 'center'}}>
                                    <strong>Category</strong>
                                </TableCell>
                            )}
                            <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', width: '20%', textAlign: 'center' }}>
                                <strong>OT From Duration</strong>
                            </TableCell>
                            <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', width: '20%',  textAlign: 'center' }}>
                                <strong>OT To Duration</strong>
                            </TableCell>
                            <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', width: '20%', textAlign: 'center' }}>
                                <strong>OT Slab Duration</strong>
                            </TableCell>
                            <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', width: '15%', textAlign: 'center' }}>
            <strong>OT Rate</strong>
        </TableCell>
        <TableCell style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', width: '15%', textAlign: 'center' }}>
            <strong>OT Amount</strong>
        </TableCell>
                            <TableCell style={{ border: '2px solid black', padding: '4px', width: '10%' }}>
                                <strong>Actions</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {rows.map(row => (
        <TableRow key={row.id} style={{ height: '40px' }}>
            {!showAllEmployees && showCategory && (
                <TableCell
                    style={{ border: '2px solid black', borderRight: '2px solid black', padding: '8px', textAlign: 'center' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div
                            onClick={(e) => handleMenuClick(e, row.id, 'category')}
                            style={{ flexGrow: 1 }}
                        >
                            {row.category || ' '}
                        </div>
                        <IconButton size="small" onClick={(e) => handleMenuClick(e, row.id, 'category')}>
                            <ArrowDropDownIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && currentCell.column === 'category'}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {categories.map(category => (
                            <MenuItem key={category} onClick={() => handleMenuItemClick(category)}>
                                {category}
                            </MenuItem>
                        ))}
                    </Menu>
                </TableCell>
            )}
            <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', textAlign: 'center' }}
                onClick={() => handleClick(row.id, 'otFromDuration')}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        id={`hours-${row.id}-otFromDuration`}
                        contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otFromDuration'}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(e, row.id, 'otFromDuration')}
                        onKeyPress={(e) => handleKeyPress(e, row.id, 'otFromDuration')}
                        style={{ width: '50px', height: '20px', textAlign: 'center', border: '1px solid black' }}
                    >
                        {row.otFromDuration.split(':')[0] || '00'}
                    </div>
                    <div style={{ padding: '0 2px' }}>:</div>
                    <div
                        id={`minutes-${row.id}-otFromDuration`}
                        contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otFromDuration'}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(e, row.id, 'otFromDuration')}
                        onKeyPress={(e) => handleKeyPress(e, row.id, 'otFromDuration')}
                        style={{ width: '50px', height: '20px', textAlign: 'center', border: '1px solid black' }}
                    >
                        {row.otFromDuration.split(':')[1] || '00'}
                    </div>
                </div>
            </TableCell>
            <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', textAlign: 'center' }}
                onClick={() => handleClick(row.id, 'otToDuration')}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        id={`hours-${row.id}-otToDuration`}
                        contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otToDuration'}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(e, row.id, 'otToDuration')}
                        onKeyPress={(e) => handleKeyPress(e, row.id, 'otToDuration')}
                        style={{ width: '50px', height: '20px', textAlign: 'center', border: '1px solid black' }}
                    >
                        {row.otToDuration.split(':')[0] || '00'}
                    </div>
                    <div style={{ padding: '0 2px' }}>:</div>
                    <div
                        id={`minutes-${row.id}-otToDuration`}
                        contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otToDuration'}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(e, row.id, 'otToDuration')}
                        onKeyPress={(e) => handleKeyPress(e, row.id, 'otToDuration')}
                        style={{ width: '50px', height: '20px', textAlign: 'center', border: '1px solid black' }}
                    >
                        {row.otToDuration.split(':')[1] || '00'}
                    </div>
                </div>
            </TableCell>
            <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', textAlign: 'center' }}
                onClick={() => handleClick(row.id, 'otSlabDuration')}
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        id={`hours-${row.id}-otSlabDuration`}
                        contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otSlabDuration'}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(e, row.id, 'otSlabDuration')}
                        onKeyPress={(e) => handleKeyPress(e, row.id, 'otSlabDuration')}
                        style={{ width: '50px', height: '20px', textAlign: 'center', border: '1px solid black' }}
                    >
                        {row.otSlabDuration.split(':')[0] || '00'}
                    </div>
                    <div style={{ padding: '0 2px' }}>:</div>
                    <div
                        id={`minutes-${row.id}-otSlabDuration`}
                        contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otSlabDuration'}
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlur(e, row.id, 'otSlabDuration')}
                        onKeyPress={(e) => handleKeyPress(e, row.id, 'otSlabDuration')}
                        style={{ width: '50px', height: '20px', textAlign: 'center', border: '1px solid black' }}
                    >
                        {row.otSlabDuration.split(':')[1] || '00'}
                    </div>
                </div>
            </TableCell>
            <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', textAlign: 'center' }}
                onClick={() => handleClick(row.id, 'otRate')}
            >
                <div
                    contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otRate'}
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(e, row.id, 'otRate')}
                    onKeyPress={(e) => handleKeyPress(e, row.id, 'otRate')}
                    style={{ textAlign: 'center', border: '1px solid black', padding: '4px' }}
                >
                    {row.otRate || '0.00'}
                </div>
            </TableCell>
            <TableCell
                style={{ border: '2px solid black', borderRight: '2px solid black', padding: '4px', textAlign: 'center', whiteSpace: 'nowrap' }}
                onClick={() => handleClick(row.id, 'otAmount')}
            >
                <div
                    contentEditable={isEditable && editCell.id === row.id && editCell.column === 'otAmount'}
                    suppressContentEditableWarning
                    onBlur={(e) => handleBlur(e, row.id, 'otAmount')}
                    onKeyPress={(e) => handleKeyPress(e, row.id, 'otAmount')}
                    style={{ textAlign: 'center', border: '1px solid black', padding: '4px' }}
                >
                    {row.otAmount || '0.00'}
                </div>
            </TableCell>
            <TableCell style={{ border: '2px solid black', padding: '4px' }}>
                <IconButton onClick={() => handleDeleteRow(row.id)} color="error" size="small">
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </TableCell>
        </TableRow>
    ))}
</TableBody>

                </Table>
            </TableContainer>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
                {isEditable ? (
                    <Button variant="contained" color="primary" onClick={handleSave} size='small'>
                        Save
                    </Button>
                ) : (
                    <Button variant="contained" color="secondary" disabled size='small'>
                        Saved
                    </Button>
                )}
                <Button variant="contained" color="primary" onClick={handleAddRow} style={{ marginLeft: 10 }} size='small'>
                    Add Row
                </Button>
                <Button
                    variant="outlined"
                    color="success"
                    onClick={handleEdit}
                    disabled={!isEditEnabled || isEditable}
                    style={{ marginLeft: 10 }}
                    size='small'
                >
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default OverTime;

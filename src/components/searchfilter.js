// SearchFilter.js
import React from 'react';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles'; // Import styled and alpha for styling

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px', // Adjust border radius as needed
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '500px', // Set width to 500px
//   border: '3px solid black', // Set border to solid 5px black
}));

const SearchInput = styled('input')(({ theme }) => ({
  color: 'inherit',
  padding: '10px', // Adjust padding to match your design
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create('width'),
  width: '100%',
  borderRadius: '20px', // Adjust border radius as needed
}));

function SearchFilter({ value, onChange }) {
  return (
    <Grid container justifyContent="center">
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search…"
          value={value}
          onChange={onChange}
        />
      </SearchContainer>
    </Grid>
  );
}

export default SearchFilter;

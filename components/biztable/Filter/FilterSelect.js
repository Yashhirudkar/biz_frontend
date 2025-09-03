import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function FilterSelect({ label, value, onChange, options, loading, placeholder }) {
  return (
    <FormControl fullWidth disabled={loading} size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

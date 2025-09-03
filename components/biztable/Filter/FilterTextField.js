import React from "react";
import { TextField } from "@mui/material";

export default function FilterTextField({ label, value, onChange, type = "text", loading, sx }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      disabled={loading}
      fullWidth
      size="small"
      sx={sx}
    />
  );
}

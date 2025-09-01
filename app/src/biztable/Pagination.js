"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Pagination({ page, totalPages, onPageChange, loading }) {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
      <Button
        variant="contained"
        disabled={page <= 1 || loading}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <Typography sx={{ mt: 1 }}>
        Page {page} of {totalPages}
      </Typography>
      <Button
        variant="contained"
        disabled={page >= totalPages || loading}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </Box>
  );
}

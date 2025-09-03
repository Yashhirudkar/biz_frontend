"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled component for custom scrollbar
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 570,
  "&::-webkit-scrollbar": {
    width: "10px",
    height: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "10px",
    "&:hover": {
      background: "#555",
    },
  },
  scrollbarWidth: "thin",
  scrollbarColor: "#888 #f1f1f1",
}));

// Styled component for header with gradient
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  background: "linear-gradient(to bottom, #1976d2, #1565c0)",
  color: "white",
  padding: "8px",
  fontWeight: "bold",
  fontSize: "14px",
  borderRight: "1px solid rgba(255, 255, 255, 0.1)",
  "&:last-child": {
    borderRight: "none",
  },
}));

export default function DataTable({ columns, rows, loading, page = 1, rowsPerPage = 10 }) {
  // Hide unwanted columns
  const hiddenColumns = ["id", "minEmployeeSize", "maxEmployeeSize"];
  const visibleColumns = columns.filter((col) => !hiddenColumns.includes(col.id));

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <StyledTableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {/* Serial No column */}
              <StyledTableCell>S.No</StyledTableCell>
              {visibleColumns.map((column) => (
                <StyledTableCell key={column.id} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 3 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row, idx) => (
                <TableRow
                  key={idx}
                  hover
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    },
                    "&:last-child td": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {/* Serial Number */}
                  <TableCell sx={{ padding: "8px", fontSize: "13.5px" }}>
                    {(page - 1) * rowsPerPage + idx + 1}
                  </TableCell>

                  {/* Visible columns only */}
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        padding: "8px",
                        fontSize: "13.5px",
                      }}
                    >
                      {row[column.id] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 2 }}>
                  <Box sx={{ color: "text.secondary", fontStyle: "italic", fontSize: "14px" }}>
                    No data found
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Paper>
  );
}

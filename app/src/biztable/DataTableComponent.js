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
} from "@mui/material";

export default function DataTable({ columns, rows, loading }) {
  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    minWidth: column.minWidth,
                    background: "#1976d2",
                    color: "white",
                    padding:1.3,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row, idx) => (
                <TableRow key={row.id || idx} hover>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {row[column.id] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

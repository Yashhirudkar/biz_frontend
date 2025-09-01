"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Container, Box, TablePagination } from "@mui/material";
import Filter from "./FilterComponent";
import DataTable from "./DataTableComponent";

export default function Mainpage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const limit = 7;

  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [minEmployeeSize, setMinEmployeeSize] = useState("");
  const [maxEmployeeSize, setMaxEmployeeSize] = useState("");

  const filterFields = [
    { label: "Search", value: search, setValue: setSearch },
    { label: "Industry", value: industry, setValue: setIndustry },
    { label: "Country", value: country, setValue: setCountry },
    { label: "Job Title", value: jobTitle, setValue: setJobTitle },
    { label: "Min Employee Size", value: minEmployeeSize, setValue: setMinEmployeeSize },
    { label: "Max Employee Size", value: maxEmployeeSize, setValue: setMaxEmployeeSize },
  ];

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/data",
        {
          page,
          limit,
          search: search.trim(),
          country: country.trim(),
          industry: industry.trim(),
          title: jobTitle.trim(),
          minEmployeeSize: minEmployeeSize.trim(),
          maxEmployeeSize: maxEmployeeSize.trim()
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          withCredentials: true,
        }
      );

      if (res.status === 200 && Array.isArray(res.data.data)) {
        setRows(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      } else {
        setRows([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err.message);
      setRows([]);
      setTotalPages(1);
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleApply = () => {
    setPage(1);
    fetchData();
  };

  const handleClear = () => {
    setSearch("");
    setIndustry("");
    setCountry("");
    setJobTitle("");
    setMinEmployeeSize("");
    setMaxEmployeeSize("");
    setPage(1);
    fetchData();
  };

  const columns = useMemo(() => {
    if (!rows || rows.length === 0) return [];
    return Object.keys(rows[0]).map((key) => ({
      id: key,
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      minWidth: 150,
    }));
  }, [rows]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {/* Filter */}
        <Box sx={{ mt: { xs: 2, md: 15 } }}>
          <Filter
            fields={filterFields}
            onApply={handleApply}
            onClear={handleClear}
            loading={loading}
            error={error}
          />
        </Box>

        {/* DataTable */}
        <Box sx={{ flex: 1, minWidth: 0, mt: { xs: 4, md: 12 } }}>
          <DataTable columns={columns} rows={rows} loading={loading} />

          {/* Pagination OUTSIDE table */}
          <Box display="flex" justifyContent="center" mt={1}>
            <TablePagination
              component="div"
              count={totalPages * limit} // total records
              page={page - 1} // 0-indexed
              onPageChange={(e, newPage) => setPage(newPage + 1)}
              rowsPerPage={limit}
              rowsPerPageOptions={[]} // hide rows-per-page selector
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} of ${count}`
              }
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

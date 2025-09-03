"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Box, Pagination } from "@mui/material";
import Filter from "../../components/biztable/Filter";
import DataTable from "../../components/biztable/DataTable";
import { useRouter } from "next/navigation";

export default function Mainpage() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [error, setError] = useState("");
  const limit = 10;

  // Filters
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [minEmployeeSize, setMinEmployeeSize] = useState("");
  const [maxEmployeeSize, setMaxEmployeeSize] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [filtersCollapsed, setFiltersCollapsed] = useState(false);

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const filterFields = [
    { label: "Industry", value: industry, setValue: setIndustry },
    { label: "Country", value: country, setValue: setCountry },
    { label: "Job Title", value: jobTitle, setValue: setJobTitle },
    { label: "Min Employee Size", value: minEmployeeSize, setValue: setMinEmployeeSize },
    { label: "Max Employee Size", value: maxEmployeeSize, setValue: setMaxEmployeeSize },
    { label: "First Name", value: firstName, setValue: setFirstName },
    { label: "Last Name", value: lastName, setValue: setLastName },
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
          maxEmployeeSize: maxEmployeeSize.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
          withCredentials: true,
        }
      );

      if (res.status === 200 && Array.isArray(res.data.data)) {
        setRows(res.data.data);
        setTotalPages(res.data.totalPages || 1);
        setTotalRecords(res.data.totalRecords || res.data.data.length);
      } else {
        setRows([]);
        setTotalPages(1);
        setTotalRecords(0);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        router.push("/login");
        return;
      }
      setRows([]);
      setTotalPages(1);
      setTotalRecords(0);
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
    setFirstName("");
    setLastName("");
    setPage(1);
    fetchData();
  };

  const handleCollapseChange = (collapsed) => {
    setFiltersCollapsed(collapsed);
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
    <Box sx={{ px: 2, width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* Filter */}
        <Box sx={{ mt: { xs: 2, md: 10 } }}>
          <Filter
            fields={filterFields}
            onApply={handleApply}
            onClear={handleClear}
            loading={loading}
            error={error}
            onCollapseChange={handleCollapseChange}
          />
        </Box>

        {/* DataTable */}
        <Box sx={{ flex: 1, minWidth: 0, mt: { xs: 4, md: 10 } }}>
          <DataTable
            columns={columns}
            rows={rows}
            loading={loading}
            page={page}
            rowsPerPage={10}
          />

          {/* Pagination OUTSIDE table */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={1}
            gap={1}
            mb={0}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              variant="outlined"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Alert,
  Typography,
  IconButton,
  Collapse,
  Chip,
  Divider,
  Paper,
  Fade
} from "@mui/material";
import {
  Close as CloseIcon,
  CheckBoxOutlineBlank,
  Tune as TuneIcon
} from "@mui/icons-material";
import { industryOptions, countryOptions, jobTitleOptions } from "./Filter/options";
import FilterSelect from "./Filter/FilterSelect";
import FilterTextField from "./Filter/FilterTextField";

export default function Filter({ fields = [], onApply, onClear, loading, error, onCollapseChange }) {
  const debounceRef = useRef(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Calculate active filters count
  useEffect(() => {
    const count = fields.filter(field => {
      if (field.value !== "" && field.value !== null && field.value !== undefined) {
        return true;
      }
      return false;
    }).length;
    setActiveFilters(count);
  }, [fields]);

  // Debounced auto-apply when any filter changes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      onApply();
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fields.map((f) => f.value).join("|")]);

  const toggleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 1.2,
        backgroundColor: "#fff",
        width: collapsed ? 60 : 270,
        minHeight: collapsed ? 200 : "auto",
        transition: "all 0.3s ease",
        overflow: "hidden",
        position: "relative",
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header - Always visible when not collapsed */}
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="primary">
            Filters
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {activeFilters > 0 && (
              <Chip
                label={activeFilters}
                size="small"
                color="primary"
                sx={{ mr: 1, height: 20, fontSize: "0.7rem" }}
              />
            )}

            <IconButton
              size="small"
              onClick={toggleCollapse}
              aria-label="Collapse filters"
              color="primary"
              sx={{
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {/* Company Info Section */}
        <Divider sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={600}
          >
           Company&apos;s Info
          </Typography>
        </Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Render all fields except Min/Max Employee */}
          {fields.map((field, index) => {
            if (field.label === "Min Employee Size" || field.label === "Max Employee Size" || field.label === "First Name" || field.label === "Last Name") {
              return null;
            } else if (field.label === "Industry") {
              return (
                <FilterSelect
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  options={industryOptions}
                  loading={loading}
                  placeholder="All Industries"
                />
              );
            } else if (field.label === "Country") {
              return (
                <FilterSelect
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  options={countryOptions}
                  loading={loading}
                  placeholder="All Countries"
                />
              );
            } else if (field.label === "Job Title") {
              return (
                <FilterSelect
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  options={jobTitleOptions}
                  loading={loading}
                  placeholder="All Job Titles"
                />
              );
            } else {
              return (
                <FilterTextField
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  disabled={loading}
                />
              );
            }
          })}

          {/* Min/Max Employee */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {fields
              .filter((f) => f.label === "Min Employee Size" || f.label === "Max Employee Size")
              .map((field, index) => (
                <FilterTextField
                  key={index}
                  label={field.label.replace("Employee Size", "")}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  type="number"
                  disabled={loading}
                  sx={{ flex: 1 }}
                />
              ))}
          </Box>

          {/* Personal Info Section */}
          <Divider sx={{ mt: 2, mb: 2 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontWeight={600}
            >
              Contact
            </Typography>
          </Divider>

          {/* First Name + Last Name side by side */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {fields
              .filter((f) => f.label === "First Name" || f.label === "Last Name")
              .map((field, index) => (
                <FilterTextField
                  key={index}
                  label={field.label}
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  disabled={loading}
                  sx={{ flex: 1 }}
                />
              ))}
          </Box>

          <Divider sx={{ mt: 1 }} />

          {/* Clear button only */}
          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={onClear}
              disabled={loading || activeFilters === 0}
              size="small"
              startIcon={<CheckBoxOutlineBlank />}
              sx={{ borderRadius: 2 }}
            >
              Clear
            </Button>
          </Box>

          {error && (
            <Fade in={!!error}>
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            </Fade>
          )}
        </Box>
      </Collapse>

      {/* Collapsed view with rotated title */}
      {collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 2,
            flexGrow: 1,
          }}
        >
          <IconButton
            onClick={toggleCollapse}
            aria-label="Expand filters"
            color="primary"
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <TuneIcon />
          </IconButton>

          <Typography
            variant="h6"
            fontWeight={600}
            color="primary"
            sx={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              letterSpacing: "0.1em",
            }}
          >
            FILTERS
          </Typography>

          {activeFilters > 0 && (
            <Chip
              label={activeFilters}
              size="small"
              color="primary"
              sx={{
                height: 24,
                minWidth: 24,
                fontSize: "0.75rem",
                position: "absolute",
                top: 12,
                right: 12,
              }}
            />
          )}
        </Box>
      )}
    </Paper>
  );
}

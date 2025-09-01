"use client";

import React from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const industryOptions = [
  "Automotive",
  "Building Materials",
  "Civil Engineering",
  "Construction",
  "Consumer Services",
  "Electric Power Generation",
  "Electrical/Electronic Manufacturing",
  "Environmental Services",
  "Fabricated Metal Products",
  "Holding Companies",
  "Machinery",
  "Machinery Manufacturing",
  "Manufacturing",
  "Mechanical Or Industrial Engineering",
  "Mining",
  "Mining & Metals",
  "Oil & Energy",
  "Oil & Gas",
  "Packaging & Containers",
  "Paper & Forest Products",
  "Railroad Manufacture",
  "Renewables & Environment",
  "Semiconductors",
  "Transportation/Trucking/Railroad",
  "Utilities",
];

const countryOptions = ["Mexico", "Colombia", "Argentina"];

const jobTitleOptions = [
  "Vice President Of Operations",
  "Vice President Of Delivery Operations",
  "Vice President Of Supply Chain",
  "Chief Operations Officer",
  "Senior Vice President Of Operations Finance",
  "Chief Operating Officer",
  "Vice President Of Global Operations",
  "Vice President Of Operation",
  "Vice President Of Operational Excellence",
  "Executive Vice President Of Logistics",
  "Vice President Of International Operations",
  "Vice President Of Logistics",
  "Senior Vice President Of Operations",
  "Vice President Of Global Supply Chain Management",
  "Senior Vice President Of Development Operations",
  "Vice President Of Plant Operations",
  "Vice President Of Global Logistics",
  "Vice President Operations",
  "Vice President Of Power Operations",
  "Regional Vice President Of Union Operations",
  "Senior Vice President Of Integrated Operations",
  "Vice President Of Commerical Operations",
  "Vice President Of Industrial Operations",
  "Vice President Of Electric Operations",
  "Vice President Of Gas Operations",
  "Vice President Of Construction Operations",
  "Senior Vice President Of Production Operations",
  "Vice President Of Operations Accounting",
  "Vice President Of Supply Chain Management",
  "Vice President Of Commercial Operations",
  "Vice President Of Operational Accounting And Reporting",
  "Vice President Of Operations Support",
  "Vice President Of South Region Electric Power Operations",
  "President Of Strategic Operations",
  "Vice President Of Strategic Operations",
  "Senior Vice President Of Global Supply Chain",
  "Vice President Of Americas Supply Chain",
  "Executive Vice President Of Home Building Operations",
  "Executive Vice President Of Operations",
  "Vice President Of Merchandising Operations",
  "Vice President Of Manufacturing Operations",
  "Vice President Of Supply Chain Strategy",
  "Vice President Of Global Commercial Operations",
  "Senior Vice President Of Supply Chain",
  "Senior Vice President Of Supply Chain Management",
  "Vice President Of Fleet Operations",
  "Vice President Of Transmission Operations",
  "Vice President Of Field Operations",
  "Senior Vice President Of Operations Services",
  "Vice President Of Operational Accounting",
  "Senior Vice President Of Terex Operating System",
  "Vice President Of Air Force Operations",
  "Vice President Of Southeast Operations, Ces Manager",
  "Vice President Of Operational Technologies",
  "Chief Supply Chain Officer",
  "Vice President Of Global Supply Chain",
  "Vice President Commercial Operations",
  "Vice President Regional Refinery Operations",
  "Vice President Of Refinery And Operations Accounting",
  "Vice President Of Global Agricultural Operations",
  "Vice President Of Emea Operations",
  "Senior Vice President Of Commercial Operations",
  "Vice President Of Large Business Operations",
  "Group Vice President Of Operations",
  "Vice President Of Engineering Operations",
  "Group Vice President Of Logistics And Analytics",
  "Vice President Of Global Equipment Operations",
  "Vice President Of Procurement Operations",
  "Vice President Of Integrated Supply Chain",
  "Vice President Of Operational Discipline",
  "Senior Vice President Of Logistics",
  "Vice President Of Tax Operations",
  "Regional Vice President Of Gas Operations",
  "Regional Vice President Of Psco Gas Operations",
  "Senior Vice President Of Distribution Operations"
];

export default function Filter({ fields = [], onApply, onClear, loading, error }) {
  return (
    <Box
      sx={{ minWidth: 250, display: "flex", flexDirection: "column", gap: 2 }}
    >
      {/* Render all fields except Min/Max Employee */}
      {fields.map((field, index) => {
        if (
          field.label === "Min Employee Size" ||
          field.label === "Max Employee Size"
        ) {
          return null; // handled separately below
        } else if (field.label === "Industry") {
          return (
            <FormControl key={index} fullWidth disabled={loading}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                label={field.label}
              >
                <MenuItem value="">
                  <em>All Industries</em>
                </MenuItem>
                {industryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else if (field.label === "Country") {
          return (
            <FormControl key={index} fullWidth disabled={loading}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                label={field.label}
              >
                <MenuItem value="">
                  <em>All Countries</em>
                </MenuItem>
                {countryOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else if (field.label === "Job Title") {
          return (
            <FormControl key={index} fullWidth disabled={loading}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                label={field.label}
              >
                <MenuItem value="">
                  <em>All Job Titles</em>
                </MenuItem>
                {jobTitleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        } else {
          return (
            <TextField
              key={index}
              label={field.label}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              disabled={loading}
              fullWidth
            />
          );
        }
      })}

      {/* Min/Max Employee side by side with smaller width */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {fields
          .filter(
            (f) =>
              f.label === "Min Employee Size" || f.label === "Max Employee Size"
          )
          .map((field, index) => (
            <TextField
              key={index}
              label={field.label}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              type="number"
              disabled={loading}
              sx={{ width: "120px" }} 
            />
          ))}
      </Box>

      <Button variant="contained" onClick={onApply} disabled={loading}>
        Apply
      </Button>

      <Button variant="outlined" onClick={onClear} disabled={loading}>
        Clear
      </Button>

      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}

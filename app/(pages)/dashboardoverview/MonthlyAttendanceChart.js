'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  useTheme
} from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function MonthlyAttendanceChart({ attendanceData }) {
  const theme = useTheme()

  return (
    <Card sx={{ boxShadow: theme.shadows[2], borderRadius: 2, width: '100%' }}>
      <CardHeader
        title="Monthly Attendance"
        subheader="Breakdown of student attendance"
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 'bold',
          color: theme.palette.text.primary
        }}
        subheaderTypographyProps={{
          color: theme.palette.text.secondary
        }}
      />
      <Divider />
      <CardContent sx={{ pt: 2 }}>
        <Box sx={{ height: 320, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={attendanceData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis
                dataKey="month"
                stroke={theme.palette.text.secondary}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke={theme.palette.text.secondary}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius
                }}
              />
              <Line
                type="monotone"
                dataKey="present"
                name="Present"
                stroke={theme.palette.success.main}
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: theme.palette.background.paper
                }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="absent"
                name="Absent"
                stroke={theme.palette.error.main}
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: theme.palette.background.paper
                }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts'

export default function EnrollmentFeesChart({ enrollmentFeesData }) {
  const theme = useTheme()

  return (
    <Card sx={{ boxShadow: theme.shadows[2] }}>
      <CardHeader
        title="Enrollment & Fees Trend"
        subheader="Overview of student enrollment and fees collected over time"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent sx={{ pt: 2 }}>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={enrollmentFeesData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: theme.shape.borderRadius
                }}
              />
              <Legend />
              <Bar
                dataKey="students"
                name="Students Enrolled"
                fill={theme.palette.primary.main}
                barSize={30}
                radius={[4, 4, 0, 0]}
              />
              <Area
                type="monotone"
                dataKey="fees"
                name="Fees Collected"
                stroke={theme.palette.success.main}
                fill={theme.palette.success.light}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

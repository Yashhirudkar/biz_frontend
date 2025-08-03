'use client'

import React from 'react'
import { Box, Grid, AppBar, Toolbar, Typography, Button, Divider, useTheme } from '@mui/material'
import { PersonAdd, Schedule, Add, ArrowUpward, Notifications, School, Group, AttachMoney, CheckCircle, CalendarToday, Margin } from '@mui/icons-material'
import EnrollmentFeesChart from './EnrollmentFeesChart'
import MonthlyAttendanceChart from './MonthlyAttendanceChart'
import RecentActivityTable from './RecentActivityTable'
import FeesBreakdownChart from './FeesBreakdownChart'
import UpcomingEvents from './UpcomingEvents'
import StatsCards from './StatsCards'



// Mock Data
const statsData = [
  {
    icon: <School fontSize="large" color="primary"/>,
    title: 'Total Students',
    value: '1,234',
    trend: '+20.1% from last month',
    trendColor: 'success',
  },
  {
    icon: <Group fontSize="large" color="secondary" />,
    title: 'Active Teachers',
    value: '45',
    trend: '+5% from last quarter',
    trendColor: 'success',
  },
  {
    icon: <AttachMoney fontSize="large" color="success" />,
    title: 'Fees Collected',
    value: '$12,345',
    trend: '+10% from last month',
    trendColor: 'success',
  },
  {
    icon: <CheckCircle fontSize="large" color="warning" />,
    title: 'Attendance Rate',
    value: '92.5%',
    trend: 'Consistent over last quarter',
    trendColor: 'info',
  },
]

const enrollmentFeesData = [
  { month: 'Jan', students: 186, fees: 20000 },
  { month: 'Feb', students: 305, fees: 25000 },
  { month: 'Mar', students: 237, fees: 22000 },
  { month: 'Apr', students: 73, fees: 18000 },
  { month: 'May', students: 209, fees: 27000 },
  { month: 'Jun', students: 214, fees: 30000 },
]

const attendanceData = [
  { month: 'Jan', present: 76, absent: 10 },
  { month: 'Feb', present: 45, absent: 15 },
  { month: 'Mar', present: 62, absent: 8 },
  { month: 'Apr', present: 28, absent: 12 },
  { month: 'May', present: 95, absent: 5 },
  { month: 'Jun', present: 81, absent: 9 },
]

const feesBreakdownData = [
  { name: 'Tuition Fees', value: 70000, color: 'primary' },
  { name: 'Exam Fees', value: 15000, color: 'success' },
  { name: 'Material Fees', value: 10000, color: 'secondary' },
  { name: 'Other', value: 5000, color: 'warning' },
]

const recentActivityData = [
  ['Added new student', 'Admin User', '2 mins ago'],
  ['Updated class schedule', 'Teacher A', '1 hour ago'],
  ['Processed fee payment', 'Accountant', 'Yesterday'],
  ['Uploaded study material', 'Teacher B', '2 days ago'],
  ['Scheduled parent meeting', 'Admin User', '3 days ago'],
]

const upcomingEventsData = [
  ['Parent-Teacher Meeting', 'August 15, 2025 - 10:00 AM'],
  ['Mid-Term Exams Begin', 'September 1, 2025'],
  ['Annual Sports Day', 'October 20, 2025'],
]

export default function DashboardOverview() {
  const theme = useTheme()

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="h1" fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Box>
            <Button variant="contained" startIcon={<PersonAdd />} sx={{ mr: 2 }}>
              Add Student
            </Button>
            <Button variant="outlined" startIcon={<Schedule />}>
              Schedule Class
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4, flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <StatsCards statsData={statsData} />

          {/* Monthly Attendance Chart - Full Width */}
          <Grid item xs={12} sx={{ width: '95%' }} >
            <MonthlyAttendanceChart attendanceData={attendanceData} />
          </Grid>

          {/* Enrollment Fees Chart and Fees Breakdown Chart - Side by Side */}
          <Grid item xs={12} md={6} sx={{ width: '60%' }}>
            <EnrollmentFeesChart enrollmentFeesData={enrollmentFeesData} />
          </Grid>


          <Grid item xs={12} md={6} sx={{ width: '30%' }}>
            <FeesBreakdownChart feesBreakdownData={feesBreakdownData} />
          </Grid>

          {/* Recent Activity Table and Upcoming Events - Side by Side */}
          <Grid item xs={12} md={6} sx={{ width: '55%' }}>
            <RecentActivityTable recentActivityData={recentActivityData} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ width: '40%' }}>
            <UpcomingEvents upcomingEventsData={upcomingEventsData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
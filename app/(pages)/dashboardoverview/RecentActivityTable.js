import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material'
import { Notifications } from '@mui/icons-material'

export default function RecentActivityTable({ recentActivityData }) {
  const theme = useTheme()

  return (
    <Card sx={{ boxShadow: theme.shadows[2] }}>
      <CardHeader
        title="Recent Activity Log"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
        action={
          <Button size="small" startIcon={<Notifications />}>
            View All
          </Button>
        }
      />
      <Divider />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>Action</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivityData.map(([action, user, time], i) => (
                <TableRow key={i} hover>
                  <TableCell>
                    <Typography fontWeight="medium">{action}</Typography>
                  </TableCell>
                  <TableCell>{user}</TableCell>
                  <TableCell align="right">
                    <Typography color="text.secondary">{time}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
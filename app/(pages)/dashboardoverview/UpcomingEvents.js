import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Box,
  Typography,
  Avatar,
  useTheme,
} from '@mui/material'
import { Add, CalendarToday } from '@mui/icons-material'

export default function UpcomingEvents({ upcomingEventsData }) {
  const theme = useTheme()

  return (
    <Card sx={{ boxShadow: theme.shadows[2], height: '100%' }}>
      <CardHeader
        title="Upcoming Events"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
        action={
          <Button size="small" startIcon={<Add />}>
            Add Event
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {upcomingEventsData.map(([title, date], i) => (
            <Box
              component="li"
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 3,
                '&:last-child': { mb: 0 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  mr: 2,
                  width: 40,
                  height: 40,
                }}
              >
                <CalendarToday fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {date}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
'use client'

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  useTheme,
  Tooltip
} from '@mui/material'
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from '@mui/icons-material'

export default function StatsCards({ statsData }) {
  const theme = useTheme()

  return (
    <Grid container spacing={3}>
      {statsData.map((item, i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <Card
            sx={{
              height: '100%',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.12)'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              {/* Top Section */}
              <Box display="flex" alignItems="center" justifyContent="space-between">
                {/* Icon */}
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    width: 38,
                    height: 38,
                    fontSize: '1rem',
                    mr: 2,
                    
                  }}
                >
                  {item.icon}
                </Avatar>

                {/* Title + Arrow */}
                <Box flex={1} display="flex" justifyContent="space-between" alignItems="center" gap={6}>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="500"
                  >
                    {item.title}
                  </Typography>

                  <Tooltip title={`${item.trend.replace(/[+]/, '')} from last month`} arrow>
                    <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
                      {item.trend.startsWith('+') ? (
                        <TrendingUpIcon fontSize="small" sx={{ color: '#22c55e' }} />
                      ) : (
                        <TrendingDownIcon fontSize="small" sx={{ color: '#ef4444' }} />
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              </Box>

              {/* Value and Subtitle */}
              <Typography
                variant="h5"
                fontWeight="700"
                ml={6.5}
                
                sx={{ letterSpacing: '0.5px' }}
              >
                {item.value}
              </Typography>

              {item.subtitle && (
                <Typography variant="caption" color="text.secondary">
                  {item.subtitle}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

import React from 'react'
import { Card, CardContent, CardHeader, Divider, Box, useTheme } from '@mui/material'
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

export default function FeesBreakdownChart({ feesBreakdownData }) {
  const theme = useTheme()

  return (
    <Card sx={{ boxShadow: theme.shadows[2], height: '100%' }}>
      <CardHeader
        title="Fees Breakdown"
        titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
      />
      <Divider />
      <CardContent sx={{ pt: 2 }}>
        <Box sx={{ height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: theme.shape.borderRadius,
                }}
              />
              <Pie
                data={feesBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                cornerRadius={5}
              >
                {feesBreakdownData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={theme.palette[entry.color].main}
                  />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
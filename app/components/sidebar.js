'use client'

import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ExpandLess,
  ExpandMore,
  Settings,
  Logout,
  Dashboard,
  School,
  Groups,
  MenuBook,
  EventNote,
  AttachMoney,
  Description,
  CalendarMonth,
  Campaign,
  Forum,
  History,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNavigation = [
  { title: 'Dashboard', url: '/dashboardoverview', icon: <Dashboard /> },
  { title: 'Students', url: '/students', icon: <School /> },
  { title: 'Teachers / Staff', url: '/teachers', icon: <Groups /> },
  { title: 'Classes & Subjects', url: '/classes', icon: <MenuBook /> },
  { title: 'Attendance', url: '/dashboard/attendance', icon: <EventNote /> },
  { title: 'Fees & Payments', url: '/dashboard/fees', icon: <AttachMoney /> },
  { title: 'Exams & Reports', url: '/dashboard/exams', icon: <Description /> },
  { title: 'Schedule & Calendar', url: '/dashboard/calendar', icon: <CalendarMonth /> },
  { title: 'Notices & Announcements', url: '/dashboard/notices', icon: <Campaign /> },
  { title: 'Study Material', url: '/dashboard/study-material', icon: <MenuBook /> },
  { title: 'Meetings & Communication', url: '/dashboard/meetings', icon: <Forum /> },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const isMenuOpen = Boolean(profileMenuAnchor);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 72,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 72,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          position: 'fixed',
          height: 'calc(100vh - 64px)',
          // overflow: 'auto',
          top: '73px', // Account for navbar height
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap sx={{ display: open ? 'block' : 'none' }}>
          Tusion Admin
        </Typography>
        <IconButton onClick={() => setOpen(!open)}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Box sx={{ px: 2, pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f1f1',
            borderRadius: 1,
            px: 1,
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase
            placeholder="Search..."
            fullWidth
            sx={{ fontSize: 14 }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
      </Box>

      <Divider />

      <List>
        {mainNavigation.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            href={item.url}
            selected={pathname === item.url}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              '&.Mui-selected': {
                backgroundColor: '#e0e0e0', // Highlight color for selected item
              },
              // Add hover and active styles to mimic a button
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
              cursor: 'pointer',
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {open && <ListItemText primary={item.title} />}
          </ListItem>
        ))}
      </List>

      <Divider />

      <List subheader={open && <ListItemText primary="System" sx={{ pl: 2, pt: 1 }} />}>
        <ListItem
          component={Link}
          href="/dashboard/settings"
          selected={pathname === '/dashboard/settings'}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&.Mui-selected': {
              backgroundColor: '#e0e0e0',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            cursor: 'pointer',
          }}
        >
          <ListItemIcon><Settings /></ListItemIcon>
          {open && <ListItemText primary="Settings" />}
        </ListItem>

        <ListItem
          component={Link}
          href="/dashboard/logs"
          selected={pathname === '/dashboard/logs'}
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            '&.Mui-selected': {
              backgroundColor: '#e0e0e0',
            },
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            cursor: 'pointer',
          }}
        >
          <ListItemIcon><History /></ListItemIcon>
          {open && <ListItemText primary="Logs & History" />}
        </ListItem>
      </List>

      <Box sx={{ mt: 'auto', p: 2 }}>
        {/* <ListItem button onClick={handleProfileMenuOpen}>
          <ListItemIcon>
            <Avatar src="/placeholder.svg" sx={{ width: 32, height: 32 }} />
          </ListItemIcon>
          {open && (
            <>
              <ListItemText primary="Admin User" />
              {isMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </>
          )}
        </ListItem> */}
        <Menu
          anchorEl={profileMenuAnchor}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            <Logout fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Drawer>
  );
}
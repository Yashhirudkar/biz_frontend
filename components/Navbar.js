'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Box,
  Tooltip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar({ username = 'John Doe' }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [notificationCount] = useState(3);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ✅ Logout function
  const handleLogout = () => {
    // Clear auth token or session
    localStorage.removeItem("token");  // if using JWT in localStorage
    sessionStorage.clear();           // optional: clear session storage
    document.cookie = "token=; Max-Age=0"; // if token is in cookies

    // Close menu/drawer
    handleCloseUserMenu();
    setDrawerOpen(false);

    // Redirect to login page
    router.push("/login");
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        backgroundColor: "white",
        boxShadow: "0px 4px 6px -2px rgba(0,0,0,0.1)",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Image
            src="/bizprospex.png"
            alt="Logo"
            width={120}
            height={50}
            style={{ cursor: 'pointer', height: 'auto', width: 'auto' }}
            priority
          />
        </Box>

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            {/* <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={username} src="" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography variant="h6" sx={{ p: 2 }}>
            Menu
          </Typography>
          <Divider />
          <List>
            {['Dashboard', 'Profile', 'Settings'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}

            {/* ✅ Logout in Drawer */}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

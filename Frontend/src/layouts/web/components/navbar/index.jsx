import { useState } from "react"
import * as React from 'react';
import Search from "./search"
import { NavLink } from "react-router-dom"
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { logout } from '../../../../stores/auth';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
export default function Navbar({func}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", null, { withCredentials: true });
      dispatch(logout()); 
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const PF= import.meta.env.VITE_API_IMAGE_URL
  return (
    <div className={`navbar bg-bgMain h-14 flex px-3 md:z-50 items-center ${user ? 'justify-between' : 'justify-between lg:justify-end'}`}>
      <button type="button" className="lg:hidden" onClick={func}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <Search/>
      <div>
      {user ? (
        <div className="flex">
          <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, borderRadius:2}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Typography sx={{ minWidth: 100,marginInline:1 }} className="nav-username">{user.username}</Typography>
            <Avatar sx={{ width: 32, height: 32 }} src={user.picture ? PF + user.picture : null} className="border"></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink to={`/profile/${user.username}`} className='flex items-center'>
          <Avatar src={user.picture ? PF + user.picture : null} className="border"/> Profile
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
        <NavLink to={'/settings'} className='flex items-center'>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
        </div>
      ) : (
        <NavLink to="/auth/login" className="bg-blue-900 text-white rounded-md p-2 px-5">
          Log in
        </NavLink>
      )}
        
      </div>
    </div>
  )
}

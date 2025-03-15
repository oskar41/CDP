import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Link } from 'react-router-dom';
import { Sync as SyncIcon } from '@mui/icons-material';
import { WifiTethering as WebSocketIcon } from '@mui/icons-material';

const Sidebar = () => {
    return (
        <Drawer 
            variant="permanent"
            anchor="left"
            sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    width: 250,
                },
            }}
        >
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem key="Home" disablePadding>
                            <ListItemButton 
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem key="About" disablePadding>
                            <ListItemButton 
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="XSS" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/web-workers" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem key="WebWorkers" disablePadding>
                            <ListItemButton 
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    <WorkIcon />
                                </ListItemIcon>
                                <ListItemText primary="Web Workers" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/iife" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem key="IIFE" disablePadding>
                            <ListItemButton 
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    <CodeIcon />
                                </ListItemIcon>
                                <ListItemText primary="IIFE" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/pure-functions" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem key="PureFunctions" disablePadding>
                            <ListItemButton 
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    <FunctionsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pure Functions" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/long-polling" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <SyncIcon sx={{ color: '#ffffff' }} />
                                </ListItemIcon>
                                <ListItemText primary="Long Polling" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link to="/websocket" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem disablePadding>
                            <ListItemButton
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#1976d2',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <WebSocketIcon sx={{ color: '#ffffff' }} />
                                </ListItemIcon>
                                <ListItemText primary="WebSocket" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <Divider sx={{ backgroundColor: '#ffffff' }} />
            </Box>
        </Drawer>
    );
}

export default Sidebar;
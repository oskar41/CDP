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
import { Link } from 'react-router-dom';

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
                </List>
                <Divider sx={{ backgroundColor: '#ffffff' }} />
            </Box>
        </Drawer>
    );
}

export default Sidebar;
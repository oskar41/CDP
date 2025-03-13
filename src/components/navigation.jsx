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
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (<Drawer variant="permanent"
        anchor="left">
        <Box sx={{ width: 250 }} role="presentation">
        <List>
            <Link to="/"><ListItem key="Home" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                </ListItem>
            </Link>
            <Link to="/about"><ListItem key="About" disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="XSS" />
                </ListItemButton>
                </ListItem>
            </Link>
        </List>
        <Divider />
      </Box>
      </Drawer>)
}

export default Sidebar;
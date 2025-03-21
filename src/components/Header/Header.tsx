import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    NG Posts & Users
                </Typography>

                <Button color="inherit" component={Link} to="/posts">
                    Posts
                </Button>
                <Button color="inherit" component={Link} to="/new-post">
                    Add a New Post
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    Users
                </Button>
                <Button color="inherit" component={Link} to="/new-user">
                    Add a New User
                </Button>
                <Button color="inherit" component={Link} to="/user-search">
                    Search Users
                </Button>
                <Button color="inherit" component={Link} to="/user-availability-schedule">
                    Schedule Availability
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
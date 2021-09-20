import {
    Drawer,
    Typography,
    List,
    IconButton,
    Hidden,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Avatar,
    Toolbar,
    Divider,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
    AddCircleOutlineRounded,
    SubjectRounded,
    MenuRounded,
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            width: "100%",
            flexGrow: 1,
            padding: theme.spacing(3),
            [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },

        root: {
            display: "flex",
        },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerPaper: {
            width: drawerWidth,
        },
        active: {
            background: "#f4f4f4",
        },
        title: {
            padding: theme.spacing(2),
        },
        appBar: {
            [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
                display: "none",
            },
        },
        toolBar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
    };
});

function Layout({ children }) {
    const history = useHistory();
    const location = useLocation();
    const date = new Date();
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuList = [
        {
            text: "My Notes",
            icon: <SubjectRounded color="secondary" />,
            path: "/",
        },
        {
            text: "Add Note",
            icon: <AddCircleOutlineRounded color="secondary" />,
            path: "/create",
        },
    ];

    const drawer = (
        <div>
            <div>
                <Typography className={classes.title} variant="h6">
                    {`Today is ${date.getDate()} - ${
                        date.getMonth() + 1
                    } - ${date.getFullYear()}`}
                </Typography>
            </div>
            <Divider />
            <List>
                {menuList.map((item) => (
                    <ListItem
                        button
                        key={item.path}
                        onClick={
                            mobileOpen === true
                                ? () => {
                                    history.push(item.path);
                                    handleDrawerToggle();
                                    }
                                : () => {
                                    history.push(item.path);
                                    }
                        }
                        className={
                            location.pathname === item.path
                                ? classes.active
                                : null
                        }
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        onClick={handleDrawerToggle}
                        color="inherit"
                        className={classes.menuButton}
                    >
                        <MenuRounded />
                    </IconButton>
                    <Typography className={classes.date} noWrap variant="h6">
                        Your Notes
                    </Typography>
                    <Typography>aman</Typography>
                    <Avatar
                        className={classes.avatar}
                        src={
                            "https://improveyourdrawings.com/wp-content/uploads/2019/02/Step-12-Shadows.jpg"
                        }
                    />
                </Toolbar>
            </AppBar>
            <nav>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{ paper: classes.drawerPaper }}
                        variant="permanent"
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.page}>
                <div className={classes.toolBar} />
                {children}
            </div>
        </div>
    );
}

export default Layout;

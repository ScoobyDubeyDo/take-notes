import {
    List,
    Drawer,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { AddCircleOutlineRounded, SubjectRounded } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3),
        },
        root: {
            display: "flex",
        },
        drawer: {
            width: drawerWidth,
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
            width: `calc(100% - ${drawerWidth}px)`,
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
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const date = new Date();

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

    return (
        <div className={classes.root}>
            {/* App bar */}

            <AppBar className={classes.appBar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                        {`Today is ${date.getDate()} - ${
                            date.getMonth() + 1
                        } - ${date.getFullYear()}`}
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
            {/* Side Drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div>
                    <Typography className={classes.title} variant="h5">
                        Your Notes
                    </Typography>
                </div>
                {/* List/Link */}

                <List>
                    {menuList.map((item) => (
                        <ListItem
                            button
                            key={item.path}
                            onClick={() => {
                                history.push(item.path);
                            }}
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
            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolBar}></div>
                {children}
            </div>
        </div>
    );
}

export default Layout;

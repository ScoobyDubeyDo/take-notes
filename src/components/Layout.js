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
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
    AddCircleOutlineRounded,
    SubjectRounded,
    MenuRounded,
} from "@material-ui/icons";
import { useAuth } from "../context/AuthContext";

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
        appTitle: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
        dialogAction: {
            justifyContent: "center",
            margin: 10,
        },
        dialogAvatar: {
            [theme.breakpoints.up("sm")]: {
                width: "15vw",
                height: "15vw",
            },
            width: "50vw",
            height: "50vw",
            padding: 0,
        },
        dialogAvatarInput: {
            display: "none",
        },
        dialogAvatarLabel: {
            [theme.breakpoints.up("sm")]: {
                width: "15vw",
                height: "15vw",
            },
            width: "50vw",
            height: "50vw",
            display: "block",
            margin: "0px auto",
        },
        avatarUpdating: {
            animation: "$loading 0.5s infinite",
        },
        "@keyframes loading": {
            "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
            "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
            "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
            "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
            "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
            "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
            "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
            "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
            "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
            "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
            "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
        },
    };
});

function Layout({ children }) {
    const history = useHistory();
    const location = useLocation();
    const date = new Date();
    const classes = useStyles();
    const theme = useTheme();
    const userEmailRef = useRef();
    const currentPasswordRef = useRef();
    const displayNameRef = useRef();
    const fullScreen = useMediaQuery(theme.breakpoints.up("sm"));
    const {
        logout,
        currentUser,
        getCredential,
        downloadProfilePicture,
        uploadProfilePicture,
    } = useAuth();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [profileMessage, setProfileMessage] = useState("");
    const [profileEdit, setProfileEdit] = useState(true);
    const [alertSeverity, setAlertSeverity] = useState("");
    const [switchButtons, setSwitchButtons] = useState(true);
    const [profileErrors, setProfileErrors] = useState({});
    const [avatarUpdating, setAvatarUpdating] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAlert = (severity, message) => {
        setProfileMessage(message);
        setAlertSeverity(severity);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        if (!validate()) {
            setProfileErrors({});
        }
        setProfileEdit(true);
        setSwitchButtons(true);
        handleAlert("", "");
    };

    const editProfile = () => {
        setProfileEdit(!profileEdit);
    };

    const avatarSubmit = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarUpdating(true);
            handleAlert("info", "Profile picture updating...");

            await uploadProfilePicture(
                currentUser ? currentUser.uid : null,
                file
            )
                .then(() => {
                    downloadProfilePicture(currentUser ? currentUser.uid : null)
                        .then((url) => {
                            currentUser.updateProfile({
                                photoURL: url,
                            });
                        })
                        .then(() => {
                            setAvatarUpdating(false);
                            handleAlert("success", "Profile picture updated");
                        });
                })
                .catch((err) => handleAlert("error", err.message));
        }
    };

    const reAuthenticate = (password) => {
        const credentials = getCredential(currentUser.email, password);
        return currentUser.reauthenticateWithCredential(credentials);
    };

    const validate = () => {
        let temp = {};
        temp.displayName = displayNameRef.current.value
            ? ""
            : "Provide a display name";
        temp.newEmail = /^.+@.+.\.+/.test(userEmailRef.current.value)
            ? ""
            : "Email is not valid";

        temp.currentPassword = currentPasswordRef.current.value
            ? /.{8,}$/.test(currentPasswordRef.current.value)
                ? ""
                : "Password must has atleast 8 characters"
            : "Provide a password";

        setProfileErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === "");
    };

    const formSubmission = (e) => {
        e.preventDefault();

        if (validate()) {
            if (currentPasswordRef.current.value) {
                reAuthenticate(currentPasswordRef.current.value)
                    .then(() => {
                        if (userEmailRef.current.value !== currentUser.email) {
                            currentUser
                                .verifyBeforeUpdateEmail(
                                    userEmailRef.current.value
                                )
                                .then(() => {
                                    handleAlert("info", "Check your inbox");
                                })
                                .catch((err) => {
                                    handleAlert("error", err.message);
                                });
                        }
                        if (
                            displayNameRef.current.value !==
                            currentUser.displayName
                        ) {
                            currentUser
                                .updateProfile({
                                    displayName: displayNameRef.current.value,
                                })
                                .then(() => {
                                    handleAlert(
                                        "success",
                                        "Display Name Updated"
                                    );
                                })
                                .catch((err) => {
                                    handleAlert("error", err.message);
                                });
                        } else {
                        }
                    })
                    .catch((err) => {
                        handleAlert("error", err.message);
                    });
            }
        }
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

    const userProfile = (
        <Dialog
            open={openDialog}
            fullWidth
            maxWidth="sm"
            fullScreen={!fullScreen}
            onClose={handleDialogClose}
        >
            <DialogTitle disableTypography>
                <Typography color="secondary" align="center" variant="h2">
                    Profile
                </Typography>
                {profileMessage && (
                    <Alert severity={alertSeverity}>{profileMessage}</Alert>
                )}
            </DialogTitle>
            <DialogContent>
                <input
                    accept="image/*"
                    className={classes.dialogAvatarInput}
                    id="avatarImage"
                    type="file"
                    onChange={(e) => avatarSubmit(e)}
                />
                <label
                    className={`${classes.dialogAvatarLabel} ${
                        avatarUpdating ? classes.avatarUpdating : ""
                    }`}
                    htmlFor="avatarImage"
                >
                    <IconButton
                        component="span"
                        className={classes.dialogAvatar}
                    >
                        <Avatar
                            className={classes.dialogAvatar}
                            alt={
                                currentUser &&
                                (currentUser.displayName
                                    ? currentUser.displayName
                                    : "")
                            }
                            src={currentUser ? currentUser.photoURL : ""}
                        />
                    </IconButton>
                </label>
                <form id="profileForm" onSubmit={formSubmission}>
                    <TextField
                        variant="outlined"
                        label="Display Name"
                        defaultValue={
                            currentUser &&
                            (currentUser.displayName
                                ? currentUser.displayName
                                : null)
                        }
                        inputRef={displayNameRef}
                        fullWidth
                        margin="normal"
                        disabled={profileEdit}
                        type="text"
                        {...(profileErrors.displayName && {
                            error: true,
                            helperText: profileErrors.displayName,
                        })}
                    />
                    <TextField
                        variant="outlined"
                        label="Email"
                        defaultValue={currentUser ? currentUser.email : null}
                        inputRef={userEmailRef}
                        fullWidth
                        margin="normal"
                        disabled={profileEdit}
                        type="email"
                        {...(profileErrors.newEmail && {
                            error: true,
                            helperText: profileErrors.newEmail,
                        })}
                    />
                    <Divider />
                    <TextField
                        fullWidth
                        label="Current Password"
                        variant="filled"
                        margin="normal"
                        disabled={profileEdit}
                        type="password"
                        inputRef={currentPasswordRef}
                        required
                        {...(profileErrors.currentPassword && {
                            error: true,
                            helperText: profileErrors.currentPassword,
                        })}
                    />
                </form>
            </DialogContent>

            <DialogActions className={classes.dialogAction}>
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    size={!fullScreen ? "medium" : "large"}
                >
                    <Button
                        color="secondary"
                        onClick={async () => {
                            await logout();
                            history.push("/");
                        }}
                    >
                        Log out
                    </Button>
                    {switchButtons ? (
                        <Button
                            type="submit"
                            form="profileForm"
                            onClick={() => {
                                editProfile();
                                setSwitchButtons(!switchButtons);
                            }}
                        >
                            Edit Profile
                        </Button>
                    ) : (
                        <Button
                            onClick={() => {
                                if (validate()) {
                                    editProfile();
                                    setSwitchButtons(!switchButtons);
                                }
                            }}
                        >
                            Save Profile
                        </Button>
                    )}
                    <Button onClick={handleDialogClose}>Close</Button>
                </ButtonGroup>
            </DialogActions>
        </Dialog>
    );

    if (location.pathname === "/" || location.pathname === "/create") {
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
                        <Typography
                            className={classes.appTitle}
                            noWrap
                            variant="h6"
                        >
                            {currentUser &&
                                (currentUser.displayName
                                    ? `${currentUser.displayName}'s knowtes`
                                    : "knowtes")}
                        </Typography>
                        <Avatar
                            onClick={handleDialogOpen}
                            className={classes.avatar}
                            src={currentUser ? currentUser.photoURL : ""}
                        />
                    </Toolbar>
                </AppBar>
                <nav>
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            anchor={
                                theme.direction === "rtl" ? "right" : "left"
                            }
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
                    {userProfile}
                    {children}
                </div>
            </div>
        );
    } else {
        return <>{children}</>;
    }
}

export default Layout;

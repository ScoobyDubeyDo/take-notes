import React, { useRef, useState } from "react";
import {
    Card,
    TextField,
    Typography,
    Button,
    CardContent,
    CardHeader,
    Link,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import { Link as routeLink } from "react-router-dom";

const useStyles = makeStyles({
    "mt-12": {
        marginTop: 12,
    },
    "mb-12": {
        display: "inline-block",
        marginBottom: 12,
    },
    heading: {
        fontWeight: 300,
        letterSpacing: "-0.00833em",
    },
});

function ForgotPassword() {
    const classes = useStyles();
    const theme = useTheme();
    const emailRef = useRef();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { passwordReset } = useAuth();
    const [generalError, setGeneralError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        let temp = {};
        temp.email = emailRef.current.value
            ? /^.+@.+.\.+/.test(emailRef.current.value)
                ? ""
                : "Email is not valid"
            : "Provide a Email id";

        setErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === "");
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            try {
                setSuccess("");
                setGeneralError("");
                setLoading(true);
                await passwordReset(emailRef.current.value);
                setSuccess("Password reset link send to your inbox");
            } catch (err) {
                console.log(err);
                setGeneralError(err.message);
            }

            setLoading(false);
        }
    }

    return (
        <>
            <Card align="center" elevation={3}>
                <CardContent>
                    <CardHeader
                        title="Password Reset"
                        titleTypographyProps={{
                            variant: isSmallScreen ? "h3" : "h2",
                            component: "h2",
                            className: classes.heading,
                        }}
                    />

                    {generalError && (
                        <Alert severity="error">{generalError}</Alert>
                    )}
                    {success && <Alert severity="success">{success}</Alert>}
                    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            type="email"
                            required
                            label="Email"
                            inputRef={emailRef}
                            variant="filled"
                            {...(errors.email && {
                                error: "true",
                                helperText: errors.email,
                            })}
                        />

                        <Button
                            disableElevation
                            fullWidth
                            className={classes["mt-12"]}
                            type="Submit"
                            color="secondary"
                            size="large"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading
                                ? "Resetting Password..."
                                : "Reset Password"}
                        </Button>
                    </form>
                </CardContent>
                <Link
                    to={"/login"}
                    className={classes["mb-12"]}
                    variant="body1"
                    component={routeLink}
                >
                    Login
                </Link>
            </Card>
            <Typography
                align="center"
                className={classes["mt-12"]}
                component="div"
            >
                Need an account?{" "}
                <Link to={"/signup"} component={routeLink}>
                    Sign Up
                </Link>
            </Typography>
        </>
    );
}

export default ForgotPassword;

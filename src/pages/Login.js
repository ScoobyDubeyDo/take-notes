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
import { Link as routeLink, useHistory } from "react-router-dom";

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

function Login() {
    const classes = useStyles();
    const emailRef = useRef();
    const theme = useTheme();
    const passwordRef = useRef();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { login } = useAuth();
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const validate = () => {
        let temp = {};
        temp.email = emailRef.current.value
            ? /^.+@.+.\.+/.test(emailRef.current.value)
                ? ""
                : "Email is not valid"
            : "Provide a Email id";

        temp.password = passwordRef.current.value
            ? /.{8,}$/.test(passwordRef.current.value)
                ? ""
                : "Password must has atleast 8 characters"
            : "Provide a password";

        setErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === "");
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (validate()) {
            try {
                setGeneralError("");
                setLoading(true);
                await login(emailRef.current.value, passwordRef.current.value);
                history.push("/");
            } catch (err) {
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
                        title="Log In"
                        titleTypographyProps={{
                            variant: isSmallScreen ? "h3" : "h2",
                            component: "h2",
                            className: classes.heading,
                        }}
                    />

                    {generalError && (
                        <Alert severity="error">{generalError}</Alert>
                    )}
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
                        <TextField
                            margin="normal"
                            fullWidth
                            type="password"
                            required
                            label="Password"
                            inputRef={passwordRef}
                            variant="filled"
                            {...(errors.password && {
                                error: "true",
                                helperText: errors.password,
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
                            {loading ? "Logging In..." : "Log In"}
                        </Button>
                    </form>
                </CardContent>
                <Link
                    to={"/forgot-password"}
                    className={classes["mb-12"]}
                    variant="body1"
                    component={routeLink}
                >
                    Forgot password?
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

export default Login;

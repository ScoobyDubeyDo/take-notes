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
import { makeStyles } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import { Link as routeLink, useHistory } from "react-router-dom";

const useStyles = makeStyles({
    "mt-12": {
        marginTop: 12,
    },
});

function Signup() {
    const classes = useStyles();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [errors, setErrors] = useState({});

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

        temp.passwordConfirm = passwordConfirmRef.current.value
            ? passwordConfirmRef.current.value === passwordRef.current.value
                ? ""
                : "Passwords do not match"
            : " Passwords must be confirmed";

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
                await signup(emailRef.current.value, passwordRef.current.value);
                history.push("/");
            } catch {
                setGeneralError("Failed to create an account");
            }

            setLoading(false);
        }
    }

    return (
        <>
            <Card align="center" elevation={3}>
                <CardContent>
                    <CardHeader
                        title="Sign Up"
                        titleTypographyProps={{
                            variant: "h2",
                            component: "h2",
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
                        <TextField
                            margin="normal"
                            type="password"
                            required
                            fullWidth
                            label="Confirm Password"
                            inputRef={passwordConfirmRef}
                            variant="filled"
                            {...(errors.passwordConfirm && {
                                error: "true",
                                helperText: errors.passwordConfirm,
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
                            {loading ? "signing in..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
            <Typography
                align="center"
                className={classes["mt-12"]}
                component="div"
            >
                Already have a account?{" "}
                <Link to={"/login"} component={routeLink}>
                    Log In
                </Link>
            </Typography>
        </>
    );
}

export default Signup;

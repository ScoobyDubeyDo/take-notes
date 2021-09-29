import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyle = makeStyles({
    container: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});

function CenterContainer({ children }) {
    const location = useLocation();
    const classes = useStyle();

    if (location.pathname !== "/create" && location.pathname !== "/") {
        return (
            <Container
                className={classes.container}
                maxWidth={
                    location.pathname === "/login" ||
                    location.pathname === "/forgot-password" ||
                    location.pathname === "/signup"
                        ? "sm"
                        : "md"
                }
            >
                {children}
            </Container>
        );
    } else {
        return <>{children}</>;
    }
}

export default CenterContainer;

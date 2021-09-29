import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core";
import PageNotFound from "../images/PageNotFound.png";

const useStyles = makeStyles((theme) => {
    return {
        card: { background: "#ffe4ea" },
        media: {
            maxWidth: "100%",
            [theme.breakpoints.up("sm")]: {
                height: 400,
                maxWidth: 400,
            },
        },
    };
});

function NotFound() {
    const classes = useStyles();
    return (
        <>
            <Card align="center" elevation={3} className={classes.card}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={PageNotFound}
                    alt="Page Not Found"
                />
                <CardContent>
                    <Typography variant="h2" gutterBottom>
                        A Dog Ate this Page
                    </Typography>
                    <Typography variant="body1" align="left">
                        Your dog is cute but honestly a menace. Where are my
                        shoes? Where is my graduation certificate? Where is the
                        chocolate cake I baked for my Aunt’s birthday? And why
                        did you take your dog to the vet on that same Thursday?!
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default NotFound;

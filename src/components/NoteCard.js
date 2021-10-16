import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import { DeleteRounded } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
    avatar: {
        background: (note) => {
            if (note.category === "money") {
                return green[500];
            }
            if (note.category === "todos") {
                return yellow[700];
            }
            if (note.category === "reminders") {
                return pink[500];
            }
            return blue[500];
        },
    },
});

function NoteCard({ id, note, handleDelete }) {
    const classes = useStyles(note);

    return (
        <div>
            <Card elevation={3}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton onClick={() => handleDelete(id)}>
                            <DeleteRounded />
                        </IconButton>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default NoteCard;

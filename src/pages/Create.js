import React, { useState, useRef } from "react";
import {
    Typography,
    Button,
    Container,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
    CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import app from "../firebase";

const useStyles = makeStyles({
    fields: {
        margin: "20px 0px",
        display: "block",
    },
    formControl: {
        minWidth: 120,
    },
});

function Create() {
    let classes = useStyles();
    const history = useHistory();
    const detailsRef = useRef();
    const titleRef = useRef();
    const [errors, setErrors] = useState({});
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();
    const db = app.firestore();
    const notesRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("notes");

    const validate = () => {
        let temp = {};

        temp.title = titleRef.current.value
            ? ""
            : "Enter the title of the note";

        temp.details = detailsRef.current.value
            ? ""
            : "Enter details about the note";

        temp.category = selected ? "" : "Select a category of the note";

        setErrors({
            ...temp,
        });
        return Object.values(temp).every((x) => x === "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            notesRef
                .doc()
                .set({
                    title: titleRef.current.value,
                    details: detailsRef.current.value,
                    category: selected,
                })
                .then(() => {
                    setLoading(false);
                    history.push("/");
                });
        }
    };

    return (
        <Container>
            <Typography
                variant="h6"
                component="h2"
                gutterBottom
                color="textSecondary"
            >
                Create a new note
            </Typography>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    disabled={loading}
                    inputRef={titleRef}
                    className={classes.fields}
                    variant="outlined"
                    label="Note Title"
                    fullWidth
                    required
                    {...(errors.title && {
                        error: true,
                        helperText: errors.title,
                    })}
                />

                <TextField
                    disabled={loading}
                    inputRef={detailsRef}
                    className={classes.fields}
                    variant="outlined"
                    label="Details"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    {...(errors.details && {
                        error: true,
                        helperText: errors.details,
                    })}
                />

                <FormControl
                    className={classes.fields}
                    {...(errors.category && {
                        error: true,
                    })}
                    disabled={loading}
                >
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup onChange={(e) => setSelected(e.target.value)}>
                        <FormControlLabel
                            label="Money"
                            value="money"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="Todos"
                            value="todos"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="Reminders"
                            value="reminders"
                            control={<Radio />}
                        />
                        <FormControlLabel
                            label="Work"
                            value="work"
                            control={<Radio />}
                        />
                    </RadioGroup>
                    <FormHelperText>
                        {errors.category ? errors.category : ""}
                    </FormHelperText>
                </FormControl>

                <Button
                    disabled={loading}
                    type="Submit"
                    color="secondary"
                    variant="contained"
                    endIcon={
                        loading ? (
                            <CircularProgress size={28} />
                        ) : (
                            <KeyboardArrowRight />
                        )
                    }
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default Create;

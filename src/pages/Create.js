import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    fields: {
        margin: "20px 0px",
        display: "block",
    },
});

function Create() {
    let classes = useStyles();

    const history = useHistory();
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [category, setCategory] = useState("todos");

    const handleSubmit = (e) => {
        e.preventDefault();

        setDetailsError(false);
        setTitleError(false);
        if (title === "") {
            setTitleError(true);
        }
        if (details === "") {
            setDetailsError(true);
        }
        if (title && details) {
            fetch("http://localhost:8000/notes", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ title, details, category }),
            }).then(() => history.push("/"));
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
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.fields}
                    variant="outlined"
                    label="Note Title"
                    fullWidth
                    required
                    error={titleError}
                />

                <TextField
                    onChange={(e) => setDetails(e.target.value)}
                    className={classes.fields}
                    variant="outlined"
                    label="Details"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    error={detailsError}
                />

                <FormControl className={classes.fields}>
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
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
                </FormControl>
                <Button
                    type="Submit"
                    color="secondary"
                    variant="contained"
                    endIcon={<KeyboardArrowRight />}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}

export default Create;

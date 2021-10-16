import React from "react";
import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
import { useAuth } from "../context/AuthContext";
import app from "../firebase";
import "../index.css";

function Notes() {
    const [notes, setNotes] = useState([]);
    const { currentUser } = useAuth();
    const db = app.firestore();
    const notesRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("notes");

    useEffect(() => {
        notesRef.get().then((data) => {
            setNotes(data.docs);
        });
    }, []);

    const handleDelete = async (id) => {
        await notesRef.doc(`${id}`).delete();

        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };

    const breakPoints = {
        default: 3,
        1100: 2,
        700: 1,
    };

    return (
        <Masonry
            breakpointCols={breakPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {notes.map((note) => (
                <div key={note.id}>
                    <NoteCard
                        id={note.id}
                        note={note.data()}
                        handleDelete={handleDelete}
                    />
                </div>
            ))}
        </Masonry>
    );
}

export default Notes;

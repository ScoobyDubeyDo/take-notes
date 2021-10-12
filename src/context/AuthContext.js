import React, { useContext, useEffect, useState } from "react";
import { auth, firebaseAuth, storage } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function passwordReset(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function getCredential(email, password) {
        return firebaseAuth.EmailAuthProvider.credential(email, password);
    }

    function uploadProfilePicture(uid, image) {
        return storage.ref(`users/${uid}/profile`).put(image);
    }

    function downloadProfilePicture(uid) {
        return storage.ref(`users/${uid}/profile`).getDownloadURL();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        passwordReset,
        getCredential,
        uploadProfilePicture,
        downloadProfilePicture,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RestrictedRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser !== null && currentUser.emailVerified ? (
                    <Redirect exact to="/" />
                ) : (
                    <Component {...props} />
                );
            }}
        ></Route>
    );
}

export default RestrictedRoute;

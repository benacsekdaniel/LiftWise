import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../../firebase/firebase.js";

const PrivateRoute = ({ children }) => {
    const [authUser, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message while checking auth status
    }

    return authUser ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;

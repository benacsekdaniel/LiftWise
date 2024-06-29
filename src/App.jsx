import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "./firebase/firebase.js";
import CreatePost from "./Pages/CreatePost/CreatePost.jsx";



function App() {
    const [authUser] = useAuthState(auth);

    return (
        <PageLayout>
            <Routes>
                <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={'/'} /> } />
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/' element={authUser != null ? <HomePage /> : <Navigate to={'/auth'} />} />
                <Route path='/:username' element={<ProfilePage />} />
            </Routes>

        </PageLayout>
    );
}

export default App;


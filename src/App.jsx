import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import useAuthStore from "./store/authStore.js";


function App() {
    const authUser = useAuthStore(state => state.user)
    return (
        <PageLayout>
            <Routes>
                <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={'/'} /> } />
                <Route path='/' element={authUser!=null ? <HomePage /> : <Navigate to={'/auth'}/>}/>
                {/*<Route path='/:username' element={<ProfilePage />} />*/}
            </Routes>
        </PageLayout>
    );
}

export default App;


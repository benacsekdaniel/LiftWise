import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";
import CreatePost from "./Pages/CreatePost/CreatePost.jsx";
import PrivateRoute from "./Components/AuthForm/PrivateRoute.jsx";
import {useAuthState} from "react-firebase-hooks/auth";
import authPage from "./Pages/AuthPage/AuthPage";
import ArticleSearchPage from "./Pages/ArticleSearchPage/ArticleSearchPage.jsx";
import SavedArticles from './Pages/SavedArticles/SavedArticles';
import ArticleEditing from "./Pages/ArticleEditing/ArticleEditing";

function App() {

    return (
        <PageLayout>
            <Routes>
                {/* Public route */}
                <Route path='/auth' element={ <AuthPage />} />

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <HomePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-post"
                    element={
                        <PrivateRoute>
                            <CreatePost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/search-articles"
                    element={
                        <PrivateRoute>
                            <ArticleSearchPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/:username"
                    element={
                        <PrivateRoute>
                            <ProfilePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/saved-articles"
                    element={
                        <PrivateRoute>
                            <SavedArticles />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/edit-articles"
                    element={
                        <PrivateRoute>
                            <ArticleEditing />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </PageLayout>
    );
}

export default App;

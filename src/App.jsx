import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout.jsx";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.jsx";


function App() {
  return (
    <PageLayout>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/:username' element={<ProfilePage />} />
        </Routes>
    </PageLayout>
  );
}

export default App;

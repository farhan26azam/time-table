import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {useSelector} from "react-redux";

function App() {
    // get token from local storage
    const token = localStorage.getItem('token');
    const user = useSelector(state => state.user);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import LiveStream from "./pages/LiveStream";
import Login from "./pages/Login";
import UserLogin from "./pages/Registration";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="Landing-page" element={<LandingPage />} />
                        <Route path="logs" element={<Logs />} />
                        <Route path="users" element={<Users />} />
                        <Route path="live-stream" element={<LiveStream />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="registration" element={<UserLogin />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

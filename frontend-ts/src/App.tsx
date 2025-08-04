import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import AppLayout from "./ui/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import LiveStream from "./pages/LiveStream";
import Login from "./pages/Login";
import InviteUser from "./pages/InviteUser";
import RegisterAdmin from "./pages/GetStarted";
import Admins from "./pages/Admins";
import InviteAdmin from "./pages/InviteAdmin";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 1000 * 30,
        },
        mutations: {
            retry: 0,
        },
    },
});

function App() {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <BrowserRouter>
                    <Routes>
                        <Route element={<AppLayout />}>
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="logs" element={<Logs />} />
                            <Route
                                path="live-stream"
                                element={<LiveStream />}
                            />
                            <Route path="users" element={<Users />} />
                            <Route path="admins" element={<Admins />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="profile" element={<Profile />} />
                        </Route>
                        <Route
                            index
                            element={<Navigate replace to="landingPage" />}
                        />
                        <Route path="landingPage" element={<LandingPage />} />
                        <Route path="login" element={<Login />} />
                        <Route path="get-started" element={<RegisterAdmin />} />
                        <Route
                            path="invite-admin/:token"
                            element={<InviteAdmin />}
                        />
                        <Route
                            path="invite-user/:token"
                            element={<InviteUser />}
                        />
                    </Routes>
                </BrowserRouter>
                <Toaster
                    position="top-center"
                    gutter={12}
                    containerClassName="mt-2"
                    toastOptions={{
                        success: {
                            duration: 3000,
                            className:
                                "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 font-medium px-4 py-3 rounded-xl shadow-md",
                        },
                        error: {
                            duration: 5000,
                            className:
                                "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 font-medium px-4 py-3 rounded-xl shadow-md",
                        },
                        loading: {
                            duration: 500,
                            className:
                                "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-medium px-4 py-3 rounded-xl shadow-md",
                        },
                        className:
                            "text-base max-w-lg px-6 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 rounded-lg shadow-md",
                    }}
                />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}

export default App;

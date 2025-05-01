import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import LiveStream from "./pages/LiveStream";
import Login from "./pages/Login";
import InviteUser from "./pages/InviteUser";
import RegisterAdmin from "./pages/RegisterAdmin";
import Admins from "./pages/Admins";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 1000 * 60,
        },
        mutations: {
            retry: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="logs" element={<Logs />} />
                        <Route path="users" element={<Users />} />
                        <Route path="live-stream" element={<LiveStream />} />
                        <Route path="admins" element={<Admins />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="invite/user" element={<InviteUser />} />
                    <Route path="invite/admin" element={<InviteUser />} />
                    <Route path="landingPage" element={<LandingPage />} />
                    <Route path="get-started" element={<RegisterAdmin />} />
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
                            "bg-green-100 text-green-800 font-medium px-4 py-3 rounded-xl shadow-md",
                    },
                    error: {
                        duration: 5000,
                        className:
                            "bg-red-100 text-red-800 font-medium px-4 py-3 rounded-xl shadow-md",
                    },
                    loading: {
                        duration: 1000,
                        className:
                            "bg-blue-100 text-blue-800 font-medium px-4 py-3 rounded-xl shadow-md",
                    },
                    className:
                        "text-base max-w-md px-6 py-4 bg-white text-gray-700 rounded-lg shadow-md",
                }}
            />
        </QueryClientProvider>
    );
}

export default App;

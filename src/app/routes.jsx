import LoginContainer from "../features/auth/containers/LoginContainer.jsx"
import RegisterContainer from "../features/auth/containers/RegisterContainer.jsx"
import ForgotPasswordContainer from "../features/auth/containers/ForgotPasswordContainer.jsx"
import ResetPasswordContainer from "../features/auth/containers/ResetPasswordContainer.jsx"
import Landing from "../features/landing/pages/Landing.jsx"
import Dashboard from "../features/dashboard/pages/Dashboard.jsx"
import Websites from "../features/dashboard/pages/Websites.jsx"
import Incidents from "../features/dashboard/pages/Incidents.jsx"
import Analytics from "../features/dashboard/pages/Analytics.jsx"
import Profile from "../features/dashboard/pages/Profile.jsx"
import Settings from "../features/dashboard/pages/Settings.jsx"
import DashboardLayout from "../components/layout/DashboardLayout.jsx"
import About from "../features/landing/pages/About.jsx"
import Terms from "../features/landing/pages/Terms.jsx"
import Privacy from "../features/landing/pages/Privacy.jsx"

const routes = [
    {path: "/", element: <Landing/>},
    {path: "/about", element: <About/>},
    {path: "/terms", element: <Terms/>},
    {path: "/privacy", element: <Privacy/>},
    {path: "/login", element: <LoginContainer/>, isPublicOnly: true},
    {path: "/register", element: <RegisterContainer/>, isPublicOnly: true},
    {path: "/forgot-password", element: <ForgotPasswordContainer/>, isPublicOnly: true},
    {path: "/reset-password", element: <ResetPasswordContainer/>, isPublicOnly: true},
    {
        path: "/dashboard",
        element: (
            <DashboardLayout title="Dashboard">
                <Dashboard />
            </DashboardLayout>
        ),
        isPrivate: true
    },
    {
        path: "/websites",
        element: (
            <DashboardLayout title="Websites">
                <Websites />
            </DashboardLayout>
        ),
        isPrivate: true
    },
    {
        path: "/incidents",
        element: (
            <DashboardLayout title="Incidents">
                <Incidents />
            </DashboardLayout>
        ),
        isPrivate: true
    },
    {
        path: "/analytics",
        element: (
            <DashboardLayout title="Analytics">
                <Analytics />
            </DashboardLayout>
        ),
        isPrivate: true
    },
    {
        path: "/settings",
        element: (
            <DashboardLayout title="Settings">
                <Settings />
            </DashboardLayout>
        ),
        isPrivate: true
    },
    {
        path: "/profile",
        element: (
            <DashboardLayout title="Profile">
                <Profile />
            </DashboardLayout>
        ),
        isPrivate: true
    }
]

export default routes
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../Loading";

const ProtectedLayout = ({ allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loading />;

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
};

export default ProtectedLayout;
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function PrivateRouteWrapper() {
    const { user, loading } = useAuth();
    console.log(user, loading)

    if (loading) {
        return <div>Loading ...</div>
    } else {
        return user ? <Outlet /> : <Navigate to="/auth/login" />
    }
}

export default PrivateRouteWrapper;
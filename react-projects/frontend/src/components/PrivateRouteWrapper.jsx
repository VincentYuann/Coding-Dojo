import { Outlet, Navigate } from "react-router-dom";

function PrivateRouteWrapper() {
    return <Navigate to="/auth/login" />;

    return (
        <outlet />
    )
}

export default PrivateRouteWrapper;
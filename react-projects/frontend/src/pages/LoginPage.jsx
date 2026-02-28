import { Outlet } from 'react-router-dom';

function LoginPage() {
    return (
        <div>
            <h2>Login Page</h2>
            {<Outlet />}
        </div>
    );
}

export default LoginPage;
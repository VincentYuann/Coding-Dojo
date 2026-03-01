import { Outlet } from 'react-router-dom';

function AuthPage() {
    return (
        <main>
            <div className="main-login">
                <Outlet />
            </div>

            <div>

                Login with other options? Google, email, etc.

            </div>
        </main>
    );
}

export default AuthPage;
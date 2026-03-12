import { Outlet } from 'react-router-dom';
import { GoogleAuthButton } from '../components/auth';

function AuthPage() {
    return (
        <main>
            <h1>Auth Page</h1>
            <div>
                <GoogleAuthButton />
            </div>

            <div className="main-login">
                <Outlet />
            </div>
        </main>
    );
}

export default AuthPage;
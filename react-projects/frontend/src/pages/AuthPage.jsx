import { Outlet } from 'react-router-dom';
import { GoogleAuthButton } from '../components/auth';

function AuthPage() {
    return (
        <main>
            <div>
                <GoogleAuthButton />
            </div>

            <hr />

            <div className="main-login">
                <Outlet />
            </div>
        </main>
    );
}

export default AuthPage;
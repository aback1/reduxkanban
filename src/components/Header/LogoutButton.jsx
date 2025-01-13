import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice.js';

export default function LogoutButton() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn || false);

    return isLoggedIn ? (
        <button
            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            onClick={() => dispatch(logout())}
        >
            Logout
        </button>
    ) : null;
}

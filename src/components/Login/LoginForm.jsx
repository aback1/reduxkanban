import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
    login,
    register,
    setCurrentUser,
    setUsers,
} from '../../features/auth/authSlice.js';
import { useGetUsersQuery } from '../../api/authApi.js';

export default function LoginForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [test, setTest] = useState(null);
    const { data: usersData, error, isLoading } = useGetUsersQuery();
    const dispatch = useDispatch();
    const newUserID = uuidv4();

    // Update users in Redux only if data is available
    useEffect(() => {
        if (usersData) {
            dispatch(setUsers(usersData));
            setTest(usersData);
        }
    }, [usersData, dispatch]);

    // Select users from the Redux store
    const users = useSelector((state) => state.auth.users || []);

    const handleLogin = (e) => {
        if (!users || !Array.isArray(users)) {
            console.error('Users data is not available.');
            alert('Error loading user data. Please try again later.');
            return;
        }

        e.preventDefault();
        const user = test.find(
            (u) => u.name.toLowerCase() === userName.toLowerCase()
        );

        if (user) {
            if (user.password === password) {
                dispatch(
                    login({
                        name: userName,
                        password: password,
                        isLoggedIn: true,
                    })
                );
                dispatch(setCurrentUser(user.id));
            } else {
                alert('Invalid password');
            }
        } else {
            alert('User not found');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const userExists = users.find(
            (user) => user.name.toLowerCase() === userName.toLowerCase()
        );

        if (userExists) {
            alert('User already exists');
        } else {
            const newUser = {
                id: newUserID,
                name: userName,
                password: password,
                isLoggedIn: true,
            };
            fetch('http://localhost:9000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
                .then((response) => response.json())
                .then((data) => {
                    dispatch(register(data));
                })
                .catch((error) => {
                    console.error('Error registering user:', error);
                });
            dispatch(setCurrentUser(newUserID));
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users: {error.message}</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-900">
            <div className="bg-blue-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full p-2 border border-gray-300 rounded text-gray-800"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded text-gray-800"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-4"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/Login/LoginForm.jsx';
import Header from '../components/Header/Header.jsx';
import Board from '../components/Board/Board.jsx';
import TaskModal from '../components/TaskModal/TaskModal.jsx';
import { setShowModal } from '../features/tasks/tasksSlice.js';

export default function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const showModal = useSelector((state) => state.tasks.showModal);
    const dispatch = useDispatch();

    const handleShowTaskModal = (e) => {
        e.preventDefault();
        dispatch(setShowModal((prev) => !prev));
    };

    return (
        <Router>
            <div>
                {isLoggedIn && <Header />}
                {isLoggedIn && (
                    <>
                        {!showModal && (
                            <button
                                type="button"
                                className="fixed top-4 right-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 z-50"
                                onClick={handleShowTaskModal}
                            >
                                Open Task Modal
                            </button>
                        )}
                        {showModal && <TaskModal />}
                    </>
                )}
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/board" />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/board"
                        element={
                            isLoggedIn ? <Board /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/board" />
                            ) : (
                                <LoginForm />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

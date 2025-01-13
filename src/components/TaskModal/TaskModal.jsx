import { useSelector } from 'react-redux';
import TaskModalUser from './TaskModalUser.jsx';
import { useDispatch } from 'react-redux';
import { setShowModal } from '../../features/tasks/tasksSlice.js';

export default function TaskModal() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const users = useSelector((state) => state.auth.users || []);
    const otherUsers = users.filter((user) => user.id !== currentUser);
    const dispatch = useDispatch();
    const showModal = useSelector((state) => state.tasks.showModal);

    const handleShowTaskModal = (e) => {
        e.preventDefault();
        dispatch(setShowModal(false));
    };

    return (
        <>
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-blue-700 p-4 rounded-l-lg border-l-2 border-gray-500 shadow-lg overflow-y-auto md:w-72 lg:w-80 transition-transform transform ${showModal ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">
                        Other Boards
                    </h2>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={handleShowTaskModal}
                    >
                        Close Task Modal
                    </button>
                </div>
                {showModal &&
                    otherUsers.map((user) => (
                        <TaskModalUser key={user.id} user={user} />
                    ))}
            </aside>
        </>
    );
}

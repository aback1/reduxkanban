import UserIcon from './UserIcon.jsx';
import TaskModalAddTaskForm from './TaskModalAddTaskForm.jsx';
import { useGetTasksByUserIDQuery } from '../../api/tasksApi.js';
import { useState, useEffect } from 'react';

export default function TaskModalUser({ user }) {
    const [showAddTask, setShowAddTask] = useState(false);

    // Fetch tasks for the user
    const {
        data: tasks,
        isLoading,
        error,
    } = useGetTasksByUserIDQuery({ userID: user.id });

    const handleShowAddTask = (e) => {
        e.preventDefault();
        setShowAddTask((prevState) => !prevState);
    };

    // Group tasks by their statuses
    const getTaskCountsByStatus = (tasks) => {
        return tasks?.reduce(
            (acc, task) => {
                acc[task.status] = (acc[task.status] || 0) + 1;
                return acc;
            },
            { Incoming: 0, Working: 0, Done: 0 } // Ensure all statuses are initialized
        );
    };

    const taskCounts = getTaskCountsByStatus(tasks);

    if (isLoading) {
        return <p>Loading tasks...</p>;
    }

    if (error) {
        return <p>Error loading tasks: {error.message}</p>;
    }

    return (
        <div
            key={user.id}
            className="mb-4 p-4 border border-gray-300 rounded-lg bg-blue-600 shadow-md"
        >
            <p className="text-white text-lg font-semibold">{user.name}</p>
            <UserIcon />
            <table className="table-auto border-collapse w-full text-white mt-4 rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-blue-700">
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-blue-500 hover:bg-blue-600">
                        <td className="border px-4 py-2">Incoming</td>
                        <td className="border px-4 py-2">
                            {taskCounts.Incoming}
                        </td>
                    </tr>
                    <tr className="bg-blue-500 hover:bg-blue-600">
                        <td className="border px-4 py-2">Working</td>
                        <td className="border px-4 py-2">
                            {taskCounts.Working}
                        </td>
                    </tr>
                    <tr className="bg-blue-500 hover:bg-blue-600">
                        <td className="border px-4 py-2">Done</td>
                        <td className="border px-4 py-2">{taskCounts.Done}</td>
                    </tr>
                </tbody>
            </table>
            <button
                onClick={(e) => handleShowAddTask(e)}
                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            >
                Add Task
            </button>
            {showAddTask && <TaskModalAddTaskForm user={user} />}
        </div>
    );
}

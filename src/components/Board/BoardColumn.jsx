import BoardTask from './BoardTask.jsx';
import BoardAddTaskForm from './BoardAddTaskForm.jsx';
import { useState } from 'react';

export default function BoardColumn({ tasks, status }) {
    const [addTaskButtonClicked, setAddTaskButtonClicked] = useState(false);

    function handleAddTaskButtonClick() {
        setAddTaskButtonClicked((prev) => !prev);
    }

    console.log(tasks);

    return (
        <div
            key={status}
            className="bg-blue-800 p-4 rounded-lg shadow-lg text-white"
        >
            <h2 className="text-xl font-bold mb-4">{status.toString()}</h2>
            {tasks.map((task) => (
                <BoardTask key={task.id} task={task} status={status} />
            ))}
            {status === 'Incoming' && (
                <button
                    onClick={handleAddTaskButtonClick}
                    className="mb-20 inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                        ></path>
                    </svg>
                </button>
            )}
            {addTaskButtonClicked && <BoardAddTaskForm />}
        </div>
    );
}

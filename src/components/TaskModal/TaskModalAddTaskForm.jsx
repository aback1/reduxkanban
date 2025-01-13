import { useState } from 'react';
import { useAddTaskToUserMutation } from '../../api/tasksApi.js';
import { v4 as uuidv4 } from 'uuid';

export default function TaskModalAddTaskForm({ user }) {
    const [addTask] = useAddTaskToUserMutation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const newNoteId = uuidv4();

    const handleAddTask = async () => {
        const newTask = {
            id: newNoteId,
            userID: user.id,
            status: 'Incoming',
            title: title,
            description: description,
            body: body,
        };

        try {
            await addTask({ newTask }).unwrap();
            setTitle('');
            setDescription('');
            setBody('');
        } catch (error) {
            console.log(error);
        }
    };

    function handleBodyChange(e) {
        setBody(e.target.value);
    }

    return (
        <>
            <form className="bg-blue-700 p-4 rounded-lg shadow-lg text-white mt-200">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 bg-blue-600 border border-blue-500 rounded-lg text-white"
                />{' '}
                <input
                    type="text"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 bg-blue-600 border border-blue-500 rounded-lg text-white"
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={handleBodyChange}
                    rows="4"
                    className="w-full p-2 mb-4 bg-blue-600 border border-blue-500 rounded-lg text-white"
                />
                <button
                    type="button"
                    className="w-full p-2 bg-blue-500 text-white rounded-full hover:bg-indigo-800 transition-colors duration-150"
                    onClick={handleAddTask}
                >
                    Add Note
                </button>
            </form>
        </>
    );
}

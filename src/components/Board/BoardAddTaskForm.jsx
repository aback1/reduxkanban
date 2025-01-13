import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { useAddTaskToUserMutation } from '../../api/tasksApi.js';

export default function BoardAddTaskForm() {
    const newNoteID = uuidv4();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const currentUserID = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();

    const [addTask] = useAddTaskToUserMutation();

    const handleBodyChange = (event) => {
        const newBody = event.target.value;
        setBody(newBody);
    };

    const handleAddTask = async () => {
        const newTask = {
            userID: currentUserID,
            status: 'Incoming',
            id: newNoteID,
            title: title,
            description: description,
            body: body,
        };

        try {
            await addTask({ newTask }).unwrap();
            setTitle('');
            setBody('');
            setDescription('');
        } catch (error) {
            console.error('Error: Task could not be added', error);
        }
    };

    return (
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
    );
}

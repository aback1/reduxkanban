import { useSetTaskStatusMutation } from '../../api/tasksApi.js';
import { useDeleteTaskFromUserMutation } from '../../api/tasksApi.js';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function BoardTask({ task, status }) {
    const currentUserID = useSelector((state) => state.auth.currentUser);
    const [setStatus] = useSetTaskStatusMutation();
    const [deleteTask] = useDeleteTaskFromUserMutation();
    const [showBody, setshowBody] = useState(false);

    const handleShowBody = (e) => {
        e.preventDefault();
        setshowBody((prev) => !prev);
    };

    const handleDeleteTask = async () => {
        try {
            await deleteTask({
                id: task.id,
            }).unwrap();
        } catch (error) {
            console.error('Task could not be deleted', error);
        }
    };

    const handleSetStatus = async (newStatus) => {
        try {
            // Set the task status to the new status
            await setStatus({
                id: task.id,
                userID: currentUserID,
                status: newStatus,
            }).unwrap();
        } catch (error) {
            console.error('Error: Task could not be processed', error);
        }
    };

    return (
        <div className="mb-7 p-5 border border-gray-300 rounded bg-blue-700">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-gray-300">{task.description}</p>
            {showBody && (
                <>
                    <p>{task.body}</p>
                    <button onClick={handleShowBody}>Hide task</button>
                </>
            )}
            {!showBody && <button onClick={handleShowBody}>Show task</button>}
            <br />
            {status === 'Incoming' && (
                <button onClick={() => handleSetStatus('Working')}>➡️</button>
            )}
            {status === 'Working' && (
                <>
                    <button onClick={() => handleSetStatus('Incoming')}>
                        ⬅️
                    </button>
                    <button onClick={() => handleSetStatus('Done')}>➡️</button>
                </>
            )}
            {status === 'Done' && (
                <button onClick={() => handleDeleteTask()}>❌</button>
            )}
        </div>
    );
}

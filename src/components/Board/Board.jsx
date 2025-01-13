import { useDispatch, useSelector } from 'react-redux';
import BoardColumn from './BoardColumn';
import { useGetTasksByUserIDQuery } from '../../api/tasksApi.js';

export default function Board() {
    const currentUserID = useSelector((state) => state.auth.currentUser);
    const {
        data: tasks,
        isLoading,
        error,
    } = useGetTasksByUserIDQuery({
        userID: currentUserID,
    });

    const statuses = ['Incoming', 'Working', 'Done'];

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="flex justify-center min-h-screen bg-blue-900 p-4">
            <div className="grid grid-cols-3 gap-4 w-full max-w-6xl">
                {statuses.map((status) => (
                    <BoardColumn
                        key={status}
                        status={status}
                        tasks={
                            tasks?.filter((task) => task.status === status) ||
                            []
                        }
                    />
                ))}
            </div>
        </div>
    );
}

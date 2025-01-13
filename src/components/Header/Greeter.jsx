import { useSelector } from 'react-redux';

export default function Greeter() {
    const currentUserID = useSelector(
        (state) => state.auth.currentUser || null
    );

    const users = useSelector((state) => state.auth.users || []);

    const currentUserName = users.find(
        (current) => current.id === currentUserID
    );

    return <h2 className="text-2xl">Hello {currentUserName.name}!</h2>;
}

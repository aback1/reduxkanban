import LogoutButton from './LogoutButton';
import Logo from './Logo';
import Greeter from './Greeter.jsx';

export default function Header() {
    return (
        <header className="flex items-center justify-between bg-blue-900 p-4 text-white shadow-md">
            <div className="flex items-center">
                <Logo />
                <p className="ml-40 mr-40 text-4xl font-semibold">
                    Your React Kanban App 📖
                </p>
                <div className="mr-40">
                    <Greeter />
                </div>
                <LogoutButton />
            </div>
        </header>
    );
}

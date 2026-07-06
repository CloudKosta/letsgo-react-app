import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Calendar, ClipboardList, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
    path: string;
    label: string;
    Icon: LucideIcon;
}

const navItems: NavItem[] = [
    { path: '/', label: '홈', Icon: Home },
    { path: '/cart', label: '카트', Icon: ShoppingCart },
    { path: '/mySchedule', label: '내일정', Icon: Calendar },
    { path: '/postSchedule', label: '일정게시판', Icon: ClipboardList },
    { path: '/chat', label: '챗봇', Icon: MessageCircle },
];

function Navbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-white border-t border-gray-200">
            {navItems.map(({ path, label, Icon }) => (
                <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                        `flex h-full flex-1 min-w-0 flex-col items-center justify-center gap-1 text-center text-xs ${isActive ? 'text-black' : 'text-gray-400'
                        }`
                    }
                >
                    <Icon className="h-6 w-6 shrink-0" />
                    <span className="w-full whitespace-normal break-keep leading-tight">{label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

export default Navbar;

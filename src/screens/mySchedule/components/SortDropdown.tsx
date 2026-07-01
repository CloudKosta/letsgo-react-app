import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './SortDropdown.module.css';

export interface SortOption {
    key: string;
    label: string;
    field: 'date' | 'name';
    asc: boolean;
}

export const sortOptions: SortOption[] = [
    { key: 'date-desc', label: '날짜 내림차순', field: 'date', asc: false },
    { key: 'date-asc', label: '날짜 오름차순', field: 'date', asc: true },
    { key: 'name-desc', label: '제목 내림차순', field: 'name', asc: false },
    { key: 'name-asc', label: '제목 오름차순', field: 'name', asc: true },
];

interface SortDropdownProps {
    activeSort: SortOption;
    onSortChange: (option: SortOption) => void;
}

function SortDropdown({ activeSort, onSortChange }: SortDropdownProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={ref}>
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className={styles.trigger}
                >
                    {activeSort.label}
                    <ChevronDown className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
                </button>

                {open && (
                    <div className={styles.menu}>
                        {sortOptions.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => {
                                    onSortChange(option);
                                    setOpen(false);
                                }}
                                className={`${styles.menuItem} ${activeSort.key === option.key ? styles.menuItemActive : ''}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SortDropdown;

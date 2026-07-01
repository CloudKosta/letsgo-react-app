import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Share2, User, ChevronDown } from 'lucide-react';
import { mockSchedules } from '../../data/mockSchedules';
import type { Schedule } from '../../data/mockSchedules';

type TabType = 'all' | 'shared';

interface SortOption {
    key: string;
    label: string;
    field: 'date' | 'name';
    asc: boolean;
}

const sortOptions: SortOption[] = [
    { key: 'date-desc', label: '날짜 내림차순', field: 'date', asc: false },
    { key: 'date-asc', label: '날짜 오름차순', field: 'date', asc: true },
    { key: 'name-desc', label: '제목 내림차순', field: 'name', asc: false },
    { key: 'name-asc', label: '제목 오름차순', field: 'name', asc: true },
];

function MySchedulePage() {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [activeSort, setActiveSort] = useState<SortOption>(sortOptions[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = activeTab === 'shared'
        ? mockSchedules.filter((s) => s.isShared)
        : mockSchedules;

    const sorted = [...filtered].sort((a, b) => {
        let cmp = 0;
        if (activeSort.field === 'date') cmp = a.date.localeCompare(b.date);
        else if (activeSort.field === 'name') cmp = a.title.localeCompare(b.title);
        return activeSort.asc ? cmp : -cmp;
    });

    return (
        <div className="flex flex-col min-h-0 flex-1">
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    내 일정목록
                </h1>
                <button
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-105 transition-transform"
                    aria-label="프로필"
                >
                    <User className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="px-5 pb-3">
                <div className="flex bg-gray-100 rounded-full p-1">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                            activeTab === 'all'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        전체 일정
                    </button>
                    <button
                        onClick={() => setActiveTab('shared')}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                            activeTab === 'shared'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        공유된 일정
                    </button>
                </div>
            </div>

            <div className="px-5 pb-3 flex justify-end">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full border border-gray-200 bg-white text-gray-700 hover:border-gray-400 transition-all duration-200"
                    >
                        {activeSort.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-10">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.key}
                                    onClick={() => {
                                        setActiveSort(option);
                                        setDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${
                                        activeSort.key === option.key
                                            ? 'bg-gray-50 text-gray-900 font-semibold'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3">
                {sorted.map((schedule) => (
                    <ScheduleCard key={schedule.id} schedule={schedule} />
                ))}

                {sorted.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <Calendar className="w-12 h-12 mb-3 opacity-50" />
                        <p className="text-sm font-medium">일정이 없습니다</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function ScheduleCard({ schedule }: { schedule: Schedule }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group">
            <div className="flex items-start justify-between mb-2.5">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {schedule.title}
                </h3>
                {schedule.isShared && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-semibold rounded-full shrink-0 ml-2">
                        <Share2 className="w-3 h-3" />
                        공유됨
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3 mb-3 text-gray-500 text-xs">
                <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {schedule.date}
                </span>
                <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {schedule.placeCount}곳
                </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
                {schedule.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default MySchedulePage;

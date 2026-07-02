import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

function CalendarButton() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>();

    return (
        <div>
            <button onClick={() => setShowCalendar(!showCalendar)}>
                📅 {selectedDate ? selectedDate.toLocaleDateString() : '날짜 선택'}
            </button>

            {showCalendar && (
                <div className="absolute z-50 ...">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date);
                            setShowCalendar(false); // 선택 후 닫기
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default CalendarButton;

import { Routes, Route, useMatch } from 'react-router-dom';
import { mockSchedules } from '../../data/mockSchedules';
import DetailHeader from './details/components/DetailHeader';
import MyScheduleList from './MyScheduleList';
import MyScheduleDetail from './details/MyScheduleDetail';

function MyScheduleLayout() {
    const match = useMatch('/mySchedule/:id');

    const schedule = match
        ? mockSchedules.find((s) => s.myScheduleId === Number(match.params.id))
        : undefined;

    return (
        <>
            {match && <DetailHeader schedule={schedule} />}
            <Routes>
                <Route path="/" element={<MyScheduleList />} />
                <Route path="/:id" element={<MyScheduleDetail schedule={schedule} />} />
            </Routes>
        </>
    );
}

export default MyScheduleLayout;

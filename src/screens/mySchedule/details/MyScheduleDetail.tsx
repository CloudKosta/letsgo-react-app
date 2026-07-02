import { useState } from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import type { MySchedule, MyScheduleDetail as MyScheduleDetailType } from '../../../types';
import DetailTab from './components/DetailTab';
import type { DetailTabType } from './components/DetailTab';
import RouteMap from './components/RouteMap';
import PlaceList from './components/PlaceList';
import styles from './MyScheduleDetail.module.css';

interface MyScheduleDetailProps {
    schedule?: MySchedule;
    details?: MyScheduleDetailType[];
}

function MyScheduleDetail({ schedule, details = [] }: MyScheduleDetailProps) {
    const [activeTab, setActiveTab] = useState<DetailTabType>('schedule');

    if (!schedule) {
        return <div className={styles.notFound}>일정을 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.dateRow}>
                <span className={styles.date}>
                    <Calendar className={styles.dateIcon} />
                    {schedule.startAt}
                </span>
                <button className={styles.deleteBtn}>
                    <Trash2 className={styles.deleteIcon} />
                    삭제하기
                </button>
            </div>

            <DetailTab activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={styles.content}>
                {activeTab === 'schedule' && (
                    <div className={styles.section}>
                        <RouteMap places={details} />
                        <PlaceList places={details} />
                    </div>
                )}

                {activeTab === 'budget' && (
                    <ul className={styles.infoList}>
                        {details.map((d) => (
                            <li key={d.visitId} className={styles.infoItem}>
                                <span className={styles.infoTitle}>{d.title}</span>
                                <span className={styles.infoText}>{d.budgetDetail}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === 'todo' && (
                    <ul className={styles.infoList}>
                        {details.map((d) => (
                            <li key={d.visitId} className={styles.infoItem}>
                                <span className={styles.infoTitle}>{d.title}</span>
                                <span className={styles.infoText}>{d.todoDetail}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {activeTab === 'share' && (
                    <div className={styles.sharePanel}>
                        {schedule.isShared
                            ? '이 일정은 공유되고 있습니다.'
                            : '아직 공유되지 않은 일정입니다.'}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyScheduleDetail;

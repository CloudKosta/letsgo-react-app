import { Calendar, MapPin, Users, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MySchedule } from '../../../types';
import { useAuthStore } from '../../../store/authStore';
import styles from './css/ScheduleCard.module.css';

interface ScheduleCardProps {
    schedule: MySchedule;
}

function ScheduleCard({ schedule }: ScheduleCardProps) {
    const navigate = useNavigate();
    const myUserId = useAuthStore((s) => s.user?.userID);
    // ownerId가 있고 내 id와 확실히 다를 때만 '공유받음'으로 본다.
    // (ownerId가 비어있으면 판단 불가 → 기존 '동반자 추가됨' 로직으로 폴백)
    const isReceived = !!schedule.ownerId && !!myUserId && schedule.ownerId !== myUserId;

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/mySchedule/${schedule.myScheduleId}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.header}>
                <h3 className={styles.title}>{schedule.myScheduleTitle}</h3>
                {isReceived ? (
                    <span className={styles.receivedBadge}>
                        <UserCheck className={styles.sharedIcon} />
                        공유받음
                    </span>
                ) : schedule.isShared ? (
                    <span className={styles.sharedBadge}>
                        <Users className={styles.sharedIcon} />
                        동반자 추가됨
                    </span>
                ) : null}
            </div>

            <div className={styles.meta}>
                <span className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    {schedule.startAt}
                </span>
                <span className={styles.metaItem}>
                    <MapPin className={styles.metaIcon} />
                    {schedule.placeCount}곳
                </span>
            </div>

            <div className={styles.tagList}>
                {schedule.placeTitle.map((tag) => (
                    <span key={tag} className={styles.tag}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ScheduleCard;


import { Calendar, MapPin, Share2 } from 'lucide-react';
import type { Schedule } from '../../../data/mockSchedules';
import styles from './ScheduleCard.module.css';

interface ScheduleCardProps {
    schedule: Schedule;
}

function ScheduleCard({ schedule }: ScheduleCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{schedule.title}</h3>
                {schedule.isShared && (
                    <span className={styles.sharedBadge}>
                        <Share2 className={styles.sharedIcon} />
                        공유됨
                    </span>
                )}
            </div>

            <div className={styles.meta}>
                <span className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    {schedule.date}
                </span>
                <span className={styles.metaItem}>
                    <MapPin className={styles.metaIcon} />
                    {schedule.placeCount}곳
                </span>
            </div>

            <div className={styles.tagList}>
                {schedule.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ScheduleCard;

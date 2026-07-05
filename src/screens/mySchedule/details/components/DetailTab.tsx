import styles from './css/DetailTab.module.css';

type DetailTabType = 'schedule' | 'budget' | 'todo' | 'share';

const tabs: { key: DetailTabType; label: string }[] = [
    { key: 'schedule', label: '일정' },
    { key: 'budget', label: '예산' },
    { key: 'todo', label: 'TO-DO' },
    { key: 'share', label: '공유' },
];

interface DetailTabProps {
    activeTab: DetailTabType;
    onTabChange: (tab: DetailTabType) => void;
    isOwner?: boolean;
}

function DetailTab({ activeTab, onTabChange, isOwner = false }: DetailTabProps) {
    // 공유받은 일정(비소유자)에서는 공유 탭을 노출하지 않는다.
    const visibleTabs = isOwner ? tabs : tabs.filter((tab) => tab.key !== 'share');

    return (
        <div className={styles.wrapper}>
            {visibleTabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export type { DetailTabType };
export default DetailTab;

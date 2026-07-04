import "./css/PostScheduleDetailTab.css";

export type PostScheduleDetailTabType = "schedule" | "budget" | "todo";

const tabs: { key: PostScheduleDetailTabType; label: string }[] = [
  { key: "schedule", label: "일정" },
  { key: "budget", label: "예산" },
  { key: "todo", label: "TO-DO" },
];

interface PostScheduleDetailTabProps {
  activeTab: PostScheduleDetailTabType;
  onTabChange: (tab: PostScheduleDetailTabType) => void;
}

export default function PostScheduleDetailTab({ activeTab, onTabChange }: PostScheduleDetailTabProps) {
  return (
    <div className="post-schedule-detail-tab">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={`post-schedule-detail-tab-button ${
            activeTab === tab.key ? "post-schedule-detail-tab-button-active" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

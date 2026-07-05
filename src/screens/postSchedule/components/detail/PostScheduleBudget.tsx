import "./css/PostScheduleReadonlyPanel.css";

interface PostScheduleBudgetProps {
  budgetDetail?: string;
}

export default function PostScheduleBudget({ budgetDetail = "" }: PostScheduleBudgetProps) {
  if (!budgetDetail.trim()) {
    return (
      <div className="post-schedule-readonly-empty">예산 내역이 없습니다.</div>
    );
  }

  return (
    <section className="post-schedule-readonly-panel">
      <div className="post-schedule-readonly-content">
        {budgetDetail}
      </div>
    </section>
  );
}

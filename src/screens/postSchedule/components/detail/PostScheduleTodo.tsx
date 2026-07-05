import "./css/PostScheduleReadonlyPanel.css";

interface PostScheduleTodoProps {
  todoDetail?: string;
}

export default function PostScheduleTodo({ todoDetail = "" }: PostScheduleTodoProps) {
  if (!todoDetail.trim()) {
    return (
      <div className="post-schedule-readonly-empty">TO-DO가 없습니다.</div>
    );
  }

  return (
    <section className="post-schedule-readonly-panel">
      <div className="post-schedule-readonly-content">
        {todoDetail}
      </div>
    </section>
  );
}

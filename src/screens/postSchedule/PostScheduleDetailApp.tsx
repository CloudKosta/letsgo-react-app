import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PostScheduleBudget from "./components/detail/PostScheduleBudget";
import PostScheduleDetailTab from "./components/detail/PostScheduleDetailTab";
import type { PostScheduleDetailTabType } from "./components/detail/PostScheduleDetailTab";
import PostScheduleSchedule from "./components/detail/PostScheduleSchedule";
import PostScheduleTodo from "./components/detail/PostScheduleTodo";
import { mockPostScheduleDetails } from "../../data/mockPostScheduleDetails";
import "./PostScheduleDetailApp.css";

export default function PostScheduleDetailApp() {
  const { id } = useParams();
  const detail = id ? mockPostScheduleDetails[id] : null;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PostScheduleDetailTabType>("schedule");

  // useEffect(() => {
  //   if (!id) return;
  //
  //   axios.get<PostScheduleDetail>(`/api/postSchedule/${id}`)
  //     .then(res => {
  //       setDetail(res.data);
  //     });
  // }, [id]);

  if (!detail) {
    return <div className="post-schedule-detail-not-found">로딩중...</div>;
  }

  return (
    <div className="post-schedule-detail-page">
      <header className="post-schedule-detail-header">
        <button
          type="button"
          className="post-schedule-detail-back-btn"
          onClick={() => navigate("/postSchedule")}
          aria-label="목록으로 돌아가기"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="post-schedule-detail-title">{detail.scheduleTitle}</h1>
      </header>

      <main className="post-schedule-detail-content">
        <PostScheduleDetailTab activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="post-schedule-detail-tab-content">
          {activeTab === "schedule" && (
            <PostScheduleSchedule maps={detail.maps} routes={detail.routes} />
          )}

          {activeTab === "budget" && (
            <PostScheduleBudget budgetDetail={detail.budgetDetail} />
          )}

          {activeTab === "todo" && (
            <PostScheduleTodo todoDetail={detail.todoDetail} />
          )}
        </div>
      </main>
    </div>
  );
}

import type { MySchedule } from "../../../types";

interface MyScheduleDetailProps {
    schedule?: MySchedule;
}

function MyScheduleDetail({ schedule }: MyScheduleDetailProps) {
    if (!schedule) {
        return <div>일정을 찾을 수 없습니다.</div>;
    }

    return (
        <div>
            MyScheduleDetail
        </div>
    )

}

export default MyScheduleDetail
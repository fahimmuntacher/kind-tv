import DashBoardLayout from "@/app/layouts/DashBoardLayout";

import BroadcastSchedulerPage from "./(Components)/BroadcastSchedulerPage";

export default function ContentScheduling() {
  return (
    <DashBoardLayout panelName="Content Scheduling">
      <div>
        <BroadcastSchedulerPage></BroadcastSchedulerPage>
      </div>
    </DashBoardLayout>
  );
}

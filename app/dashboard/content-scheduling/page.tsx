import DashBoardLayout from "@/app/layouts/DashBoardLayout";
import React from "react";
import MultiSourceContent from "./(Components)/MultiSourceContent";

import RecurringScheduleCard from "./(Components)/Recurring";

const ContentScheduling = () => {
  return (
    <DashBoardLayout panelName="Content Scheduling">
      <div className="py-6 px-4 sm:px-6 lg:px-8 mx-auto space-y-8">
        <MultiSourceContent />
        {/* <AnalyticsSuggestions /> */}
        <RecurringScheduleCard></RecurringScheduleCard>
      </div>
    </DashBoardLayout>
  );
};

export default ContentScheduling;

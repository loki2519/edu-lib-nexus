import React from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { mockRFIDLogs } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/StatsCard";
import { Users, Clock } from "lucide-react";

const DailyAttendance = () => {
  const today = mockRFIDLogs.filter(l => l.date === "2026-03-12");
  const inLibrary = today.filter(l => !l.exitTime);
  return (
    <div className="animate-fade-in">
      <PageHeader title="Daily Attendance" description="Today's library visitors" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <StatsCard title="Total Visitors Today" value={today.length} icon={Users} color="primary" />
        <StatsCard title="Currently In Library" value={inLibrary.length} icon={Clock} color="success" />
      </div>
      <DataTable
        columns={[
          { header: "Student ID", accessor: "studentId" },
          { header: "Name", accessor: "studentName" },
          { header: "Department", accessor: "department" },
          { header: "Entry", accessor: "entryTime" },
          { header: "Exit", accessor: (row) => row.exitTime || <Badge variant="warning">In Library</Badge> },
        ]}
        data={today}
      />
    </div>
  );
};

export default DailyAttendance;

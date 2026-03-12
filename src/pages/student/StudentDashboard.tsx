import React from "react";
import { BookOpen, Clock, Users, FileText } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { mockBooks, mockRFIDLogs, mockQuestionPapers } from "@/lib/mockData";

const StudentDashboard = () => {
  const myBooks = mockBooks.filter(b => b.issuedTo === "STU2024001");
  const dueBooks = myBooks.filter(b => b.dueDate && new Date(b.dueDate) < new Date());
  const myVisits = mockRFIDLogs.filter(l => l.studentId === "STU2024001");

  const recentActivity = [
    { action: "Book Issued", detail: "Data Structures (ACC1002)", date: "Mar 1, 2026" },
    { action: "Paper Downloaded", detail: "CS301 - Data Structures End Sem", date: "Feb 28, 2026" },
    { action: "Library Visit", detail: "Entry: 09:15 - Exit: 12:30", date: "Mar 12, 2026" },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Student Dashboard" description="Welcome back, John Anderson" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Books Issued" value={myBooks.length} icon={BookOpen} color="primary" />
        <StatsCard title="Due Books" value={dueBooks.length} icon={Clock} color={dueBooks.length > 0 ? "warning" : "success"} />
        <StatsCard title="Library Visits" value={myVisits.length} icon={Users} color="info" />
        <StatsCard title="Papers Available" value={mockQuestionPapers.length} icon={FileText} color="success" />
      </div>

      {/* My Issued Books */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-3">My Issued Books</h3>
        <DataTable
          columns={[
            { header: "Accession No.", accessor: "accessionNumber" },
            { header: "Title", accessor: "title" },
            { header: "Issue Date", accessor: "issueDate" },
            { header: "Due Date", accessor: "dueDate" },
            { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
          ]}
          data={myBooks}
          emptyMessage="No books currently issued"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl p-5 border border-border/50 card-shadow">
        <h3 className="text-sm font-semibold text-card-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{a.action}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

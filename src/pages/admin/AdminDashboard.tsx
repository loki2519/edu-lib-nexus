import React from "react";
import { BookOpen, BookCopy, AlertTriangle, XCircle, FileText, Users, TrendingUp, Clock } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { PageHeader } from "@/components/PageHeader";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { mockBooks, mockRFIDLogs, mockQuestionPapers } from "@/lib/mockData";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

const categoryData = [
  { name: "CS", value: 5 },
  { name: "Math", value: 2 },
  { name: "Physics", value: 1 },
  { name: "Chemistry", value: 1 },
  { name: "Electronics", value: 2 },
];

const monthlyData = [
  { month: "Oct", issues: 45, returns: 40 },
  { month: "Nov", issues: 52, returns: 48 },
  { month: "Dec", issues: 38, returns: 42 },
  { month: "Jan", issues: 61, returns: 55 },
  { month: "Feb", issues: 48, returns: 50 },
  { month: "Mar", issues: 35, returns: 30 },
];

const COLORS = ["hsl(217, 91%, 50%)", "hsl(142, 71%, 45%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)", "hsl(199, 89%, 48%)"];

const recentActivity = [
  { action: "Book Issued", detail: "Data Structures (ACC1002) → John Anderson", time: "2 hours ago", type: "issue" },
  { action: "Book Returned", detail: "Linear Algebra (ACC1009) → Lisa Wong", time: "3 hours ago", type: "return" },
  { action: "Paper Uploaded", detail: "CS301 - Data Structures End Sem 2025-26", time: "5 hours ago", type: "upload" },
  { action: "Student Entry", detail: "Raj Patel - Chemistry Dept", time: "6 hours ago", type: "entry" },
  { action: "Book Lost", detail: "Operating Systems (ACC1005)", time: "1 day ago", type: "lost" },
];

const AdminDashboard = () => {
  const totalBooks = mockBooks.length;
  const available = mockBooks.filter(b => b.status === "Available").length;
  const issued = mockBooks.filter(b => b.status === "Issued").length;
  const lost = mockBooks.filter(b => b.status === "Lost").length;
  const withdrawn = mockBooks.filter(b => b.status === "Withdrawn").length;
  const returned = 5; // mock returned count
  const visitorsToday = mockRFIDLogs.filter(l => l.date === "2026-03-12").length;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Admin Dashboard" description="Library management overview and analytics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Books" value={totalBooks} icon={BookOpen} color="primary" trend="+12 this month" trendUp />
        <StatsCard title="Available" value={available} icon={BookCopy} color="success" />
        <StatsCard title="Issued" value={issued} icon={Clock} color="info" />
        <StatsCard title="Returned" value={returned} icon={BookCopy} color="success" trend="+2 today" trendUp />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Lost" value={lost} icon={AlertTriangle} color="destructive" />
        <StatsCard title="Withdrawn" value={withdrawn} icon={XCircle} color="warning" />
        <StatsCard title="Question Papers" value={mockQuestionPapers.length} icon={FileText} color="primary" />
        <StatsCard title="Visitors Today" value={visitorsToday} icon={Users} color="success" trend="+3 vs yesterday" trendUp />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-card rounded-xl p-5 border border-border/50 card-shadow">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Monthly Book Issues & Returns</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="issues" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returns" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl p-5 border border-border/50 card-shadow">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Books by Category</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl p-5 border border-border/50 card-shadow">
        <h3 className="text-sm font-semibold text-card-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

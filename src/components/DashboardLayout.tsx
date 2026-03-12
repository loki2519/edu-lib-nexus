import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Bell, Search } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { adminNav, studentNav } from "@/lib/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useAuth();
  const navItems = role === "admin" ? adminNav : studentNav;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar items={navItems} collapsed={collapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

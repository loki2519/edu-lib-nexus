import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

const defaultAnnouncements = [
  "📚 Library will remain closed on 15th March for maintenance.",
  "🎓 New books on Artificial Intelligence have been added to the Main Library.",
  "⏰ Library timings extended till 9 PM during exam season.",
  "📋 Question papers for Mid Semester 2025-26 are now available for download.",
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<string[]>(() => {
    const saved = localStorage.getItem("edulib-announcements");
    return saved ? JSON.parse(saved) : defaultAnnouncements;
  });
  const [newText, setNewText] = useState("");

  const save = (items: string[]) => {
    setAnnouncements(items);
    localStorage.setItem("edulib-announcements", JSON.stringify(items));
  };

  const handleAdd = () => {
    if (!newText.trim()) return toast.error("Enter announcement text");
    save([...announcements, newText.trim()]);
    setNewText("");
    toast.success("Announcement added");
  };

  const handleDelete = (index: number) => {
    save(announcements.filter((_, i) => i !== index));
    toast.success("Announcement removed");
  };

  return (
    <div className="animate-fade-in max-w-3xl">
      <PageHeader title="Announcements" description="Manage the scrolling announcement ticker visible to all users" />

      <div className="bg-card rounded-xl p-5 border border-border/50 card-shadow mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Add New Announcement</h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder="Enter announcement text..."
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdd()}
            />
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 border border-border/50 card-shadow">
        <h3 className="text-sm font-semibold text-card-foreground mb-3">Current Announcements ({announcements.length})</h3>
        {announcements.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No announcements. Add one above.</p>
        ) : (
          <div className="space-y-2">
            {announcements.map((text, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/30">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-sm text-card-foreground flex-1">{text}</p>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(i)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 bg-primary/5 rounded-xl p-5 border border-primary/20">
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Preview</h3>
        <div className="overflow-hidden rounded-lg bg-card border border-border">
          <div className="py-2 px-4 whitespace-nowrap animate-marquee">
            {announcements.map((text, i) => (
              <span key={i} className="inline-block mr-16 text-sm text-foreground">{text}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;

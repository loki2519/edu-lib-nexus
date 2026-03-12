import React from "react";
import { Badge } from "@/components/ui/badge";

type BookStatus = "Available" | "Issued" | "Transferred" | "Lost" | "Withdrawn" | "Overdue";

const statusVariantMap: Record<BookStatus, "success" | "default" | "info" | "destructive" | "warning" | "secondary"> = {
  Available: "success",
  Issued: "default",
  Transferred: "info",
  Lost: "destructive",
  Withdrawn: "warning",
  Overdue: "destructive",
};

export const StatusBadge = ({ status }: { status: BookStatus }) => {
  return <Badge variant={statusVariantMap[status] || "secondary"}>{status}</Badge>;
};

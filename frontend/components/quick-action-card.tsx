"use client";

import { ChevronRight } from "lucide-react";

interface QuickActionCardProps {
  label: string;
  action: string;
  bgColor?: string;
}

export function QuickActionCard({
  label,
  action,
  bgColor = "bg-primary/5",
}: QuickActionCardProps) {
  return (
    <button
      className={`p-3 rounded-lg border border-border ${bgColor} hover:border-primary/30 transition-all text-left group`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{action}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </button>
  );
}

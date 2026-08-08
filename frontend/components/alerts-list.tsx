"use client";

import { AlertCircle, Info } from "lucide-react";

interface Alert {
  id: string;
  type: "urgent" | "warning";
  title: string;
  message: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "urgent",
    title: "Medication Low",
    message: "Amoxicillin stock running low",
  },
  {
    id: "2",
    type: "warning",
    title: "Device Alert",
    message: "X-ray machine maintenance due",
  },
];

export function AlertsList() {
  return (
    <div className="bg-card rounded-lg border border-border p-5 space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Alerts</h2>

      <div className="space-y-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border-l-4 ${
              alert.type === "urgent"
                ? "bg-red-50 border-l-red-500"
                : "bg-amber-50 border-l-amber-500"
            }`}
          >
            <div className="flex items-start gap-2">
              {alert.type === "urgent" ? (
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`text-xs font-semibold ${alert.type === "urgent" ? "text-red-900" : "text-amber-900"}`}
                >
                  {alert.title}
                </p>
                <p
                  className={`text-xs ${alert.type === "urgent" ? "text-red-700" : "text-amber-700"}`}
                >
                  {alert.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
